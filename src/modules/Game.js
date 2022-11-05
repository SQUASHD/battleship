import Gameboard from './gameboard';
import Ship from './Ship';
import Player from './Player';
import AI from './AI';
import UI from './UI';

class Game {
  #gameOver;
  constructor() {
    this.#gameOver = false;
  }
  isGameOver() {
    return this.#gameOver;
  }
  playerTurn() {}
  computerTurn() {}

  static runGame() {
    const userInterface = new UI();
    const p1 = new Player();
    const p2 = new AI();
    const p1Board = new Gameboard();
    const p2Board = new Gameboard();
    UI.initPlacementListeners();
    p1Board.placeShip(new Ship('Battleship', 4), 0, 0, 'horizontal');
    p1Board.placeShip(new Ship('Cruiser', 3), 1, 0, 'horizontal');
    p1Board.placeShip(new Ship('Submarine', 3), 2, 0, 'horizontal');
    p1Board.placeShip(new Ship('Destroyer', 2), 3, 0, 'horizontal');
    p2Board.placeShip(new Ship('Battleship', 4), 0, 0, 'horizontal');
    p2Board.placeShip(new Ship('Cruiser', 3), 2, 0, 'horizontal');
    p2Board.placeShip(new Ship('Submarine', 3), 4, 3, 'horizontal');
    p2Board.placeShip(new Ship('Destroyer', 2), 6, 5, 'vertical');
    UI.renderPlayerShips(p1Board);
    UI.renderComputerships(p2Board)
    UI.initAttackListeners(p1, p2Board, userInterface.computerReferenceBoard);
    UI.removeEventListenersBoardSquares();
    UI.renderBoard(userInterface.computerReferenceBoard, 'computer');
    // while (!this.#gameOver) {
    // player/computer turn
    // attack -> receive attack
    // update gameboard
    // update UI
    // check if game is over
  }
}

export default Game;
