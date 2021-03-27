import {
  coinCtx,
  shouldShowTrail,
  enemySpeed,
  blockWidth,
  blockHeight,
  gridArray,
  numberOfColumns,
  numberOfRows,
  gameover,
  isGameover,
  colors,
  setScore,
} from "./app.js";
import {
  playerRow,
  playerColumn,
  lastPlayerRow,
  lastPlayerColumn,
} from "./player.js";
import findBestRoute from "./pathFinder.js";
import helper from './helper.js';

export default function createEnemy() {
  //positional variables
  let route;
  let [enemyRow, enemyColumn] = helper.getRandomPosition();
  //render enemy
  helper.drawRect({
    row: enemyRow,
    col: enemyColumn,
    width: blockWidth,
    height: blockHeight,
    color: colors.enemyColor,
    type: 3,
  });
  //initial route
  route = findBestRoute(enemyRow, enemyColumn);
  //hunt player until player is caught
  moveEnemy(route);
  //copy players movement and add it to queue
  window.addEventListener("keydown", (key) => {
    if (isGameover) {
      return;
    }
    //if last player pos is equal to last route pos then add newest player position to route
    if (
      route[route.length - 1].y === lastPlayerRow &&
      route[route.length - 1].x === lastPlayerColumn
    ) {
      route.push({
        y: playerRow,
        x: playerColumn,
      });
      //update route visualization if players position changed and user toggled on trail showing
      if (
        (playerRow !== lastPlayerRow || playerColumn !== lastPlayerColumn) &&
        shouldShowTrail
      ) {
        helper.drawRect({
          row: lastPlayerRow,
          col: lastPlayerColumn,
          color: colors.trailColor,
          type: 1,
        });
      }
    } else {
      console.log("error in player position");
    }
  });

  function moveEnemy(routeParam) {
    route = routeParam;
    let updateRouteInterval = setInterval(() => {
      if (isGameover) {
        return clearInterval(updateRouteInterval);
      }
      if (!shouldShowTrail) {
        //update/recalculate route early without updating route
        return (route = findBestRoute(enemyRow, enemyColumn));
      }
      //erase old route visualization
      let routeLength = route.length - 1;
      for (let i = 0; i < routeLength; i++) {
        if (route[i].y !== playerRow || route[i].x !== playerColumn) {
          helper.drawRect({
            row: route[i].y,
            col: route[i].x,
            width: blockWidth,
            height: blockHeight,
            color: colors.fieldColor,
            type: 1,
          });
        }
      }
      //update/recalculate route
      route = findBestRoute(enemyRow, enemyColumn);
      //draw new route
      routeLength = route.length;
      for (let i = 0; i < routeLength - 1; i++) {
        helper.drawRect({
          row: route[i].y,
          col: route[i].x,
          width: blockWidth,
          height: blockHeight,
          color: colors.trailColor,
          type: 1,
        });
      }
    }, 1000);
    let moveInterval = setInterval(() => {
      if (isGameover) {
        console.log("cleared interval");
        return clearInterval(moveInterval);
      }
      //if touching player stop the hunt
      if (enemyRow === playerRow && enemyColumn === playerColumn) {
        gameover();
        return clearInterval(moveInterval);
      }
      let routeY = route[0].y;
      let routeX = route[0].x;
      //if last position was touching a coin turn square into a wall and remove coin, else turn it into a walkable field
      if(gridArray[enemyRow][enemyColumn].hasCoin) {
        coinCtx.clearRect(enemyColumn * blockWidth, enemyRow * blockWidth, blockWidth, blockHeight);
        helper.drawRect({
          row: enemyRow,
          col: enemyColumn,
          width: blockWidth,
          height: blockHeight,
          color: colors.wallColor,
          type: 0,
        });
        setScore(-5);
      } else {
        helper.drawRect({
          row: enemyRow,
          col: enemyColumn,
          width: blockWidth,
          height: blockHeight,
          color: colors.fieldColor,
          type: 1,
        });
      }
      //draw new position
      helper.drawRect({
        row: routeY,
        col: routeX,
        width: blockWidth,
        height: blockHeight,
        color: colors.enemyColor,
        type: 3,
      });
      //update enemy position
      enemyRow = routeY;
      enemyColumn = routeX;
      //remove position from route
      route.shift();
    }, enemySpeed);
    return moveInterval;
  }
}
