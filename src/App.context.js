import React from "react"

const AppContext = React.createContext()
export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    const height = 8
    const width = 8
    const mines = 10
    const list = [
      {
        title: "New",
        onClick: this.reset
      },
      {
        title: "Beginner"
      },
      {
        title: "Intermediate"
      },
      {
        title: "Expert"
      },
      {
        title: "Best Times..."
      },
      {
        title: "Exit"
      }
    ]
    this.state = {
      grid: this.createGrid(height, width, mines),
      time: 0,
      status: "isStart", //isPlaying, isOver, hasWon
      mood: "isHappy", //isScared, isDead, isCool
      list,
      mines,
      height,
      width
    }
  }

  // 40 mines 16 * 16 , 99 mines 16 * 30

  createGrid = (height, width, mines) => {
    let arr = []
    for (var i = 0; i < width; i++) {
      arr[i] = []
      for (var j = 0; j < height; j++) {
        arr[i][j] = {
          x: i,
          y: j,
          isRevealed: false,
          isLosingCell: false,
          hasFlag: false
        }
      }
    }

    this.placeMines(arr, mines)
    return arr
  }

  placeFlag = (e, cell) => {
    e.preventDefault()
    let updatedGrid = this.state.grid
    updatedGrid[cell.x][cell.y].hasFlag = true
    this.setState({ mines: this.state.mines - 1 })
  }

  placeMines = (gridArr, mines) => {
    let minesPlaced = 0
    while (minesPlaced < mines) {
      const randomx = Math.floor(Math.random() * 8)
      const randomy = Math.floor(Math.random() * 8)
      if (!gridArr[randomx][randomy].isMine) {
        gridArr[randomx][randomy].hasMine = true
        minesPlaced++
      }
    }
    return gridArr
  }

  onMouseUp = () => {
    const mood = this.state.status === "isOver" ? "isDead" : "isHappy"
    this.setState({ mood })
  }

  reveal = (e, cell) => {
    if (this.state.status === "isOver") return
    //dont reveal on right-click
    if (e.nativeEvent.which === 3) return
    this.setState({ mood: "isScared" })

    if (this.state.status === "isStart") {
      this.setState({ status: "isPlaying" })
      this.interval = setInterval(this.tick.bind(this), 1000)
    }

    let updatedGrid = this.state.grid

    if (cell.hasMine) {
      updatedGrid.map(column => column.map(cell => (cell.isRevealed = true)))
      updatedGrid[cell.x][cell.y].isLosingCell = true
      clearInterval(this.interval)
      this.setState({ grid: updatedGrid, status: "isOver" })
    } else {
      updatedGrid[cell.x][cell.y].isRevealed = true
      this.setState({ grid: updatedGrid })
    }
  }

  reset = () => {
    const { height, width, mines } = this.state
    this.setState({
      grid: this.createGrid(height, width, mines),
      mood: "isHappy",
      status: "isStart",
      time: 0
    })
  }

  tick = () => {
    if (this.state.status === "isPlaying") {
      this.setState({ time: this.state.time + 1 })
    }
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
          list: state.list,
          mood: state.mood,
          grid: state.grid,
          mines: state.mines,
          time: state.time
        }}
      >
        {props.children}
      </AppContext.Provider>
    )
  }
}
export const AppConsumer = AppContext.Consumer
