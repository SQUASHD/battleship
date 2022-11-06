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
  placeShip(ship, x, y, direction, player = null) {
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
    if (player) {
      player.shipFleet.shift();
    }
  }
  placeShipsRandomly(shipFleet, gameboard) {
    shipFleet.forEach((ship) => {
      let x = Math.floor(Math.random() * gameboard.length);
      let y = Math.floor(Math.random() * gameboard.length);
      let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      while (!Gameboard.canPlaceShip(ship, x, y, direction, gameboard)) {
        x = Math.floor(Math.random() * gameboard.length);
        y = Math.floor(Math.random() * gameboard.length);
        direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      }
      this.placeShip(ship, x, y, direction);
    });
  }
  static canPlaceShip(ship, x, y, direction, gameboard) {
    if (direction === 'horizontal') {
      if (y + ship.length > gameboard.length) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (gameboard[x][y + i] !== 'empty') {
          return false;
        }
      }
    } else {
      if (x + ship.length > gameboard.length) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (gameboard[x + i][y] !== 'empty') {
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
    this.board = Gameboard.createBoard(gameboard.length);
  }
}

export default Gameboard;
