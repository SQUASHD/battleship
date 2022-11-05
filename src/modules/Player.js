import Ship from './Ship';

class Player {
  constructor(name = 'Player') {
    this.name = name;
    this.shipFleet = Player.#generateFleet();
  }
  attack(board, x, y) {
    board.receiveAttack(x, y);
  }

  static #generateFleet() {
    return [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Cruiser', 3),
      new Ship('Cruiser', 3),
      new Ship('Destroyer', 2),
    ];
  }
}

export default Player;
