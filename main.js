const snakeBox = document.getElementById('container')
const cells = []
const intervalId = setInterval(nextCell, 75)
let direction = 'east'

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
  processCell(nextCell)
}

function processCell(nextCell) {
  snake.push(cells[nextCell])
  let tail = snake.shift()
  tail.classList.remove('snake')
  displaySnake()
}

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
