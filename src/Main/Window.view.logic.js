import React from "react"
import { AppConsumer } from "../App.context"
import { ModalConsumer } from "../Modal.context"
import Window from "./Window.view.js"

const WindowLogic = props => {
  return (
    <AppConsumer>
      {({ grid, level, reset, switchLevel }) => (
        <ModalConsumer>
          {({ toggleItem }) => (
            <Window
              {...props}
              grid={grid}
              toggleItem={toggleItem}
              switchLevel={switchLevel}
              reset={reset}
              level={level}
            />
          )}
        </ModalConsumer>
      )}
    </AppConsumer>
  )
}

export default WindowLogic
