import AI from '../modules/AI';
import Player from '../modules/Player';
import Gameboard from '../modules/gameboard';
import Ship from '../modules/Ship';

describe('Player functions and attributes at start', () => {
  let player;
  beforeEach(() => {
    player = new Player();
  });
  it('has a default name', () => {
    expect(player.name).toEqual('Player');
  });
  it('can have a custom name', () => {
    player = new Player('Bob');
    expect(player.name).toEqual('Bob');
  });
});
describe('Player functions during game', () => {
  let player;
  let playerBoard;
  let computer;
  let computerBoard;
  beforeEach(() => {
    player = new Player();
    playerBoard = new Gameboard();
    computer = new AI();
    computerBoard = new Gameboard();
  });
  it('can attack the computer', () => {
    computerBoard.placeShip(new Ship('Carrier', 5), 0, 0, 'horizontal');
    player.attack(computerBoard, 0, 0);
    expect(computerBoard.board[0][0].hits).toBe(1);
  });
});
