export const state = () => ({
  grid: [], // [y, x] - 0/1, queen exists or not
  gridStatus: [], // [y, x] - 0: none, 1: error, 2: clear
  gridBeam: [], // [y, x, d] - 0/1, queen's beam reached or not
  selectedRow: 0,
  selectedColumn: 0,
  width: 8,
  height: 8
})

function initialGrid(h, w) {
  const grid = []
  for (let r = 0; r < h; r++) {
    const row = []
    for (let c = 0; c < w; c++) {
      const v = 0
      row.push(v)
    }
    grid.push(row)
  }
  return grid
}

function initialGridBeam(h, w) {
  const D = 8
  const grid = []
  for (let r = 0; r < h; r++) {
    const row = []
    for (let c = 0; c < w; c++) {
      const v = []
      for (let d = 0; d < D; d++) {
        v.push(0)
      }
      row.push(v)
    }
    grid.push(row)
  }
  return grid
}

function copyGrid(_grid, h, w) {
  const grid = []
  for (let r = 0; r < h; r++) {
    const row = []
    for (let c = 0; c < w; c++) {
      row.push(_grid[r][c])
    }
    grid.push(row)
  }
  return grid
}

function calcGridStatus(_grid, h, w) {
  const grid = _grid
  const gridStatus = initialGrid(h, w)
  // U,R,D,L,UR,DR,DL,UL
  const dys = [-1, 0, 1, 0, -1, 1, 1, -1]
  const dxs = [0, 1, 0, -1, 1, 1, -1, -1]

  let count = 0
  let isError = false

  // エラー判定
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (grid[r][c] === 1) {
        count += 1
        for (let d = 0; d < dys.length; d++) {
          const dy = dys[d]
          const dx = dxs[d]
          let rr = r
          let cc = c
          while (true) {
            rr += dy
            cc += dx
            if (!(rr >= 0 && rr < h && cc >= 0 && cc < w)) break
            if (grid[rr][cc] === 1) {
              // 干渉するものがあればエラー
              gridStatus[r][c] = 1
              isError = true
              break
            }
          }
        }
      }
    }
  }

  // エラーが無く、十分な個数がある場合はクリア
  if (count === h && !isError) {
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        gridStatus[r][c] = 2
      }
    }
  }

  return gridStatus
}

function calcGridBeam(_grid, h, w) {
  const grid = _grid
  const gridBeam = initialGridBeam(h, w)

  // U,R,D,L,UR,DR,DL,UL
  const dys = [-1, 0, 1, 0, -1, 1, 1, -1]
  const dxs = [0, 1, 0, -1, 1, 1, -1, -1]

  // ビーム判定
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (grid[r][c] === 1) {
        for (let d = 0; d < dys.length; d++) {
          const dy = dys[d]
          const dx = dxs[d]
          let rr = r
          let cc = c
          while (true) {
            rr += dy
            cc += dx
            if (!(rr >= 0 && rr < h && cc >= 0 && cc < w)) break
            gridBeam[rr][cc][d] = 1
            if (grid[rr][cc] === 1) {
              // 干渉するものがあれば止める
              break
            }
          }
        }
      }
    }
  }

  return gridBeam
}

export const mutations = {
  initialize(state) {
    this.commit('resetGrid')
  },
  selectCell(state, data) {
    state.selectedRow = data.r
    state.selectedColumn = data.c
  },
  changeCell(state) {
    const r = state.selectedRow
    const c = state.selectedColumn
    const grid = copyGrid(state.grid, state.height, state.width)
    if (grid[r][c] === 0) {
      grid[r][c] = 1
    } else {
      grid[r][c] = 0
    }
    state.grid = grid
    this.commit('updateStatus')
  },
  resetGrid(state) {
    state.grid = initialGrid(state.height, state.width)
    this.commit('updateStatus')
  },
  moveCell(state, data) {
    const dy = data.dy
    const dx = data.dx
    const rr = state.selectedRow + dy
    const cc = state.selectedColumn + dx
    if (rr >= 0 && rr < state.height && cc >= 0 && cc < state.width) {
      state.selectedRow = rr
      state.selectedColumn = cc
    }
  },
  updateStatus(state) {
    state.gridStatus = calcGridStatus(state.grid, state.height, state.width)
    state.gridBeam = calcGridBeam(state.grid, state.height, state.width)
  }
}
