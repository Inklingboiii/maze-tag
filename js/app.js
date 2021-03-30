//imports
import helper from "./helper.js";
import handlePageElements from "./page.js";
import createPlayer from "./player.js";
import createEnemy from "./enemy.js";
import spawnCoins from "./coinspawner.js";
import colorSchemesArray from "./colorschemes.js";

//variables

const startButton = document.querySelector(".button--start");
const restartButton = document.querySelector(".button--restart");

export const gameCanvas = document.querySelector(".canvas--grid");
export const gameCtx = gameCanvas.getContext("2d");

export const coinCanvas = document.querySelector(".canvas--coins");
export const coinCtx = coinCanvas.getContext("2d");

export let numberOfRows, numberOfColumns;
numberOfRows = numberOfColumns = document.querySelector("#board-size").value;

export let score = 0;
export let shouldShowTrail = false;
let shouldSmoothenBoard = false;

//handles page elements like sliders or side bars
handlePageElements();

export let canvasHeight = gameCanvas.height;
export let canvasWidth = gameCanvas.width;

export let blockWidth = canvasWidth / numberOfColumns;
export let blockHeight = canvasHeight / numberOfRows;

export let gridArray = []; //0 represents walls, 1 ground, 2 player 4 for enemy and 5 for coin
export let isGameover;

export let enemySpeed;
export let wallFrequency;

//colors
export let colors = colorSchemesArray[0]();

helper.createMapArray();

helper.drawStartingScreen();

startButton.addEventListener("click", startGame);

function startGame() {
  configVars();
  startButton.removeEventListener("click", startGame);
  restartButton.addEventListener("click", restart);
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

  //smoothen map
  if(shouldSmoothenBoard) {
    helper.smoothMap();
  }

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
  startButton.addEventListener("click", startGame);
}

function configVars() {
  let domData = helper.domData();
  score = 0;
  //color scheme
  Array.from(domData.colorSchemeRadios).map((radio) => {
    if (radio.checked) {
      colors = colorSchemesArray[radio.value]();
      //set css variables to color variables
      domData.root.style.setProperty("--accent-color-one", colors.playerColor);
      domData.root.style.setProperty("--accent-color-two", colors.enemyColor);
    }
  });
  numberOfRows = numberOfColumns = domData.boardSize;
  blockHeight = canvasHeight / numberOfRows;
  blockWidth = canvasWidth / numberOfColumns;

  shouldShowTrail = domData.shouldShowTrail;
  enemySpeed = domData.enemySpeed;
  wallFrequency = domData.wallFrequency / 100; //divide by 100 for percent
  shouldSmoothenBoard = domData.shouldSmoothenBoard;
}

//this is needed so other modules can mutate score variable
export function setScore(number) {
  score += number;
}

function restart() {
  isGameover = true;
  startButton.addEventListener("click", startGame);
  restartButton.removeEventListener("click", restart);
  helper.drawStartingScreen();
}
