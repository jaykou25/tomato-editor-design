/**
 * @title Tomato Editor Demo
 */

import React from 'react'
import TomatoEditor from '@jay.kou/tomato-editor'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'hello tomato ' }],
  },
]

const Editor = () => {
  return <TomatoEditor initialValue={initialValue} />
}

export default Editor
