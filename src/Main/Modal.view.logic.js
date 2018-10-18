import React from "react"
import { ModalConsumer } from "./Modal.context"
import Modal from "./Modal.view.js"

export default class ModalLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <ModalConsumer>
        {({ shouldShowModal, toggleModal }) => (
          <Modal
            {...props}
            shouldShowModal={shouldShowModal}
            toggleModal={toggleModal}
          />
        )}
      </ModalConsumer>
    )
  }
}
