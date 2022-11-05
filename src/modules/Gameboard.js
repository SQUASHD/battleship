import Ship from './Ship';

class Gameboard {
  constructor(boardSize = 7) {
    this.board = Gameboard.createBoard(boardSize);
    this.ships = [];
  }
  static createBoard(boardSize, value = 'empty') {
    let board = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(value));
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
  placeShipsRandomly(shipFleet) {
    shipFleet.forEach((ship) => {
      let x = Math.floor(Math.random() * this.board.length);
      let y = Math.floor(Math.random() * this.board.length);
      let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      while (!this.canPlaceShip(ship, x, y, direction)) {
        x = Math.floor(Math.random() * this.board.length);
        y = Math.floor(Math.random() * this.board.length);
        direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      }
      this.placeShip(ship, x, y, direction);
    });
  }
  canPlaceShip(ship, x, y, direction) {
    if (direction === 'horizontal') {
      if (y + ship.length > this.board.length) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i] !== 'empty') {
          return false;
        }
      }
    } else {
      if (x + ship.length > this.board.length) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y] !== 'empty') {
          return false;
        }
      }
    }
    return true;
  }
  receiveAttack(x, y) {
    if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hit();
    }
  }
  allShipsSunk() {
    return this.board.every((row) =>
      row.every((space) => space === 'empty' || space === 'miss' || space.isSunk())
    );
  }
  static resetBoard() {
    this.board = Gameboard.createBoard(this.board.length);
  }
}

export default Gameboard;
