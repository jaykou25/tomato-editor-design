import type { ReactNode } from 'react'

export interface MyModalProps {
  /**
   * 对话框是否可见
   */
  visible: boolean
  /**
   * 点击遮罩层或取消按钮的回调
   */
  onClose?: () => void
  /**
   * 点击确定回调
   */
  onOk?: () => void
  /**
   * 标题
   */
  title?: string
  /**
   * 设置底部按钮加载中
   */
  footerLoading?: boolean
  option?: {
    title?: string
    content?: string | (() => ReactNode)
    father: HTMLDivElement
    onOk: () => void
  }
}
