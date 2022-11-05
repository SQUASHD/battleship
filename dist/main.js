/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/AI.js":
/*!***************************!*\
  !*** ./src/modules/AI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class AI {
  constructor(name = 'Computer', currentBoardSize = 10) {
    this.name = name;
    this.moveList = AI.generateMoveList(currentBoardSize);
  }
  static generateMoveList(boardSize) {
    const moveList = [];
    for (let i = 0; i < boardSize; i++) {
      moveList.push([]);
      for (let j = 0; j < boardSize; j++) {
        moveList[i].push('none');
      }
    }
    return moveList;
  }

  selectRandomSquare() {
    if (noMoreMoves(this.moveList)) {
      return null;
    }

    let x = Math.floor(Math.random() * this.moveList.length);
    let y = Math.floor(Math.random() * this.moveList.length);
    while (this.moveList[x][y] !== 'none') {
      x = Math.floor(Math.random() * this.moveList.length);
      y = Math.floor(Math.random() * this.moveList.length);
    }
    this.moveList[x][y] = 'move-made';

    return [x, y];

    function noMoreMoves(moveList) {
      return moveList.every((row) => row.every((space) => space !== 'none'));
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AI);


/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/modules/Player.js");
/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AI */ "./src/modules/AI.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");






class Game {
  #gameOver;
  constructor() {
    this.#gameOver = false;
  }
  isGameOver() {
    return this.#gameOver;
  }
  playerTurn() {}
  computerTurn() {}

  static runGame() {
    const userInterface = new _UI__WEBPACK_IMPORTED_MODULE_4__["default"]();
    const p1 = new _Player__WEBPACK_IMPORTED_MODULE_2__["default"]();
    const p2 = new _AI__WEBPACK_IMPORTED_MODULE_3__["default"]();
    const p1Board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const p2Board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    _UI__WEBPACK_IMPORTED_MODULE_4__["default"].initPlacementListeners();
    // place player ships
    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Battleship', 4), 0, 0, 'horizontal');
    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Cruiser', 3), 1, 0, 'horizontal');
    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Submarine', 3), 2, 0, 'horizontal');
    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Destroyer', 2), 3, 0, 'horizontal');
    // UI.removePlacementListeners();
    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Battleship', 4), 0, 0, 'horizontal');
    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Cruiser', 3), 2, 0, 'horizontal');
    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Submarine', 3), 4, 3, 'horizontal');
    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]('Destroyer', 2), 6, 5, 'vertical');
    _UI__WEBPACK_IMPORTED_MODULE_4__["default"].renderPlayerShips(p1Board, 'player');
    _UI__WEBPACK_IMPORTED_MODULE_4__["default"].renderPlayerShips(p2Board, 'computer')
    _UI__WEBPACK_IMPORTED_MODULE_4__["default"].initAttackListeners(p2Board, userInterface.computerReferenceBoard);
    // UI.renderBoard(userInterface.playerReferenceBoard);
    // while (!this.#gameOver) {
    // player/computer turn
    // attack -> receive attack
    // update gameboard
    // update UI
    // check if game is over
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");


class Player {
  constructor(name = 'Player') {
    this.name = name;
    this.shipFleet = Player.#generateFleet();
  }
  attack(board, x, y) {
    board.receiveAttack(x, y);
  }

  static #generateFleet() {
    return [
      new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]('Carrier', 5),
      new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]('Battleship', 4),
      new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]('Cruiser', 3),
      new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]('Submarine', 3),
      new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]('Destroyer', 2),
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
  }
  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits === this.length;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game */ "./src/modules/Game.js");




