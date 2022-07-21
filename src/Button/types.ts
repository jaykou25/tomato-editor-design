import type { ReactNode } from 'react'

/**
 * This is the description of the Button component's props
 */
export interface ButtonProps {
  /**
   * 设置按钮类型
   * @defaultValue 'default'
   */
  type?: 'primary' | 'default'
  /**
   * 设置按钮大小
   * @defaultValue 'default'
   */
  size?: 'small' | 'default'
  /**
   * 设置按钮载入状态
   * @defaultValue false
   */
  loading?: boolean
  /**
   * 点击按钮时的回调
   */
  onClick?: (event: React.MouseEvent) => void
  /**
   * children
   */
  children: ReactNode
  /**
   * 设置按钮样式
   */
  style?: any

  /**
   * ref
   */
  forwardedRef?: any
}
