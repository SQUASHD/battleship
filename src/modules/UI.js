import Gameboard from './gameboard';
import Ship from './Ship';

class UI {
  constructor(playerBoard, computerBoard) {
    this.playerReferenceBoard = UI.interpretBoard(playerBoard);
    this.computerReferenceBoard = UI.interpretBoard(computerBoard);
  }
  static interpretBoard(boardObject) {
    let interfaceArray = [];
    for (let i = 0; i < boardObject.board.length; i++) {
      interfaceArray.push([]);
      for (let j = 0; j < boardObject.board.length; j++) {
        if (boardObject.board[i][j] instanceof Ship) {
          interfaceArray[i].push('ship');
        } else {
          interfaceArray[i].push('empty');
        }
      }
    }
    return interfaceArray;
  }

  renderBoard(board) {}
}

export default UI;
