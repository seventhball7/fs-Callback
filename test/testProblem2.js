const ires = require("../problem2");

ires
  .fileRead()
  .then((data) => {
    console.log("file path of lipsum data " + data);
    return ires.toUpperCase(data);
})
.then((convertedUpperDataPath)=>{
  console.log("converted to upper case at " +convertedUpperDataPath)
  return ires.toLowerCase(convertedUpperDataPath);
})
.then((convertedLowerDataPath)=>{
  console.log("converted to lower case at "+ convertedLowerDataPath);
  return ires.sortTheFile(convertedLowerDataPath)
})
.then((sortedFilePath)=>{
  console.log("sorted the files at "+ sortedFilePath)
})

.catch((errors)=>{
  console.log(errors)
})

  // ires.deleteAllFiles()
  // .then((data)=>{
  //  console.log("files deleted from "+ data);
  // })
  


