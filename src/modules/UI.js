import Gameboard from './gameboard';
import Ship from './Ship';
import Game from './Game';

class UI {
  constructor() {
    this.playerReferenceBoard = Gameboard.createBoard(7, null);
    this.computerReferenceBoard = Gameboard.createBoard(7, null);
  }
  static generateApp() {
    UI.generateHeader();
    UI.generateBoards();
    Game.runGame();
  }
  static generateHeader() {
    const main = document.getElementById('main');
    const headerContainer = document.createElement('div');
    const header = document.createElement('div');
    const subheader = document.createElement('div');

    headerContainer.setAttribute('id', 'header-container');
    subheader.setAttribute('id', 'subheader');
    subheader.textContent = 'Place your ships';
    header.setAttribute('id', 'header');
    header.textContent = 'BATTLESHIP';

    headerContainer.appendChild(header);
    headerContainer.appendChild(subheader);
    main.appendChild(headerContainer);
  }
  static generateBoards() {
    const main = document.getElementById('main');
    const playerBoard = document.createElement('div');
    const playerBoardUIContainer = document.createElement('div');
    const computerBoard = document.createElement('div');
    const computerBoardUIContainer = document.createElement('div');
    const directionToggle = document.createElement('div');
    const someThingToDisplay = document.createElement('div');

    directionToggle.setAttribute('id', 'playerHeader');
    directionToggle.setAttribute('data-direction', 'horizontal');
    directionToggle.classList.add('board-header');
    directionToggle.classList.add('directionToggle');
    directionToggle.textContent = 'Current Mode: Horizontal';

    someThingToDisplay.setAttribute('id', 'computerHeader');
    someThingToDisplay.classList.add('board-header');
    someThingToDisplay.textContent = 'Computer Placing Ships';

    playerBoardUIContainer.setAttribute('id', 'playerBoardUIContainer');
    playerBoardUIContainer.setAttribute('class', 'boardUIContainer');
    computerBoardUIContainer.setAttribute('id', 'computerBoardUIContainer');
    computerBoardUIContainer.setAttribute('class', 'boardUIContainer');

    playerBoard.classList.add('board');
    playerBoard.setAttribute('id', 'playerBoard');
    computerBoard.classList.add('board');
    computerBoard.setAttribute('id', 'computerBoard');

    playerBoardUIContainer.appendChild(directionToggle);
    playerBoardUIContainer.appendChild(playerBoard);
    computerBoardUIContainer.appendChild(someThingToDisplay);
    computerBoardUIContainer.appendChild(computerBoard);

    main.appendChild(playerBoardUIContainer);
    main.appendChild(computerBoardUIContainer);

    for (let i = 0; i < 7; i++) {
      const boardSquare = document.createElement('div');
      boardSquare.classList.add('board-square');
      boardSquare.setAttribute('data-i', i);
      for (let j = 0; j < 7; j++) {
        boardSquare.setAttribute('data-j', j);
        playerBoard.appendChild(boardSquare.cloneNode());
        computerBoard.appendChild(boardSquare.cloneNode());
      }
    }
  }
  static initPlacementListeners(
    player,
    computer,
    playerboard,
    computerboard,
    computerReferenceBoard,
    playerReferenceBoard
  ) {
    let squareLength = player.shipFleet[0].length;
    const directionToggle = document.getElementById('playerHeader');
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.board-square');
    let direction = directionToggle.getAttribute('data-direction');

    directionToggle.addEventListener('click', changeToggleButton());

    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-i'));
        const j = parseInt(e.target.getAttribute('data-j'));
        if (square.classList.contains('valid-hover')) {
          playerboard.placeShip(player.shipFleet[0], i, j, direction, player);
          UI.renderPlayerShips(playerboard);
          if (player.shipFleet[0] !== undefined) {
            squareLength = player.shipFleet[0].length;
          } else {
            UI.updateHeaders();
            UI.removeBoardSquareEventListeners();
            UI.removeToggleEventListeners();
            this.initAttackListeners(
              player,
              computer,
              playerboard,
              computerboard,
              computerReferenceBoard,
              playerReferenceBoard
            );
            UI.renderComputerships(computerboard);
          }
        }
      });
      square.addEventListener('mouseenter', (e) => {
        boardSquares.forEach((square) => {
          square.classList.remove('valid-hover');
          square.classList.remove('invalid-hover');
        });
        if (squareLength === 0) return;
        const i = parseInt(e.target.getAttribute('data-i'));
        const j = parseInt(e.target.getAttribute('data-j'));
        console.log(i, j);

        if (direction === 'horizontal' && j + squareLength > 7) {
          for (let k = j; k < 7; k++) {
            boardSquares[i * 7 + k].classList.add('invalid-hover');
          }
        } else if (direction === 'vertical' && i + squareLength > 7) {
          for (let k = i; k < 7; k++) {
            boardSquares[k * 7 + j].classList.add('invalid-hover');
          }
        } else {
          for (let k = 0; k < squareLength; k++) {
            if (direction === 'horizontal') {
              boardSquares[i * 7 + j + k].classList.add('valid-hover');
            } else {
              boardSquares[(i + k) * 7 + j].classList.add('valid-hover');
            }
          }
        }
      });
      square.addEventListener('mouseleave', (e) => {
        boardSquares.forEach((square) => {
          square.classList.remove('valid-hover');
          square.classList.remove('invalid-hover');
        });
      });
    });

    function changeToggleButton() {
      return () => {
        if (directionToggle.getAttribute('data-direction') === 'horizontal') {
          directionToggle.setAttribute('data-direction', 'vertical');
          directionToggle.textContent = 'Current Mode: Vertical';
          direction = 'vertical';
        } else {
          directionToggle.setAttribute('data-direction', 'horizontal');
          directionToggle.textContent = 'Current Mode: Horizontal';
          direction = 'horizontal';
        }
      };
    }
  }

  static updateReferenceBoardAfterAttack(targetBoard, displayBoard, i, j) {
    if (targetBoard.board[i][j] === 'empty') {
      displayBoard[i][j] = 'miss';
    } else if (targetBoard.board[i][j] instanceof Ship) {
      displayBoard[i][j] = 'hit';
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (targetBoard.board[i][j] instanceof Ship) {
          if (targetBoard.board[i][j].isSunk()) {
            displayBoard[i][j] = 'sunk';
          }
        }
      }
    }
  }
  static renderPlayerShips(playerBoard) {
    const board = document.getElementById('playerBoard');
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      if (playerBoard.board[i][j] instanceof Ship) {
        square.classList.add('ship');
      }
    });
  }
  static renderComputerships(computerBoard) {
    const board = document.getElementById('computerBoard');
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      if (computerBoard.board[i][j] instanceof Ship) {
        square.classList.add('ship');
      }
    });
  }
  static renderBoard(referenceBoard, playerName) {
    let board;
    if (playerName === 'player') {
      board = document.getElementById('playerBoard');
    }
    if (playerName === 'computer') {
      board = document.getElementById('computerBoard');
    }
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      square.classList.remove('hit', 'miss', 'sunk');
      if (referenceBoard[i][j] !== null) {
        square.classList.add(referenceBoard[i][j]);
      }
      if (square.classList.contains('miss')) {
        square.textContent = 'X';
      }
    });
  }
  static initAttackListeners(
    player,
    computer,
    playerBoard,
    computerboard,
    computerReferenceBoard,
    playerReferenceBoard
  ) {
    const computerBoard = document.getElementById('computerBoard');
    const boardSquares = computerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        if (player.shipFleet.length !== 0) {
          return;
        }
        if (
          square.classList.contains('hit') ||
          square.classList.contains('miss') ||
          square.classList.contains('sunk')
        ) {
          return;
        }
        if (Game.isGameOver()) {
          return;
        }
        UI.handleAttackClick(player, computerboard, computerReferenceBoard, e);
        UI.renderBoard(computerReferenceBoard, 'computer');
        Game.checkGameOver(playerBoard, computerboard);
        if (Game.isGameOver()) {
          UI.displayResult('You Win!');
          return;
        }
        if (!Game.isGameOver()) {
          Game.computerTurn(computer, playerBoard, playerReferenceBoard);
          UI.renderBoard(playerReferenceBoard, 'player');
        }
        Game.checkGameOver(playerBoard, computerboard);
        if (Game.isGameOver()) {
          UI.displayResult('You Lose!');
          return;
        }
      });
    });
  }
  static handleAttackClick(player, computerboard, referenceBoard, e) {
    const i = parseInt(e.target.getAttribute('data-i'));
    const j = parseInt(e.target.getAttribute('data-j'));
    player.attack(computerboard, i, j);
    UI.updateReferenceBoardAfterAttack(computerboard, referenceBoard, i, j);
  }
  static removeBoardSquareEventListeners() {
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      let newElement = square.cloneNode(true);
      square.parentNode.replaceChild(newElement, square);
    });
  }
  static removeToggleEventListeners() {
    const toggleButton = document.getElementById('playerHeader');
    let newElement = toggleButton.cloneNode(true);
    newElement.style.cursor = 'default';
    toggleButton.parentNode.replaceChild(newElement, toggleButton);
  }
  static updateHeaders() {
    const subheader = document.getElementById('subheader');
    const playerHeader = document.getElementById('playerHeader');
    const computerHeader = document.getElementById('computerHeader');
    playerHeader.textContent = 'Your Board';
    computerHeader.textContent = 'Computer Board';
    subheader.textContent = 'Sink Those Ships!';
  }

  static displayResult(result) {
    UI.removeBoardSquareEventListeners();
    const resetBtn = document.createElement('button');
    const headerContainer = document.getElementById('header-container');
    const header = document.getElementById('header');

    headerContainer.lastElementChild.remove();


    resetBtn.textContent = 'Play Again?';
    resetBtn.classList.add('reset-button');

    header.textContent = result;
    headerContainer.appendChild(resetBtn);

    resetBtn.addEventListener('click', () => {
      UI.removeResults();
      UI.generateApp();
    });
  }

  static removeResults() {
    const main = document.getElementById('main');
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }
}

export default UI;
