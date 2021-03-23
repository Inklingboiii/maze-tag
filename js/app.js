//imports

import createPlayer from "./player.js";
import createEnemy from "./enemy.js";

//variables

const startButton = document.querySelector("#start-game");
export const canvas = document.querySelector("#grid");
export const ctx = canvas.getContext("2d");
export const numberOfColumns = 25;
export const numberOfRows = 25;

let canvasHeight;
let canvasWidth;
setCanvasSize();

export let blockWidth = canvasWidth / numberOfColumns;
export let blockHeight = canvasHeight / numberOfRows;
export let gridArray = []; //0 represents walls, 1 ground, 2 player and 3 enemy
export let isGameover = false;

//colors

export const fieldColor = '#0f0';
export const wallColor = '#000';
export const playerColor = '#00f';
export const enemyColor = '#f00';
export const trailColor = 'orange';
export const accentColor = 'yellow';

function setCanvasSize() {
  let windowWidth = Math.round(window.innerWidth/1.2);
  let windowHeight = Math.round(window.innerHeight/1.2);
  let size;
  if(windowWidth <= windowHeight) {
    size = windowWidth;
  } else {
    size = windowHeight;
  }
  canvas.setAttribute('width', size);
  canvas.setAttribute('height',size);
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

function drawStartingScreen() {
  drawMap(() => ({color: fieldColor, type: 69}));
  //draw enemy
  draw(
    {
      row: 1,
      col: 2,
      width: (canvasWidth/3),
      height: (canvasHeight/3),
      color: enemyColor,
      type: 69
    }
  );
    //draw player
  draw(
    {
      row: 0,
      col: 0,
      width: canvasWidth/3,
      height: canvasHeight/3,
      color: playerColor,
      type: 69
    }
  );

  //draw trail
  draw(
    {
      row: 1,
      col: 1,
      width: canvasWidth/3,
      height: canvasHeight/3,
      color: trailColor,
      type: 69
    }
  );

  draw(
    {
      row: 1,
      col: 0,
      width: canvasWidth/3,
      height: canvasHeight/3,
      color: trailColor,
      type: 69
    }
  );

  //draw wall

  draw(
    {
      row: 2,
      col: 2,
      width: canvasWidth/3,
      height: canvasHeight/3,
      color: wallColor,
      type: 69
    }
  )
  //draw text
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = accentColor;
  ctx.font = '3rem Legend Boy';
  ctx.fillText('MAZE', Math.round((canvasWidth/3) * 2), Math.round(canvasHeight/3) / 2);
  ctx.fillText('TAG', canvasWidth/3, canvasHeight/3 * 2.5);
}

drawStartingScreen();

startButton.addEventListener("click", startGame);

function startGame() {
  gridArray = [];
  createMapArray();
  drawMap(() => {
    let data = {};
    if(Math.random() > 0.3) {
      data.type = 1;
      data.color = fieldColor;
    } else {
      data.type = 0;
      data.color = wallColor;
    }
    return data;
  });
  createPlayer();
  createEnemy();
}

function drawMap(dataGetter) {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      //draw block depending on data param
      let randomData = dataGetter();
      draw(
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

export function draw({ row, col, width = blockWidth, height = blockHeight, color, type }) {
  /*render square:
    1. finding starting square point by multiplying the current column one is currently one times the width of a column(x position) and multiplying the current row with the height of a row
    2. setting the size of the square with the the width of a column and the height of a row*/
  gridArray[Math.round(row)][Math.round(col)].type = type;
  ctx.beginPath();
  ctx.rect(Math.round(col * width), Math.round(row * height), width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = fieldColor;
  ctx.stroke();
  ctx.closePath();
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
  isGameover = true;
  alert('gameover nub');
}
