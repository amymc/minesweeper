import React from "react"
import { AppConsumer } from "../App.context"
import { ModalConsumer } from "./Modal.context"
import Window from "./Window.view.js"

export default class WindowLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <AppConsumer>
        {({ reset }) => (
          <ModalConsumer>
            {({ toggleItem }) => (
              <Window {...props} toggleItem={toggleItem} reset={reset} />
            )}
          </ModalConsumer>
        )}
      </AppConsumer>
    )
  }
}
