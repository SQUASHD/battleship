import Gameboard from './gameboard';
import Ship from './Ship';
import Player from './Player';
import AI from './AI';
import UI from './UI';

class Game {
  constructor() {
    this.gameOver = false;
    this.standardBoardSize = 7;
  }
  static isGameOver() {
    return this.gameOver;
  }
  static checkGameOver(playerBoard, computerBoard) {
    if (playerBoard.allShipsSunk() || computerBoard.allShipsSunk()) {
      this.gameOver = true;
    }
  }
  static getBoardSize() {
    return this.standardBoardSize;
  }
  static runGame() {
    const userInterface = new UI();
    const p1 = new Player();
    const p2 = new AI();
    const p1Board = new Gameboard();
    const p2Board = new Gameboard();
    p1Board.placeShipsRandomly(p1.shipFleet);
    p2Board.placeShipsRandomly(p2.shipFleet);
    UI.renderPlayerShips(p1Board);
    UI.initAttackListeners(
      p1,
      p2,
      p1Board,
      p2Board,
      userInterface.computerReferenceBoard,
      userInterface.playerReferenceBoard
    );
    UI.renderBoard(userInterface.computerReferenceBoard, 'computer');
  }
}

export default Game;
