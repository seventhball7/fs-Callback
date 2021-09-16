const ires = require("../problem2");

const cb = (err, upperDatafilePath) => {
  if (err) {
    console.log(err);
  } else {
    console.log("file converted to upper case in " + upperDatafilePath);
    ires.toLowerData(upperDatafilePath, (err, lowerDataFilePath) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file converted to lower case in " + lowerDataFilePath);
        ires.sortedFile(lowerDataFilePath, (err, sortedFilePath) => {
          if (err) {
            console.error(err);
          } else {
            console.log("file sorted in " + sortedFilePath);
            ires.deleteFiles((err,pathtoDelete)=>{
              if(err){
                console.error(err);
              }
              else{
                console.log("path deleted successfully from "+ pathtoDelete)
              }
            });
          }
        });
      }
    });
  }
};

ires.fileRead(cb);
