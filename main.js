/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ \"./src/modules/UI.js\");\n/* harmony import */ var _modules_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Game */ \"./src/modules/Game.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', _modules_UI__WEBPACK_IMPORTED_MODULE_0__[\"default\"].generateApp);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/AI.js":
/*!***************************!*\
  !*** ./src/modules/AI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass AI {\n  constructor(name = 'Computer', currentBoardSize = 10) {\n    this.name = name;\n    this.moveList = AI.generateMoveList(currentBoardSize);\n  }\n  static generateMoveList(boardSize) {\n    const moveList = [];\n    for (let i = 0; i < boardSize; i++) {\n      moveList.push([]);\n      for (let j = 0; j < boardSize; j++) {\n        moveList[i].push('none');\n      }\n    }\n    return moveList;\n  }\n\n  selectRandomSquare() {\n    if (noMoreMoves(this.moveList)) {\n      return null;\n    }\n\n    let x = Math.floor(Math.random() * this.moveList.length);\n    let y = Math.floor(Math.random() * this.moveList.length);\n    while (this.moveList[x][y] !== 'none') {\n      x = Math.floor(Math.random() * this.moveList.length);\n      y = Math.floor(Math.random() * this.moveList.length);\n    }\n    this.moveList[x][y] = 'move-made';\n\n    return [x, y];\n\n    function noMoreMoves(moveList) {\n      return moveList.every((row) => row.every((space) => space !== 'none'));\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AI);\n\n\n//# sourceURL=webpack://battleship/./src/modules/AI.js?");

/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./src/modules/Player.js\");\n/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AI */ \"./src/modules/AI.js\");\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI */ \"./src/modules/UI.js\");\n\n\n\n\n\n\nclass Game {\n  #gameOver;\n  constructor() {\n    this.#gameOver = false;\n  }\n  isGameOver() {\n    return this.#gameOver;\n  }\n  playerTurn() {}\n  computerTurn() {}\n\n  static runGame() {\n    const userInterface = new _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    const p1 = new _Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    const p2 = new _AI__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    const p1Board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    const p2Board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].initPlacementListeners();\n    // place player ships\n    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Battleship', 4), 0, 0, 'horizontal');\n    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Cruiser', 3), 1, 0, 'horizontal');\n    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Submarine', 3), 2, 0, 'horizontal');\n    p1Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Destroyer', 2), 3, 0, 'horizontal');\n    // UI.removePlacementListeners();\n    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Battleship', 4), 0, 0, 'horizontal');\n    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Cruiser', 3), 2, 0, 'horizontal');\n    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Submarine', 3), 4, 3, 'horizontal');\n    p2Board.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Destroyer', 2), 6, 5, 'vertical');\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].renderPlayerShips(p1Board, 'player');\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].renderPlayerShips(p2Board, 'computer')\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].initAttackListeners(p1, p2Board, userInterface.computerReferenceBoard);\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].renderBoard(userInterface.computerReferenceBoard, 'computer');\n    // while (!this.#gameOver) {\n    // player/computer turn\n    // attack -> receive attack\n    // update gameboard\n    // update UI\n    // check if game is over\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://battleship/./src/modules/Game.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nclass Player {\n  constructor(name = 'Player') {\n    this.name = name;\n    this.shipFleet = Player.#generateFleet();\n  }\n  attack(board, x, y) {\n    board.receiveAttack(x, y);\n  }\n\n  static #generateFleet() {\n    return [\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Carrier', 5),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Battleship', 4),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Cruiser', 3),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Submarine', 3),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Destroyer', 2),\n    ];\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/modules/Player.js?");

