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
            shouldShowX={item.isRevealed && !!item.hasIcon && !item.hasMine}
            shouldShowOne={item.neighbours === 1 && item.isRevealed}
            shouldShowTwo={item.neighbours === 2 && item.isRevealed}
            shouldShowThree={item.neighbours === 3 && item.isRevealed}
            shouldShowFour={item.neighbours === 4 && item.isRevealed}
            shouldShowFive={item.neighbours === 5 && item.isRevealed}
            shouldShowSix={item.neighbours === 6 && item.isRevealed}
            shouldShowSeven={item.neighbours === 7 && item.isRevealed}
            shouldShowEight={item.neighbours === 8 && item.isRevealed}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
