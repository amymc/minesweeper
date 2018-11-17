import React from "react"
import { ModalConsumer } from "../Modal.context"
import { AppConsumer } from "../App.context"
import StandardModal from "./StandardModal.view.js"

const StandardModalLogic = props => {
  return (
    <AppConsumer>
      {({ reset }) => (
        <ModalConsumer>
          {({ toggleItem }) => (
            <StandardModal
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

export default StandardModalLogic
