import type { ReactNode } from 'react'

export interface MySlideCardProps {
  container?: HTMLElement | null
  content: ReactNode | string
  visible: boolean
  rect: DOMRect
  /**
   * 默认方向
   * @defaultValue top
   */
  defaultPosition?: 'top' | 'bottom'
  /**
   * 偏移距离, 方向是top的话就往上偏, 方向是bottom的话就往下偏
   * @defaultValue 0
   */
  offset?: number
  /**
   * 上方的避让距离, 比如要让掉header的高度
   * @defaultValue 0
   */
  avoidTop?: number //
  zIndex?: number
  /**
   * 是否有遮罩层
   * @defaultValue false
   */
  hasMask?: boolean

  /**
   * 遮罩层的z-index
   * @defaultValue 1000
   */
  maskIndex?: number

  /**
   * 遮罩层的背景
   */
  maskBackground?: string

  /**
   * 点击遮罩层的回调
   */
  onClose?: () => void
}

export interface MySlideCardState {
  position: {
    left: number
    top: number
  }
}
