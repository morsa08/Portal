// jshint esversion:6
const express = require('express');
const app = express();
const port = 3000;

app.get("/", function(request, response){
  console.log(request);
});
