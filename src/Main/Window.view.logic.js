import React from "react"
import { ModalConsumer } from "./Modal.context"
import Window from "./Window.view.js"

export default class WindowLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <ModalConsumer>
        {({ toggleItem }) => <Window {...props} toggleItem={toggleItem} />}
      </ModalConsumer>
    )
  }
}
