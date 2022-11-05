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
  placePlayerShips() {
    this.playerBoard.placeShip(new Ship("Carrier", 5), 0, 0, "horizontal");
    this.playerBoard.placeShip(new Ship("Battleship", 4), 0, 1, "horizontal");
    this.playerBoard.placeShip(new Ship("Cruiser", 3), 0, 2, "horizontal");
    this.playerBoard.placeShip(new Ship("Submarine", 3), 0, 3, "horizontal");
    this.playerBoard.placeShip(new Ship("Destroyer", 2), 0, 4, "horizontal");
  }
  placeComputerShips() {
    this.computerBoard.placeShip(new Ship("Carrier", 5), 0, 0, "horizontal");
    this.computerBoard.placeShip(new Ship("Battleship", 4), 0, 1, "horizontal");
    this.computerBoard.placeShip(new Ship("Cruiser", 3), 0, 2, "horizontal");
    this.computerBoard.placeShip(new Ship("Submarine", 3), 0, 3, "horizontal");
    this.computerBoard.placeShip(new Ship("Destroyer", 2), 0, 4, "horizontal");
  }
}

export default Game;