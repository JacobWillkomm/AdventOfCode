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

const calculateScenicScore = (grid, row, col) => {
  //edge cases
  if(row === 0 || row === grid.length-1 || col === 0 || col === grid[0].length-1){
    return 0
  }

  let value = grid[row][col]
  let leftArr = grid[row].slice(0, col)
  let rightArr = grid[row].slice(col+1)

  let verticalArr = grid.map(ele => ele.filter((_, i) => i === col)).flat()
  let topArr = verticalArr.slice(0, row)
  let belowArr = verticalArr.slice(row+1)

  let leftScore = checkScenicScore(value, leftArr.reverse())
  let rightScore = checkScenicScore(value, rightArr)
  let topScore = checkScenicScore(value, topArr.reverse())
  let belowScore = checkScenicScore(value, belowArr)

  return leftScore * rightScore * topScore * belowScore

}

const checkScenicScore = (value, arr) => {
  let i = 0
  while(value > arr[i] && i < (arr.length - 1)){
    i++
  }
  return i + 1
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
    let scenicScore = 0

    for(let col = 0; col < columns; col++){
      for(let row = 0; row < rows; row++){
        if(checkVisibility(grid, col, row)){
          numVisTrees++
        }
        scenicScore = Math.max(scenicScore, calculateScenicScore(grid, col, row))
      }

    }
    console.log(numVisTrees, scenicScore)

  });