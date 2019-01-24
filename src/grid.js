import boards from './boardsConfig.js'

export let createGrid = ({ height, width, mines }) => {
  const cell = (i, j) => ({
    x: i,
    y: j,
    hasMine: false,
    isEmpty: false,
    isRevealed: false,
    isLosingCell: false,
    hasIcon: null, // flag, question
    neighbours: 0,
  })

  const grid = Array(width)
    .fill(0)
    .map((_, i) =>
      Array(height)
        .fill(0)
        .map((_, j) => cell(i, j))
    )

  placeMines(grid, mines, height, width)
  getNeighbouringMines(grid, height, width)
  return grid
}

let placeMines = (gridArr, mines, height, width) => {
  let minesPlaced = 0
  while (minesPlaced < mines) {
    const randomx = Math.floor(Math.random() * width)
    const randomy = Math.floor(Math.random() * height)
    if (!gridArr[randomx][randomy].hasMine) {
      gridArr[randomx][randomy].hasMine = true
      minesPlaced++
    }
  }
  return gridArr
}

let getNeighbouringMines = (data, height, width) => {
  let updatedData = data
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (data[i][j].hasMine !== true) {
        let mines = 0
        const area = getNeighbouringCells(
          data[i][j].x,
          data[i][j].y,
          data,
          height,
          width
        )
        area.forEach(value => {
          if (value.hasMine) {
            mines++
          }
        })
        if (mines === 0) {
          updatedData[i][j].isEmpty = true
        }
        updatedData[i][j].neighbours = mines
      }
    }
  }
  return updatedData
}

let getNeighbouringCells = (x, y, data, height, width) => {
  const coordinates = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y + 1],
    [x + 1, y - 1],
  ]

  const filteredCoordinates = coordinates.filter(
    coord =>
      coord[0] >= 0 && coord[0] < height && coord[1] >= 0 && coord[1] < width
  )

  return filteredCoordinates.map(coord => data[coord[0]][coord[1]])
}

// https://alligator.io/js/flat-flatmap
export let getHiddenCells = grid =>
  grid.map(row => row.filter(item => !item.isRevealed)).flat()

export let revealEmptyCells = (x, y, grid, level) => {
  let cells = getNeighbouringCells(
    x,
    y,
    grid,
    boards[level].height,
    boards[level].width
  )

  cells.forEach(cell => {
    if (!cell.hasIcon && !cell.isRevealed && (cell.isEmpty || !cell.hasMine)) {
      grid[cell.x][cell.y].isRevealed = true

      if (cell.isEmpty) {
        revealEmptyCells(cell.x, cell.y, grid, level)
      }
    }
  })
}

export let cloneGrid = grid => JSON.parse(JSON.stringify(grid))

export let placeFlag = ({ grid, mines }, { x, y }) => {
  let column = cloneGrid(grid[x])

  if (column[y].hasIcon === 'question') {
    column[y].hasIcon = null
  } else if (column[y].hasIcon === 'flag') {
    column[y].hasIcon = 'question'
    mines++
  } else {
    column[y].hasIcon = 'flag'
    mines--
  }

  return {
    grid: [...grid.slice(0, x), column, ...grid.slice(x + 1)],
    mines,
  }
}

export let reveal = (state, { x, y, hasMine, isEmpty }) => {
  let grid = cloneGrid(state.grid)
  let status = 'isPlaying'
  let mood = 'isHappy'

  if (hasMine) {
    grid.map(column => column.map(cell => (cell.isRevealed = true)))
    grid[x][y].isLosingCell = true
    status = 'hasLost'
    mood = 'isDead'
  } else if (isEmpty) {
    revealEmptyCells(x, y, grid, state.level)
    grid[x][y].isRevealed = true
  } else {
    grid[x][y].isRevealed = true
  }

  if (getHiddenCells(grid).length === state.mines) {
    status = 'hasWon'
    mood = 'isCool'
  }

  return {
    status,
    grid,
    mood,
  }
}

export let initialise = (level = 'beginner') => ({
  grid: createGrid(boards[level]),
  mines: boards[level].mines,
  mood: 'isHappy',
  status: 'isStart',
  time: 0,
  level,
})
