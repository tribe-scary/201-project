'use strict';

Player.players = [];

function Player(name, score)
{
  this.name = name;
  this.score = score;

  Player.players.push(this);
}

Player.saveToLocalStorage = function (Player)
{
  let savedData = JSON.parse(localStorage.getItem('players'));
  savedData.push(Player);

  localStorage.setItem('players', JSON.stringify(savedData));
};

Player.readFromLocalStorage = function ()
{
  let data = JSON.parse(localStorage.getItem('players'));
  console.log(data);
  if (!data)
  {
    return;
  }

  for (let i = 0; i < data.length; i++)
  {
    let playerName = data[i].name;
    let playerScore = data[i].score;
    new Player(playerName, playerScore);
  }

  Player.players.sort(compareScore);
  Player.players.reverse();
};

function compareScore(firstPlayer, secondPlayer)
{
  if (firstPlayer.score < secondPlayer.score)
  {
    return -1;
  } else if (firstPlayer.score > secondPlayer.score)
  {
    return 1;
  }
  return 0;
}
