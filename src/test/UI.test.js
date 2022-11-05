import Gameboard from '../modules/gameboard';
import Ship from '../modules/Ship';
import UI from '../modules/UI';

test('UI reference boards accurately maps to actual gameboard', () => {
  const playerBoard = new Gameboard(10);
  const computerBoard = new Gameboard(10);
  const userInterface = new UI(playerBoard, computerBoard);
  expect(userInterface.playerReferenceBoard[0][0]).toBe('empty');
  expect(userInterface.computerReferenceBoard[0][0]).toBe('empty');
});
test('UI reference boards accurately maps to actual gameboard', () => {
  const playerBoard = new Gameboard(10);
  const computerBoard = new Gameboard(10);
  playerBoard.placeShip(new Ship('Carrier', 5), 0, 0, 'horizontal');
  computerBoard.placeShip(new Ship('Carrier', 5), 0, 0, 'horizontal');
  const userInterface = new UI(playerBoard, computerBoard);
  expect(userInterface.playerReferenceBoard[0][0]).toBe('ship');
  expect(userInterface.computerReferenceBoard[0][0]).toBe('ship');
});
