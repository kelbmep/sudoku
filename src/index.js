module.exports = function solveSudoku(matrix) {
  let freeSpaces = getFreeSpaces(matrix);
  let i = 0;
  while (i < freeSpaces.length) {
    let rows = freeSpaces[i][0];
    let cols = freeSpaces[i][1];
    let value = matrix[rows][cols] + 1;
    let isFound = false;
    while(!isFound && value <= 9) {
      if(checkAll(matrix, rows, cols, value)) {
        matrix[rows][cols] = value;
        isFound = true;
        i++;
      }
      else
        value++;    
    }
    if(!isFound) {
      matrix[rows][cols] = 0;
      i--;
    }
  }
  return matrix;
};

function getFreeSpaces(matrix) {
  let freeSpaces = [];
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (matrix[i][j] === 0)
        freeSpaces.push([i, j]);
  return freeSpaces;
};

function checkAll(matrix, row, column, value) {
  return checkRow(matrix, row, value) && checkColumn(matrix, column, value) && checkSquare(matrix, row, column, value);
};

function checkRow(matrix, row, value) {
  for (let i = 0; i < 9; i++)
    if (matrix[row][i] === value)
      return false;
  return true;
};

function checkColumn(matrix, column, value) {
  for (let i = 0; i < 9; i++)
    if (matrix[i][column] === value)
      return false;
  return true;
};

function checkSquare(matrix, row, column, value) {
  let squareRow = Math.floor(row / 3) * 3;
  let squareColumn = Math.floor(column / 3) * 3;
  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++)
      if(matrix[squareRow + i][squareColumn + j] === value)        
        return false;
  return true;
};
