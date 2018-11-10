import CloseButton from "./CloseButton.view.js"
import React from "react"

export default class CloseButtonLogic extends React.Component {
  state = {
    isPressed: false
  }

  toggleState = () => {
    this.setState({ isPressed: !this.state.isPressed })
  }

  render() {
    const { props, state } = this
    return (
      <CloseButton
        {...props}
        isPressed={state.isPressed}
        toggleState={this.toggleState}
      />
    )
  }
}
