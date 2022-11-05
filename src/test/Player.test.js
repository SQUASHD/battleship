import Player from '../modules/Player';

describe('Player functions and attributes', () => {
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