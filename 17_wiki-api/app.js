// requiring node modules
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// calling node modules using express
app.use(bodyParser.urlencoded({
  extended: false
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//initializing mongodb server
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const wikiSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Wiki = mongoose.model('Article', wikiSchema);

app.route("/articles")

  .get((req, res) => {
    Wiki.find((error, docs) => {
      if (!error) {
        res.send(docs);
      } else {
        console.log(error);
      }
    })
  })

  .post((req, res) => {
    Wiki.create({
        title: req.body.title,
        content: req.body.content
      })
      .then((result) => {
        res.send("Successfully added a new entry")
      })
      .catch((error) => {
        res.send(error);
      })
  })

  .delete((req, res) => {
    Wiki.deleteOne({
      title: req.body.title
    }, function(error) {
      if (!error) {
        res.send("Successfully deleted");
      } else {
        console.log(error)
      }
    });
  });

app.route("/articles/:path")

  .get((req, res) => {
    Wiki.findOne({
      title: req.params.path
    }, function(err, article) {
      if (!err) {
        res.send(article);
      } else {
        console.log(err);
      }
    });
  })

  .put((req, res) => {
    Wiki.update({
      title: req.params.path
    }, {
      title: req.body.title,
      content: req.body.content
    }, function(err, article) {
      if (!err) {
        res.send("Successfully added");
      } else {
        console.log(err);
      }
    });

  });

//listening to server
app.listen(3000, () => {
  console.log("Server started on port 3000");
})
