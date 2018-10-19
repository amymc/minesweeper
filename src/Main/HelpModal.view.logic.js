import React from "react"
import { ModalConsumer } from "./Modal.context"
import HelpModal from "./HelpModal.view.js"

export default class HelpModalLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <ModalConsumer>
        {({ toggleModal }) => (
          <HelpModal {...props} toggleModal={e => toggleModal(e)} />
        )}
      </ModalConsumer>
    )
  }
}