/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(name, length) {\n    this.name = name;\n    this.length = length;\n    this.hits = 0;\n  }\n  hit() {\n    this.hits += 1;\n  }\n  isSunk() {\n    return this.hits === this.length;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/modules/Ship.js?");

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game */ \"./src/modules/Game.js\");\n\n\n\n\nclass UI {\n  constructor() {\n    this.playerReferenceBoard = _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard(10, null);\n    this.computerReferenceBoard = _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard(10, null);\n  }\n  static generateApp() {\n    UI.generateBoards();\n    _Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].runGame();\n  }\n  static generateBoards() {\n    const main = document.getElementById('main');\n    const gameboards = document.createElement('div');\n    const playerBoard = document.createElement('div');\n    const computerBoard = document.createElement('div');\n\n    gameboards.setAttribute('id', 'gameboards');\n    playerBoard.classList.add('board');\n    playerBoard.setAttribute('id', 'playerBoard');\n    computerBoard.classList.add('board');\n    computerBoard.setAttribute('id', 'computerBoard');\n\n    gameboards.appendChild(playerBoard);\n    gameboards.appendChild(computerBoard);\n    main.appendChild(gameboards);\n\n    for (let i = 0; i < 10; i++) {\n      const boardSquare = document.createElement('div');\n      boardSquare.classList.add('board-square');\n      boardSquare.setAttribute('data-i', i);\n      for (let j = 0; j < 10; j++) {\n        boardSquare.setAttribute('data-j', j);\n        playerBoard.appendChild(boardSquare.cloneNode());\n        computerBoard.appendChild(boardSquare.cloneNode());\n      }\n    }\n  }\n  static initPlacementListeners() {\n    const playerBoard = document.getElementById('playerBoard');\n    const boardSquares = playerBoard.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      square.addEventListener('click', (e) => {\n        const i = parseInt(e.target.getAttribute('data-i'));\n        const j = parseInt(e.target.getAttribute('data-j'));\n        console.log(i, j);\n      });\n    });\n  }\n  static updateReferenceBoardAfterAttack(targetBoard, displayBoard, i, j) {\n    if (targetBoard.board[i][j] === 'empty') {\n      displayBoard[i][j] = 'miss';\n    } else if (targetBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      displayBoard[i][j] = 'hit';\n    }\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        if (targetBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n          if (targetBoard.board[i][j].isSunk()) {\n            displayBoard[i][j] = 'sunk';\n          }\n        }\n      }\n    }\n  }\n  static renderPlayerShips(playerBoard, playerName) {\n    let board;\n    if (playerName === 'player') {\n      board = document.getElementById('playerBoard');\n    }\n    if (playerName === 'computer') {\n      board = document.getElementById('computerBoard');\n    }\n    const boardSquares = board.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      const i = square.getAttribute('data-i');\n      const j = square.getAttribute('data-j');\n      if (playerBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n        square.classList.add('ship');\n      }\n    });\n  }\n  static renderBoard(referenceBoard, playerName) {\n    let board;\n    if (playerName === 'player') {\n      board = document.getElementById('playerBoard');\n    }\n    if (playerName === 'computer') {\n      board = document.getElementById('computerBoard');\n    }\n    const boardSquares = board.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      const i = square.getAttribute('data-i');\n      const j = square.getAttribute('data-j');\n      square.classList.remove('hit', 'miss', 'sunk');\n      if (referenceBoard[i][j] !== null) {\n        square.classList.add(referenceBoard[i][j]);\n      }\n    });\n  }\n  static removePlacementListeners() {\n    const playerBoard = document.getElementById('playerBoard');\n    const boardSquares = playerBoard.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      square.removeEventListener('click', (e) => {\n        const i = e.target.getAttribute('data-i');\n        const j = e.target.getAttribute('data-j');\n        console.log(i, j);\n      });\n    });\n  }\n  static initAttackListeners(player, targetBoard, referenceBoard) {\n    const computerBoard = document.getElementById('computerBoard');\n    const boardSquares = computerBoard.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      square.addEventListener('click', (e) => {\n        if (square.classList.contains('hit') || square.classList.contains('miss') || square.classList.contains('sunk')) {\n          return;\n        }\n        UI.handleAttackClick(player, targetBoard, referenceBoard, e);\n      });\n    });\n  }\n  static handleAttackClick(player, targetBoard, referenceBoard, e) {\n    const i = parseInt(e.target.getAttribute('data-i'));\n    const j = parseInt(e.target.getAttribute('data-j'));\n    player.attack(targetBoard, i, j);\n    UI.updateReferenceBoardAfterAttack(targetBoard, referenceBoard, i, j);\n    UI.renderBoard(referenceBoard, 'computer');\n  }\n  static removeAttackListeners() {\n    const computerBoard = document.getElementById('computerBoard');\n    const boardSquares = computerBoard.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      square.removeEventListener('click', (e) => {\n        const i = parseInt(e.target.getAttribute('data-i'));\n        const j = parseInt(e.target.getAttribute('data-j'));\n      });\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);\n\n\n//# sourceURL=webpack://battleship/./src/modules/UI.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nclass Gameboard {\n  constructor(boardSize = 10) {\n    this.board = Gameboard.createBoard(boardSize);\n    this.ships = [];\n  }\n  static createBoard(boardSize, value = 'empty') {\n    let board = Array(boardSize)\n      .fill(null)\n      .map(() => Array(boardSize).fill(value));\n    return board;\n  }\n  placeShip(ship, x, y, direction) {\n    if (direction === 'horizontal') {\n      for (let i = 0; i < ship.length; i++) {\n        this.board[x][y + i] = ship;\n      }\n    } else {\n      for (let i = 0; i < ship.length; i++) {\n        this.board[x + i][y] = ship;\n      }\n    }\n    this.ships.push(ship);\n  }\n  receiveAttack(x, y) {\n    if (this.board[x][y] instanceof _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      this.board[x][y].hit();\n    }\n  }\n  allShipsSunk() {\n    return this.board.every((row) =>\n      row.every((space) => space === 'empty' || space === 'miss' || space.isSunk())\n    );\n  }\n  static resetBoard() {\n    this.board = Gameboard.createBoard(this.board.length);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;