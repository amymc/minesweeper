import React from "react"
import { AppConsumer } from "../App.context"
import Header from "./Header.view.js"

export default class HeaderLogic extends React.Component {
  render() {
    const { props } = this
    // return <Header {...props} text={"010"} />
    return (
      <AppConsumer>
        {({ mood, mines, time, reset }) => (
          <Header
            isDead={mood === "isDead"}
            isScared={mood === "isScared"}
            isHappy={mood === "isHappy"}
            numMines={mines.toString().padStart(3, "0")}
            time={time.toString().padStart(3, "0")}
            reset={reset}
          />
        )}
      </AppConsumer>
    )
  }
}
