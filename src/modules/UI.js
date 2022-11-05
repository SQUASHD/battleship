import Gameboard from './gameboard';
import Ship from './Ship';
import Game from './Game';

class UI {
  constructor() {
    this.playerReferenceBoard = Gameboard.createBoard(10, null);
    this.computerReferenceBoard = Gameboard.createBoard(10, null);
  }
  static updateReferenceBoardAfterAttack(targetBoard, displayBoard, i, j) {
    if (targetBoard.board[i][j] === 'empty') {
      displayBoard.board[i][j] = 'miss';
    } else if (targetBoard.board[i][j] instanceof Ship) {
      displayBoard.board[i][j] = 'hit';
    } else if (targetBoard.board[i][j].isSunk() === true) {
      displayBoard.board[i][j] = 'sunk';
    }
  }
  static generateApp() {
    UI.generateBoards();
    Game.runGame();
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
  static renderPlayerShips(playerBoard, playerName) {
    let board;
    if (playerName === 'player') {
      board = document.getElementById('playerBoard');
      console.log('player board');
    }
    if (playerName === 'computer') {
      board = document.getElementById('computerBoard');
      console.log('computer board');
    }
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      if (playerBoard.board[i][j] instanceof Ship) {
        square.classList.add('ship');
      }
    });
  }
  static renderBoard(referenceBoard, playerName) {
    let board;
    if (playerName === 'player') {
      board = document.getElementById('playerBoard');
      console.log('player board');
    }
    if (playerName === 'computer') {
      board = document.getElementById('computerBoard');
      console.log('computer board');
    }
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.classList.remove('hit', 'miss', 'sunk');
      if (referenceBoard.board[i][j] !== null) {
        square.classList.add(displayBoard.board[i][j]);
      }
    });
  }
  static initPlacementListeners() {
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-i'));
        const j = parseInt(e.target.getAttribute('data-j'));
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
  static initAttackListeners(targetBoard, referenceBoard) {
    const computerBoard = document.getElementById('computerBoard');
    const boardSquares = computerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-i'));
        const j = parseInt(e.target.getAttribute('data-j'));
        console.log(i, j);
        UI.updateReferenceBoardAfterAttack(targetBoard, referenceBoard, i, j);
      });
    });
  }
}

export default UI;
