import Gameboard from './gameboard';
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
  static runGame() {
    Game.gameOver = false;
    const userInterface = new UI();
    const p1 = new Player();
    const p2 = new AI();
    const p1Board = new Gameboard();
    const p2Board = new Gameboard();
    UI.initPlacementListeners(
      p1,
      p2,
      p1Board,
      p2Board,
      userInterface.computerReferenceBoard,
      userInterface.playerReferenceBoard
    );
  }
}

export default Game;
