const ires = require("../problem1");

const res = (err, path) => {
  if (err) {
    console.log("Error");
    console.error(err);
  } else {
    console.log("Success");
    ires.deleteJSON(path,(err,pathtoDelete)=>{
      if(err){
        console.error(err);
      }
      else{
        console.log("deleted");
        console.log(pathtoDelete);
      }
    });
   console.log(path);
  }
};

ires.createJSON(res);

