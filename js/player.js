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
 numberOfGames,
  setScore,
  canvasWidth,
  canvasHeight,
} from "./app.js";

import helper from "./helper.js";

//player input directions

export const up = ["KeyW", "ArrowUp"];
export const down = ["KeyS", "ArrowDown"];
export const left = ["KeyA", "ArrowLeft"];
export const right = ["KeyD", "ArrowRight"];

//buttons
export const leftButton = document.querySelector(".controls__button--left");
export const downButton = document.querySelector(".controls__button--down");
export const upButton = document.querySelector(".controls__button--up");
export const rightButton = document.querySelector(".controls__button--right");

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

  if(numberOfGames === 1) {
    [leftButton, downButton, upButton, rightButton].map((button) => {
      button.addEventListener("click", () => {
        if (isGameover) {
          return;
        }
        movePlayer(button, false);
      });
      });
  }

  //keys
  document.addEventListener("keydown", (key) => {
    if (
      (key.code === up[0] ||
        up[1] ||
        down[0] ||
        down[1] ||
        left[0] ||
        left[1] ||
        right[0] ||
        right[1]) &&
      !isGameover
    ) {
      key.preventDefault();
      movePlayer(key, true);
    }
  });

  function movePlayer(key, isKey) {
    //removes bug where player can warp through enemy
    if (gridArray[playerRow][playerColumn].type === 3) {
      return gameover();
    }

    if(isKey) {
      switch (key.code) {
        //check collissions and that the buttons arent being held
        case up[0]:
        case up[1]:
          configurePosition([-1, 0], "up", true);
          break;
        case down[0]:
        case down[1]:
          configurePosition([1, 0], "down", true);
          break;
        case left[0]:
        case left[1]:
          configurePosition([0, -1], "left", true);
          break;
        case right[0]:
        case right[1]:
          configurePosition([0, 1], "right", true);
          break;
      }
    } else {
      switch (key) {
        case leftButton:  configurePosition([0, -1], "left", false);
          break;
        case downButton:  configurePosition([1, 0], "down", false);
          break;
        case upButton: configurePosition([-1, 0], "up", false);
          break;
        case rightButton:  configurePosition([0, 1], "right", false);
          break;
      }
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
      case up[0]:
      case up[1]:
        isPressed.up = false;
        break;
      case down[0]:
      case down[1]:
        isPressed.down = false;
        break;
      case left[0]:
      case left[1]:
        isPressed.left = false;
        break;
      case right[0]:
      case right[1]:
        isPressed.right = false;
    }
  });

  function configurePosition([row, col], button, isKey) {
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
        if(isKey) {
          isPressed[button] = true;
        }
        if (block.hasCoin === true) {
          block.hasCoin = false;
          //erase coin
          coinCtx.clearRect(
            playerColumn * blockWidth,
            playerRow * blockWidth,
            blockWidth,
            blockHeight
          );
          setScore(10);
          console.log("got coin");
        }
      }
    }
  }
}
