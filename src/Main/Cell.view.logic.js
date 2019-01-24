import React from 'react'
import Cell from './Cell.view.js'
import { AppConsumer } from '../App.context'

class CellLogic extends React.Component {
  state = {
    isPressing: false,
  }

  render() {
    const { item } = this.props

    return (
      <AppConsumer>
        {({ getScared, getHappy, placeFlag, reveal }) => (
          <Cell
            {...item}
            isPressing={this.state.isPressing}
            onMouseUp={event => {
              if (event.nativeEvent.which === 3 || !this.state.isPressing) return

              this.setState({ isPressing: false })
              reveal(event, item)
            }}
            onMouseOut={event => {
              if (event.nativeEvent.which === 3 || !this.state.isPressing)
                return

              getHappy(event)
              this.setState({ isPressing: false })
            }}
            onMouseDown={event => {
              if (event.nativeEvent.which === 3) return

              getScared(event)
              this.setState({ isPressing: true })
            }}
            onContextMenu={event => placeFlag(event, item)}
            {...getStates(item)}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic

let getStates = ({ isRevealed, hasIcon, hasMine, neighbours }) => ({
  shouldShowFlag: !isRevealed && hasIcon === 'flag',
  shouldShowQuestion: !isRevealed && hasIcon === 'question',
  shouldShowMine: isRevealed && hasMine,
  shouldShowX: isRevealed && !!hasIcon && !hasMine,
  shouldShowOne: neighbours === 1 && isRevealed && !hasIcon,
  shouldShowTwo: neighbours === 2 && isRevealed && !hasIcon,
  shouldShowThree: neighbours === 3 && isRevealed && !hasIcon,
  shouldShowFour: neighbours === 4 && isRevealed && !hasIcon,
  shouldShowFive: neighbours === 5 && isRevealed && !hasIcon,
  shouldShowSix: neighbours === 6 && isRevealed && !hasIcon,
  shouldShowSeven: neighbours === 7 && isRevealed && !hasIcon,
  shouldShowEight: neighbours === 8 && isRevealed && !hasIcon,
})
