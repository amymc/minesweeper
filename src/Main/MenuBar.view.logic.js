import React from "react"
import { ModalConsumer } from "./Modal.context"
import MenuBar from "./MenuBar.view.js"

export default class MenuBarLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <ModalConsumer>
        {({ toggleItem }) => <MenuBar {...props} toggleItem={toggleItem} />}
      </ModalConsumer>
    )
  }
}
