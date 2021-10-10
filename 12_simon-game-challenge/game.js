var buttonColor = ["red", "green", "blue", "yellow"];
gamePattern = [];

//creating array of user clicked buttons
userClickedPattern = [];

//play audio function
function playsound(audio) {
  var userAudio = new Audio("sounds/" + audio + ".mp3");
  return userAudio.play();
};

// generating random number
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  //update Level
  level++;
  $('#level-title').text("Level " + level);


  //flashing buttons
  $(".btn." + randomChosenColor).fadeOut(100).fadeIn(100);

  //audio
  playsound(randomChosenColor);
}

// event listener to record the color of button on click
$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  index = userClickedPattern.indexOf(userChosenColor);
  checkAnswer(index);

});

//animate buttons
function animatePress(currentColor) {
  $(".btn." + currentColor).addClass("pressed");
  setTimeout(function() {
    $(".btn." + currentColor).removeClass("pressed");
  }, 100);
}

//start the game
function gameStart() {
  count = 0;
  level = 0;
  $(document).keydown(function(event) {
    if (event.type === "keydown") {
      count++;
    }
    if (count == 1) {
      nextSequence();
      //changing h1 to level 0
      var text = $('#level-title').text();
      if (text == "Press A Key to Start" || "Game Over, Press Any Key to Restart") {
        $('#level-title').text("Level 0");
      }
    } else {
      console.log();
    }
  });
}

gameStart();


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playsound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $('#level-title').text("Game Over, Press Any Key to Restart");
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    gameStart();
  }
}
