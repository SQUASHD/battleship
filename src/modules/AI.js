import Ship from './Ship';

class AI {
  constructor(name = 'Computer', currentBoardSize = 10) {
    this.name = name;
    this.moveList = AI.generateMoveList(currentBoardSize);
    this.shipFleet = this.#generateFleet();
  }
  static generateMoveList(boardSize) {
    const moveList = [];
    for (let i = 0; i < boardSize; i++) {
      moveList.push([]);
      for (let j = 0; j < boardSize; j++) {
        moveList[i].push('none');
      }
    }
    return moveList;
  }
  attack(board, x, y) {
    board.receiveAttack(x, y);
  }
  selectRandomSquare() {
    if (noMoreMoves(this.moveList)) {
      return null;
    }

    let x = Math.floor(Math.random() * this.moveList.length);
    let y = Math.floor(Math.random() * this.moveList.length);
    while (this.moveList[x][y] !== 'none') {
      x = Math.floor(Math.random() * this.moveList.length);
      y = Math.floor(Math.random() * this.moveList.length);
    }
    this.moveList[x][y] = 'move-made';

    return [x, y];

    function noMoreMoves(moveList) {
      return moveList.every((row) => row.every((space) => space !== 'none'));
    }
  }
  #generateFleet() {
    return [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Cruiser', 3),
      new Ship('Cruiser', 3),
      new Ship('Destroyer', 2),
    ];
  }
}

export default AI;
