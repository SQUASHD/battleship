import Ship from './Ship';


class Gameboard {
  constructor(boardSize = 10) {
    this.board = Gameboard.createBoard(boardSize);
    this.ships = [];
  }
  static createBoard(boardSize, value = 'empty') {
    let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(value));
    return board;
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
    this.ships.push(ship);
  }
  receiveAttack(x, y) {
    if (this.board[x][y] === 'empty') {
      this.board[x][y] = 'miss';
    } else if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hit();
    }
  }
  allShipsSunk() {
    return this.board.every((row) =>
      row.every((space) => space === 'empty' || space === 'miss' || space.isSunk())
    );
  }
  resetBoard() {
    this.board = Gameboard.createBoard(this.board.length);
  }
}

export default Gameboard;
