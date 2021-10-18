function initField() {
  // создает игровое поле;
  for (let i = 0; i < fieldSize; i++) {
    const rowElement = createRow();
    for (let k = 0; k < fieldSize; k++) {
      addCell(rowElement);
    }
  }
}

function createRow() {
  // создает ряд на игровом поле;
  const board = document.getElementById("board");
  const row = document.createElement("div");
  row.className = "row";
  board.appendChild(row);
  return row;
}

function addCell(board) {
  // создает клетки в ряду на игровом поле;
  const elem = document.createElement("div");
  elem.className = `elem`;
  board.appendChild(elem);
}

function startNewGame() {
  //начинает новую игру;
  hideGameOverMessage();

  direction = "down";
  arrSnake = [];
  arrTarget = [];
  newCell = [];
  scores = 0;

  createSnakePicOnField(snakeBodyLength, startingRow, startingColumn);

  createRandomTargetCellOnField();

  timerId = setInterval(calcCoordSnakesNextStep, speed);
}

function createSnakePicOnField(length, row, column) {
  //создает картинку змейки на игровом поле;
  for (let i = 0; i < length; i++) {
    arrSnake.push([row + i, column, direction]);
  }

  const [headPic, bodyPic, tailPic] = selectSnakeElPic(arrSnake[1][2]);
  getCellElement(0).classList.add(tailPic);
  getCellElement(length - 1).classList.add(headPic);

  for (let i = 1; i < length - 1; i++) {
    getCellElement(i).classList.add(bodyPic);
  }
}

function createRandomTargetCellOnField() {
  // создает яблоко на игровом поле;

  arrTarget[0] = getRandomNumber(0, 21);
  arrTarget[1] = getRandomNumber(0, 21);

  while (checkIfSnakeContainsCell(arrTarget[0], arrTarget[1])) {
    arrTarget[0] = getRandomNumber(0, 21);
    arrTarget[1] = getRandomNumber(0, 21);
  }

  const collectionRow = document.getElementsByClassName("row");
  let collectionElem = collectionRow[arrTarget[0]].children;
  randomCell = collectionElem[arrTarget[1]];
  randomCell.classList.add("apple");
}

function moveSnake() {
  // создает движение змейки;
  const [headPic, , tailPic] = selectSnakeElPic(arrSnake[2][2]);

  if (
    arrSnake[arrSnake.length - 1][0] === arrTarget[0] &&
    arrSnake[arrSnake.length - 1][1] === arrTarget[1]
  ) {
    eatTargetCell();
  } else {
    getCellElement(arrSnake.length - 1).classList.add(headPic);

    getCellElement(arrSnake.length - 2).classList = "elem";

    checkSnakeTurn();

    getCellElement(0).classList = "elem";
    getCellElement(1).classList = "elem";
    getCellElement(1).classList.add(tailPic);

    arrSnake.shift();
  }
}

const restartBtn = document.querySelector("#restartBtn");
const gameOverScreenEl = document.getElementById("screen");

function eatTargetCell() {
  //обрабатывает поедание яблока;
  const [headPic, ,] = selectSnakeElPic();

  getCellElement(arrSnake.length - 1).classList = "elem";
  getCellElement(arrSnake.length - 1).classList.add(headPic);
  getCellElement(arrSnake.length - 2).classList = "elem";

  checkSnakeTurn();

  createRandomTargetCellOnField();
  scores++;
}

function checkSnakeTurn() {
  // отслеживает поворот змейки;
  const [, bodyPic] = selectSnakeElPic();
  const turnPic = selectSnakeTurnElPic();

  if (arrSnake[arrSnake.length - 1][2] === arrSnake[arrSnake.length - 2][2]) {
    getCellElement(arrSnake.length - 2).classList.add(bodyPic);
  } else {
    getCellElement(arrSnake.length - 2).classList.add(turnPic);
  }
}

function getCellElement(coords) {
  //выбор позиции по координатам;
  const collectionRow = document.getElementsByClassName("row");
  let collectionElem = collectionRow[arrSnake[coords][0]].children;
  let elemPosition = collectionElem[arrSnake[coords][1]];
  return elemPosition;
}

function hideGameOverMessage() {
  // скрывает сообщение "конец игры";
  gameOverScreenEl.classList.add("hidden");
}

function showGameOverMessage() {
  // показывает сообщение "конец игры";
  gameOverScreenEl.classList.remove("hidden");
}

function finishGame() {
  //показывает сообщение;
  clearInterval(timerId);
  showGameOverMessage();

  scoreEl.innerHTML = scores.toString();
  clearOldElements();
}

function clearOldElements() {
  // удаляет старые изображения змейки и яблока;
  let oldElements = document.getElementsByClassName("elem");

  for (let element of oldElements) {
    element.className = "elem";
  }
}
