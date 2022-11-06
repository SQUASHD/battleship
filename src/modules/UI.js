import Gameboard from './gameboard';
import Ship from './Ship';
import Game from './Game';

class UI {
  constructor() {
    this.playerReferenceBoard = Gameboard.createBoard(7, null);
    this.computerReferenceBoard = Gameboard.createBoard(7, null);
  }
  static generateApp() {
    UI.generateHeader();
    UI.generateBoards();
    Game.runGame();
  }
  static generateHeader() {
    const main = document.getElementById('main');
    const headerContainer = document.createElement('div');
    const header = document.createElement('div');
    const subheader = document.createElement('div');

    headerContainer.setAttribute('id', 'header-container');
    subheader.setAttribute('id', 'subheader');
    subheader.textContent = 'Place your ships';
    header.setAttribute('id', 'header');
    header.textContent = 'BATTLESHIP';

    headerContainer.appendChild(header);
    headerContainer.appendChild(subheader);
    main.appendChild(headerContainer);
  }
  static generateBoards() {
    const main = document.getElementById('main');
    const playerBoard = document.createElement('div');
    const playerBoardUIContainer = document.createElement('div');
    const computerBoard = document.createElement('div');
    const computerBoardUIContainer = document.createElement('div');
    const directionToggle = document.createElement('div');
    const someThingToDisplay = document.createElement('div');

    directionToggle.setAttribute('id', 'playerHeader');
    directionToggle.setAttribute('data-direction', 'horizontal');
    directionToggle.classList.add('board-header');
    directionToggle.classList.add('directionToggle');
    directionToggle.textContent = 'Toggle: Horizontal';

    someThingToDisplay.setAttribute('id', 'computerHeader');
    someThingToDisplay.classList.add('board-header');
    someThingToDisplay.textContent = 'Computer Placing Ships';

    playerBoardUIContainer.setAttribute('id', 'playerBoardUIContainer');
    playerBoardUIContainer.setAttribute('class', 'boardUIContainer');
    computerBoardUIContainer.setAttribute('id', 'computerBoardUIContainer');
    computerBoardUIContainer.setAttribute('class', 'boardUIContainer');
    computerBoardUIContainer.classList.add('hidden');

    playerBoard.classList.add('board');
    playerBoard.setAttribute('id', 'playerBoard');
    computerBoard.classList.add('board');
    computerBoard.setAttribute('id', 'computerBoard');

    playerBoardUIContainer.appendChild(directionToggle);
    playerBoardUIContainer.appendChild(playerBoard);
    computerBoardUIContainer.appendChild(someThingToDisplay);
    computerBoardUIContainer.appendChild(computerBoard);

    main.appendChild(playerBoardUIContainer);
    main.appendChild(computerBoardUIContainer);

    for (let i = 0; i < 7; i++) {
      const playerBoardSquare = document.createElement('div');
      const computerBoardSquare = document.createElement('div');
      playerBoardSquare.classList.add('board-square');
      computerBoardSquare.classList.add('board-square');
      playerBoardSquare.classList.add('player-board-square');
      computerBoardSquare.classList.add('computer-board-square');
      playerBoardSquare.setAttribute('data-i', i);
      computerBoardSquare.setAttribute('data-i', i);
      for (let j = 0; j < 7; j++) {
        playerBoardSquare.setAttribute('data-j', j);
        computerBoardSquare.setAttribute('data-j', j);
        playerBoard.appendChild(playerBoardSquare.cloneNode());
        computerBoard.appendChild(computerBoardSquare.cloneNode());
      }
    }
  }
  static initPlacementListeners(
    player,
    computer,
    playerboard,
    computerboard,
    computerReferenceBoard,
    playerReferenceBoard
  ) {
    let requiredLengthOfShip = player.shipFleet[0].length;
    const directionToggle = document.getElementById('playerHeader');
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.player-board-square');
    let direction = directionToggle.getAttribute('data-direction');

    directionToggle.addEventListener('click', (e) => {
      changeToggleButton();
    });
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      changeToggleButton();
      UI.updateShipPlacementIndicators(e, requiredLengthOfShip);
    });

    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-i'));
        const j = parseInt(e.target.getAttribute('data-j'));

        if (square.classList.contains('valid-hover')) {
          playerboard.placeShip(player.shipFleet[0], i, j, direction, player);
          UI.updateShipPlacementIndicators(e, requiredLengthOfShip);
          UI.renderPlayerShips(playerboard);

          if (player.shipFleet[0] !== undefined) {
            requiredLengthOfShip = player.shipFleet[0].length;
          } else {
            UI.toggleComputerBoardVisibility();
            UI.updateHeaders();
            UI.removeBoardSquareEventListeners();
            UI.removeToggleEventListeners();
            computerboard.placeShipsRandomly(computer.shipFleet, computerboard.board);
            this.initAttackListeners(
              player,
              computer,
              playerboard,
              computerboard,
              computerReferenceBoard,
              playerReferenceBoard
            );
          }
        }
      });
      square.addEventListener('mouseenter', (e) => {
        boardSquares.forEach((square) => {
          square.classList.remove('valid-hover');
          square.classList.remove('invalid-hover');
        });
        UI.updateShipPlacementIndicators(e, requiredLengthOfShip);
      });
      square.addEventListener('mouseleave', () => {
        boardSquares.forEach((square) => {
          square.classList.remove('valid-hover');
          square.classList.remove('invalid-hover');
        });
      });
    });

    function changeToggleButton() {
      const directionToggle = document.getElementById('playerHeader');
      if (directionToggle.getAttribute('data-direction') === 'horizontal') {
        directionToggle.setAttribute('data-direction', 'vertical');
        directionToggle.textContent = 'Toggle: Vertical';
        direction = 'vertical';
      } else {
        directionToggle.setAttribute('data-direction', 'horizontal');
        directionToggle.textContent = 'Toggle: Horizontal';
        direction = 'horizontal';
      }
    }
  }
  static updateShipPlacementIndicators(e = null, requiredLengthOfShip = null) {
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.player-board-square');
    const directionToggle = document.getElementById('playerHeader');
    let direction = directionToggle.getAttribute('data-direction');

    const i = parseInt(e.target.getAttribute('data-i'));
    const j = parseInt(e.target.getAttribute('data-j'));

    boardSquares.forEach((square) => {
      square.classList.remove('valid-hover');
      square.classList.remove('invalid-hover');
    });

    if (direction === 'horizontal') {
      // if j + requiredLengthOfShip - 1 > 6 then squares to the right on i are invalid
      // squares from j to j + requiredLengthOfShip - 1 within j < 7 are invalid
      if (j + requiredLengthOfShip - 1 > 6) {
        for (let k = j; k < 7; k++) {
          boardSquares[i * 7 + k].classList.add('invalid-hover');
        }
      }
      // else if any of the squares from j to j + requiredLengthOfShip - 1 have class 'ship' then they are invalid
      else if (boardSquares[i * 7 + j + 1].classList.contains('ship')) {
        for (let k = j; k < j + requiredLengthOfShip; k++) {
          boardSquares[i * 7 + k].classList.add('invalid-hover');
        }
      }
      // else the squares from j to j + requiredLengthOfShip - 1 are valid
      else {
        for (let k = j; k < j + requiredLengthOfShip; k++) {
          boardSquares[i * 7 + k].classList.add('valid-hover');
        }
      }
    }
    if (direction === 'vertical') {
      // if i + requiredLengthOfShip - 1 > 6 then squares below on j are invalid
      // squares from i to i + requiredLengthOfShip - 1 within i < 7 are invalid
      if (i + requiredLengthOfShip - 1 > 6) {
        for (let k = i; k < 7; k++) {
          boardSquares[k * 7 + j].classList.add('invalid-hover');
        }
      }
      // else if any of the squares from i to i + requiredLengthOfShip - 1 have class 'ship' then they are invalid
      else if (boardSquares[(i + 1) * 7 + j].classList.contains('ship')) {
        for (let k = i; k < i + requiredLengthOfShip; k++) {
          boardSquares[k * 7 + j].classList.add('invalid-hover');
        }
      }
      // else the squares from i to i + requiredLengthOfShip - 1 are valid
      else {
        for (let k = i; k < i + requiredLengthOfShip; k++) {
          boardSquares[k * 7 + j].classList.add('valid-hover');
        }
      }
    }
  }

  static updateReferenceBoardAfterAttack(targetBoard, displayBoard, i, j) {
    if (targetBoard.board[i][j] === 'empty') {
      displayBoard[i][j] = 'miss';
    } else if (targetBoard.board[i][j] instanceof Ship) {
      displayBoard[i][j] = 'hit';
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (targetBoard.board[i][j] instanceof Ship) {
          if (targetBoard.board[i][j].isSunk()) {
            displayBoard[i][j] = 'sunk';
          }
        }
      }
    }
  }
  static renderPlayerShips(playerBoard) {
    const board = document.getElementById('playerBoard');
    const boardSquares = board.querySelectorAll('.player-board-square');
    boardSquares.forEach((square) => {
      square.classList.remove('invalid-hover', 'valid-hover', 'ship');
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      if (playerBoard.board[i][j] instanceof Ship) {
        square.classList.add('ship');
      }
    });
  }
  static renderComputerships(computerBoard) {
    const board = document.getElementById('computerBoard');
    const boardSquares = board.querySelectorAll('.computer-board-square');
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      if (computerBoard.board[i][j] instanceof Ship) {
        square.classList.add('ship');
      }
    });
  }
  static renderBoard(referenceBoard, playerName) {
    let board;
    let boardSquares;
    if (playerName === 'player') {
      board = document.getElementById('playerBoard');
      boardSquares = board.querySelectorAll('.player-board-square');
    }
    if (playerName === 'computer') {
      board = document.getElementById('computerBoard');
      boardSquares = board.querySelectorAll('.computer-board-square');
    }
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      square.classList.remove('hit', 'miss', 'sunk');
      if (referenceBoard[i][j] !== null) {
        square.classList.add(referenceBoard[i][j]);
      }
      if (square.classList.contains('miss')) {
        square.textContent = 'X';
      }
    });
  }
  static initAttackListeners(
    player,
    computer,
    playerBoard,
    computerboard,
    computerReferenceBoard,
    playerReferenceBoard
  ) {
    const computerBoard = document.getElementById('computerBoard');
    const boardSquares = computerBoard.querySelectorAll('.computer-board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        if (player.shipFleet.length !== 0) {
          return;
        }
        if (
          square.classList.contains('hit') ||
          square.classList.contains('miss') ||
          square.classList.contains('sunk')
        ) {
          return;
        }
        if (Game.isGameOver()) {
          return;
        }
        UI.handleAttackClick(player, computerboard, computerReferenceBoard, e);
        UI.renderBoard(computerReferenceBoard, 'computer');
        Game.checkGameOver(playerBoard, computerboard);
        if (Game.isGameOver()) {
          UI.displayResult('You Win!');
          return;
        }
        Game.computerTurn(computer, playerBoard, playerReferenceBoard);
        UI.renderBoard(playerReferenceBoard, 'player');
        Game.checkGameOver(playerBoard, computerboard);
        if (Game.isGameOver()) {
          UI.displayResult('You Lose!');
          return;
        }
      });
    });
  }
  static handleAttackClick(player, computerboard, referenceBoard, e) {
    const i = parseInt(e.target.getAttribute('data-i'));
    const j = parseInt(e.target.getAttribute('data-j'));
    player.attack(computerboard, i, j);
    UI.updateReferenceBoardAfterAttack(computerboard, referenceBoard, i, j);
  }
  static removeBoardSquareEventListeners() {
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      let newElement = square.cloneNode(true);
      square.parentNode.replaceChild(newElement, square);
      square.classList.remove('valid-hover');
    });
  }
  static removeToggleEventListeners() {
    const toggleButton = document.getElementById('playerHeader');
    let newElement = toggleButton.cloneNode(true);
    newElement.style.cursor = 'default';
    toggleButton.parentNode.replaceChild(newElement, toggleButton);
  }
  static toggleComputerBoardVisibility() {
    const computerBoard = document.getElementById('computerBoardUIContainer');
    const playerBoard = document.getElementById('playerBoardUIContainer');
    playerBoard.style.gridColumn = '1 / 2';

    computerBoard.style.display = 'flex';
    computerBoard.style.gridColumn = '2 / 3';
  }

  static updateHeaders() {
    const subheader = document.getElementById('subheader');
    const playerHeader = document.getElementById('playerHeader');
    const computerHeader = document.getElementById('computerHeader');
    playerHeader.setAttribute('class', 'board-header');
    playerHeader.removeAttribute('data-direction');
    playerHeader.textContent = 'Your Board';
    computerHeader.textContent = 'Enemy Board';
    subheader.textContent = 'Sink Those Ships!';
  }

  static displayResult(result) {
    UI.removeBoardSquareEventListeners();
    const resetBtn = document.createElement('button');
    const headerContainer = document.getElementById('header-container');
    const header = document.getElementById('header');
    const boardSquare = document.querySelectorAll('.board-square');
    boardSquare.forEach((square) => {
      square.classList.add('game-over');
    });

    headerContainer.lastElementChild.remove();

    resetBtn.textContent = 'Play Again?';
    resetBtn.classList.add('reset-button');

    header.textContent = result;
    headerContainer.appendChild(resetBtn);

    resetBtn.addEventListener('click', () => {
      UI.removeResults();
      UI.generateApp();
    });
  }

  static removeResults() {
    const main = document.getElementById('main');
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }
}

export default UI;
