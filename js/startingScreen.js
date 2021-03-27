import {
     drawMap,
     drawRect,
     drawCoin,
     colors,
     canvasWidth,
     canvasHeight,
     ctx 
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
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = colors.coinColor;
      ctx.font = '3rem "Legend Boy"';
      ctx.fillText('MAZE', Math.round((canvasWidth/3) * 2), Math.round(canvasHeight/3) / 2);
      ctx.fillText('TAG', canvasWidth/3, canvasHeight/3 * 2.5);
  }