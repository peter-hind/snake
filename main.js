const snakeBox = document.getElementById('container')
const tryAgain = document.getElementById('reset')
const cells = []
let intervalId = setInterval(nextCell, 60)
const scoreDisplay = document.getElementById('score')
const highscoreDisplay = document.getElementById('highscore')
let direction = 'east'
let foodCell
let score = 0
let highScore = 0
let gameOver = false

for (let i = 0; i < 10000; i++) {
  const newCell = document.createElement('div')
  cells.push(newCell)
  newCell.classList.add('cell')
  snakeBox.append(newCell)
}

cells[0].classList.add('nw-corner')
cells[99].classList.add('ne-corner')
cells[9900].classList.add('sw-corner')
cells[9999].classList.add('se-corner')

for (let i = 1; i < 99; i++) {
  cells[i].classList.add('north-edge')
  cells[i + 9900].classList.add('south-edge')
}
for (let i = 100; i < 9801; i += 100) {
  cells[i].classList.add('west-edge')
  cells[i + 99].classList.add('east-edge')
}
let snake = [cells[5049], cells[5050], cells[5051]]

function displaySnake() {
  for (let i = 0; i < snake.length; i++) {
    snake[i].classList.add('snake')
  }
}

function nextCell() {
  const currentCell = snake[snake.length - 1]
  let nextCell

  switch (direction) {
    case 'north':
      nextCell = cells.indexOf(currentCell) - 100
      break
    case 'south':
      nextCell = cells.indexOf(currentCell) + 100
      break
    case 'west':
      nextCell = cells.indexOf(currentCell) - 1
      break
    case 'east':
      nextCell = cells.indexOf(currentCell) + 1
      break
  }
  processCell(nextCell, currentCell)
}

function processCell(nextCell, currentCell) {
  if (
    (currentCell.classList.contains('north-edge') ||
      currentCell.classList.contains('nw-corner') ||
      currentCell.classList.contains('ne-corner')) &&
    direction === 'north'
  ) {
    nextCell = cells.indexOf(currentCell) + 9900
  } else if (
    (currentCell.classList.contains('south-edge') ||
      currentCell.classList.contains('sw-corner') ||
      currentCell.classList.contains('se-corner')) &&
    direction === 'south'
  ) {
    nextCell = cells.indexOf(currentCell) - 9900
  } else if (
    (currentCell.classList.contains('east-edge') ||
      currentCell.classList.contains('ne-corner') ||
      currentCell.classList.contains('se-corner')) &&
    direction === 'east'
  ) {
    nextCell = cells.indexOf(currentCell) - 99
  } else if (
    (currentCell.classList.contains('west-edge') ||
      currentCell.classList.contains('nw-corner') ||
      currentCell.classList.contains('sw-corner')) &&
    direction === 'west'
  ) {
    nextCell = cells.indexOf(currentCell) + 99
  }
  if (cells[nextCell] === foodCell) {
    score++
    updateScore()
    foodCell.classList.remove('food')
    foodPop()
  } else if (snake.includes(cells[nextCell])) {
    return gameIsOver()
  } else {
    let tail = snake.shift()
    tail.classList.remove('snake')
  }
  snake.push(cells[nextCell])

  displaySnake()
}

function gameIsOver() {
  gameOver = true
  for (let i = 0; i < snake.length; i++) {
    snake[i].classList.remove('snake')
  }
  if (score > highScore) {
    highScore = score
    score = 0
  }
  clearInterval(intervalId)
  foodCell.classList.remove('food')
  snake = []
  snakeBox.style.backgroundImage = "url('img/gameover.png')"
  tryAgain.style.display = 'block'
  updateScore()
}

function restartGame() {
  direction = 'east'
  gameOver = false
  // nextCell = 5052
  tryAgain.style.display = 'none'
  snakeBox.style.backgroundImage = "url('img/snake.png')"
  snake = [cells[5049], cells[5050], cells[5051]]
  intervalId = setInterval(nextCell, 60)

  displaySnake()
  foodPop()
}

function getRandomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function foodPop() {
  foodCell = cells[getRandomNumber(0, 9999)]
  let validFood = true
  for (let i = 0; i < snake.length; i++) {
    if (snake[i] === foodCell) {
      validFood = false
    }
  }
  if (validFood) {
    foodCell.classList.add('food')
  } else {
    foodPop()
  }
  console.log(validFood)
}

function updateScore() {
  scoreDisplay.innerHTML = `Score: ${score}`
  highscoreDisplay.innerHTML = `Highscore: ${highScore}`
}

tryAgain.onclick = restartGame

document.addEventListener('keyup', function (e) {
  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'south') {
        direction = 'north'
      }
      break
    case 'ArrowDown':
      if (direction !== 'north') {
        direction = 'south'
      }
      break
    case 'ArrowRight':
      if (direction !== 'west') {
        direction = 'east'
      }
      break
    case 'ArrowLeft':
      if (direction !== 'east') {
        direction = 'west'
      }
      break
  }
})

displaySnake()
foodPop()
