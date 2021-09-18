const fs = require("fs");

const path = require("path");

const createJSON = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let directoryPath = path.join(__dirname, "output"); //for absolute path from the home directory
      fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
          reject(err);
        } else {
          let fileName = [];
          for (let i = 0; i < 10; i += 1) {
            let name = Math.random().toString(36).substring(2, 6) + ".json";~
            fileName.push(name);
          }
          let arr = [];
          fileName.map((name) => {
            let filePath = path.join(__dirname, "output", name);
            return fs.writeFile(
              filePath,
              JSON.stringify({ name: "kkj" }),
              "utf8",
              (err) => {
                if (err) {
                  reject(err);
                } else {
                  arr.push(filePath);
                  if (arr.length == fileName.length) {
                    resolve(arr);
                  }
                }
              }
            );
          });
        }
      });
    }, 2000);
  });
};
const deleteJSON = (PathofArray) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let arr = [];
      PathofArray.forEach((arrayOfPath) => {
        fs.exists(arrayOfPath, (exist) => {
          if (!exist) {
            reject(new Error("file doesnot exist"));
          } else {
            fs.unlink(arrayOfPath, (err) => {
              if (err) {
                if (arr.length > 0) {
                  console.log("files deleted at " + arr);
                }
                reject(err);
              } else {
                arr.push(arrayOfPath);
                if (arr.length == PathofArray.length) {
                  resolve(arr);
                }
              }
            });
          }
        });
      });
    }, 2000);
  });
};

module.exports = { createJSON, deleteJSON };
