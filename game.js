var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var keyPressed=false;
var level=0;
$(document).keydown(function(){
    if (!keyPressed){
        $("#level-title").text("Level "+level);
        nextSequence();
        keyPressed=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);   
    var randomNumber =Math.floor(Math.random() * 4);
    // alert(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // return (randomChosenColour);
    playSound(randomChosenColour);
};
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
    },100);
};
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};
function startOver(){
    level=0;
    gamePattern=[];
    keyPressed=false;
};