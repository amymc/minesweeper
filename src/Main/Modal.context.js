import React from "react"

const ModalContext = React.createContext()
export class ModalProvider extends React.Component {
  state = {
    shouldShowModal: false
  }

  showModal = () => {
    this.setState({ shouldShowModal: true })
  }

  render() {
    const { props, state } = this
    return (
      <ModalContext.Provider
        value={{
          showModal: this.showModal,
          shouldShowModal: state.shouldShowModal
        }}
      >
        {props.children}
      </ModalContext.Provider>
    )
  }
}
export const ModalConsumer = ModalContext.Consumer
