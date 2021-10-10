const express = require("express"); //importing node express
const https = require("https"); //importing the module for api requests
const bodyParser = require("body-parser"); //bodyparser for collecting the user submited form queries

const app = express(); //starting node express
app.use(bodyParser.urlencoded({
  extended: false
})); //parsing the form

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html"); //sending html file upon when root is requested
});

app.use(function(request, response) {
  const query = request.body.cityName; // storing the cityname that user requested in a variable called query
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=585deffdc83abaf48c25ab4d2ef89f88&units=metric";
  https.get(url, function(apiResponse) { //api request
    apiResponse.on("data", function(data) {
      var weatherData = JSON.parse(data); //parsing api data
      console.log(weatherData.main.temp);
      console.log(weatherData.weather[0].icon);
      var weatherIcon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      //sending desired response back to the website
      response.write("<h1>The temperature in " + query + " is " + weatherData.main.temp + "<br>The weather is currently " + weatherData.weather[0].description + "</h1>");
      response.write("<img src =" + weatherIcon + ">"); //write function allows sending multiple responses, which is not possible if only 'send' is used
      response.send();
    });
  });
});

app.listen(3000, function() { //server starting
  console.log("Server is running on port 3000");
})
