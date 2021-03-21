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
import { up, down, left, right, playerRow, playerColumn, lastPlayerRow, lastPlayerColumn } from "./player.js";
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
      } else {
        console.log('oops')
      }
     /*let additionalPosition = addPlayerMoveToRoute(key, route);
      if (typeof additionalPosition !== "undefined") {
        route.push(additionalPosition);
      }*/
    }
  });

  function moveEnemy(routeParam) {
    route = routeParam;
    let updateRouteInterval = setInterval(() => {
      if (isGameover) {
        clearInterval(updateRouteInterval);
      }
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
      route = findBestRoute(enemyRow, enemyColumn);
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
      let playerY = route[route.length - 1].y;
      let playerX = route[route.length - 1].x;
      //if player position changed update route
      if (gridArray[playerY][playerX].type !== 2) {
        route = findBestRoute(enemyRow, enemyColumn);
      }
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

function addPlayerMoveToRoute(key, route) {
  let lastRouteItem = Object.assign({}, route[route.length - 1]);
  let changes = [];
  //if player moved add its movement to the route
  if (key.code === up) changes = [-1, 0];
  else if (key.code === down) changes = [1, 0];
  else if (key.code === left) changes = [0, -1];
  else if (key.code === right) changes = [0, 1];
  lastRouteItem.y += changes[0];
  lastRouteItem.x += changes[1];
  if (gridArray[lastRouteItem.y][lastRouteItem.x].type === 2) {
    return lastRouteItem;
  }
}
