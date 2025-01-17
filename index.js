import EnemyController from "./EnemyController.js";
import Player from "./player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


canvas.width = 2600;
canvas.height = 1100;

var start;var startImg;
var gameState = 'start';

const background = new Image();
background.src = "space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(canvas,enemyBulletController,playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

//bg music section
const audio = new Audio("bg.aac");
audio.volume=0.6;
audio.play();

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);

  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? " You Win !" : "YOU LOSE !";
    let textOffset = didWin ? 3.5 : 5;
    
    ctx.fillStyle = "white";
    ctx.font = "200px Arial";
    ctx.fillText(text, canvas.width / 3.3, canvas.height / 2);
  }
}

function checkGameOver() {
  if (isGameOver) {
    //to turn of the audio
    audio.volume=0;
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

setInterval(game, 1000 /70);
