class fileDirectory {
  constructor(name){
    this.name = name
    this.parent = null
    this.isDirectory = false
    this.directory = {}
    this.size = 0
  }
  addFile(fileName, fileSize){
    this.directory[fileName] = fileSize
    this.directorySize += +fileSize
    if(this.parentDirectory !== null){
      this.parentDirectory.addSizeToParent(fileSize)
    }
  }
  addSizeToParent(fileSize){
    if(this.parentDirectory !== null){
      this.parentDirectory.directorySize += fileSize
      this.parentDirectory.addSizeToParent(fileSize)
    }
  }
  addDirectory(dir){
    this.directory[dir.name] = dir
  }
}

const fs = require('fs');

let fileDir = new fileDirectory(null)

console.log(fileDir.parentDirectory, fileDir.directorySize, fileDir.directory)

let data = fs.readFile("inputs/day07.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let result = data.split('\n')
    let currentDirectory = fileDir
    result.forEach(ele => {
      
      if(!isNaN(ele.split(' ')[0])){
        let newDir = new fileDirectory(ele.split(' ')[0])
        newDir.size = ele.split(' ')[0]
        fileDir.addFile(newDir)
      }else if(ele.split(' ')[0] === "dir"){
        let newDir = new fileDirectory(ele.split(' ')[1])
        newDir.parent = currentDirectory
        newDir.isDirectory = true
        currentDirectory.addDirectory(newDir)
      }
      
      // else if(ele.split(' ')[0] === "dir"){
      //   addDirectory(ele.split(' ')[1],currentDirectory)
      // }else if(ele.split(' ')[1] === "cd"){
      //   if(ele.split(' ')[2] === '..'){
          
      //   }
      // }
    })
    //console.log(fileDir.parentDirectory, fileDir.directorySize, fileDir.directory)
  });

function addFile(fileName, fileSize, directory){
  directory[fileName] = fileSize
}

function addDirectory(directoryName, directory){
  directory[directoryName] = {}
}

