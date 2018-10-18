import React from "react"

const ModalContext = React.createContext()
export class ModalProvider extends React.Component {
  state = {
    shouldShowModal: false
  }

  toggleModal = () => {
    this.setState({ shouldShowModal: !this.state.shouldShowModal })
  }

  render() {
    const { props, state } = this
    return (
      <ModalContext.Provider
        value={{
          toggleModal: this.toggleModal,
          shouldShowModal: state.shouldShowModal
        }}
      >
        {props.children}
      </ModalContext.Provider>
    )
  }
}
export const ModalConsumer = ModalContext.Consumer
