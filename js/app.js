//imports

import createPlayer from "./player.js";
import createEnemy from "./enemy.js";
import spawnCoins from './coinspawner.js'
import drawStartingScreen from './startingScreen.js';
import colorSchemesArray from './colorschemes.js';

//variables

const gameForm = document.querySelector("#game-form");
export const canvasContainer = document.querySelector('.canvas-container');
export const gameCanvas = document.querySelector("#grid");
export const gameCtx = gameCanvas.getContext("2d");
export const coinCanvas = document.querySelector("#coins");
export const coinCtx = coinCanvas.getContext("2d");
export let numberOfColumns = document.querySelector('#board-height').value;
export let numberOfRows = document.querySelector('#board-width').value;
export let score = 0;
export let shouldShowTrail = false;

export let canvasHeight;
export let canvasWidth;
setCanvasSize();

export let blockWidth = canvasWidth / numberOfColumns;
export let blockHeight = canvasHeight / numberOfRows;
export let gridArray = []; //0 represents walls, 1 ground, 2 player 4 for enemy and 5 for coin
export let isGameover;
//enemy speed slider
let speedInput = document.querySelector('#enemy-speed');
let speedOutput = document.querySelector('#enemy-speed-output');
speedOutput.textContent = speedInput.value;
speedInput.addEventListener('input', () => {
  speedOutput.textContent = speedInput.value;
})
export let enemySpeed;
export let wallFrequency;

//colors
export let colors = colorSchemesArray[0]();

function setCanvasSize() {
  let windowWidth = Math.round(window.innerWidth/1.2);
  let windowHeight = Math.round(window.innerHeight/1.2);
  let size;
  if(windowWidth <= windowHeight) {
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
}

function createMapArray() {
  for(let row = 0; row < numberOfRows; row++) {
    gridArray.push([]);
    for(let col = 0; col < numberOfColumns; col++) {
      gridArray[row].push({});
    }
  }
}

createMapArray();

drawStartingScreen();

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  startGame();
});

function startGame() {
  configVars();
  gameForm.removeEventListener('submit', startGame);
  isGameover = false;
  gridArray = [];
  createMapArray();
  //clear gamecanvas and coincanvas
  drawMap(() => {
    let data = {};
    if(Math.random() > wallFrequency) {
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

export function drawMap(dataGetter) {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      //draw block depending on data param
      let randomData = dataGetter();
      drawRect(
        {
          row: row,
          col: col,
          color: randomData.color,
          type: randomData.type
        }
      );
    }
  }
}

export function drawRect({ row, col, width = blockWidth, height = blockHeight, color, type }) {
  /*render square:
    1. finding starting square point by multiplying the current column one is currently one times the width of a column(x position) and multiplying the current row with the height of a row
    2. setting the size of the square with the the width of a column and the height of a row*/
  gridArray[Math.round(row)][Math.round(col)].type = type;
  gameCtx.beginPath();
  gameCtx.rect(Math.round(col * width), Math.round(row * height), width, height);
  gameCtx.fillStyle = color;
  gameCtx.fill();
  gameCtx.strokeStyle = colors.fieldColor;
  gameCtx.stroke();
  gameCtx.closePath();
}

export function drawCoin({row, col, width = blockWidth, height = blockHeight, color = colors.coinColor}) {
  //register coin in array
  gridArray[row][col].hasCoin = true;
  //draw random coin
 coinCtx.beginPath();
 //since its a radius, the x and y position needs to be offset into the middle of the square
 coinCtx.arc(Math.round((col * width) + width/2), Math.round((row * height) + height/2), Math.round(width/2), 0, 2 * Math.PI, false);
 coinCtx.fillStyle = color;
 coinCtx.fill();
coinCtx.strokeStyle = colors.fieldColor;
coinCtx.stroke();
}

export function getRandomPosition() {
  let positionFound = false;
  while (!positionFound) {
    let randomRow = Math.floor(Math.random() * numberOfRows);
    let randomColumn = Math.floor(Math.random() * numberOfColumns);
    if (gridArray[randomRow][randomColumn].type === 1) {
      positionFound = true;
      return [randomRow, randomColumn];
    }
  }
}

export function gameover() {
  //return early if function was already called
  if(isGameover) {
    return;
  }
  isGameover = true;
  alert(`Gameover nub, your score is ${score}`);
  gameForm.addEventListener('submit', startGame)
}

function configVars() {
  score = 0;
  //color scheme
  let radios = document.getElementsByName('color-scheme');
  [...radios].map((radio) => {
    if(radio.checked) {
      colors = colorSchemesArray[radio.value]();
    }
  })
  numberOfRows = document.querySelector('#board-width').value;
  numberOfColumns = document.querySelector('#board-height').value;
  blockHeight = canvasHeight/numberOfRows;
  blockWidth = canvasWidth/numberOfColumns;

  shouldShowTrail = document.querySelector('#show-trail').checked;
  enemySpeed = speedInput.value;
  wallFrequency = document.querySelector('#wall-frequency').value / 100;
}

//this is needed so other modules can mutate score variable
export function setScore(number) {
  score += number;
}