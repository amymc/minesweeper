import React from "react"
import { ModalConsumer } from "./Modal.context"
import MenuBar from "./MenuBar.view.js"

export default class MenuBarLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <ModalConsumer>
        {({ toggleModal }) => <MenuBar {...props} toggleModal={toggleModal} />}
      </ModalConsumer>
    )
  }
}
