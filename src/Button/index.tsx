import React, { forwardRef } from 'react'
import cs from 'classnames'
import { RiLoader4Fill } from 'react-icons/ri'
import { ButtonProps } from './types'

import styles from './style.module.css'

function Button(props: ButtonProps) {
  const {
    type = 'default',
    size = 'default',
    children,
    onClick,
    style,
    loading = false,
    forwardedRef,
    ...rest
  } = props
  return (
    <div
      ref={forwardedRef}
      style={style}
      className={cs({
        [styles.wrapper]: true,
        [styles.typeDefault]: type === 'default',
        [styles.typePrimary]: type === 'primary',
        [styles.sizeDefault]: size === 'default',
        [styles.sizeSmall]: size === 'small',
      })}
      onClick={(e) => {
        if (loading) return

        if (onClick) onClick(e)
      }}
      {...rest}
    >
      <div className={styles.inner}>
        {loading && (
          <span className={styles.loader}>
            <RiLoader4Fill />
          </span>
        )}
        <span>{children}</span>
      </div>
    </div>
  )
}

const ForwardBtn = forwardRef((props: ButtonProps, ref: any) => {
  const { children, ...rest } = props
  return (
    <Button {...rest} forwardedRef={ref}>
      {children}
    </Button>
  )
})

export default ForwardBtn
