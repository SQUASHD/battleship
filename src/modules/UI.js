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

  generateBoards() {
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
    document.body.appendChild(gameboards);

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
}

export default UI;
