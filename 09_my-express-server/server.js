const express = require("express");
const app = express();

app.get("/", function(request, response){
response.send("<h1><strong>Hello</strong></h1>")
})

app.get("/contact", function(request, response){
  response.send("Contact me at bijil.subhash@gmail.com")
})

app.get("/about", function(request, response){
  response.send("My name is Bijil Subhash!")
})
app.listen(3000, function(){
  console.log("Server has started");
})
