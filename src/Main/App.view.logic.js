import React from "react"
import App from "./App.view.js"
import { ModalProvider } from "./Modal.context.js"

export default class AppLogic extends React.Component {
  // state = {
  //   isRevealed: false
  // }

  // reveal = () => {
  //   this.setState({ isRevealed: true })
  // }

  // reveal = (e, cell) => {
  //   debugger
  //   if (cell.hasMine) {
  //     this.setState({ isDead: true })
  //   }
  //   cell.isRevealed = true
  //   // this.setState({ isRevealed: true })
  // }

  render() {
    return (
      <ModalProvider>
        <App />
      </ModalProvider>
    )
  }
}
