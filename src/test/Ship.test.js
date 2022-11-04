import Ship from '../modules/Ship';

describe('Ship functions and attributes', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship('Battleship', 4);
  });
  it('has a name', () => {
    expect(ship.name).toEqual('Battleship');
  });
  it('has a length', () => {
    expect(ship.length).toEqual(4);
  });
  it('has 0 hits', () => {
    expect(ship.hits).toEqual(0);
  });
  it('can be hit', () => {
    ship.hit();
    expect(ship.hits).toEqual(1);
  });
  it('can be sunk', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toEqual(true);
  });
});
