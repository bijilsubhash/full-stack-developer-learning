const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var path = require('path');
var partials = require('express-partials');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(partials());

let items = [];
let newWorkList = [];
let listTitle = "";

app.get("/", (req, res) => {
  listTitle = "Home";
  var date = new Date();
  let options = {
    day: "numeric",
    weekday: "long",
    month: "long"
  };
  let day = date.toLocaleDateString("en-us", options);
  res.render("list", {
    kindOfday: day,
    newListItem: items,
    listTitle: listTitle
  });
})

app.post("/", (req, res) => {
  if (listTitle === "Work") {
    let item = req.body.clientInput;
    newWorkList.push(item);
    res.redirect("/work");
  } else {
    let item = req.body.clientInput;
    items.push(item);
    res.redirect("/");
    console.log(req);
  }
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.get("/work", (req, res) => {
  listTitle = "Work";
  let date = new Date();
  let options = {
    day: "numeric",
    weekday: "long",
    month: "long"
  };
  let day = date.toLocaleDateString("en-us", options);
  res.render("list", {
    kindOfday: day,
    newListItem: newWorkList,
    listTitle: listTitle
  });
})

app.listen(process.env.PORT || 3000, (request, response) => {
  console.log("Server is running");
})
