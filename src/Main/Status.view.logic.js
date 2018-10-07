import React from "react"
import Status from "./Status.view.js"
import { AppConsumer } from "../App.context"

class StatusLogic extends React.Component {
  // state = {
  //   isRevealed: false
  // }

  // reveal = () => {
  //   this.setState({ isRevealed: true })
  // }

  render() {
    const { props } = this
    return (
      <AppConsumer>{({ isDead }) => <Status isDead={isDead} />}</AppConsumer>
    )
  }
}

export default StatusLogic
