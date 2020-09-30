class GameManager {
  constructor() {
    this.currentGameDiffucultyIndex = -1;
    this.gameDifficulty = [
      {
        gridSizeX: 3,
        gridSizeY: 3,
        nTiles: 4,
      },
      {
        gridSizeX: 3,
        gridSizeY: 3,
        nTiles: 5,
      },
      {
        gridSizeX: 4,
        gridSizeY: 4,
        nTiles: 8,
      },
      {
        gridSizeX: 5,
        gridSizeY: 4,
        nTiles: 10,
      },
      {
        gridSizeX: 5,
        gridSizeY: 5,
        nTiles: 12,
      },
      {
        gridSizeX: 6,
        gridSizeY: 5,
        nTiles: 15,
      },
    ];
    this.globalScore = 0;
    this.score = 0;
    this.nAnswers = 0;
    this.currentGridSizeX = 2;
    this.currentGridSizeY = 2;
    this.currentGrid = [];
    this.isClearedWithoutError = true;
  }

  drawGrid = () => {
    const grid = document.getElementById("grid");

    for (let y = 0; y < this.currentGridSizeY; y++) {
      const row = document.createElement("div");
      row.className = "row";
      row.id = `row${y}`;
      for (let x = 0; x < this.currentGridSizeX; x++) {
        const col = document.createElement("div");
        col.className = "col";
        col.id = `col${y}-${x}`;
        col.onclick = () => this.handleCellClick(col, x, y);
        row.appendChild(col);
      }
      grid.appendChild(row);
    }
  };

  destroyGrid = () => {
    let rows = document.getElementsByClassName("row");
    let cols = document.getElementsByClassName("col");

    while (rows.length > 0) {
      rows[0].parentNode.removeChild(rows[0]);
    }

    while (cols.length > 0) {
      cols[0].parentNode.removeChild(cols[0]);
    }
  };

  handleCellClick = (col, x, y) => {
    if (col.className !== 'col') {
      return;
    }

    if (this.currentGrid[y][x] !== 1) {
      col.className = 'col wrong click';
      this.isClearedWithoutError = false;
      this.globalScore -= 1;
    } else {
      if (col.className !== 'col correct') {}
      col.className = 'col correct click';
      this.globalScore += 1;
      this.score += 1;
      if (this.score === this.nAnswers) {
        setTimeout(() => {
          this.markCellsWhite();
          setTimeout(() => this.startOver(), 1200);
        }, 200)
      }
    }
    document.getElementById("score").innerHTML = this.globalScore;
  };

  generateGrid = () => {
    let newGrid = [];
    let locs = getSample(this.currentGridSizeY * this.currentGridSizeX, this.nAnswers);
    for (let y = 0; y < this.currentGridSizeY; y++) {
      let newRow = [];
      for (let x = 0; x < this.currentGridSizeX; x++) {
        newRow.push(0);
      }
      newGrid.push(newRow);
    }

    for (const n of locs) {
      const y = Math.floor(n / this.currentGridSizeX);
      const x = n % this.currentGridSizeX;
      newGrid[y][x] = 1;
    }
    this.currentGrid = newGrid;
  }

  showAnswers = () => {
    for (let y = 0; y < this.currentGridSizeY; y++) {
      for (let x = 0; x < this.currentGridSizeX; x++) {
        let id = `col${y}-${x}`;
        let col = document.getElementById(id);
        if (this.currentGrid[y][x] === 1) {
          col.className = 'col correct';
        }
      }
    }

    setTimeout(() => {
      let cols = document.getElementsByClassName("col");
      for (const col of cols) {
        col.className = "col";
      }
    }, 1500)
  }

  markCellsWhite = () => {
    let cols = document.getElementsByClassName("col");
    for (const col of cols) {
      col.className = "col white";
    }
  }

  startOver = () => {
    if (this.isClearedWithoutError) {
      if (this.currentGameDiffucultyIndex < this.gameDifficulty.length) {
        this.currentGameDiffucultyIndex++;
      }
    } else {
      if (this.currentGameDiffucultyIndex > 0) {
        this.currentGameDiffucultyIndex--;
      }
    }
    this.currentGridSizeX = this.gameDifficulty[
      this.currentGameDiffucultyIndex
    ].gridSizeX;
     this.currentGridSizeY = this.gameDifficulty[
       this.currentGameDiffucultyIndex
     ].gridSizeY;
    this.nAnswers = this.gameDifficulty[
      this.currentGameDiffucultyIndex
    ].nTiles;
     
    this.destroyGrid();
    this.score = 0;
    this.generateGrid();
    this.drawGrid();
    this.showAnswers();
    this.isClearedWithoutError = true;
  }
}

// Util functions

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getSample = (n, a) => {
  let array = [];
  let temp = n - a;
  for (let i = 0; i < n; i++) {
    array.push(i);
  }

  while (temp > 0) {
    array.splice(getRandomInt(n--), 1);
    temp -= 1;
  }
  return array;
}

const toggleModal = (shouldShowModal) => {
  const modalManager = document.getElementsByClassName('modal')[0];
  modalManager.style['display'] = shouldShowModal ? 'flex' : 'none';
}
