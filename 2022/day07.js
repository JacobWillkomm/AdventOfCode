const fs = require('fs');

class fileDirectory {
  constructor(name){
    this.name = name
    this.parent = null
    this.isDirectory = false
    this.directory = {}
    this.size = 0
  }
  addFile(dir){
    this.directory[dir.name] = dir
    this.size += +dir.size
    if(this.parent !== "root"){
      this.parent.addSizeToParent(dir.size)
    }
  }
  addSizeToParent(fileSize){
    this.size += fileSize
    if(this.parent !== "root"){
      this.parent.addSizeToParent(fileSize)
    }
  }
  addDirectory(dir){
    this.directory[dir.name] = dir
  }
}

//initialize root directory
let fileDir = new fileDirectory('/')
fileDir.isDirectory = true
fileDir.parent = "root"

//Build directory from input
let data = fs.readFile("inputs/day07.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let result = data.split('\n')
    let currentDirectory = fileDir
    result.forEach(ele => {
      let command = ele.split(' ')
      
      if(!isNaN(command[0])){
        //add file to directory
        let newDir = new fileDirectory(command[1])
        newDir.size = +command[0]
        currentDirectory.addFile(newDir)
      }else if(command[0] === "dir"){
        //add directory to directory
        let newDir = new fileDirectory(command[1])
        newDir.parent = currentDirectory
        newDir.isDirectory = true
        currentDirectory.addDirectory(newDir)
      }else if(command[1] === "cd"){
        //change directory
        if(command[2] === '/'){
          //ignore root
        }
        else if(command[2] === '..'){
          //move up 1 directory
          currentDirectory = currentDirectory.parent
        }else{
          //move down into directory
          currentDirectory = currentDirectory.directory[command[2]]
        }
      }
    })

    //Solutions:
    let stack = []
    stack.push(fileDir)

    let part1Size = 0
    let deleteOptions = []
    let totalSize = fileDir.size
    let maxSize = 70000000
    let neededUpdateSpace = 30000000
    let unusedSpace = maxSize - totalSize
    let neededSpace = neededUpdateSpace - unusedSpace

    //Breadth First Search
    while(stack.length > 0){
      let currentNode = stack.pop()
      if(currentNode.isDirectory){
        //add children to queue
        for(const dirName of Object.values(currentNode.directory)){
          stack.push(dirName)
        }
        //part1 logic
        if(currentNode.size <= 100000){
          part1Size += currentNode.size
        }
        //part2 logic
        if(currentNode.size >= neededSpace){
          deleteOptions.push(currentNode)
        }
      }
    }
    deleteOptions.sort((a, b) => a.size - b.size)
    console.log(part1Size, deleteOptions[0].size)
});

