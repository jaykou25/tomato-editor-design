import React, { ReactNode, createRef } from 'react'
import { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'
import cs from 'classnames'
import { getRelPosition } from '../utils/location'
import { MySlideCardProps, MySlideCardState } from './types'

/**
 * 组件目标:
 * SlideCard组件可以让一个内容显示在指定元素A的上方或下方.
 * defaultPosition默认为上方. 当上方空间不够的时候会自动显示在下方.
 * 如果`defaultPosition`设置为下方. 当下方空间不够的时候会自动显示在上方.
 *
 * 上方空间或下方空间指的是元素A与窗口的距离
 *
 * 设计思路:
 * 使用的时候只需要传入元素B的rect就可以了.
 * 相对容器container是选填的, 默认是document.body
 *
 * 只需要算出元素B与相对容器间的距离就可以定位A了.
 */

export default class MySlideCard extends Component<
  MySlideCardProps & typeof MySlideCard.defaultProps,
  MySlideCardState
> {
  private overlayRef = createRef<HTMLDivElement>()
  private triggerRef = createRef<HTMLDivElement>()

  static defaultProps = {
    offset: 0,
    defaultPosition: 'top',
    avoidTop: 0,
  }

  constructor(props) {
    super(props)

    this.state = {
      position: { left: 0, top: 0 },
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rect !== this.props.rect) {
      this.handleContent()
    }

    if (prevProps.visible !== this.props.visible) {
      this.handleContent()
    }
  }

  handleContent = () => {
    const { offset, avoidTop } = this.props
    if (this.props.visible) {
      const { rect } = this.props

      // 获取一个元素相对于另一个元素的内部(client)的距离(包含滚动)
      const pos = getRelPosition(rect, this.container)

      const overlayHeight = this.overlayRef.current?.offsetHeight || 0
      const triggerHeight = rect.height || 0

      const showOnTop = () => {
        this.setState({
          position: {
            left: pos.left,
            top: Math.floor(pos.top - overlayHeight - offset),
          },
        })
      }

      const showOnBottom = () => {
        this.setState({
          position: {
            left: pos.left,
            top: Math.ceil(pos.top + triggerHeight + offset), // 会有小数点, 用ceil尽量往下显示
          },
        })
      }

      if (this.props.defaultPosition === 'top') {
        // 优先显示在上面
        // 判断上方是否有空间
        if ((rect.top || 0) - overlayHeight > avoidTop + offset) {
          showOnTop()
        } else {
          showOnBottom()
        }
      } else {
        if (
          window.innerHeight - (rect.bottom || 0) - overlayHeight - offset >
          0
        ) {
          // 判断下面是否有空间
          console.log('show on bottom')
          showOnBottom()
        } else {
          // 否则overlay显示在上面
          showOnTop()
        }
      }
    }
  }

  get container() {
    return this.props.container || document.body
  }

  render() {
    const { visible, zIndex } = this.props
    const { position } = this.state

    return ReactDOM.createPortal(
      <div
        ref={this.overlayRef}
        style={{
          left: position.left,
          top: position.top,
          zIndex: zIndex ? zIndex : 'unset',
        }}
        className={cs(styles.overlay, visible && styles.overlayShow)}
      >
        {/* 销毁content dom */}
        {visible && this.props.content}
      </div>,
      this.container
    )
  }
}
