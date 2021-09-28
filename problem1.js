const fs = require("fs").promises;

const path = require("path");

const createJSON = () => {
  let directoryPath = path.join(__dirname, "output");
  fs.mkdir(directoryPath, { recursive: true })
  .then(() => {
    let fileName = [];
    for (let i = 0; i < 10; i += 1) {
      let name = Math.random().toString(36).substring(2, 6) + ".json";
      fileName.push(name);
    }
    fileName.map((name) => {
      let filePath = path.join(__dirname, "output", name);
      fs.writeFile(
        filePath,
        JSON.stringify({ name: "India", region: "Asia" })
      ).then(() => {
        console.log("files creating");
         fs.unlink(filePath)
        // .then(()=>{
        //   console.log("files deleting")
        // })
      });
    });
  });
};

module.exports = {createJSON };
