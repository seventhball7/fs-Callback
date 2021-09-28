const fs = require("fs").promises;
const path = require("path");

let newFilePath = path.join(__dirname, "filenames.txt");

const fileRead = () => {
  let readLipsumFilePath = path.join(__dirname, "lipsum.txt");
  fs.readFile(readLipsumFilePath, "utf-8")
    .then((data) => {
      let dataToUpperCase = data.toUpperCase();
      let upperDataFilePath = path.join(__dirname, "upperCaseData.txt");
      fs.appendFile(newFilePath, "upperCaseData.txt\n");
      fs.writeFile(upperDataFilePath, dataToUpperCase);
      return dataToUpperCase;
    })
    .then((upperCasedata) => {
      let dataTolowerCase = upperCasedata.toLowerCase();
      let lowerDataFilePath = path.join(__dirname, "lowercasedata.txt");
      fs.appendFile(newFilePath, "lowercasedata.txt\n");
      fs.writeFile(lowerDataFilePath, dataTolowerCase);
      return dataTolowerCase;
    })
    .then((lowerCasedata) => {
      let sortedData = lowerCasedata.split(" ").sort().join(" ");
      let sortedDataFilePath = path.join(__dirname, "sortedata.txt");
      fs.appendFile(newFilePath, "sortedata.txt\n");
      fs.writeFile(sortedDataFilePath, sortedData);
    })
    .then(()=>{
      fs.readFile(newFilePath,'utf-8')
      .then((data)=>{
        data=data.split('\n');
        data.pop();
        for(let convertedFiles of data){
          let pathToDelete=path.join(__dirname,convertedFiles);
          // fs.unlink(pathToDelete)
          // .then(()=>{
          //   console.log("files deleting")
          // })
        }  
      })
    })
    .catch((err)=>{
      console.log(err);
    })


  
}

module.exports = { fileRead };
