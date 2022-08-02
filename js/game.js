// SELECT CVS
const cvs = document.getElementById('bird');
const ctx = cvs.getContext('2d');

const gameAreaElement = cvs.parentElement;

// GAME VARS AND CONSTS
let frameCount = 0; // renamed from frames because of eslint error
const DEGREE = Math.PI / 180;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = 'img/sprite.png';

// Toggle Sound Start

let toggleSound = document.getElementById("toggle-sound");

toggleSound.addEventListener("change", handleClick);

let clickStatus = true;

function handleClick(event){
  clickStatus = !clickStatus;

  if (clickStatus === true){
    SCORE_S.src = 'audio/sfx_point.wav';
    FLAP.src = 'audio/sfx_flap.wav';
    HIT.src = 'audio/sfx_hit.wav';
    SWOOSHING.src = 'audio/sfx_swooshing.wav';
    DIE.src = 'audio/sfx_die.wav';
  } else {
    SCORE_S.src = 'audio/silent_quarter-second.wav';
    FLAP.src = 'audio/silent_quarter-second.wav';
    HIT.src = 'audio/silent_quarter-second.wav';
    SWOOSHING.src = 'audio/silent_quarter-second.wav';
    DIE.src = 'audio/silent_quarter-second.wav';
  }
}




// Toggle Sound End


// LOAD SOUNDS
const SCORE_S = new Audio();
SCORE_S.src = 'audio/sfx_point.wav';

const FLAP = new Audio();
FLAP.src = 'audio/sfx_flap.wav';

const HIT = new Audio();
HIT.src = 'audio/sfx_hit.wav';

const SWOOSHING = new Audio();
SWOOSHING.src = 'audio/sfx_swooshing.wav';

const DIE = new Audio();
DIE.src = 'audio/sfx_die.wav';

// GAME STATE
const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2
};

// START BUTTON COORD
const startBtn = {
  x: 200,
  y: 450,
  w: 200,
  h: 100
};

// CONTROL THE GAME
cvs.addEventListener('click', function (evt)
{
  let rect;
  let clickX;
  let clickY;
  switch (state.current)
  {
  case state.getReady:
    state.current = state.game;
    SWOOSHING.play();
    break;
  case state.game:
    if (bird.y - bird.radius <= 0) return;
    bird.flap();
    FLAP.play();
    break;
  case state.over:
    rect = cvs.getBoundingClientRect();
    clickX = evt.clientX - rect.left;
    clickY = evt.clientY - rect.top;

    // CHECK IF WE CLICK ON THE START BUTTON
    if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) //todo remove name element if you click this
    {
      pipes.reset();
      bird.speedReset();
      score.reset();
      state.current = state.getReady;
      loop();
    }
    break;
  }
});


// BACKGROUND
const bg = {
  sX: 1400,
  sY: 15,
  w: 1400,
  h: 1000,
  x: 0,
  y: 0,

  draw: function ()
  {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
  }

};

// FOREGROUND
const fg = {
  sX: 590,
  sY: 3,
  w: 450,
  h: 227,
  x: 0,
  y: cvs.height - 225,

  dx: 2,

  draw: function ()
  {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
  },

  update: function ()
  {
    if (state.current === state.game)
    {
      this.x = (this.x - this.dx) % (this.w / 2);
    }
  }
};

// BIRD
const bird = {
  animation: [
    {sX: 565, sY: 241},
    {sX: 562, sY: 315},
    {sX: 562, sY: 388}
  ],
  x: 70,
  y: 150,
  w: 120,
  h: 74,

  radius: 10,

  frame: 0,

  gravity: 0.10,
  jump: 4,
  speed: 0,
  rotation: 0,

  draw: function ()
  {
    let bird = this.animation[this.frame];

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

    ctx.restore();
  },

  flap: function ()
  {
    this.speed = -this.jump;
  },

  update: function ()
  {
    // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
    this.period = state.current === state.getReady ? 10 : 5;
    // WE INCREMENT THE FRAME BY 1, EACH PERIOD
    this.frame += frameCount % this.period === 0 ? 1 : 0;
    // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
    this.frame = this.frame % this.animation.length;

    if (state.current === state.getReady)
    {
      this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
      this.rotation = 0;
    } else
    {
      this.speed += this.gravity;
      this.y += this.speed;

      if (this.y + this.h / 2 >= cvs.height - fg.h)
      {
        this.y = cvs.height - fg.h - this.h / 2;
        if (state.current === state.game)
        {
          state.current = state.over;
          DIE.play();
        }
      }

      // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
      if (this.speed >= this.jump)
      {
        this.rotation = 45 * DEGREE;
        this.frame = 1;
      } else
      {
        this.rotation = -25 * DEGREE;
      }
    }

  },
  speedReset: function ()
  {
    this.speed = 0;
  }
};

