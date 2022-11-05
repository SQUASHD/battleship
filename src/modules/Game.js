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

  runGame() {
    const p1 = new Player();
    const p2 = new AI();
    const p1Board = new Gameboard();
    const p2Board = new Gameboard();

    // while (!p1board.#shipsPlaced)
      // UI.initPlacementListeners(p1Board);
      // p1Board.placeShips() || p1Board.placeRandomShips();
      // ready click -> p1Board.shipsPlace = true;
      // UI.removePlacementListeners();
      // p2Board.placeRandomShips();
      // UI.initGameListeners(p1Board);
    while (!this.#gameOver) {
      // player/computer turn
      // attack -> receive attack
      // update gameboard
      // update UI
      // check if game is over
    }
  }
}

export default Game;
