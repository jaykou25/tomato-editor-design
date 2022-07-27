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

  const [visible3, setVisible3] = useState(false)
  const [rect3, setRect3] = useState<DOMRect>(new DOMRect())

  const [visible4, setVisible4] = useState(false)
  const [rect4, setRect4] = useState<DOMRect>(new DOMRect())
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
      <div style={{ height: '50px' }}></div>
      <a
        id="link3"
        onClick={(e) => {
          e.stopPropagation()
          const dom = document.getElementById('link3')
          const domRect = dom.getBoundingClientRect()
          setRect3(domRect)
          setVisible3(true)
        }}
      >
        {' '}
        有遮罩层(默认无颜色)
      </a>

      <div style={{ height: '50px' }}></div>
      <a
        id="link4"
        onClick={(e) => {
          e.stopPropagation()
          const dom = document.getElementById('link3')
          const domRect = dom.getBoundingClientRect()
          setRect4(domRect)
          setVisible4(true)
        }}
      >
        {' '}
        有遮罩层(加自定义颜色)
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

      <SlideCard
        rect={rect3}
        visible={visible3}
        content={<div>内容3</div>}
        defaultPosition="bottom"
        hasMask
        onClose={() => setVisible3(false)}
      />

      <SlideCard
        rect={rect4}
        visible={visible4}
        content={<div>内容4</div>}
        defaultPosition="bottom"
        hasMask
        maskBackground="rgba(0,0,0,0.4)"
        onClose={() => setVisible4(false)}
      />
    </div>
  )
}

export default Basic
