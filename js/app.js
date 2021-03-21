//imports

import createPlayer from "./player.js";
import createEnemy from "./enemy.js";

//variables

const startButton = document.querySelector("#start-game");
export const canvas = document.querySelector("#grid");
export const ctx = canvas.getContext("2d");
export const numberOfColumns = 25;
export const numberOfRows = 25;
const canvasHeight = canvas.getAttribute("height");
const canvasWidth = canvas.getAttribute("width");
export const blockWidth = canvasWidth / numberOfColumns;
export const blockHeight = canvasHeight / numberOfRows;
export const gridArray = []; //0 represents walls, 1 ground, 2 player and 3 enemy
export let isGameover = false;

startButton.addEventListener("click", startGame);

function startGame() {
  createRandomMap();
  createPlayer();
  createEnemy();
}

function createRandomMap() {
  for (let row = 0; row < numberOfRows; row++) {
    gridArray.push([]);
    for (let col = 0; col < numberOfColumns; col++) {
      //randomize if space is walkable or not
      gridArray[row].push({})
      ctx.beginPath();
      ctx.rect(col * blockWidth, row * blockHeight, blockWidth, blockHeight);
      if (Math.random() > 0.3) {
        gridArray[row][col].type = 1;
        ctx.fillStyle = "#0f0";
      } else {
        gridArray[row][col].type = 0;
        ctx.fillStyle = "#000";
      }
      ctx.fill();
      ctx.closePath();
    }
  }
}

export function draw({ row, col, width = blockWidth, height = blockHeight, color, type }) {
  /*render square:
    1. finding starting square point by multiplying the current column one is currently one times the width of a column(x position) and multiplying the current row with the height of a row
    2. setting the size of the square with the the width of a column and the height of a row*/
  gridArray[row][col].type = type;
  ctx.beginPath();
  ctx.rect(col * width, row * height, width, height);
  ctx.fillStyle = color;
  ctx.fill();
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