class UI {
  constructor() {
    this.playerReferenceBoard = _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].createBoard(10, null);
    this.computerReferenceBoard = _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].createBoard(10, null);
  }
  static updateReferenceBoardAfterAttack(targetBoard, displayBoard, i, j) {
    if (targetBoard.board[i][j] === 'empty') {
      displayBoard.board[i][j] = 'miss';
    } else if (targetBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      displayBoard.board[i][j] = 'hit';
    } else if (targetBoard.board[i][j].isSunk() === true) {
      displayBoard.board[i][j] = 'sunk';
    }
  }
  static generateApp() {
    UI.generateBoards();
    _Game__WEBPACK_IMPORTED_MODULE_2__["default"].runGame();
  }

  static generateBoards() {
    const main = document.getElementById('main');
    const gameboards = document.createElement('div');
    const playerBoard = document.createElement('div');
    const computerBoard = document.createElement('div');

    gameboards.setAttribute('id', 'gameboards');
    playerBoard.classList.add('board');
    playerBoard.setAttribute('id', 'playerBoard');
    computerBoard.classList.add('board');
    computerBoard.setAttribute('id', 'computerBoard');

    gameboards.appendChild(playerBoard);
    gameboards.appendChild(computerBoard);
    main.appendChild(gameboards);

    for (let i = 0; i < 10; i++) {
      const boardSquare = document.createElement('div');
      boardSquare.classList.add('board-square');
      boardSquare.setAttribute('data-i', i);
      for (let j = 0; j < 10; j++) {
        boardSquare.setAttribute('data-j', j);
        playerBoard.appendChild(boardSquare.cloneNode());
        computerBoard.appendChild(boardSquare.cloneNode());
      }
    }
  }
  static renderPlayerShips(playerBoard, playerName) {
    let board;
    if (playerName === 'player') {
      board = document.getElementById('playerBoard');
      console.log('player board');
    }
    if (playerName === 'computer') {
      board = document.getElementById('computerBoard');
      console.log('computer board');
    }
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      const i = square.getAttribute('data-i');
      const j = square.getAttribute('data-j');
      if (playerBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        square.classList.add('ship');
      }
    });
  }
  static renderBoard(referenceBoard, playerName) {
    let board;
    if (playerName === 'player') {
      board = document.getElementById('playerBoard');
      console.log('player board');
    }
    if (playerName === 'computer') {
      board = document.getElementById('computerBoard');
      console.log('computer board');
    }
    const boardSquares = board.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.classList.remove('hit', 'miss', 'sunk');
      if (referenceBoard.board[i][j] !== null) {
        square.classList.add(displayBoard.board[i][j]);
      }
    });
  }
  static initPlacementListeners() {
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-i'));
        const j = parseInt(e.target.getAttribute('data-j'));
        console.log(i, j);
      });
    });
  }
  static removePlacementListeners() {
    const playerBoard = document.getElementById('playerBoard');
    const boardSquares = playerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.removeEventListener('click', (e) => {
        const i = e.target.getAttribute('data-i');
        const j = e.target.getAttribute('data-j');
        console.log(i, j);
      });
    });
  }
  static initAttackListeners(targetBoard, referenceBoard) {
    const computerBoard = document.getElementById('computerBoard');
    const boardSquares = computerBoard.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-i'));
        const j = parseInt(e.target.getAttribute('data-j'));
        console.log(i, j);
        UI.updateReferenceBoardAfterAttack(targetBoard, referenceBoard, i, j);
      });
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);


/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");



class Gameboard {
  constructor(boardSize = 10) {
    this.board = Gameboard.createBoard(boardSize);
    this.ships = [];
  }
  static createBoard(boardSize, value = 'empty') {
    let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(value));
    return board;
  }
  placeShip(ship, x, y, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship;
      }
    }
    this.ships.push(ship);
  }
  receiveAttack(x, y) {
    if (this.board[x][y] === 'empty') {
      this.board[x][y] = 'miss';
    } else if (this.board[x][y] instanceof _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.board[x][y].hit();
    }
  }
  allShipsSunk() {
    return this.board.every((row) =>
      row.every((space) => space === 'empty' || space === 'miss' || space.isSunk())
    );
  }
  static resetBoard() {
    this.board = Gameboard.createBoard(this.board.length);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");
/* harmony import */ var _modules_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Game */ "./src/modules/Game.js");



