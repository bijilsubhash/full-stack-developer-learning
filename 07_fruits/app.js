const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   rating: 5,
//   review: "Good stuff!"
// });
//
// fruit.save();

const pineapple = new Fruit({
  name: "pineapple",
  rating: 10,
  review: "Love it"
});

// pineapple.save();

const mango = new Fruit({
  name: "Mango",
  rating: 10,
  review: "Love it"
});

mango.save();


const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const People = mongoose.model("People", peopleSchema);

const people = new People({
  name: "John",
  age: 50
});

const amy = new People({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
})

// amy.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 8,
  review: "Good!"
});
const orange = new Fruit({
  name: "Orange",
  rating: 5,
  review: "Good and sour!"
});
//
// Fruit.insertMany([kiwi,orange], function(err){
//   if(err){
//     console.log("Error", err);
//   } else {
//     console.log("Success");
//   }
// })
// Fruit.find({}, function (err, fruits) {
//   if(err){
//     console.log(err);
//   } else {
//     for(let i = 0; i<fruits.length; i++){
//       console.log(fruits[i].name);
//     }
//     mongoose.connection.close();
//   }
// })

People.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
  if(err){
    console.log("error");
  } else {
    console.log("success");
  }
})

// People.deleteMany({name: "John"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Success");
//   }
// });
