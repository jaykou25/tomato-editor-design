/**
 * @title 基本
 * @description 常规的popover, 不受控; 默认朝下(如果下方有空间)
 */

import React, { useRef } from 'react'
import { Button } from 'my-lib'
import { Popover } from '@jay.kou/tomato-editor-design'

const Basic = () => {
  return (
    <>
      <Popover avoidTop={63} offset={2} zIndex={9999} content={<div>内容</div>}>
        <Button type="primary">Hover Me</Button>
      </Popover>
    </>
  )
}

export default Basic
