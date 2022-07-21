/**
 * @title 基本
 * @description 组件是受控的, 需传入visible属性; 默认朝上(如果上方有空间)
 */

import React, { useRef, useState } from 'react'
import { SlideCard } from '@jay.kou/tomato-editor-design'

const Basic = () => {
  const [visible, setVisible] = useState(false)
  const [rect, setRect] = useState<DOMRect>(new DOMRect())

  const [visible2, setVisible2] = useState(false)
  const [rect2, setRect2] = useState<DOMRect>(new DOMRect())
  return (
    <div
      onClick={() => {
        setVisible(false)
        setVisible2(false)
      }}
    >
      <a
        id="link1"
        onClick={(e) => {
          e.stopPropagation()
          const dom = document.getElementById('link1')
          const domRect = dom.getBoundingClientRect()
          setRect(domRect)
          setVisible(true)
        }}
      >
        点击显示(默认在上方)
      </a>
      <div style={{ height: '50px' }}></div>
      <a
        id="link2"
        onClick={(e) => {
          e.stopPropagation()
          const dom = document.getElementById('link2')
          const domRect = dom.getBoundingClientRect()
          setRect2(domRect)
          setVisible2(true)
        }}
      >
        {' '}
        点击显示(默认在下方)
      </a>
      <SlideCard
        zIndex={9999}
        avoidTop={63}
        offset={2}
        rect={rect}
        visible={visible}
        content={<div>内容</div>}
      />
      <SlideCard
        zIndex={9999}
        rect={rect2}
        visible={visible2}
        content={<div>内容</div>}
        defaultPosition="bottom"
      />
    </div>
  )
}

export default Basic
