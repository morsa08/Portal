// jshint esversion: 8
const express = require('express');
const app = express();
const port = 3001;
// const port = "https://portal-service-tracker.herokuapp.com/";
const https = require('https');
const fs = require("fs");

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));




app.get("/", function(request, response) {
  const db = fs.readFileSync("./db.json");
  const database = JSON.parse(db);
  response.json(database);
});




// POSTING JSON TO SERVER

app.post("/", (request, response) => {
  let resData = (request.body);
  const jsonString = fs.readFileSync("db.json", "utf8");
  const jsonObject = JSON.parse(jsonString);

  // console.log("RESDATA" + resData);
  console.log("Db.json reading:" + jsonString);
  // console.log("JSON OBJECT" + jsonObject);


  // PUSH NEW CUSTOMER INTO ARRAY
  if (jsonObject.customers) {
    jsonObject.customers.push(resData);
    // CONVERT jsonObject TO JSON AND WRITE TO DB.JSON
    fs.writeFile("db.json", JSON.stringify(jsonObject, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });

  } else {
    console.log("Json does not contain customers");
  }


  Response.redirect("https://walrus-app-ivd34.ondigitalocean.app/service.html");
});


app.listen(port, function() {
  console.log("Https server is running on port " + port);
  // console.log(database);
});
