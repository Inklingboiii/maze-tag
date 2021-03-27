//imports

import {
  drawRect,
  ctx,
  gridArray,
  blockHeight,
  blockWidth,
  getRandomPosition,
  gameover,
  isGameover,
  colors,
  drawCoin
} from './app.js';

export default function spawnCoins() {
    let coinInterval = setInterval(() => {
        if(isGameover) {
            gameover();
            return clearInterval(coinInterval);
        }
        //get random position
        let [posY, posX] = getRandomPosition();
        //draw coin and register it in array
        drawCoin({
            row: posY,
            col: posX,
            color: colors.coinColor,
            type: 5
        });
    }, 3000);
}