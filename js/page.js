import { gameCanvas, coinCanvas } from "./app.js";

export default function handlePageElements() {
  //set canvas size

  const canvasContainer = document.querySelector(".canvas-container");
  let windowWidth = Math.round(window.innerWidth / 1.2);
  let windowHeight = Math.round(window.innerHeight / 1.2);
  let size;
  if (windowWidth <= windowHeight) {
    size = windowWidth;
  } else {
    size = windowHeight;
  }
  //set size of canvas and canvascontainer
  [gameCanvas, coinCanvas].forEach((canvas) => {
    canvas.width = size;
    canvas.height = size;
  });
  canvasContainer.style.height = size + "px";
  canvasContainer.style.width = size + "px";

  //enemy speed and board slider
  const speedInput = document.querySelector("#enemy-speed");
  const speedOutput = document.querySelector("#enemy-speed-output");
  const boardSizeInput = document.querySelector("#board-size");
  const boardSizeOutput = document.querySelector("#board-size-output");
  let sliderArray = [
    [speedInput, speedOutput],
    [boardSizeInput, boardSizeOutput],
  ];
  sliderArray.map((slider) => {
    slider[1].textContent = slider[0].value;
    slider[0].addEventListener("input", () => {
      slider[1].textContent = slider[0].value;
    });
  });

  //add sidebar functionality on widget click
  const gameForm = document.querySelector(".settings__game-form");
  const gameFormWidget = document.querySelector(".settings__widget");
  gameFormWidget.addEventListener("click", () => {
    gameForm.classList.toggle("settings__game-form--active");
  });
}
