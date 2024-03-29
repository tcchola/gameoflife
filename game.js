let grid, cols, rows;
let res = 10;

function make2DArray(cols, rows) {
  let array = new Array(cols);

  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function setup() {
  createCanvas(1000, 500);
  cols = width / res;
  rows = height / res;
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;

      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, res - 1, res - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  //compute the next generation based on the last grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);
      let state = grid[i][j];

      //RULES OF THE GAME
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y]; //do not count my own cell
  return sum;
}
