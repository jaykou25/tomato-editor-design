import React, { createRef } from 'react'
import { Component, Children, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'
import cs from 'classnames'
import { getRelPosition } from '../utils/location'
import { MyPopoverProps, MyPopoverState } from './types'

export default class Popover extends Component<
  MyPopoverProps & typeof Popover.defaultProps,
  MyPopoverState
> {
  private overlayRef = createRef<HTMLDivElement>()
  private triggerRef = createRef<HTMLDivElement>()

  private inTrigger = false
  private inOverlay = false

  static defaultProps = {
    offset: 0,
    defaultPosition: 'top',
    avoidTop: 0,
  }

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      directClose: false,
      position: { left: 0, top: 0 },
    }

    if (props.actionRef) {
      props.actionRef.current = {}
      props.actionRef.current.close = this.close
    }
  }

  handleMouseEnter = (e) => {
    const { offset, avoidTop } = this.props
    const rect = e.target.getBoundingClientRect()

    // 获取一个元素相对于另一个元素的内部(client)的距离(包含滚动)
    const pos = getRelPosition(rect, this.getTargetContainer())

    const overlayHeight = this.overlayRef.current?.offsetHeight || 0
    const triggerHeight = this.triggerRef.current?.offsetHeight || 0

    const showOnTop = () => {
      this.setState({
        position: {
          left: pos.left,
          top: Math.floor(pos.top - overlayHeight - offset),
        },
        visible: true,
        directClose: false,
      })
    }

    const showOnBottom = () => {
      this.setState({
        position: {
          left: pos.left,
          top: Math.ceil(pos.top + triggerHeight + offset), // 会有小数点, 用ceil尽量往下显示
        },
        visible: true,
        directClose: false,
      })
    }

    if (this.props.defaultPosition === 'top') {
      // 优先显示在上面
      // 判断上方是否有空间
      if ((rect.top || 0) - overlayHeight > avoidTop + offset) {
        console.log('up')
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

  handleMouseLeave = () => {
    this.setState({ visible: false })
  }

  handleOverlayMouseEnter = () => {
    this.setState({ visible: true })
    if (this.props.onOpen) this.props.onOpen()
  }

  handleOverlayMouseLeave = () => {
    this.setState({ visible: false })
  }

  getTriggerProps = () => {
    return {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      ref: this.triggerRef,
    }
  }

  getTargetContainer = () => {
    const { getContainer } = this.props

    return getContainer ? getContainer() || document.body : document.body
  }

  close = () => {
    this.setState({ visible: false, directClose: true })
  }

  render() {
    const { visible, position, directClose } = this.state
    const child: any = Children.only(this.props.children)

    return (
      <>
        {this.props.disabled
          ? child
          : cloneElement(child, this.getTriggerProps())}
        {ReactDOM.createPortal(
          <div
            ref={this.overlayRef}
            style={{
              left: position.left,
              top: position.top,
              zIndex: visible && this.props.zIndex,
            }}
            className={cs(
              styles.overlay,
              visible && styles.overlayShow,
              directClose && styles.directClose
            )}
            onMouseEnter={this.handleOverlayMouseEnter}
            onMouseLeave={this.handleOverlayMouseLeave}
          >
            {this.props.content}
          </div>,
          this.getTargetContainer()
        )}
      </>
    )
  }
}
