import React from "react"
import App from "./App.view.js"
import { ModalProvider, ModalConsumer } from "./Modal.context.js"

export default class AppLogic extends React.Component {
  render() {
    return (
      <ModalProvider>
        <ModalConsumer>
          {({ showHelp, showVideo }) => (
            <App showHelp={showHelp} showVideo={showVideo} />
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}
