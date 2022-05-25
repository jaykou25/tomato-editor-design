/**
 * This is the description of the Button component's props
 */
export interface ButtonProps {
  /**
   * the type of button
   * @defaultValue 'default'
   */
  type?: 'primary' | 'default'
  /**
   * the size of button
   * @defaultValue 'middle'
   */
  size?: 'small' | 'default'
  /**
   * loading state of button
   * @defaultValue false
   */
  loading?: boolean
  /**
   * click handler
   */
  onClick?: (event: React.MouseEvent) => void
  /**
   * children
   */
  children: React.ReactNode
  /**
   * style
   */
  style?: any
}
