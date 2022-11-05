import shipfleet from './shipFleet';

class Player {
  constructor(name = 'Player') {
    this.name = name;
    this.shipFleet = shipfleet();
  }
  attack(board, x, y) {
    board.receiveAttack(x, y);
  }
}

export default Player;
