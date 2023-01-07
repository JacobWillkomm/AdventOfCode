const fs = require('fs');

const checkVisibility = (grid, row, col) => {

  //edge cases
  if(row === 0 || row === grid.length-1 || col === 0 || col === grid[0].length-1){
    return true
  }
  let leftArr = grid[row].slice(0, col)
  let rightArr = grid[row].slice(col+1)

  let verticalArr = grid.map(ele => ele.filter((_, i) => i === col)).flat()
  let topArr = verticalArr.slice(0, row)
  let belowArr = verticalArr.slice(row+1)

  if(Math.max(...leftArr) >= grid[row][col]
  && Math.max(...rightArr) >= grid[row][col]
  && Math.max(...topArr) >= grid[row][col]
  && Math.max(...belowArr) >= grid[row][col]){
    return false
  }else{
    return true
  }
}


let data = fs.readFile("inputs/day08.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let grid = []
    data.trim().split('\n').forEach(row => {
      grid.push(row.split(''))
    })
    let rows = grid.length
    let columns = grid[0].length
    let numVisTrees = 0

    for(let col = 0; col < columns; col++){
      for(let row = 0; row < rows; row++){
        //console.log("col: ", col, " row: ", row, grid[col][row], checkVisibility(grid, col, row))
        if(checkVisibility(grid, col, row)){
          numVisTrees++
        }
      }

    }

    console.log(numVisTrees)

  });