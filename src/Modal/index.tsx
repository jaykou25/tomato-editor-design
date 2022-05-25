import React from 'react'
import ReactDOM from 'react-dom'
import { PureComponent } from 'react'
import InnerModal from './components/innerModal'
import type { MyModalProps } from './types'

class MyModal extends PureComponent<MyModalProps> {
  static confirm = (option) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(
      <InnerModal visible={true} option={{ ...option, father: div }} />,
      div
    )
  }

  render() {
    return <InnerModal {...this.props} />
  }
}

export default MyModal
