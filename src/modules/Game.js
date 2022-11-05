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
    Game.placePlayerShips();
    Game.placeComputerShips();
    while (!this.#gameOver) {
      // player turn
      // computer turn
    }
  }
}

export default Game;
