import AI from '../modules/AI';

describe('AI functions and attributes', () => {
  let computer;
  beforeEach(() => {
    computer = new AI();
  });
  it('has a default name', () => {
    expect(computer.name).toEqual('Computer');
  });
  it('can have a custom name', () => {
    let newcomputer = new AI('The Admiral');
    expect(newcomputer.name).toEqual('The Admiral');
  });
  it('has a moveList', () => {
    expect(computer.moveList).toBeDefined();
  });
  it('has a moveList with only "none" at start', () => {
    expect(computer.moveList.every(row => row.every(space => space === 'none'))).toBe(true);
  });
  it('can select a random square', () => {
    expect(computer.selectRandomSquare()).toBeDefined();
  });
  it('can select a random square that is not already selected', () => {
    let sampleMoveList = [
      ['none', 'move-made', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ];
    computer.moveList = sampleMoveList;
    expect(computer.selectRandomSquare()).not.toEqual([0, 1]);
  });
  it('selects the last available square if all others are taken', () => {
    let sampleMoveList = [
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'none'],
    ];
    computer.moveList = sampleMoveList;
    expect(computer.selectRandomSquare()).toEqual([6, 6]);
  });
  it('returns null if no more moves are available', () => {
    let sampleMoveList = [
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
      ['move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made', 'move-made'],
    ];
    computer.moveList = sampleMoveList;
    expect(computer.selectRandomSquare()).toBeNull();
  });
});
