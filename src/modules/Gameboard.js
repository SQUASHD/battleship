import Ship from "./Ship";

class Gameboard {
  constructor(boardSize = 7) {
    this.board = Gameboard.createBoard(boardSize);
  }
  static createBoard(boardSize) {
    const boardArray = [];
    for (let i = 0; i < boardSize; i++) {
      boardArray.push([]);
      for (let j = 0; j < boardSize; j++) {
        boardArray[i].push('empty');
      }
    }
    return boardArray;
  }
  placeShip(ship, x, y, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship;
      }
    }
  }
  receiveAttack(x, y) {
    if (this.board[x][y] === 'empty') {
      this.board[x][y] = 'miss';
    } else if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hit();
    }
  }
  allShipsSunk() {
    return this.board.every(row => row.every(space => space === 'empty' || space === 'miss' || space.isSunk()));
  }
}

export default Gameboard;
