//imports

import {
  drawRect,
  blockWidth,
  blockHeight,
  gridArray,
  numberOfColumns,
  numberOfRows,
  isGameover,
} from "./app.js"

import { playerRow, playerColumn, lastPlayerRow, lastPlayerColumn } from './player.js';

export default function findBestRoute(enemyY, enemyX) {
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
      let stringifiedBlock = JSON.stringify(block);
      // register node as searched
      searchedNodes.add(stringifiedBlock);
      //remove node from queue
      queue = queue.filter((jsonString) => {
        return jsonString !== stringifiedBlock;
      });
      if (!queue.length) {
        //stop recursion if the queue is empty
        console.log(searchedNodes, gridArray.slice());
        for (let i = 0; i < numberOfRows; i++) {
          for (let j = 0; j < numberOfColumns; j++) {
            if (gridArray[i][j].type === 2) {
              console.log('player position', i, j);
            }
          }
        }
        console.log("empty queue");
        return;
      }
      //if the node contains the player make the route to the player
      if (block.y === playerRow && block.x === playerColumn) {
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