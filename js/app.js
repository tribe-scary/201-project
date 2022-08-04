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
  if (savedData)
  {
    savedData.push(Player);
  } else
  {
    savedData = [Player];
  }
  localStorage.setItem('players', JSON.stringify(savedData));
};

Player.readFromLocalStorage = function ()
{
  let data = JSON.parse(localStorage.getItem('players'));
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

  if (Player.players.length > 10)
  {
    Player.players.length = 10;
  }

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

let devScores = [];
devScores.push(new Player('Adr', 56)); // 3 character limit on names
devScores.push(new Player('Jun', 58));
devScores.push(new Player('Rob', 39));
devScores.push(new Player('Jos', 42));
devScores.push(new Player('Ste', 57));

let savedPlayers = JSON.parse(localStorage.getItem('players'));
for (let i = 0; i < savedPlayers.length; i++)
{
  for (let j = 0; j < devScores.length; j++)
  {
    if (savedPlayers[i].name === devScores[j].name && savedPlayers[i].score === devScores[j].score)
    {
      let index = Player.players.indexOf(devScores[j]);
      Player.players.splice(index, 1);
    }
  }
}
