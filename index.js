let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


let started = false;
let level = 0;

//Start the game
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level 0");
        nextSequence();
        started = true;
    }
});

//User clicks on a button
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//Sequence that user hs to follow
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

//Sound when button is pressed 
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
} 

//Blinking animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

//Check if user is correct
function checkAnswer(currentLevel) {   
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over! Press Any Key to Restart");

        //Start the game Over
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

