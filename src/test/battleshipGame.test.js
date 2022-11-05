import Game from '../modules/battleshipGame';

describe('Game functions and attributes at startup', () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });
  it('has a player', () => {
    expect(game.player).toBeDefined();
  });
  it('has a computer player', () => {
    expect(game.computer).toBeDefined();
  });
  it('has a gameboard for the player', () => {
    expect(game.playerBoard).toBeDefined();
  });
  it('has a gameboard for the computer', () => {
    expect(game.computerBoard).toBeDefined();
  });
  it('is not game over at start', () => {
    expect(game.isGameOver()).toBe(false);
  });
});

describe('Game functions during set up', () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });
  it('can place ships on the player board', () => {
    game.placePlayerShips();
    expect(game.playerBoard.ships.length).toBe(5);
  });
  it('can place ships on the computer board', () => {
    game.placeComputerShips();
    expect(game.computerBoard.ships.length).toBe(5);
  });
});