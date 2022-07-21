/**
 * @title 手动关闭弹框
 * @description 通过调用ref中的close方法手动关闭
 */

import React, { useRef } from 'react'
import { Button } from 'my-lib'
import { Popover } from '@jay.kou/tomato-editor-design'
import { PopoverRefType } from '../types'

const Content = (props) => {
  const { popoverRef } = props
  return (
    <div>
      <h3>弹出框内容</h3>

      <a onClick={() => popoverRef.current?.close()}>手动关闭</a>
    </div>
  )
}

const Basic = () => {
  const ref = useRef<PopoverRefType>({})
  return (
    <>
      <Popover
        offset={5}
        actionRef={ref}
        content={<Content popoverRef={ref} />}
      >
        <Button type="primary">Hover Me</Button>
      </Popover>
    </>
  )
}

export default Basic
