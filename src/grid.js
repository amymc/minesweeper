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

export let getNeighbouringCells = (x, y, data, height, width) => {
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
