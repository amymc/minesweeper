import React from "react"

const ModalContext = React.createContext()
export class ModalProvider extends React.Component {
  state = {
    shouldShow: null //showHelp, showMenu, showScreensaver, showTimes, showVideo
    // showHelp: false,
    // showMenu: false,
    // showScreensaver: false,
    // showVideo: false
  }

  toggleItem = e => {
    if (e.stopPropagation) e.stopPropagation()
    this.setState({ shouldShow: e.currentTarget.name })
  }

  render() {
    const { props, state } = this
    return (
      <ModalContext.Provider
        value={{
          toggleItem: this.toggleItem,
          shouldShow: state.shouldShow
        }}
      >
        {props.children}
      </ModalContext.Provider>
    )
  }
}
export const ModalConsumer = ModalContext.Consumer
