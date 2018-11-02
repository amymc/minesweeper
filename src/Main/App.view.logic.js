import React from "react"
import App from "./App.view.js"
import { ModalProvider, ModalConsumer } from "./Modal.context.js"

export default class AppLogic extends React.Component {
  render() {
    return (
      <ModalProvider>
        <ModalConsumer>
          {({ showHelp, showMenu, showScreensaver, showVideo }) => (
            <App
              showHelp={showHelp}
              showMenu={showMenu}
              showScreensaver={showScreensaver}
              showVideo={showVideo}
            />
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}
