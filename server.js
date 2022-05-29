// jshint esversion: 8
const express = require('express');
const app = express();
const port = process.env.PORT;
// const port = "https://portal-service-tracker.herokuapp.com/";
const https = require('https');
const database = require("./db.json");
const cors = require('cors');
const fs = require("fs");


app.use(cors());
app.use(express.json());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.use(express.urlencoded({
  extended: true
}));

console.log("newbie");

app.get("/testing", function(request, response) {
  // response.header("Access-Control-Allow-Origin", "*");
  // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(database);
});




// POSTING JSON TO SERVER

app.post("/testing", (request, response) => {
// response.header("Access-Control-Allow-Origin", "*");
// response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

let resData = (request.body);
const jsonString = fs.readFileSync("db.json", "utf8");
const jsonObject = JSON.parse(jsonString);

// console.log("RESDATA" + resData);
console.log("Db.json reading:" +jsonString);
// console.log("JSON OBJECT" + jsonObject);


// PUSH NEW CUSTOMER INTO ARRAY
if (jsonObject.customers) {
jsonObject.customers.push(resData);
} else {
  console.log("Json does not contain customers");
}


// CONVERT jsonObject TO JSON AND WRITE TO DB.JSON
   fs.writeFile("db.json", JSON.stringify(jsonObject, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
     });



     response.status(204).send();

});


 app.listen(port, function() {
  console.log("Server is running on port " + port);
  // console.log(database);
});
