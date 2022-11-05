import Gameboard from './gameboard';
import Ship from './Ship';

class UI {
  constructor() {
    this.playerReferenceBoard = Gameboard.createBoard(10, null);
    this.computerReferenceBoard = Gameboard.createBoard(10, null);
  }
  updateReferenceBoard(boardObject, displayBoard, i, j) {
    if (boardObject[i][j] === 'empty') {
      displayBoard[i][j] = 'miss';
    } else if (boardObject[i][j] instanceof Ship) {
      displayBoard[i][j] = 'hit';
    } else if (boardObject[i][j].isSunk() === true) {
      displayBoard[i][j] = 'sunk';
    }
  }
  renderBoard(displayBoard) {
    const board = document.getElementById('playerBoard');
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      square.classList.remove('hit', 'miss', 'sunk');
      square.classList.add(displayBoard[i][j]);
    });
  }

  static generateApp() {
    UI.generateBoards();
    UI.initPlacementListeners();
  }

  static generateBoards() {
    const main = document.getElementById('main');
    const gameboards = document.createElement('div');
    const playerBoard = document.createElement('div');
    const computerBoard = document.createElement('div');

    gameboards.setAttribute('id', 'gameboards');
    playerBoard.classList.add('board');
    playerBoard.setAttribute('id', 'playerBoard');
    computerBoard.classList.add('board');
    computerBoard.setAttribute('id', 'computerBoard');

    gameboards.appendChild(playerBoard);
    gameboards.appendChild(computerBoard);
    main.appendChild(gameboards);

    for (let i = 0; i < 10; i++) {
      const boardSquare = document.createElement('div');
      boardSquare.classList.add('board-square');
      boardSquare.setAttribute('data-i', i);
      for (let j = 0; j < 10; j++) {
        boardSquare.setAttribute('data-j', j);
        playerBoard.appendChild(boardSquare.cloneNode());
        computerBoard.appendChild(boardSquare.cloneNode());
      }
    }
  }
  static initPlacementListeners() {
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = e.target.getAttribute('data-i');
        const j = e.target.getAttribute('data-j');
        console.log(i, j);
      });
    });
  }
  static removePlacementListeners() {
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.removeEventListener('click', (e) => {
        const i = e.target.getAttribute('data-i');
        const j = e.target.getAttribute('data-j');
        console.log(i, j);
      });
    });
  }
  static initAttackListeners() {
    const computerBoard = document.getElementById('computerBoard');
    const boardSquares = computerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = e.target.getAttribute('data-i');
        const j = e.target.getAttribute('data-j');
        console.log(i, j);
      });
    });
  }
}

export default UI;
