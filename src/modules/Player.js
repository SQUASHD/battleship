class Player {
  constructor(name = 'Player') {
    this.name = name;
  }
  attack(board, x, y) {
    board.receiveAttack(x, y);
  }
}

export default Player;
