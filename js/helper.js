import {
    numberOfRows,
    numberOfColumns,
    canvasHeight,
    canvasWidth,
    gridArray,
    colors,
    blockHeight,
    blockWidth,
    gameCtx,
    coinCtx
} from './app.js'

export default class helper {
    static drawRect({
        row,
        col,
        width = blockWidth,
        height = blockHeight,
        color,
        type,
      }) {
        /*render square:
          1. finding starting square point by multiplying the current column one is currently one times the width of a column(x position) and multiplying the current row with the height of a row
          2. setting the size of the square with the the width of a column and the height of a row*/
        gridArray[Math.round(row)][Math.round(col)].type = type;
        gameCtx.beginPath();
        gameCtx.rect(
          Math.round(col * width),
          Math.round(row * height),
          width,
          height
        );
        gameCtx.fillStyle = color;
        gameCtx.fill();
        gameCtx.strokeStyle = colors.fieldColor;
        gameCtx.stroke();
        gameCtx.closePath();
      }

      static drawCoin({
        row,
        col,
        width = blockWidth,
        height = blockHeight,
        color = colors.coinColor,
      }) {
        //register coin in array
        gridArray[row][col].hasCoin = true;
        //draw random coin
        coinCtx.beginPath();
        //since its a radius, the x and y position needs to be offset into the middle of the square
        coinCtx.arc(
          Math.round(col * width + width / 2),
          Math.round(row * height + height / 2),
          Math.round(width / 2),
          0,
          2 * Math.PI,
          false
        );
        coinCtx.fillStyle = color;
        coinCtx.fill();
        coinCtx.strokeStyle = colors.fieldColor;
        coinCtx.stroke();
      }

      static drawMap(dataGetter) {
        for (let row = 0; row < numberOfRows; row++) {
          for (let col = 0; col < numberOfColumns; col++) {
            //draw block depending on data param
            let randomData = dataGetter();
            this.drawRect({
              row: row,
              col: col,
              color: randomData.color,
              type: randomData.type,
            });
          }
        }
      }

      static getRandomPosition() {
        let positionFound = false;
        while (!positionFound) {
          let randomRow = Math.floor(Math.random() * numberOfRows);
          let randomColumn = Math.floor(Math.random() * numberOfColumns);
          if (gridArray[randomRow][randomColumn].type === 1) {
            positionFound = true;
            return [randomRow, randomColumn];
          }
        }
      }

      static createMapArray() {
        for (let row = 0; row < numberOfRows; row++) {
          gridArray.push([]);
          for (let col = 0; col < numberOfColumns; col++) {
            gridArray[row].push({});
          }
        }
      }

      static drawStartingScreen() {
        coinCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        this.drawMap(() => ({color: colors.fieldColor, type: 69}));
        //draw enemy
        this.drawRect(
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
        this.drawRect(
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
        this.drawRect(
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
      
        this.drawRect(
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
    
          this.drawCoin({
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
          gameCtx.font = 'calc(5vw + 1rem) "Legend Boy"';
          gameCtx.fillText('MAZE', Math.round((canvasWidth/3) * 2), Math.round(canvasHeight/3) / 2);
          gameCtx.fillText('TAG', canvasWidth/3, canvasHeight/3 * 2.5, canvasWidth/3 * 2);
      }
      
      static domData() {
        return {
          enemySpeed: document.querySelector("#enemy-speed").value,
          boardSize:  document.querySelector("#board-size").value,
          colorSchemeRadios: document.getElementsByName("color-scheme"),
          shouldShowTrail: document.querySelector("#show-trail").checked,
          wallFrequency: document.querySelector("#wall-frequency").value,
          root: document.querySelector(":root")
        }
      }
}