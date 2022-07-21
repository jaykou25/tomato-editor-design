import type { ReactNode, RefObject } from 'react'

export interface PopoverRefType {
  /**
   * 关闭弹框
   */
  close?: () => void
}

export interface MyPopoverProps {
  /**
   * content的放置节点
   */
  getContainer?: () => HTMLElement | null
  /**
   * 弹出框内容
   */
  content: ReactNode | string
  /**
   * 禁用弹框
   */
  disabled?: boolean

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
   * popover显示后的回调
   */
  onOpen?: () => void
  /**
   * 定义actionRef, 可以获得组件内的方法
   */
  actionRef?: RefObject<PopoverRefType>
}

export interface MyPopoverState {
  visible: boolean
  directClose: boolean // 关闭时取消动画
  position: {
    left: number
    top: number
  }
}
