import React from "react"
import Cell from "./Cell.view.js"
import { AppConsumer } from "../App.context"

class CellLogic extends React.Component {
  componentDidMount = () => {}
  render() {
    const { item } = this.props

    return (
      <AppConsumer>
        {({ onMouseUp, placeFlag, reveal }) => (
          <Cell
            {...item}
            onMouseUp={onMouseUp}
            onMouseDown={e => reveal(e, item)}
            onContextMenu={e => placeFlag(e, item)}
            shouldShowFlag={!item.isRevealed && item.hasIcon === "flag"}
            shouldShowQuestion={!item.isRevealed && item.hasIcon === "question"}
            shouldShowMine={item.isRevealed && item.hasMine}
            shouldShowX={item.isRevealed && item.hasIcon && !item.hasMine}
            shouldShowOne={item.neighbour === 1 && item.isRevealed}
            shouldShowTwo={
              item.neighbour === 2 &&
              item.isRevealed &&
              !item.isEmpty &&
              !item.hasMine &&
              !item.hasIcon
            }
            shouldShowThree={
              item.neighbour === 3 &&
              item.isRevealed &&
              !item.isEmpty &&
              !item.hasMine &&
              !item.hasIcon
            }
            shouldShowFour={
              item.neighbour === 4 &&
              item.isRevealed &&
              !item.isEmpty &&
              !item.hasMine &&
              !item.hasIcon
            }
            shouldShowFive={item.neighbour === 5 && item.isRevealed}
            shouldShowSix={item.neighbour === 6 && item.isRevealed}
            shouldShowSeven={item.neighbour === 7 && item.isRevealed}
            shouldShowEight={item.neighbour === 8 && item.isRevealed}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
