import React from "react"
import { AppConsumer } from "../App.context"
import { ModalConsumer } from "../Modal.context"
import Window from "./Window.view.js"

export default class WindowLogic extends React.Component {
  render() {
    const { props } = this
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
}
