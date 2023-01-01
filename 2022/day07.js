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
    if(this.parent !== "root"){
      this.parent.size += fileSize
      this.parent.addSizeToParent(fileSize)
    }
  }
  addDirectory(dir){
    this.directory[dir.name] = dir
  }
}

const fs = require('fs');

let fileDir = new fileDirectory('/')
fileDir.isDirectory = true
fileDir.parent = "root"

console.log(fileDir.name, fileDir.parent, fileDir.size, fileDir.directory)

let data = fs.readFile("inputs/day07.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let result = data.split('\n')
    let currentDirectory = fileDir
    result.forEach(ele => {
      let command = ele.split(' ')
      
      if(!isNaN(command[0])){
        let newDir = new fileDirectory(command[1])
        newDir.size = +command[0]
        currentDirectory.addFile(newDir)
      }else if(command[0] === "dir"){
        let newDir = new fileDirectory(command[1])
        newDir.parent = currentDirectory
        newDir.isDirectory = true
        currentDirectory.addDirectory(newDir)
      }else if(command[1] === "cd"){
        if(command[2] === '/'){
        }
        else if(command[2] === '..'){
          currentDirectory = currentDirectory.parent
        }else{
          currentDirectory = currentDirectory.directory[command[2]]
        }
      }
    })
    console.log(fileDir.name, fileDir.size, fileDir.directory)
  });

