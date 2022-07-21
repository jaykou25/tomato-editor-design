/**
 * @title 基本
 * @description 第一个对话框
 */

import React, { useState } from 'react'
import { Button } from 'my-lib'
import { Modal } from '@jay.kou/tomato-editor-design'

const Basic = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        onClose={() => setVisible(false)}
        visible={visible}
        title="Basic Modal"
      >
        内容
      </Modal>
    </>
  )
}

export default Basic
