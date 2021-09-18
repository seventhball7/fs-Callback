const ires = require("../problem1");

ires
  .createJSON()
  .then((data) => {
    console.log("files created are  " + data);
    return ires.deleteJSON(data);
  })
  .then((result) => {
    console.log("\n")
    console.log("files deleted at  " + result);
  })
  .catch((err) => {
    console.log(err);
  });
