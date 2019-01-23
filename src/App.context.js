import { createGrid, getNeighbouringCells } from './grid.js'
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

  placeFlag = (e, { x, y }) => {
    if (this.state.status === 'hasLost') return
    e.preventDefault()

    const column = JSON.parse(JSON.stringify(this.state.grid[x]))
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

  onMouseUp = () => {
    const mood =
      this.state.status === 'hasLost'
        ? 'isDead'
        : this.state.status === 'hasWon'
        ? 'isCool'
        : 'isHappy'
    this.setState({ mood })
  }

  reveal = (e, { x, y, hasMine, isEmpty }) => {
    //dont reveal on right-click
    if (e.nativeEvent.which === 3 || this.state.status === 'hasLost') return
    let updatedGrid = JSON.parse(JSON.stringify(this.state.grid))
    this.setState({ mood: 'isScared' })

    if (this.state.status === 'isStart') {
      this.setState({ status: 'isPlaying' })
      this.interval = setInterval(this.tick.bind(this), 1000)
    }

    if (hasMine) {
      updatedGrid.map(column => column.map(cell => (cell.isRevealed = true)))
      updatedGrid[x][y].isLosingCell = true
      clearInterval(this.interval)
      this.setState({ status: 'hasLost' })
    } else if (isEmpty) {
      this.revealEmpty(x, y, updatedGrid)
      updatedGrid[x][y].isRevealed = true
    } else {
      updatedGrid[x][y].isRevealed = true
    }

    if (this.getHidden(updatedGrid).length === this.state.mines) {
      clearInterval(this.interval)
      this.setState({ status: 'hasWon' })
    } else {
      this.setState({ grid: updatedGrid })
    }
  }

  revealEmpty(x, y, grid) {
    let cells = getNeighbouringCells(
      x,
      y,
      grid,
      boards[this.state.level].height,
      boards[this.state.level].width
    )

    cells.forEach(cell => {
      if (
        !cell.hasIcon &&
        !cell.isRevealed &&
        (cell.isEmpty || !cell.hasMine)
      ) {
        grid[cell.x][cell.y].isRevealed = true

        if (cell.isEmpty) {
          this.revealEmpty(cell.x, cell.y, grid)
        }
      }
    })
    return grid
  }

  getHidden = data =>
    data.map(datarow => datarow.filter(dataitem => !dataitem.isRevealed)).flat()

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
          onMouseUp: this.onMouseUp,
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