document.addEventListener('DOMContentLoaded', _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"].generateApp);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UCxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxFQUFFLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSFE7OztBQUcxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0EsTUFBTTtBQUNOLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0scUNBQXFDLDZDQUFJO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7VUN6Q3pCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQ0k7O0FBRWxDLDhDQUE4QywrREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9BSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFJIHtcbiAgY29uc3RydWN0b3IobmFtZSA9ICdDb21wdXRlcicsIGN1cnJlbnRCb2FyZFNpemUgPSAxMCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tb3ZlTGlzdCA9IEFJLmdlbmVyYXRlTW92ZUxpc3QoY3VycmVudEJvYXJkU2l6ZSk7XG4gIH1cbiAgc3RhdGljIGdlbmVyYXRlTW92ZUxpc3QoYm9hcmRTaXplKSB7XG4gICAgY29uc3QgbW92ZUxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkU2l6ZTsgaSsrKSB7XG4gICAgICBtb3ZlTGlzdC5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRTaXplOyBqKyspIHtcbiAgICAgICAgbW92ZUxpc3RbaV0ucHVzaCgnbm9uZScpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW92ZUxpc3Q7XG4gIH1cblxuICBzZWxlY3RSYW5kb21TcXVhcmUoKSB7XG4gICAgaWYgKG5vTW9yZU1vdmVzKHRoaXMubW92ZUxpc3QpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubW92ZUxpc3QubGVuZ3RoKTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubW92ZUxpc3QubGVuZ3RoKTtcbiAgICB3aGlsZSAodGhpcy5tb3ZlTGlzdFt4XVt5XSAhPT0gJ25vbmUnKSB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlTGlzdC5sZW5ndGgpO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubW92ZUxpc3QubGVuZ3RoKTtcbiAgICB9XG4gICAgdGhpcy5tb3ZlTGlzdFt4XVt5XSA9ICdtb3ZlLW1hZGUnO1xuXG4gICAgcmV0dXJuIFt4LCB5XTtcblxuICAgIGZ1bmN0aW9uIG5vTW9yZU1vdmVzKG1vdmVMaXN0KSB7XG4gICAgICByZXR1cm4gbW92ZUxpc3QuZXZlcnkoKHJvdykgPT4gcm93LmV2ZXJ5KChzcGFjZSkgPT4gc3BhY2UgIT09ICdub25lJykpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBSTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IEFJIGZyb20gJy4vQUknO1xuaW1wb3J0IFVJIGZyb20gJy4vVUknO1xuXG5jbGFzcyBHYW1lIHtcbiAgI2dhbWVPdmVyO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLiNnYW1lT3ZlciA9IGZhbHNlO1xuICB9XG4gIGlzR2FtZU92ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2dhbWVPdmVyO1xuICB9XG4gIHBsYXllclR1cm4oKSB7fVxuICBjb21wdXRlclR1cm4oKSB7fVxuXG4gIHN0YXRpYyBydW5HYW1lKCkge1xuICAgIGNvbnN0IHVzZXJJbnRlcmZhY2UgPSBuZXcgVUkoKTtcbiAgICBjb25zdCBwMSA9IG5ldyBQbGF5ZXIoKTtcbiAgICBjb25zdCBwMiA9IG5ldyBBSSgpO1xuICAgIGNvbnN0IHAxQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgY29uc3QgcDJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICBVSS5pbml0UGxhY2VtZW50TGlzdGVuZXJzKCk7XG4gICAgLy8gcGxhY2UgcGxheWVyIHNoaXBzXG4gICAgcDFCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoJ0JhdHRsZXNoaXAnLCA0KSwgMCwgMCwgJ2hvcml6b250YWwnKTtcbiAgICBwMUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnQ3J1aXNlcicsIDMpLCAxLCAwLCAnaG9yaXpvbnRhbCcpO1xuICAgIHAxQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdTdWJtYXJpbmUnLCAzKSwgMiwgMCwgJ2hvcml6b250YWwnKTtcbiAgICBwMUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnRGVzdHJveWVyJywgMiksIDMsIDAsICdob3Jpem9udGFsJyk7XG4gICAgLy8gVUkucmVtb3ZlUGxhY2VtZW50TGlzdGVuZXJzKCk7XG4gICAgcDJCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoJ0JhdHRsZXNoaXAnLCA0KSwgMCwgMCwgJ2hvcml6b250YWwnKTtcbiAgICBwMkJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnQ3J1aXNlcicsIDMpLCAyLCAwLCAnaG9yaXpvbnRhbCcpO1xuICAgIHAyQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdTdWJtYXJpbmUnLCAzKSwgNCwgMywgJ2hvcml6b250YWwnKTtcbiAgICBwMkJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnRGVzdHJveWVyJywgMiksIDYsIDUsICd2ZXJ0aWNhbCcpO1xuICAgIFVJLnJlbmRlclBsYXllclNoaXBzKHAxQm9hcmQsICdwbGF5ZXInKTtcbiAgICBVSS5yZW5kZXJQbGF5ZXJTaGlwcyhwMkJvYXJkLCAnY29tcHV0ZXInKVxuICAgIFVJLmluaXRBdHRhY2tMaXN0ZW5lcnMocDJCb2FyZCwgdXNlckludGVyZmFjZS5jb21wdXRlclJlZmVyZW5jZUJvYXJkKTtcbiAgICAvLyBVSS5yZW5kZXJCb2FyZCh1c2VySW50ZXJmYWNlLnBsYXllclJlZmVyZW5jZUJvYXJkKTtcbiAgICAvLyB3aGlsZSAoIXRoaXMuI2dhbWVPdmVyKSB7XG4gICAgLy8gcGxheWVyL2NvbXB1dGVyIHR1cm5cbiAgICAvLyBhdHRhY2sgLT4gcmVjZWl2ZSBhdHRhY2tcbiAgICAvLyB1cGRhdGUgZ2FtZWJvYXJkXG4gICAgLy8gdXBkYXRlIFVJXG4gICAgLy8gY2hlY2sgaWYgZ2FtZSBpcyBvdmVyXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSA9ICdQbGF5ZXInKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnNoaXBGbGVldCA9IFBsYXllci4jZ2VuZXJhdGVGbGVldCgpO1xuICB9XG4gIGF0dGFjayhib2FyZCwgeCwgeSkge1xuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gIH1cblxuICBzdGF0aWMgI2dlbmVyYXRlRmxlZXQoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBTaGlwKCdDYXJyaWVyJywgNSksXG4gICAgICBuZXcgU2hpcCgnQmF0dGxlc2hpcCcsIDQpLFxuICAgICAgbmV3IFNoaXAoJ0NydWlzZXInLCAzKSxcbiAgICAgIG5ldyBTaGlwKCdTdWJtYXJpbmUnLCAzKSxcbiAgICAgIG5ldyBTaGlwKCdEZXN0cm95ZXInLCAyKSxcbiAgICBdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxuY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBsYXllclJlZmVyZW5jZUJvYXJkID0gR2FtZWJvYXJkLmNyZWF0ZUJvYXJkKDEwLCBudWxsKTtcbiAgICB0aGlzLmNvbXB1dGVyUmVmZXJlbmNlQm9hcmQgPSBHYW1lYm9hcmQuY3JlYXRlQm9hcmQoMTAsIG51bGwpO1xuICB9XG4gIHN0YXRpYyB1cGRhdGVSZWZlcmVuY2VCb2FyZEFmdGVyQXR0YWNrKHRhcmdldEJvYXJkLCBkaXNwbGF5Qm9hcmQsIGksIGopIHtcbiAgICBpZiAodGFyZ2V0Qm9hcmQuYm9hcmRbaV1bal0gPT09ICdlbXB0eScpIHtcbiAgICAgIGRpc3BsYXlCb2FyZC5ib2FyZFtpXVtqXSA9ICdtaXNzJztcbiAgICB9IGVsc2UgaWYgKHRhcmdldEJvYXJkLmJvYXJkW2ldW2pdIGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgZGlzcGxheUJvYXJkLmJvYXJkW2ldW2pdID0gJ2hpdCc7XG4gICAgfSBlbHNlIGlmICh0YXJnZXRCb2FyZC5ib2FyZFtpXVtqXS5pc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgZGlzcGxheUJvYXJkLmJvYXJkW2ldW2pdID0gJ3N1bmsnO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2VuZXJhdGVBcHAoKSB7XG4gICAgVUkuZ2VuZXJhdGVCb2FyZHMoKTtcbiAgICBHYW1lLnJ1bkdhbWUoKTtcbiAgfVxuXG4gIHN0YXRpYyBnZW5lcmF0ZUJvYXJkcygpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcbiAgICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBnYW1lYm9hcmRzLnNldEF0dHJpYnV0ZSgnaWQnLCAnZ2FtZWJvYXJkcycpO1xuICAgIHBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG4gICAgcGxheWVyQm9hcmQuc2V0QXR0cmlidXRlKCdpZCcsICdwbGF5ZXJCb2FyZCcpO1xuICAgIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmQnKTtcbiAgICBjb21wdXRlckJvYXJkLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29tcHV0ZXJCb2FyZCcpO1xuXG4gICAgZ2FtZWJvYXJkcy5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCk7XG4gICAgZ2FtZWJvYXJkcy5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdhbWVib2FyZHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCBib2FyZFNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYm9hcmRTcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmQtc3F1YXJlJyk7XG4gICAgICBib2FyZFNxdWFyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaScsIGkpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGJvYXJkU3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS1qJywgaik7XG4gICAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKGJvYXJkU3F1YXJlLmNsb25lTm9kZSgpKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChib2FyZFNxdWFyZS5jbG9uZU5vZGUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN0YXRpYyByZW5kZXJQbGF5ZXJTaGlwcyhwbGF5ZXJCb2FyZCwgcGxheWVyTmFtZSkge1xuICAgIGxldCBib2FyZDtcbiAgICBpZiAocGxheWVyTmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllckJvYXJkJyk7XG4gICAgICBjb25zb2xlLmxvZygncGxheWVyIGJvYXJkJyk7XG4gICAgfVxuICAgIGlmIChwbGF5ZXJOYW1lID09PSAnY29tcHV0ZXInKSB7XG4gICAgICBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlckJvYXJkJyk7XG4gICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgYm9hcmQnKTtcbiAgICB9XG4gICAgY29uc3QgYm9hcmRTcXVhcmVzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLXNxdWFyZScpO1xuICAgIGJvYXJkU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgIGNvbnN0IGkgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKCdkYXRhLWknKTtcbiAgICAgIGNvbnN0IGogPSBzcXVhcmUuZ2V0QXR0cmlidXRlKCdkYXRhLWonKTtcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5ib2FyZFtpXVtqXSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgcmVuZGVyQm9hcmQocmVmZXJlbmNlQm9hcmQsIHBsYXllck5hbWUpIHtcbiAgICBsZXQgYm9hcmQ7XG4gICAgaWYgKHBsYXllck5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJCb2FyZCcpO1xuICAgICAgY29uc29sZS5sb2coJ3BsYXllciBib2FyZCcpO1xuICAgIH1cbiAgICBpZiAocGxheWVyTmFtZSA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXJCb2FyZCcpO1xuICAgICAgY29uc29sZS5sb2coJ2NvbXB1dGVyIGJvYXJkJyk7XG4gICAgfVxuICAgIGNvbnN0IGJvYXJkU3F1YXJlcyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1zcXVhcmUnKTtcbiAgICBib2FyZFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGl0JywgJ21pc3MnLCAnc3VuaycpO1xuICAgICAgaWYgKHJlZmVyZW5jZUJvYXJkLmJvYXJkW2ldW2pdICE9PSBudWxsKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGRpc3BsYXlCb2FyZC5ib2FyZFtpXVtqXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGluaXRQbGFjZW1lbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyQm9hcmQnKTtcbiAgICBjb25zdCBib2FyZFNxdWFyZXMgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtc3F1YXJlJyk7XG4gICAgYm9hcmRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgaSA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pJykpO1xuICAgICAgICBjb25zdCBqID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWonKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGksIGopO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIHJlbW92ZVBsYWNlbWVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJCb2FyZCcpO1xuICAgIGNvbnN0IGJvYXJkU3F1YXJlcyA9IHBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1zcXVhcmUnKTtcbiAgICBib2FyZFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWknKTtcbiAgICAgICAgY29uc3QgaiA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1qJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGksIGopO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGluaXRBdHRhY2tMaXN0ZW5lcnModGFyZ2V0Qm9hcmQsIHJlZmVyZW5jZUJvYXJkKSB7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlckJvYXJkJyk7XG4gICAgY29uc3QgYm9hcmRTcXVhcmVzID0gY29tcHV0ZXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtc3F1YXJlJyk7XG4gICAgYm9hcmRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgaSA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pJykpO1xuICAgICAgICBjb25zdCBqID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWonKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGksIGopO1xuICAgICAgICBVSS51cGRhdGVSZWZlcmVuY2VCb2FyZEFmdGVyQXR0YWNrKHRhcmdldEJvYXJkLCByZWZlcmVuY2VCb2FyZCwgaSwgaik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVSTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoYm9hcmRTaXplID0gMTApIHtcbiAgICB0aGlzLmJvYXJkID0gR2FtZWJvYXJkLmNyZWF0ZUJvYXJkKGJvYXJkU2l6ZSk7XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG4gIHN0YXRpYyBjcmVhdGVCb2FyZChib2FyZFNpemUsIHZhbHVlID0gJ2VtcHR5Jykge1xuICAgIGxldCBib2FyZCA9IEFycmF5KGJvYXJkU2l6ZSkuZmlsbChudWxsKS5tYXAoKCkgPT4gQXJyYXkoYm9hcmRTaXplKS5maWxsKHZhbHVlKSk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG4gIHBsYWNlU2hpcChzaGlwLCB4LCB5LCBkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgfVxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gJ2VtcHR5Jykge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm9hcmRbeF1beV0gaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xuICAgIH1cbiAgfVxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQuZXZlcnkoKHJvdykgPT5cbiAgICAgIHJvdy5ldmVyeSgoc3BhY2UpID0+IHNwYWNlID09PSAnZW1wdHknIHx8IHNwYWNlID09PSAnbWlzcycgfHwgc3BhY2UuaXNTdW5rKCkpXG4gICAgKTtcbiAgfVxuICBzdGF0aWMgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gR2FtZWJvYXJkLmNyZWF0ZUJvYXJkKHRoaXMuYm9hcmQubGVuZ3RoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSSBmcm9tICcuL21vZHVsZXMvVUknO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9tb2R1bGVzL0dhbWUnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkuZ2VuZXJhdGVBcHApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9