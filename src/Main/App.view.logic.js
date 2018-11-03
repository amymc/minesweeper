import React from "react"
import App from "./App.view.js"
import { ModalProvider, ModalConsumer } from "./Modal.context.js"

export default class AppLogic extends React.Component {
  render() {
    return (
      <ModalProvider>
        <ModalConsumer>
          {({ shouldShow }) => (
            <App
              showHelp={shouldShow === "showHelp"}
              showMenu={shouldShow === "showMenu"}
              showScreensaver={shouldShow === "showScreensaver"}
              showTimes={shouldShow === "showTimes"}
              showVideo={shouldShow === "showVideo"}
            />
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}
