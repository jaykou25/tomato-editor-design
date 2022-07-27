/**
 * @title 按钮大小
 */

import React from 'react'
import { Button } from 'my-lib'

const Demo2 = () => {
  return (
    <>
      <Button type="primary" size="mini" style={{ marginRight: '20px' }}>
        MINI
      </Button>
      <Button type="primary" size="small" style={{ marginRight: '20px' }}>
        Small
      </Button>
      <Button type="primary">确认</Button>
    </>
  )
}

export default Demo2
