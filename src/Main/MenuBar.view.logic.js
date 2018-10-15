import React from "react"
import { ModalConsumer } from "./Modal.context"
import MenuBar from "./MenuBar.view.js"

export default class MenuBarLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <ModalConsumer>
        {({ showModal }) => <MenuBar {...props} showHelp={showModal} />}
      </ModalConsumer>
    )
  }
}
