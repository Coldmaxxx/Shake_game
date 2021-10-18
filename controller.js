document.addEventListener("keydown", handleKeydown);

restartBtn.addEventListener("click", handleClick);

function handleKeydown(event) {
  // обрабатывает нажатие клавиатуры;
  if (event.code === "Enter") {
    finishGame();
    startNewGame();
  } else if (event.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
}

function handleClick(event) {
  //обрабатывает нажатие кнопки;
  if (event.target.classList.contains("restartBtn")) {
    startNewGame();
  }
}
