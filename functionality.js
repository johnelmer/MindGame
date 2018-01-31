var score;
var highScore = 0;
var streak = 0;
var time = 60;
var randomLetterPosition;
var randomNumber;
var questionNumber;
var timer;
var letters = 'AEIOUBCDFGHJKLMNPQRSTVWXYZ';
var c;
var ctx;

window.onload = function() {
  initializeGameArea();
  onResize();
  drawLetterQuestionArea();
  drawNumberQuestionArea();
  updateHighScore(score);

}

window.onresize = function() {
  onResize();
}

function onResize() {
  c = document.getElementById("gameArea");
  c.width = window.innerWidth;
  c.height = 450;
  drawLetterQuestionArea();
  drawNumberQuestionArea();
}

function startTimer() {
  timer = setInterval("countdown()", 1000);
}

function countdown() {
  time -= 1;
  if (time === 0) {
    clearInterval(timer);
    gameOver();
  }
  document.getElementById('time').innerHTML = time;
}

function generateQuestion() {
  randomLetterPosition = Math.floor(Math.random() * 25);
  randomNumber = Math.floor(Math.random() * 99) + 1;
  var text = ''
  text += letters.charAt(randomLetterPosition);
  text += ' ';
  text += randomNumber;
  setPosition(text);
}

function setPosition(text) {
  c = document.getElementById("gameArea");
  ctx = c.getContext("2d");
  ctx.font= "bold 180px Arial";
  ctx.fillStyle = "#ffffff";
  var textPosX = (c.width - ctx.measureText(text).width) / 2;
  questionNumber = Math.floor(Math.random() * 2);
  if (questionNumber === 0) {
    document.getElementById('firstButton').innerHTML = 'VOWEL';
    document.getElementById('secondButton').innerHTML = 'CONSONANT';
    ctx.fillText(text,textPosX,165);
  } else {
    document.getElementById('firstButton').innerHTML = 'EVEN';
    document.getElementById('secondButton').innerHTML = 'ODD';
    ctx.fillText(text,textPosX,375);
  }
}

function reset() {
  ctx.clearRect(0, 0, c.width, c. height);
}

function newGame() {
  document.body.onkeydown = function (e) {
    if (e.keyCode == 39) {
      checkAnswer(2);
    } else if (e.keyCode == 37) {
      checkAnswer(1);
    }
  }
  document.getElementById('firstButton').style.visibility = 'visible';
  document.getElementById('secondButton').style.visibility = 'visible';
  document.getElementById('newGame').style.visibility = 'hidden';
  startTimer();
  drawLetterQuestionArea();
  drawNumberQuestionArea();
  generateQuestion();
}

function gameOver() {
  c = document.getElementById("gameArea");
  ctx = c.getContext("2d");
  ctx.font= "bold 180px Arial";
  ctx.fillStyle = "#ffffff";
  var text = 'Final Score:' + score;
  var posX = (c.width - ctx.measureText(text).width) / 2;
  // ctx.fillText('Game Over', (c.width - ctx.measureText('Game Over').width) / 2, 165);
  ctx.fillText('appewer', posX,375);

  // document.getElementById('letterQuestion').style.fontSize = '90px';
  // document.getElementById('letterQuestion').innerHTML = 'GAME OVER';
  // document.getElementById('numberQuestion').style.fontSize = '100px';
  // document.getElementById('numberQuestion').innerHTML = 'SCORE: <br>' + score;
  updateHighScore(score);
  reset();
  initializeGameArea();
}

function initializeGameArea() {
  document.body.onkeydown = null;
  time = 60;
  score = 0;
  document.getElementById('firstButton').style.visibility = 'hidden';
  document.getElementById('secondButton').style.visibility = 'hidden';
  document.getElementById('newGame').style.visibility = 'visible';
}

function drawLetterQuestionArea() {
  c = document.getElementById("gameArea");
  ctx = c.getContext("2d");
  ctx.fillStyle = "#99b898";
  ctx.fillRect((c.width - 500) / 2,0,500,200);
}

function drawNumberQuestionArea() {
  c = document.getElementById("gameArea");
  ctx = c.getContext("2d");
  ctx.fillStyle = "#99b898";
  ctx.fillRect((c.width - 500) / 2,210,500,200);
}

function checkAnswer(answer) {
  streak += 1;
  if (questionNumber == 0) {
    if (randomLetterPosition <= 4 && answer === 1) {
      score += (streak * 1);
    } else if (randomLetterPosition > 4 && answer === 2) {
      score += (streak * 1);
    } else {
      streak = 0;
    }
  } else {
    if (randomNumber % 2 === 0 && answer === 1) {
      score += (streak * 1);
    } else if (randomNumber % 2 === 1 && answer === 2) {
      score += (streak * 1);
    } else {
      streak = 0;
    }
  }
  document.getElementById('score').innerHTML = score;
  reset();
  drawLetterQuestionArea();
  drawNumberQuestionArea();
  generateQuestion();
}

function updateHighScore(score) {
  if (score > highScore) {
    highScore = score;
  }
  document.getElementById('highScore').innerHTML = 'High Score:' + highScore;
}
