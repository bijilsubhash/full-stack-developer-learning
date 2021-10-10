//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

const postSchema = new mongoose.Schema({
  title: String,
  post: String
});
const Post = mongoose.model('Post', postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let articles =[];

app.get("/", (req, res) => {
  Post.find(function(err, docs) {
    if (!err) {
      let articles = [];
      docs.forEach((doc) => {
        let eachPost = {
          title: doc.title,
          post: doc.post
        };
        articles.push(eachPost);
      });
      res.render('home.ejs', {
        homeStartingContent: homeStartingContent,
        posts: articles
      });
    } else {
      console.log("Error");
    }
  });
})


app.get("/posts/:title", (req, res) => {
  let requestedTitle = _.kebabCase(req.params.title);
  Post.find(function (err, docs) {
    docs.forEach((doc) => {
      let postTitle = _.kebabCase(doc.title);
      if(requestedTitle === postTitle) {
        res.render("post.ejs", {
          postTitle: doc.title,
          post: doc.post
        })
      }
    })
  })
})

app.get("/about", (req, res) => {
  res.render('about.ejs', {
    aboutContent: aboutContent
  });
})

app.get("/contact", (req, res) => {
  res.render('contact.ejs', {
    contactContent: contactContent
  });
})

app.get("/compose", (req, res) => {
  res.render('compose.ejs');
})

app.post("/compose", (req, res) => {
  Post.create({title: req.body.title,post: req.body.post})
  .then(function() {
    res.redirect("/");
  })
  .catch(function(err){
    console.log(err);
  });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
