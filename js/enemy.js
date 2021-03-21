import {
  draw,
  blockWidth,
  blockHeight,
  gridArray,
  numberOfColumns,
  numberOfRows,
  getRandomPosition,
  gameover,
  isGameover,
} from "./app.js";
import { playerRow, playerColumn, lastPlayerRow, lastPlayerColumn } from "./player.js";
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
    color: "#f00",
    type: 3,
  });
  //hunt player until player is caught
  route = findBestRoute(enemyRow, enemyColumn);
  moveEnemy(route);
  //copy players movement and add it to queue
  window.addEventListener("keydown", (key) => {
    if (!isGameover) {
      //if last player pos is equal to last route pos then add newest player position to route
      if(route[route.length - 1].y === lastPlayerRow && route[route.length - 1].x === lastPlayerColumn) {
        route.push(
          {
            y: playerRow,
            x: playerColumn
          }
        )
        //update route visualization if players position changed
          if(playerRow !== lastPlayerRow || playerColumn !== lastPlayerColumn) {
            draw({row: lastPlayerRow, col: lastPlayerColumn, width: blockWidth, height: blockHeight, color: 'orange', type: 1});
          }
      } else {
        console.log('oops')
      }
    }
  });

  function moveEnemy(routeParam) {
    route = routeParam;
    let updateRouteInterval = setInterval(() => {
      if (isGameover) {
        clearInterval(updateRouteInterval);
      }
      //erase old route visualization
      let routeLength = route.length - 1;
      for (let i = 0; i < routeLength; i++) {
        draw({
          row: route[i].y,
          col: route[i].x,
          width: blockWidth,
          height: blockHeight,
          color: "#0f0",
          type: 1,
        });
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
          color: "orange",
          type: 1,
        });
      }
    }, 1500);
    let moveInterval = setInterval(() => {
      if (isGameover) {
        console.log("cleared interval");
        return clearInterval(moveInterval);
      }
      //for better player detection
      if (gridArray[enemyRow][enemyColumn].type === 2) {
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
        color: "#0f0",
        type: 1,
      });
      //draw new position
      draw({
        row: routeY,
        col: routeX,
        width: blockWidth,
        height: blockHeight,
        color: "#f00",
        type: 3,
      });
      //update enemy position
      enemyRow = routeY;
      enemyColumn = routeX;
      //remove position from route
      route.shift();
      //if touching player stop the hunt
      if (!route.length) {
        gameover();
      }
    }, 200);
    return moveInterval;
  }
}