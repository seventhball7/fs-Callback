const fs = require("fs");
const path = require("path");

const createJSON = (cb) => {
  let directoryPath = path.join(__dirname, "output"); //for absolute path from the home directory
  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
      return cb(err);
    } else {
      let fileName = [];
      for (let i = 0; i < 10; i += 1) {
        let name = Math.random().toString(36).substring(2, 6) + ".json";
        // console.log(name);
        fileName.push(name);
      }
      fileName.map((name) => {
        let filePath = path.join(__dirname, "output", name);
        return fs.writeFile(
          filePath,
          JSON.stringify('"name":"kkj"'),
          "utf8",
          (err) => {
            if (err) {
              cb(err);
            } else {
              //console.log(filePath)
              cb(null, filePath);
            }
          }
        );
      });
    }
  });
};
const deleteJSON = (path, cb) => {
  setTimeout(() => {
    fs.exists(path, (exist) => {
      if (!exist) {
        cb(new Error("file doesnot exist"));
      } else {
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(null, path);
          }
        });
      }
    });
  },2000);
};
module.exports = { createJSON, deleteJSON };
