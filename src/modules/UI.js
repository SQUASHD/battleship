import Gameboard from './gameboard';
import Ship from './Ship';
import Game from './Game';

class UI {
  constructor() {
    this.playerReferenceBoard = Gameboard.createBoard(10, null);
    this.computerReferenceBoard = Gameboard.createBoard(10, null);
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
  static updateReferenceBoardAfterAttack(targetBoard, displayBoard, i, j) {
    if (targetBoard.board[i][j] === 'empty') {
      displayBoard[i][j] = 'miss';
    } else if (targetBoard.board[i][j] instanceof Ship) {
      displayBoard[i][j] = 'hit';
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
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
          UI.removeEventListenersBoardSquares();
          alert('You won!');
          return;
        }
        if (!Game.isGameOver()) {
          UI.computerTurn(computer, playerBoard, playerReferenceBoard);
          UI.renderBoard(playerReferenceBoard, 'player');
        }
        Game.checkGameOver(playerBoard, computerboard);
        if (Game.isGameOver()) {
          UI.removeEventListenersBoardSquares();
          alert('You lost!');
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
  static removeEventListenersBoardSquares() {
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      let newElement = square.cloneNode(true);
      square.parentNode.replaceChild(newElement, square);
    });
  }
  static computerTurn(computer, playerBoard, playerReferenceBoard) {
    const attackCoordinates = computer.selectRandomSquare();
    computer.attack(playerBoard, attackCoordinates[0], attackCoordinates[1]);
    UI.updateReferenceBoardAfterAttack(
      playerBoard,
      playerReferenceBoard,
      attackCoordinates[0],
      attackCoordinates[1]
    );
  }
}

export default UI;
