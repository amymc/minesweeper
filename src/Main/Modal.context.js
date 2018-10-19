import React from "react"

const ModalContext = React.createContext()
export class ModalProvider extends React.Component {
  state = {
    showHelp: false,
    showVideo: false
  }

  toggleModal = e => {
    this.setState({ [e.currentTarget.name]: !this.state[e.currentTarget.name] })
  }

  render() {
    const { props, state } = this
    return (
      <ModalContext.Provider
        value={{
          toggleModal: this.toggleModal,
          showHelp: state.showHelp,
          showVideo: state.showVideo
        }}
      >
        {props.children}
      </ModalContext.Provider>
    )
  }
}
export const ModalConsumer = ModalContext.Consumer
