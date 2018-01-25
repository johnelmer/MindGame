var score;
var highScore = 0;
var streak = 0;
var time = 60;
var randomLetterPosition;
var randomNumber;
var questionNumber;
var timer;
var letters = 'AEIOUBCDFGHJKLMNPQRSTVWXYZ';

window.onload = function() {
  initializeGameArea();
  updateHighScore(score);
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
  questionNumber = Math.floor(Math.random() * 2);
  document.getElementById('letterQuestion').innerHTML = '';
  document.getElementById('numberQuestion').innerHTML = '';
  if (questionNumber === 0) {
    document.getElementById('firstButton').innerHTML = 'VOWEL';
    document.getElementById('secondButton').innerHTML = 'CONSONANT';
    document.getElementById('letterQuestion').innerHTML = text;
  } else {
    document.getElementById('firstButton').innerHTML = 'EVEN';
    document.getElementById('secondButton').innerHTML = 'ODD';
    document.getElementById('numberQuestion').innerHTML = text;
  }
}

function newGame() {
  document.body.onkeydown = function (e) {
    if (e.keyCode == 39) {
      checkAnswer(2);
    } else if (e.keyCode == 37) {
      checkAnswer(1);
    }
  }
  document.getElementById('letterQuestion').style.fontSize = '180px';
  document.getElementById('numberQuestion').style.fontSize = '180px';
  document.getElementById('firstButton').style.visibility = 'visible';
  document.getElementById('secondButton').style.visibility = 'visible';
  document.getElementById('newGame').style.visibility = 'hidden';
  startTimer();
  generateQuestion();
}

function gameOver() {
  document.getElementById('letterQuestion').style.fontSize = '90px';
  document.getElementById('letterQuestion').innerHTML = 'GAME OVER';
  document.getElementById('numberQuestion').style.fontSize = '100px';
  document.getElementById('numberQuestion').innerHTML = 'SCORE: <br>' + score;
  updateHighScore(score);
  initializeGameArea();
}

function initializeGameArea() {
  document.body.onkeydown = null;
  time = 60;
  score = 0;
  document.getElementById('letterQuestion').style.fontSize = '40px';
  document.getElementById('letterQuestion').innerHTML = 'In this box, determine if LETTER is VOWEL or CONSONANT';
  document.getElementById('numberQuestion').style.fontSize = '40px';
  document.getElementById('numberQuestion').innerHTML = 'In this box, determine if NUMBER is EVEN or ODD';
  document.getElementById('firstButton').style.visibility = 'hidden';
  document.getElementById('secondButton').style.visibility = 'hidden';
  document.getElementById('newGame').style.visibility = 'visible';
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
  generateQuestion();
}

function updateHighScore(score) {
  if (score > highScore) {
    highScore = score;
  }
  document.getElementById('highScore').innerHTML = 'High Score:' + highScore;
}
