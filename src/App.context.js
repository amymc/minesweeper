import {
  cloneGrid,
  createGrid,
  getHiddenCells,
  revealEmptyCells,
} from './grid.js'
import React from 'react'
import boards from './boardsConfig.js'

const AppContext = React.createContext()

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: createGrid(boards.beginner),
      time: 0,
      status: 'isStart', // isPlaying, hasLost, hasWon
      mood: 'isHappy', // isScared, isDead, isCool
      level: 'beginner', // intermediate, expert
      mines: boards.beginner.mines,
    }
  }

  placeFlag = (event, { x, y }) => {
    if (this.state.status === 'hasLost') return
    event.preventDefault()

    const column = cloneGrid(this.state.grid[x])
    let mines = this.state.mines

    if (column[y].hasIcon === 'question') {
      column[y].hasIcon = null
    } else if (column[y].hasIcon === 'flag') {
      column[y].hasIcon = 'question'
      mines++
    } else {
      column[y].hasIcon = 'flag'
      mines--
    }

    this.setState({
      grid: [
        ...this.state.grid.slice(0, x),
        column,
        ...this.state.grid.slice(x + 1),
      ],
      mines,
    })
  }

  getScared = event => {
    if (this.state.status === 'hasLost') return

    this.setState({ mood: 'isScared' })
  }

  getHappy = event => {
    if (this.state.status === 'hasLost') return

    this.setState({ mood: 'isHappy' })
  }

  reveal = (event, { x, y, hasMine, isEmpty }) => {
    if (this.state.status === 'hasLost') return

    let updatedGrid = cloneGrid(this.state.grid)

    if (this.state.status === 'isStart') {
      this.setState({ status: 'isPlaying' })
      this.interval = setInterval(this.tick.bind(this), 1000)
    }

    if (hasMine) {
      updatedGrid.map(column => column.map(cell => (cell.isRevealed = true)))
      updatedGrid[x][y].isLosingCell = true
      clearInterval(this.interval)
      this.setState({ status: 'hasLost', mood: 'isDead' })
    } else if (isEmpty) {
      revealEmptyCells(x, y, updatedGrid, this.state.level)
      updatedGrid[x][y].isRevealed = true
    } else {
      updatedGrid[x][y].isRevealed = true
    }

    if (getHiddenCells(updatedGrid).length === this.state.mines) {
      clearInterval(this.interval)
      this.setState({ status: 'hasWon', mood: 'isCool' })
    } else {
      this.setState({ grid: updatedGrid, mood: hasMine ? 'isDead' : 'isHappy' })
    }
  }

  reset = () => {
    this.setState({
      grid: createGrid(boards[this.state.level]),
      mines: boards[this.state.level].mines,
      mood: 'isHappy',
      status: 'isStart',
      time: 0,
    })
    clearInterval(this.interval)
  }

  switchLevel = level => {
    this.setState({ level }, this.reset)
  }

  tick = () => {
    this.setState({ time: this.state.time + 1 })
  }

  render() {
    const { props, state } = this
    return (
      <AppContext.Provider
        value={{
          placeFlag: this.placeFlag,
          reset: this.reset,
          reveal: this.reveal,
          getHappy: this.getHappy,
          getScared: this.getScared,
          switchLevel: this.switchLevel,
          level: state.level,
          mood: state.mood,
          grid: state.grid,
          mines: state.mines,
          time: state.time,
        }}
      >
        {props.children}
      </AppContext.Provider>
    )
  }
}
export const AppConsumer = AppContext.Consumer
