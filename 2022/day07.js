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

    //TODO, filter directory and get size
    //use Depth First Search
    let stack = []
    stack.push(fileDir)
    let totalSize = 0
    console.log(fileDir)

    while(stack.length > 0){
      let currentNode = stack.pop()
      if(currentNode.isDirectory){
        for(const dirName of Object.values(currentNode.directory)){
          stack.push(dirName)
        }
      }
      
      if(currentNode.isDirectory && currentNode.size <= 100000){
        console.log(currentNode.name, currentNode.size)
        totalSize += currentNode.size
      }
    }
    console.log(totalSize)




});

