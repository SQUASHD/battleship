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

  renderBoard(board) {}
}

export default UI;
