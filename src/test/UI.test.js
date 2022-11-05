import Gameboard from '../modules/gameboard';
import Ship from '../modules/Ship';
import UI from '../modules/UI';

test('UI reference boards empty when ships not placed', () => {
  const playerBoard = new Gameboard(10);
  const computerBoard = new Gameboard(10);
  const userInterface = new UI();
  expect(
    userInterface.playerReferenceBoard.every((row) => row.every((space) => space === null))
  ).toBe(true);
  expect(
    userInterface.computerReferenceBoard.every((row) => row.every((space) => space === null))
  ).toBe(true);
});
test('UI reference boards accurately maps to actual gameboard', () => {
  const playerBoard = new Gameboard(10);
  const computerBoard = new Gameboard(10);
  playerBoard.placeShip(new Ship('Carrier', 5), 0, 0, 'horizontal');
  computerBoard.placeShip(new Ship('Carrier', 5), 0, 0, 'horizontal');
  const userInterface = new UI(playerBoard, computerBoard);
  playerBoard.receiveAttack(0, 0);
  computerBoard.receiveAttack(0, 0);
  userInterface.updateReferenceBoard(playerBoard.board, userInterface.playerReferenceBoard, 0, 0);
  userInterface.updateReferenceBoard(
    computerBoard.board,
    userInterface.computerReferenceBoard,
    0,
    0
  );
  expect(userInterface.playerReferenceBoard[0][0]).toBe('hit');
  expect(userInterface.computerReferenceBoard[0][0]).toBe('hit');
});
