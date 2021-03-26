import {
  shouldShowTrail,
  enemySpeed,
  draw,
  blockWidth,
  blockHeight,
  gridArray,
  numberOfColumns,
  numberOfRows,
  getRandomPosition,
  gameover,
  isGameover,
  colors,
} from "./app.js";
import {
  playerRow,
  playerColumn,
  lastPlayerRow,
  lastPlayerColumn,
} from "./player.js";
import findBestRoute from "./pathFinder.js";

export default function createEnemy() {
  //positional variables
  let route;
  let [enemyRow, enemyColumn] = getRandomPosition();
  //render enemy
  draw({
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
      if ((playerRow !== lastPlayerRow || playerColumn !== lastPlayerColumn) && shouldShowTrail) {
        draw({
          row: lastPlayerRow,
          col: lastPlayerColumn,
          width: blockWidth,
          height: blockHeight,
          color: colors.trailColor,
          type: 1,
        });
      }
    } else {
      console.log(
       'error in player position'
      );
    }
  });

  function moveEnemy(routeParam) {
    route = routeParam;
    let updateRouteInterval = setInterval(() => {
      if (isGameover) {
        clearInterval(updateRouteInterval);
      }
      if(!shouldShowTrail) {
         //update/recalculate route early without updating route
      return route = findBestRoute(enemyRow, enemyColumn);
      }
         //erase old route visualization
      let routeLength = route.length - 1;
      for (let i = 0; i < routeLength; i++) {
        if (route[i].y !== playerRow || route[i].x !== playerColumn) {
          draw({
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
        draw({
          row: route[i].y,
          col: route[i].x,
          width: blockWidth,
          height: blockHeight,
          color: colors.trailColor,
          type: 1,
        });
      }
    }, 1500);
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
      //erase last position
      draw({
        row: enemyRow,
        col: enemyColumn,
        width: blockWidth,
        height: blockHeight,
        color: colors.fieldColor,
        type: 1,
      });
      //draw new position
      draw({
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
