const fs = require("fs");
const path = require("path");

let newFilePath = path.join(__dirname, "filenames.txt");
const fileRead = (cb) => {
  fs.readFile(path.join(__dirname, "lipsum.txt"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      console.log("data read success");
      let dataToUpper = data.toUpperCase();

      let filePath = path.join(__dirname, "upperData.txt");
      fs.writeFile(filePath, dataToUpper, "utf-8", (err) => {
        if (err) {
          console.error(err);
        } else {
          //console.log("converted to uppercase in a newfile");
          fs.appendFile(newFilePath, "upperData.txt\n", "utf-8", (err) => {
            if (err) {
              cb(err);
            } else {
              cb(null, filePath);
            }
          });
        }
      });
    }
  });
};
const toLowerData = (upperPath, cb) => {
  fs.readFile(upperPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // console.log("read from upper success");
      let lowerData = data
        .toLowerCase()
        .split(". ")
        .reduce((acc, currVal) => {
          return (acc = acc + currVal + "\n");
        }, "");
      //console.log(lowerData);
      let lowerfilePath = path.join(__dirname, "lowerData.txt");
      fs.writeFile(lowerfilePath, lowerData, "utf-8", (err) => {
        if (err) {
          console.error(err);
        } else {
          fs.appendFile(newFilePath, "lowerData.txt\n", "utf-8", (err) => {
            if (err) {
              cb(err);
            } else {
              cb(null, lowerfilePath);
            }
          });
        }
      });
    }
  });
};
const sortedFile = (lowerDataPath, callback) => {
  fs.readFile(lowerDataPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
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
          console.error(err);
        } else {
          fs.appendFile(newFilePath, "sortedfile.txt\n", "utf-8", (err) => {
            if (err) {
              cb(err);
            } else {
              callback(null, sortFilePath);
            }
          });
        }
      });
    }
  });
};
const deleteFiles = (cb) => {
  fs.readFile(newFilePath, "utf-8", (err, data) => {
    if (err) {
      console.log("read unsuccessful");
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
              console.log("file doesnot exist");
            } else {
              fs.unlink(pathToDelete, (err) => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, pathToDelete);
                }
              });
            }
          });
        }, 2000);
       
      }
    }
  });
};
module.exports = { fileRead, toLowerData, sortedFile, deleteFiles };
