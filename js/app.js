"use strict";

const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

function draw() {}

function loop() {
  draw();

  requestAnimationFrame(loop);
}

loop();
