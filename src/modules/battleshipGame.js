import Gameboard from "./gameboard";
import Ship from "./ship";
import Player from "./Player";
import AI from "./AI";

class Game {
  #gameOver;

  constructor() {
    this.player = new Player();
    this.playerBoard = new Gameboard();
    this.computer = new AI();
    this.computerBoard = new Gameboard();
    this.#gameOver = false;
  }
  isGameOver() {
    return this.#gameOver;
  }

}

export default Game;