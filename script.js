const scoreEl = document.getElementById("result");
const fieldSize = 22; // размер игрового поля;
const speed = 500; // скорость движения змейки;
const snakeBodyLength = 4; // начальная длина змейки;
const startingRow = 0; // начальный ряд тела змейки;
const startingColumn = 10; //начальная колонка тела змейки;

let direction; //направление движения;
let arrSnake; // координаты  змейки;
let arrTarget; // координаты случайной точки;
let newCell; // координаты нового элемента змейки;
let scores; // заработанные баллы;
let timerId;

initField();

startNewGame();

function calcCoordSnakesNextStep() {
  //вычисляет координаты следующего шага змейки;
  if (direction === "up") {
    newCell.push(arrSnake[arrSnake.length - 1][0] - 1);
    newCell.push(arrSnake[arrSnake.length - 1][1]);
    newCell.push(direction);
  } else if (direction === "down") {
    newCell.push(arrSnake[arrSnake.length - 1][0] + 1);
    newCell.push(arrSnake[arrSnake.length - 1][1]);
    newCell.push(direction);
  } else if (direction === "left") {
    newCell.push(arrSnake[arrSnake.length - 1][0]);
    newCell.push(arrSnake[arrSnake.length - 1][1] - 1);
    newCell.push(direction);
  } else if (direction === "right") {
    newCell.push(arrSnake[arrSnake.length - 1][0]);
    newCell.push(arrSnake[arrSnake.length - 1][1] + 1);
    newCell.push(direction);
  }

  if (
    checkSnakeForWallCollision() ||
    checkIfSnakeContainsCell(newCell[0], newCell[1])
  ) {
    finishGame();
    return;
  }

  arrSnake.push([]);
  arrSnake[arrSnake.length - 1].push(newCell[0]);
  arrSnake[arrSnake.length - 1].push(newCell[1]);
  arrSnake[arrSnake.length - 1].push(newCell[2]);
  newCell.splice(0, 3);

  moveSnake();
}

function getRandomNumber(min, max) {
  //генерирует случайное число;
  return Math.round(Math.random() * (max - min) + min);
}

function checkSnakeForWallCollision() {
  // проверяет выход за границы игрового поля;
  return (
    newCell[0] < 0 ||
    newCell[0] > fieldSize - 1 ||
    newCell[1] < 0 ||
    newCell[1] > fieldSize - 1
  );
}

function checkIfSnakeContainsCell(row, column) {
  //проверяет совпадение элемента с  телом змейки; //
  let hasCollision = false;

  for (let i = 0; i < arrSnake.length; i++) {
    if (arrSnake[i][0] === row && arrSnake[i][1] === column) {
      hasCollision = true;
    }
  }
  return hasCollision;
}

function selectSnakeElPic(directionTail) {
  // выбирает картинки для элементов тела змейки;

  if (direction === "up") {
    headPic = "headUp";
    bodyPic = "bodyVertical";
  } else if (direction === "down") {
    headPic = "headDown";
    bodyPic = "bodyVertical";
  } else if (direction === "left") {
    headPic = "headLeft";
    bodyPic = "bodyHorizontal";
  } else if (direction === "right") {
    headPic = "headRight";
    bodyPic = "bodyHorizontal";
  }

  if (directionTail === "up") {
    tailPic = "tailDown";
  } else if (directionTail === "down") {
    tailPic = "tailUp";
  } else if (directionTail === "left") {
    tailPic = "tailRight";
  } else if (directionTail === "right") {
    tailPic = "tailLeft";
  }
  return [headPic, bodyPic, tailPic];
}

function selectSnakeTurnElPic() {
  // выбирает картинку для угловых элементов змейки;
  if (
    (arrSnake[arrSnake.length - 1][2] === "up" &&
      arrSnake[arrSnake.length - 2][2] === "right") ||
    (arrSnake[arrSnake.length - 1][2] === "left" &&
      arrSnake[arrSnake.length - 2][2] === "down")
  ) {
    turnPic = "bodyTopLeft";
  } else if (
    (arrSnake[arrSnake.length - 1][2] === "up" &&
      arrSnake[arrSnake.length - 2][2] === "left") ||
    (arrSnake[arrSnake.length - 1][2] === "right" &&
      arrSnake[arrSnake.length - 2][2] === "down")
  ) {
    turnPic = "bodyTopRight";
  } else if (
    (arrSnake[arrSnake.length - 1][2] === "down" &&
      arrSnake[arrSnake.length - 2][2] === "left") ||
    (arrSnake[arrSnake.length - 1][2] === "right" &&
      arrSnake[arrSnake.length - 2][2] === "up")
  ) {
    turnPic = "bodyBottomRight";
  } else if (
    (arrSnake[arrSnake.length - 1][2] === "down" &&
      arrSnake[arrSnake.length - 2][2] === "right") ||
    (arrSnake[arrSnake.length - 1][2] === "left" &&
      arrSnake[arrSnake.length - 2][2] === "up")
  ) {
    turnPic = "bodyBottomLeft";
  } else turnPic = undefined;
  return turnPic;
}