// GET READY MESSAGE
const getReady = {
  sX: 0,
  sY: 485,
  w: 373,
  h: 339,
  x: cvs.width / 2 - 360 / 2,
  y: 80,

  draw: function ()
  {
    if (state.current === state.getReady)
    {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }

};

// GAME OVER MESSAGE
const gameOver = {
  sX: 370,
  sY: 483,
  w: 484,
  h: 433,
  x: cvs.width / 2 - 480 / 2,
  y: 90,

  draw: function ()
  {
    if (state.current === state.over)
    {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }

};

// PIPES
const pipes = {
  position: [],

  top: {
    sX: 1183,
    sY: 0
  },
  bottom: {
    sX: 1080,
    sY: 0
  },

  w: 92,
  h: 854,
  gap: 280,
  maxYPos: -460,
  dx: 2,

  draw: function ()
  {
    for (let i = 0; i < this.position.length; i++)
    {
      let p = this.position[i];

      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;

      // top pipe
      ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

      // bottom pipe
      ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
    }
  },

  update: function ()
  {
    if (state.current !== state.game) return;

    if (frameCount % 100 === 0)
    {
      this.position.push({
        x: cvs.width,
        y: this.maxYPos * (Math.random() + 1)
      });
    }
    for (let i = 0; i < this.position.length; i++)
    {
      let p = this.position[i];

      let bottomPipeYPos = p.y + this.h + this.gap;

      // COLLISION DETECTION
      // TOP PIPE
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h)
      {
        state.current = state.over;
        HIT.play();
      }
      // BOTTOM PIPE
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h)
      {
        state.current = state.over;
        HIT.play();
      }

      // MOVE THE PIPES TO THE LEFT
      p.x -= this.dx;

      // if the pipes go beyond canvas, we delete them from the array
      if (p.x + this.w <= 0)
      {
        this.position.shift();
        score.value += 1;
        SCORE_S.play();
        score.best = Math.max(score.value, score.best);
        localStorage.setItem('best', score.best); // Todo save highscore to player object with name instead of this
      }
    }
  },

  reset: function ()
  {
    this.position = [];
  }

};

// SCORE
const score = {
  best: parseInt(localStorage.getItem('best')) || 0,
  value: 0,

  draw: function ()
  {
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#000';

    if (state.current === state.game)
    {
      ctx.lineWidth = 2;
      ctx.font = '70px Teko';
      ctx.fillText(this.value, cvs.width / 2, 50);
      ctx.strokeText(this.value, cvs.width / 2, 50);

    } else if (state.current === state.over)
    {
      // SCORE VALUE
      ctx.font = '70px Teko,';
      ctx.fillText(this.value, 450, 310);
      ctx.strokeText(this.value, 450, 310);
      // BEST SCORE
      ctx.fillText(this.best, 450, 400);
      ctx.strokeText(this.best, 450, 400);
    }
  },

  reset: function ()
  {
    this.value = 0;
  }
};

// DRAW
function draw()
{
  ctx.fillStyle = '#70c5ce';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  bg.draw();
  pipes.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();
}

// UPDATE
function update()
{
  bird.update();
  fg.update();
  pipes.update();
}

// LOOP
function loop()
{
  update();
  draw();
  frameCount++;

  if (state.current !== state.over)
  {
    requestAnimationFrame(loop);
  } else
  {
    Player.readFromLocalStorage();
    let nameInput = document.createElement('input');
    gameAreaElement.appendChild(nameInput);
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';

    nameInput.addEventListener('keypress', function handleSubmit(event)
    {
      if (event.key === 'Enter')
      {
        new Player(nameInput.value, score.value);
        Player.saveToLocalStorage();
        gameAreaElement.removeChild(nameInput);// safely deletes nameInput
        nameInput.replaceWith(nameInput.cloneNode());// removes event listener
      }
    }); //todo remove name when start button is hit or block the start button
  }
}

loop();