//imports
import {
  coinCtx,
  blockWidth,
  blockHeight,
  gridArray,
  numberOfColumns,
  numberOfRows,
  gameover,
  isGameover,
  colors,
  score,
  setScore,
  canvasWidth,
  canvasHeight
} from "./app.js";

import helper from './helper.js';

//player input directions

export const up = "KeyW" || "ArrowUp";
export const down = "KeyS" || "ArrowDown";
export const left = "KeyA" || "ArrowLeft";
export const right = "KeyD" || "ArrowRight";

let isPressed = {
  up: false,
  down: false,
  left: false,
  right: false,
};

export let playerRow;
export let playerColumn;
export let lastPlayerRow;
export let lastPlayerColumn;
export default function createPlayer() {
  [playerRow, playerColumn] = helper.getRandomPosition();
  //render player in map
  helper.drawRect({
    row: playerRow,
    col: playerColumn,
    width: blockWidth,
    height: blockHeight,
    color: colors.playerColor,
    type: 2,
  }); //register it as ground at first cus player duplicates
  window.addEventListener("keydown", (key) => {
    if ((key.code === up || down || left || right) && !isGameover) {
      movePlayer(key);
    }
  });

  function movePlayer(key) {
    //removes bug where player can warp through enemy
    if (gridArray[playerRow][playerColumn].type === 3) {
      return gameover();
    }

    switch (key.code) {
      //check collissions and that the buttons arent being held
      case up:
        configurePosition([-1, 0], "up");
        break;
      case down:
        configurePosition([1, 0], "down");
        break;
      case left:
        configurePosition([0, -1], "left");
        break;
      case right:
        configurePosition([0, 1], "right");
        break;
    }
    //redraw player after new position
    helper.drawRect({
      row: playerRow,
      col: playerColumn,
      width: blockWidth,
      height: blockHeight,
      color: colors.playerColor,
      type: 2,
    });
    //only erase last position if it isnt equal to current position
    if (playerRow !== lastPlayerRow || playerColumn !== lastPlayerColumn) {
      helper.drawRect({
        row: lastPlayerRow,
        col: lastPlayerColumn,
        width: blockWidth,
        height: blockHeight,
        color: colors.fieldColor,
        type: 1,
      });
    }
  }

  window.addEventListener("keyup", (key) => {
    switch (key.code) {
      case up:
        isPressed.up = false;
        break;
      case down:
        isPressed.down = false;
        break;
      case left:
        isPressed.left = false;
        break;
      case right:
        isPressed.right = false;
    }
  });

  function configurePosition([row, col], button) {
    //collision checking
    if (
      playerRow + row >= 0 &&
      playerRow + row < numberOfRows &&
      playerColumn + col >= 0 &&
      playerColumn + col < numberOfColumns &&
      isPressed[button] === false
    ) {
      let block = gridArray[playerRow + row][playerColumn + col];
      if (block.type === 1) {
        //if if space is walkable
        //update current position and assign last position to last pos variables
        lastPlayerRow = playerRow;
        lastPlayerColumn = playerColumn;
        playerRow += row;
        playerColumn += col;
        isPressed[button] = true;
        if (block.hasCoin === true) {
          block.hasCoin = false;
          //erase coin
          coinCtx.clearRect(playerColumn * blockWidth, playerRow * blockWidth, blockWidth, blockHeight);
          setScore(10);
          console.log("got coin");
        }
      }
    }
  }
}
