import React from "react"
import { AppConsumer } from "../App.context"
import Header from "./Header.view.js"

const HeaderLogic = props => {
  return (
    <AppConsumer>
      {({ mood, mines, time, reset }) => (
        <Header
          isCool={mood === "isCool"}
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

export default HeaderLogic
