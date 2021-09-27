const fs = require("fs");

const path = require("path");

let newFilePath = path.join(__dirname, "filenames.txt");
const fileRead = () => {
  return new Promise((resolve, reject) => {
   setTimeout(() => {
    fs.readFile(path.join(__dirname, "lipsum.txt"), "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log("data read success");
        let dataToUpper = data.toUpperCase();
        let filePath = path.join(__dirname, "upperData.txt");
        fs.writeFile(filePath, dataToUpper, "utf-8", (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("converted to uppercase in a newfile");
            fs.appendFile(newFilePath, "upperData.txt\n", "utf-8", (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(filePath);
              }
            });
          }
        });
      }
    }); 
   }, 2000); 
  
  })

.then((upperPath) => {
     return new Promise((resolve,reject)=>{
      fs.readFile(upperPath, "utf-8", (err, data) => {
        if (err) {
          reject(new Error("cant read from upper"));
        } else {
           console.log("read from upper success");
          let lowerData = data
            .toLowerCase()
            .split(". ")
            .reduce((acc, currVal) => {
              return (acc = acc + currVal + "\n");
            }, "");
         // console.log(lowerData);
          let lowerfilePath = path.join(__dirname, "lowerData.txt");
          fs.writeFile(lowerfilePath, lowerData, "utf-8", (err) => {
            if (err) {
              reject(new Error("error writing to lower path"));
            } else {
              fs.appendFile(newFilePath, "lowerData.txt\n", "utf-8", (err) => {
                if (err) {
                  reject(new Error("append lower data to filenames error"));
                } else {
                  resolve(lowerfilePath);
                }
              });
            }
          });
        }
      });
     })
     
    })
   .then((lowerDataPath) => {
      fs.readFile(lowerDataPath, "utf-8", (err, data) => {
        if (err) {
          reject(new Error("cant read data from lower file"));
        } else {
          // console.log(data.split('\n').sort());
          // console.log("read from lower and now sorting")
          let words = data
            .split(" ")
            .sort()
            .reduce((acc, currVal) => {
              return (acc = acc + currVal + "\n");
            }, "");
          let sortFilePath = path.join(__dirname, "sortedfile.txt");
          fs.writeFile(sortFilePath, words, "utf-8", (err) => {
            if (err) {
              reject(new Error('unable to read for sorting the file'))
            } else {
              fs.appendFile(newFilePath, "sortedfile.txt\n", "utf-8", (err) => {
                if (err) {
                  reject(new Error('unable to sort the file'))
                } else {
                  return sortFilePath;
                }
              });
            }
          });
        }
      });
    })
    
    .then((newFilePath) => {
      fs.readFile(newFilePath, "utf-8", (err, data) => {
        if (err) {
          resolve(new Error("read unsuccessful"));
        } else {
          let newData = new Set(data.split("\n"));

          newData.delete("");
          // console.log(newData);
          for (let i of newData) {
            //  console.log(i);
            let pathToDelete = path.join(__dirname, i);
            //  console.log(pathToDelete);
            setTimeout(() => { 
              fs.exists(pathToDelete, (exist) => {
                if (!exist) {
                  reject(new Error("file doesnot exist"));
                } else {
                  fs.unlink(pathToDelete, (err) => {
                    if (err) {
                      reject(new Error("Unable to locate file"))
                    } else {
                   console.log(pathToDelete);
                    }
                  });
                }
              });
            }, 2000);
          }
        }
      });
    });
  }
module.exports = fileRead;
