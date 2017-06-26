/**
 * 9x9 grid
 */

const Game = {
  rootElement: '.game',
  numRows: 9,
  numCols: 9,
  cellWidth: 42,
  cellHeight: 42,
  numMines: 10,
  grid: [],
  mines: [],
  adjacent: [],
  init() {
    this.cacheDOM();
    this.makeGrid();
    this.makeMines();
    this.render();
    this.countMines();
  },
  cacheDOM() {
    this.root = document.querySelector(this.rootElement);
    this.gridOutput = this.root.querySelector('.grid');
  },
  makeGrid() {
    this.grid = new Array(this.numRows);
    for (let i = 0; i < this.numRows; i += 1) {
      this.grid[i] = new Array(this.numCols);
      for (let j = 0; j < this.numCols; j += 1) {
        const mineLevel = Math.random();
        this.grid[i][j] = new Cell(this.cellHeight, this.cellWidth, this.color, mineLevel);
      }
    }
  },
  makeMines() {
    const mineMark = this.gradeCells();
    this.grid.forEach((row, rowIndex) => {
      const rowContainer = document.createElement('div');
      rowContainer.style.height = `${this.cellHeight}px`;
      row.forEach((cell, colIndex) => {
        if (cell.mineLevel > mineMark) {
          cell.mine = true;
          this.mines = this.mines.concat([
            [rowIndex, colIndex]
          ]);
        }
      });
    });
  },
  countMines() {
    const adjacentChecks = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    let adjacentCells = [];
    this.mines.forEach((mine) => {
      adjacentChecks.forEach((check) => {
        adjacentCells = adjacentCells.concat([
          [mine[0] + check[0], mine[1] + check[1]]
        ]);
      });
    });
    adjacentCells.forEach((cell) => {
      if (cell[0] > -1 && cell[0] < 9 && cell[1] > -1 && cell[1] < 9) {
        const target = this.grid[cell[0]][cell[1]];
        target.neighbors = target.neighbors + 1;
      }
    });
  },
  cascade(rowIndex, colIndex) {
    /**
     * This is going to require more than these hard coded values
     *
     */
    const adjacentChecks = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    let adjacentCells = [];
    adjacentChecks.forEach((check) => {
      adjacentCells = adjacentCells.concat([
        [rowIndex + check[0], colIndex + check[1]]
      ]);
    });
    adjacentCells.forEach((cell) => {
      if (cell[0] > -1 && cell[0] < 9 && cell[1] > -1 && cell[1] < 9) {
        const element = this.grid[cell[0]][cell[1]];
        element.color = 'white';
      }
    });
    this.render();
  },
  gradeCells() {
    const mineLevels = [];
    this.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        mineLevels.push(cell.mineLevel);
      });
    });
    mineLevels.sort(function(a, b) {
      return b - a;
    });
    return mineLevels[10];
  },
  mineCheck(rowIndex, colIndex) {
    const cell = this.grid[rowIndex][colIndex];
    //const element = cell.toHTML();
    if (cell.mine) {
      cell.color = 'red';
      this.removeColor();
      this.render(true);
    } else {
      cell.color = 'white';
      if (cell.neighbors === 0) {
        this.cascade(rowIndex, colIndex);
      }
      this.render();
    }
  },
  removeColor() {
    this.grid.forEach((row, rowIndex) => {
      const rowContainer = document.createElement('div');
      rowContainer.style.height = `${this.cellHeight}px`;
      row.forEach((cell, colIndex) => {
        if (cell.mine) {
          cell.color = 'red';
        } else {
          cell.color = 'white';
        }

      });
    });
  },
  render(gameOver) {
    this.gridOutput.innerHTML = '';

    this.grid.forEach((row, rowIndex) => {
      const rowContainer = document.createElement('div');
      rowContainer.style.height = `${this.cellHeight}px`;
      row.forEach((cell, colIndex) => {
        const element = cell.toHTML();
        if (cell.color === 'white' && cell.neighbors > 0) {
          element.innerHTML = cell.neighbors;
          element.style.verticalAlign = 'top';
        }
        if (!gameOver) {
          element.addEventListener('click', () => this.mineCheck(rowIndex, colIndex));
        }
        rowContainer.appendChild(element);
      });
      this.gridOutput.appendChild(rowContainer);
    });
  }
};
Game.init();
