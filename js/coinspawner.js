//imports

import {
  gameCtx,
  gridArray,
  blockHeight,
  blockWidth,
  gameover,
  isGameover,
  colors,
} from './app.js';

import helper from './helper.js';

export default function spawnCoins() {
    let coinInterval = setInterval(() => {
        if(isGameover) {
            gameover();
            return clearInterval(coinInterval);
        }
        //get random position
        let [posY, posX] = helper.getRandomPosition();
        //draw coin and register it in array
        helper.drawCoin({
            row: posY,
            col: posX,
            color: colors.coinColor,
            type: 5
        });
    }, 3000);
}