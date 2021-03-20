import {
  canvas,
  ctx,
  draw,
  blockWidth,
  blockHeight,
  gridArray,
  numberOfColumns,
  numberOfRows,
  getRandomPosition,
  gameover,
  isGameover
} from "./app.js";
import { up, down, left, right } from "./player.js";

export default function createEnemy() {
  //positional variables
  let route = null;
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
  window.addEventListener("keydown", (key) => {
    if(!isGameover) {
      route.push(addPlayerMoveToRoute(key, route));
    }
  });

  function moveEnemy(routeParam) {
    route = routeParam;
    let updateRouteInterval = setInterval(() => {
      if(isGameover) {
        clearInterval(updateRouteInterval);
      }
      /*let routeLength = route.length;
      for(let i = 0; i < routeLength - 1; i++) {
        draw({
          row: route[i].y,
          col: route[i].x,
          width: blockWidth,
          height: blockHeight,
          color: '#0f0'
        });
      }*/
      route = findBestRoute(enemyRow, enemyColumn);
      /* console.log('after', route)
      routeLength = route.length;
      for(let i = 0; i < routeLength - 2; i++) {
        draw({
          row: route[i].y,
          col: route[i].x,
          width: blockWidth,
          height: blockHeight,
          color: 'orange'
        });
      }*/
    }, 3000);
    let moveInterval = setInterval(() => {
      if(isGameover) {
        console.log('cleared interval')
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

function findBestRoute(enemyY, enemyX) {
  let searchedNodes = new Set([]);
  let startingBlock = {
    y: enemyY,
    x: enemyX,
  };
  searchedNodes.add(JSON.stringify(startingBlock));
  let queue = [];
  addToQueue(startingBlock);
  return checkBranches(JSON.parse(queue[0]));

  function addToQueue(block) {
    let changes = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    changes.forEach((change) => {
      let newBlock = {
        y: block.y + change[0],
        x: block.x + change[1],
      };
      if (
        block.y + change[0] < numberOfRows &&
        block.y + change[0] >= 0 &&
        block.x + change[1] < numberOfColumns &&
        block.x + change[1] >= 0 &&
        !searchedNodes.has(JSON.stringify(newBlock))
      ) {
        gridArray[newBlock.y][newBlock.x].before = block; //add the block from where it came so it can be bacjtracked later and put into the route
        queue.push(JSON.stringify(newBlock));
      }
    });
  }

  function checkBranches(block) {
    /*  draw({
      row: block.y,
      col: block.x,
      height: blockHeight,
      width: blockWidth,
      color: 'yellow',
      type: 1
    })*/
    let stringifiedBlock = JSON.stringify(block);
    // register node as searched
    searchedNodes.add(stringifiedBlock);
    //remove node from queue
    queue = queue.filter((jsonString) => {
      return jsonString !== stringifiedBlock;
    });
    if (!queue.length) {
      //stop recursion if the queue is empty
      console.log("empty queue");
      return;
    }
    //if the node contains the player make the route to the player
    if (gridArray[block.y][block.x].type === 2) {
      return createRoute(block);
    } else {
      //if node contains walkable space add its neighbors to queue
      if (gridArray[block.y][block.x].type === 1) {
        addToQueue(block);
      }
      return checkBranches(JSON.parse(queue[0])); //check next branch
    }
  }

  //backtrack the blocks to create the route
  function createRoute(block) {
    let route = [];
    let routeCreated = false;
    route.unshift(block);
    while (!routeCreated) {
      route.unshift(gridArray[route[0].y][route[0].x].before);
      if (route[0] === startingBlock) {
        routeCreated = true;
        return route;
      }
    }
  }
}

function addPlayerMoveToRoute(key, route) {
  let lastRouteItem = Object.assign({}, route[route.length - 1]);
    let changes = [];
    //if player moved add its movement to the route
    if (gridArray[lastRouteItem.y][lastRouteItem.x] !== 2) {
      if (key.code === up) changes = [-1, 0];
      else if (key.code === down) changes = [1, 0];
      else if (key.code === left) changes = [0, -1];
      else if (key.code === right) changes = [0, 1];
      lastRouteItem.y += changes[0];
      lastRouteItem.x += changes[1];
      return lastRouteItem;
    }
  }
