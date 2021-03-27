import {
     drawMap,
     drawRect,
     drawCoin,
     colors,
     canvasWidth,
     canvasHeight,
     gameCtx 
    } from './app.js';

export default function drawStartingScreen() {
    drawMap(() => ({color: colors.fieldColor, type: 69}));
    //draw enemy
    drawRect(
      {
        row: 1,
        col: 2,
        width: (canvasWidth/3),
        height: (canvasHeight/3),
        color: colors.enemyColor,
        type: 69
      }
    );
      //draw player
    drawRect(
      {
        row: 1,
        col: 0,
        width: canvasWidth/3,
        height: canvasHeight/3,
        color: colors.playerColor,
        type: 69
      }
    );
  
    //draw trail
    drawRect(
      {
        row: 1,
        col: 1,
        width: canvasWidth/3,
        height: canvasHeight/3,
        color: colors.trailColor,
        type: 69
      }
    );

    //draw wall
  
    drawRect(
      {
        row: 2,
        col: 2,
        width: canvasWidth/3,
        height: canvasHeight/3,
        color: colors.wallColor,
        type: 69
      }
    );

    //draw coin

      drawCoin({
        row: 0,
        col: 0,
        width: canvasWidth/3,
        height: canvasHeight/3,
        color: colors.coinColor,
        type: 69
      })
    //draw text
      gameCtx.textBaseline = 'middle';
      gameCtx.textAlign = 'center';
      gameCtx.fillStyle = colors.coinColor;
      gameCtx.font = '3rem "Legend Boy"';
      gameCtx.fillText('MAZE', Math.round((canvasWidth/3) * 2), Math.round(canvasHeight/3) / 2);
      gameCtx.fillText('TAG', canvasWidth/3, canvasHeight/3 * 2.5);
  }