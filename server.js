// jshint esversion:6
const express = require('express');
const app = express();
const port = 3000;
const https = require('https');

app.use(express.urlencoded({
  extended: true
}));

// app.get("/", function(req, res){
//   console.log(request);
// });


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});