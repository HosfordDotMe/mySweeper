/**
 * 9x9 grid
 */

const Game = {
  rootElement: '.game',
  markedCellColor: 'gray',
  numRows: 9,
  numCols: 9,
  cellWidth: 40,
  cellHeight: 40,
  numMines: 10,
  grid: [],
  mines: [],
  numCreatedMines: 0,
  init() {
    this.cacheDOM();
    this.makeGrid();
    this.makeMines();
    this.render();
  },
  cacheDOM() {
    this.root = document.querySelector(this.rootElement);
    this.gridOutput = this.root.querySelector('.grid');
  },
  makeGrid() {
    this.grid = new Array(this.numRows);
    for(let i = 0; i < this.numRows; i += 1) {
      this.grid[i] = new Array(this.numCols);
      for(let j =0; j < this.numCols; j += 1) {
        this.grid[i][j] = new Cell(this.cellHeight, this.cellWidth, this.color, this.makeMines());
      }
    }
  },
  makeMines() {
    while (this.numCreatedMines < this.numMines) {
      let immaMine = false;
      if (Math.random()>0.6) {
        immaMine = true;
        this.numCreatedMines += 1;
      }
      return immaMine;
    }
  },
  mineCheck(rowIndex, colIndex) {
    const cell = this.grid[rowIndex][colIndex];
    if (cell.mine === true ) {
      console.log('BOOOOOOM!');
    }
    // console.log(cell);
    //if

  },
  render() {
    this.gridOutput.innerHTML = '';

    this.grid.forEach((row, rowIndex) => {
      const rowContainer = document.createElement('div');
      rowContainer.style.height = `${this.cellHeight}px`;
      row.forEach((cell, colIndex) => {
        const element = cell.toHTML();
        element.addEventListener('click', () => this.mineCheck(rowIndex, colIndex));
        rowContainer.appendChild(element);
      });
      this.gridOutput.appendChild(rowContainer);
    });

  }

};
Game.init();
