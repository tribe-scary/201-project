'use strict';

Player.players = [];

function Player(name, score)
{
  this.name = name;
  this.score = score;

  Player.players.push(this);
}

Player.saveToLocalStorage = function ()
{
  let data = JSON.stringify(Player.players);
  localStorage.setItem('players', data);
};

Player.readFromLocalStorage = function ()
{
  let data = JSON.parse(localStorage.getItem('players'));
  console.log(data);
  for (let i = 0; i < data.length; i++)
  {
    let playerName = data[i].name;
    let playerScore = data[i].score;
    new Player(playerName, playerScore);
  }
};

// todo sort through players array before reading.


