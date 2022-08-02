/* eslint-disable no-undef */
'use strict';

let mainTableElem = document.getElementById('highscore');


// let userName = [];
// let userScore = [];

// function Score(userName, userScore) {
//   this.userName = userName;
//   this.userScore = userScore;

//   bestScore.push(this);
// }

// Score.prototype.get = function () {
//   for (let i = 0; i < 10; i++) {
//     if (userScore >= bestScore);
//     let bestScore = userScore;
//     this.bestScore.push();
//   }
//     else {
//       (userScore < bestScore);
//     let bestScore = !userScore;
//     bestScore.push(this)(randomScore);;
//   }
// }

Player.readFromLocalStorage();

let data = Player.players;


Player.render = function () {

  let row1 = document.createElement('tr');
  mainTableElem.appendChild(row1);


  for (let i = 0; i < data.length; i++) {

    let newUser = document.createElement('tr');
    mainTableElem.appendChild(newUser);

    let rankCell = document.createElement('td');
    rankCell.textContent = i+1;
    newUser.appendChild(rankCell);

    let nameCell = document.createElement('td');
    nameCell.textContent = data[i].name;
    newUser.appendChild(nameCell);

    let scoreCell = document.createElement('td');
    scoreCell.textContent = data[i].score;
    newUser.appendChild(scoreCell);
  }
};

function makeHeader() {
  let row1 = document.createElement('tr');
  mainTableElem.appendChild(row1);

  let th1Elem = document.createElement('th');
  th1Elem.textContent = "Rank";
  row1.appendChild(th1Elem);

  let th2Elem = document.createElement('th');
  th2Elem.textContent = "Name";
  row1.appendChild(th2Elem);

  let th3Elem = document.createElement('th');
  th3Elem.textContent = "Score";
  row1.appendChild(th3Elem);
}

makeHeader();
Player.render();
