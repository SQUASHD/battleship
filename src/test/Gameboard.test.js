import Gameboard from '../modules/gameboard';
import Ship from '../modules/Ship';

describe('gameboard functions and attributes', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  it('has a board', () => {
    expect(gameboard.board).toBeDefined();
  });
  it('has a board with the correct size', () => {
    expect(gameboard.board.length).toEqual(10);
    expect(gameboard.board[0].length).toEqual(10);
  });
  it('has a board with all empty spaces', () => {
    expect(gameboard.board.every(row => row.every(space => space === 'empty'))).toBe(true);
  });
});

describe('gameboard functions and attributes during play', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard(7);
  });
  it('can place a ship', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(gameboard.board[0][0]).toEqual(ship);
    expect(gameboard.board[0][1]).toEqual(ship);
    expect(gameboard.board[0][2]).toEqual(ship);
    expect(gameboard.board[0][3]).toEqual(ship);
  });
  it('references same ship in multiple spaces', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(gameboard.board[0][0]).toEqual(gameboard.board[0][1]);
    expect(gameboard.board[0][1]).toEqual(gameboard.board[0][2]);
    expect(gameboard.board[0][2]).toEqual(gameboard.board[0][3]);
  });
  it('can place a ship vertically', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'vertical');
    expect(gameboard.board[0][0]).toEqual(ship);
    expect(gameboard.board[1][0]).toEqual(ship);
    expect(gameboard.board[2][0]).toEqual(ship);
    expect(gameboard.board[3][0]).toEqual(ship);
  });
  it('can receive a hit', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toEqual(1);
  });
  it('can receive a hit on a ship', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0].hits).toBe(1);
  });
  it('can receive multiple attacks', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.board[0][0].hits).toBe(3);
  });
  it('can register a miss', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toEqual('miss');
  });
  it('can tell if all ships sunk trivial case', () => {
    expect(gameboard.allShipsSunk()).toBe(true);
  });
  it('can tell if all ships not sunk trivial case', () => {
    expect(gameboard.allShipsSunk()).not.toBe(false);
  });
  it('can tell if all ships are sunk after ship placement', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
  it('can tell if all ships not sunk after ship placement', () => {
    const ship = new Ship('Battleship', 4);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
