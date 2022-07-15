const x_class = 'x';
const circle_class = 'circle';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = winningMessageElement.querySelector('[data-winning-message-text]');
const boxElements = document.querySelectorAll('[data-box]');
const restartButton = document.getElementById('restartButton');
const board = document.getElementById('board');
let circleTurn;

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  winningMessageElement.classList.remove('show')
  circleTurn = false
  boxElements.forEach(box => {
    box.classList.remove(x_class)
    box.classList.remove(circle_class)
    box.removeEventListener('click', handleBoxClick)
    box.addEventListener('click', handleBoxClick, { once: true })
  })
  setBoardHoverClass()
}

function handleBoxClick(e) {
  const box = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  placeMark(box, currentClass)
  if (isWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winningMessageElement.classList.add('show');
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function placeMark(box, classToAdd) {
    box.classList.add(classToAdd);
}

function isWin(classToCheck) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boxElements[index].classList.contains(classToCheck)
    });
  })
}

function isDraw() {
  return [...boxElements].every(box => {
    return box.classList.contains(x_class) || box.classList.contains(circle_class)
  });
}

function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (circleTurn) {
    board.classList.add(circle_class);
  } else {
    board.classList.add(x_class);
  }
} 