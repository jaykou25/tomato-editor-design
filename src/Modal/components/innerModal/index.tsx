import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'
import cs from 'classnames'
import { Button } from '@jay.kou/tomato-editor-design'
import type { MyModalProps } from '../../types'
import { IoInformationCircle } from 'react-icons/io5'

interface InnerModalState {
  backdropVisible: boolean
  overlayVisible: boolean
  stateVisible: boolean
}

class InnerModal extends Component<MyModalProps, InnerModalState> {
  private overlayRef = createRef<HTMLDivElement>()
  private backdropRef = createRef<HTMLDivElement>()

  // 遮罩层动画是否结束
  private backdropFinish = false
  // overlay动画是否结束
  private overlayFinish = false

  static defaultProps = {
    footerLoading: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      backdropVisible: false,
      overlayVisible: false,
      stateVisible: props.visible,
    }
  }

  componentDidMount() {
    // 针对Mymodal.confirm() 调用方式
    if (this.props.option) {
      // 异步显示遮罩层和overlay
      setTimeout(() => {
        this.setState({ backdropVisible: true, overlayVisible: true })
      })

      // 监听键盘事情
      document.addEventListener('keydown', this.handleKeyDown, false)
    }

    // 监听动画结束
    if (this.backdropRef.current) {
      this.backdropRef.current.addEventListener(
        'transitionend',
        this.handleTransitionEnd,
        false
      )
    }

    if (this.overlayRef.current) {
      this.overlayRef.current.addEventListener(
        'transitionend',
        this.handleTransitionEnd,
        false
      )
    }
  }

  componentDidUpdate(prevProps) {
    // 外部visible变化后同步stateVisible
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.setState({ stateVisible: true })
        setTimeout(() =>
          this.setState({ backdropVisible: true, overlayVisible: true })
        )

        // 监听键盘事情
        document.addEventListener('keydown', this.handleKeyDown, false)
      } else {
        this.setState({ backdropVisible: false, overlayVisible: false })

        document.removeEventListener('keydown', this.handleKeyDown, false)
      }
    }
  }

  componentWillUnmount() {
    if (this.backdropRef.current) {
      this.backdropRef.current.removeEventListener(
        'transitionend',
        this.handleTransitionEnd,
        false
      )
    }

    if (this.overlayRef.current) {
      this.overlayRef.current.removeEventListener(
        'transitionend',
        this.handleTransitionEnd,
        false
      )
    }

    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  handleTransitionEnd = (e) => {
    if (e.propertyName === 'opacity' && !this.state.backdropVisible) {
      this.backdropFinish = true
      this.unmountDom()
    }

    if (e.propertyName === 'transform' && !this.state.overlayVisible) {
      this.overlayFinish = true
      this.unmountDom()
    }
  }

  unmountDom = () => {
    if (this.props.option) {
      if (this.backdropFinish && this.overlayFinish) {
        ReactDOM.unmountComponentAtNode(this.props.option.father)
        this.props.option.father.remove()
      }
    } else {
      this.setState({ stateVisible: false })
    }
  }

  handleClose = (e) => {
    e.stopPropagation()
    if (this.props.footerLoading) return

    if (this.props.onClose) {
      this.props.onClose()
    } else {
      this.setState({
        backdropVisible: false,
        overlayVisible: false,
      })
    }
  }

  handleOk = () => {
    if (this.props.option) {
      this.props.option.onOk()
      this.setState({
        backdropVisible: false,
        overlayVisible: false,
      })
    } else {
      if (this.props.onOk) this.props.onOk()
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.handleClose(e)
    }

    if (e.key === 'Enter') {
      this.handleOk()
    }
  }

  renderTitle = () => {
    // 通过方法调用MyModal.confirm({title: 'hello'})
    if (this.props.option) {
      return (
        <div className={styles.confirmTitle}>
          <IoInformationCircle />
          {this.props.option.title}
        </div>
      )
    } else {
      if (this.props.title)
        return <div className={styles.title}>{this.props.title}</div>
    }
  }

  renderBody = () => {
    // 通过方法调用MyModal.confirm({content: 'body'})
    if (this.props.option) {
      return (
        <div className={styles.confirmBody}>
          {typeof this.props.option.content === 'function'
            ? this.props.option.content()
            : this.props.option.content}
        </div>
      )
    } else {
      return (
        <div className={styles.body}>
          {this.state.stateVisible && this.props.children}
        </div>
      )
    }
  }

  render() {
    const { backdropVisible, overlayVisible } = this.state
    return ReactDOM.createPortal(
      <>
        <div
          ref={this.overlayRef}
          onClick={this.handleClose}
          className={cs(
            styles.overlay,
            this.state.stateVisible && styles.overlayShow
          )}
        >
          {/* dialog层, 动画运用在dialog层上 */}
          <div
            className={cs(
              styles.dialog,
              overlayVisible && styles.dialogVisible
            )}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={styles.content}
            >
              {this.renderTitle()}
              {this.renderBody()}
              <div
                className={cs(
                  this.props.option ? styles.confirmFooter : styles.footer
                )}
              >
                <Button
                  style={{ marginRight: '10px' }}
                  onClick={this.handleClose}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  loading={this.props.option ? false : this.props.footerLoading}
                  onClick={this.handleOk}
                >
                  确认
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* 遮罩层 */}
        <div
          ref={this.backdropRef}
          className={cs(
            styles.backdrop,
            this.state.stateVisible && styles.backdropShow,
            backdropVisible && styles.backdropVisible
          )}
          onClick={this.handleClose}
        ></div>
      </>,
      this.props.option ? this.props.option.father : document.body
    )
  }
}

export default InnerModal
