//imports
import helper from "./helper.js";
import createPlayer from "./player.js";
import createEnemy from "./enemy.js";
import spawnCoins from "./coinspawner.js";
import colorSchemesArray from "./colorschemes.js";

//variables

const gameForm = document.querySelector("#game-form");
export const canvasContainer = document.querySelector(".canvas-container");
export const gameCanvas = document.querySelector("#grid");
const restartButton = document.querySelector('#restart-button');
export const gameCtx = gameCanvas.getContext("2d");
export const coinCanvas = document.querySelector("#coins");
export const coinCtx = coinCanvas.getContext("2d");
export let numberOfRows, numberOfColumns;
numberOfRows = numberOfColumns =  document.querySelector("#board-size").value;
console.log(numberOfRows, numberOfColumns)
export let score = 0;
export let shouldShowTrail = false;

export let canvasHeight;
export let canvasWidth;

//set canvas size

let windowWidth = Math.round(window.innerWidth / 1.2);
let windowHeight = Math.round(window.innerHeight / 1.2);
let size;
if (windowWidth <= windowHeight) {
  size = windowWidth;
} else {
  size = windowHeight;
}
//set size of canvas and canvascontainer
[gameCanvas, coinCanvas].forEach((canvas) => {
  canvas.width = size;
  canvas.height = size;
});
canvasContainer.style.height = size + "px";
canvasContainer.style.width = size + "px";
canvasHeight = size;
canvasWidth = size;

export let blockWidth = canvasWidth / numberOfColumns;
export let blockHeight = canvasHeight / numberOfRows;
export let gridArray = []; //0 represents walls, 1 ground, 2 player 4 for enemy and 5 for coin
export let isGameover;
//enemy speed slider
let speedInput = document.querySelector("#enemy-speed");
let speedOutput = document.querySelector("#enemy-speed-output");
speedOutput.textContent = speedInput.value;
speedInput.addEventListener("input", () => {
  speedOutput.textContent = speedInput.value;
});
export let enemySpeed;
export let wallFrequency;

//colors
export let colors = colorSchemesArray[0]();

helper.createMapArray();

helper.drawStartingScreen();

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  startGame();
});

function startGame() {
  configVars();
  gameForm.removeEventListener("submit", startGame);
  restartButton.addEventListener('click', restart)
  isGameover = false;
  gridArray = [];
  helper.createMapArray();
  //clear gamecanvas and coincanvas
  helper.drawMap(() => {
    let data = {};
    if (Math.random() > wallFrequency) {
      data.type = 1;
      data.color = colors.fieldColor;
    } else {
      data.type = 0;
      data.color = colors.wallColor;
    }
    return data;
  });
  coinCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  createPlayer();
  createEnemy();
  spawnCoins();
}

export function gameover() {
  //return early if function was already called
  if (isGameover) {
    return;
  }
  isGameover = true;
  alert(`Gameover nub, your score is ${score}`);
  gameForm.addEventListener("submit", startGame);
}

function configVars() {
  score = 0;
  //color scheme
  let radios = document.getElementsByName("color-scheme");
  [...radios].map((radio) => {
    if (radio.checked) {
      colors = colorSchemesArray[radio.value]();
      //set css variables to color variables
      let root = document.querySelector(':root')
      root.style.setProperty('--main-color', colors.playerColor);

    }
  });
  numberOfRows = numberOfColumns = document.querySelector("#board-size").value;
  console.log(numberOfRows, numberOfColumns)
  blockHeight = canvasHeight / numberOfRows;
  blockWidth = canvasWidth / numberOfColumns;

  shouldShowTrail = document.querySelector("#show-trail").checked;
  enemySpeed = speedInput.value;
  wallFrequency = document.querySelector("#wall-frequency").value / 100;
}

//this is needed so other modules can mutate score variable
export function setScore(number) {
  score += number;
}


function restart() {
  isGameover = true;
  gameForm.addEventListener("submit", startGame);
  restartButton.removeEventListener('click', restart);
  helper.drawStartingScreen();
}