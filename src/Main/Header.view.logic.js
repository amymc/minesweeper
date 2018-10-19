import React from "react"
import { AppConsumer } from "../App.context"
import Header from "./Header.view.js"

export default class HeaderLogic extends React.Component {
  render() {
    const { props } = this
    // return <Header {...props} text={"010"} />
    return (
      <AppConsumer>
        {({ isDead, mines, time, reset }) => (
          <Header
            isDead={isDead}
            numMines={mines.toString().padStart(3, "0")}
            time={time.toString().padStart(3, "0")}
            reset={reset}
          />
        )}
      </AppConsumer>
    )
  }
}
