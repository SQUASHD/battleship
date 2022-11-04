import { Ship } from '../modules/Ship';

describe('Ship', () => {
  const ship = new Ship('Battleship', 4);

  test('has a name', () => {
    expect(ship.name).toBe('Battleship');
  });
});
