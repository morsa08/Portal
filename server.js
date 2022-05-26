// jshint esversion: 8
const express = require('express');
const app = express();
const port = "https://git.heroku.com/portal-service-tracker.git";
const https = require('https');
const database = require("./db.json");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.use(express.urlencoded({
  extended: true
}));

app.get("/testing", function(request, response) {
  response.json(database);
});




// POSTING JSON TO SERVER

app.post("/testing", (request, response) => {

let resData = (request.body);
// console.log(resData);

const jsonString = fs.readFileSync("db.json", "utf8");
const jsonObject = JSON.parse(jsonString);

// PUSH NEW CUSTOMER INTO ARRAY
if (jsonObject.customers) {
jsonObject.customers.push(resData);
}


// CONVERT jsonObject TO JSON AND WRITE TO DB.JSON
   fs.writeFile("db.json", JSON.stringify(jsonObject, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
    });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
  // console.log(database);
});
