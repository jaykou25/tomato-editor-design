import type { ReactNode } from 'react'

export interface MyModalProps {
  visible: boolean
  onClose?: () => void
  onOk?: () => void
  title?: string
  footerLoading?: boolean
  option?: {
    title?: string
    content?: string | (() => ReactNode)
    father: HTMLDivElement
    onOk: () => void
  }
}
