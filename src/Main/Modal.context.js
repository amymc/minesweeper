import React from "react"

const ModalContext = React.createContext()
export class ModalProvider extends React.Component {
  state = {
    showHelp: false,
    showMenu: false,
    showVideo: false
  }

  toggleItem = e => {
    if (e.stopPropagation) e.stopPropagation()
    this.setState({ [e.currentTarget.name]: !this.state[e.currentTarget.name] })
  }

  render() {
    const { props, state } = this
    return (
      <ModalContext.Provider
        value={{
          toggleItem: this.toggleItem,
          showHelp: state.showHelp,
          showMenu: state.showMenu,
          showVideo: state.showVideo
        }}
      >
        {props.children}
      </ModalContext.Provider>
    )
  }
}
export const ModalConsumer = ModalContext.Consumer
