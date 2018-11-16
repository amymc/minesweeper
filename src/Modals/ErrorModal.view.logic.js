import React from "react"
import { ModalConsumer } from "../Modal.context"
import { AppConsumer } from "../App.context"
import ErrorModal from "./ErrorModal.view.js"

const ErrorModalLogic = props => {
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

export default ErrorModalLogic
