'use strict';

let dataSection = document.getElementById('highScoreTable');
let mainTableElem = document.getElementById('highScoreTable');

function randomScore(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let userName = [];
let userScore = []; 

function Score(userName, userScore) {
  this.userName = userName; 
  this.userScore = userScore;
  
  bestScore.push(this);
}

Score.prototype.get = function () {
  for (let i = 0; i < 10; i++) {
    if (userScore >= bestScore);
    let bestScore = userScore; 
    this.bestScore.push();
  }
    else {
      (userScore < bestScore);
    let bestScore = !userScore; 
    bestScore.push(this)(randomScore);;
  }
}

Score.prototype.render = function () {

  this.get();

  let row1 = document.createElement('tr');
  mainTableElem.appendChild(row1);

  let userCell = document.createElement('td');
  userCell.textContent = this.userName;
  row1.appendChild(userCell);

  for (let i = 0; i < 10; i++) {
    let td = document.createElement('td');
    td.textContent = this.userScore[i];
    row1.appendChild(td);
  }
  let scoreCell = document.createElement('td');
  scoreCell.textContent = this.userScore[i];
  row1.appendChild(scoreCell);
}

const score= {
  best : parseInt(localStorage.getItem("best")) || 0,
  value : 0,

 
// Add data
localStorage.setItem('userName', 'userScore');

// Read data
let  = localStorage.getItem('userName');

// Remove specific data
localStorage.removeItem('userName');

// Remove all data
localStorage.clear();

