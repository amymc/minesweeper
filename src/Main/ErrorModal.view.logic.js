import React from "react"
import { ModalConsumer } from "./Modal.context"
import { AppConsumer } from "../App.context"
import ErrorModal from "./ErrorModal.view.js"

export default class ErrorModalLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <AppConsumer>
        {({ reset }) => (
          <ModalConsumer>
            {({ toggleItem }) => (
              <ErrorModal
                {...props}
                toggleItem={toggleItem}
                playAgain={e => {
                  toggleItem(e)
                  reset()
                }}
              />
            )}
          </ModalConsumer>
        )}
      </AppConsumer>
    )
  }
}
