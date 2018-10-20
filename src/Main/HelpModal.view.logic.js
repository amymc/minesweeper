import React from "react"
import { ModalConsumer } from "./Modal.context"
import { AppConsumer } from "../App.context"
import HelpModal from "./HelpModal.view.js"

export default class HelpModalLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <AppConsumer>
        {({ reset }) => (
          <ModalConsumer>
            {({ toggleItem }) => (
              <HelpModal
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
