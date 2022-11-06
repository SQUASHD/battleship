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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n/* harmony import */ var _shipFleet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shipFleet */ \"./src/modules/shipFleet.js\");\n\n\n\nclass AI {\n  constructor(name = 'Computer', currentBoardSize = 7) {\n    this.name = name;\n    this.moveList = AI.generateMoveList(currentBoardSize);\n    this.shipFleet = (0,_shipFleet__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  }\n  static generateMoveList(boardSize) {\n    const moveList = [];\n    for (let i = 0; i < boardSize; i++) {\n      moveList.push([]);\n      for (let j = 0; j < boardSize; j++) {\n        moveList[i].push('none');\n      }\n    }\n    return moveList;\n  }\n  attack(board, x, y) {\n    board.receiveAttack(x, y);\n  }\n  selectRandomSquare() {\n    if (noMoreMoves(this.moveList)) {\n      return null;\n    }\n\n    let x = Math.floor(Math.random() * this.moveList.length);\n    let y = Math.floor(Math.random() * this.moveList.length);\n    while (this.moveList[x][y] !== 'none') {\n      x = Math.floor(Math.random() * this.moveList.length);\n      y = Math.floor(Math.random() * this.moveList.length);\n    }\n    this.moveList[x][y] = 'move-made';\n\n    return [x, y];\n\n    function noMoreMoves(moveList) {\n      return moveList.every((row) => row.every((space) => space !== 'none'));\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AI);\n\n\n//# sourceURL=webpack://battleship/./src/modules/AI.js?");

/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./src/modules/Player.js\");\n/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AI */ \"./src/modules/AI.js\");\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI */ \"./src/modules/UI.js\");\n\n\n\n\n\n\nclass Game {\n  constructor() {\n    this.gameOver = false;\n    this.standardBoardSize = 7;\n  }\n  static isGameOver() {\n    return this.gameOver;\n  }\n  static checkGameOver(playerBoard, computerBoard) {\n    if (playerBoard.allShipsSunk() || computerBoard.allShipsSunk()) {\n      this.gameOver = true;\n    }\n  }\n  static getBoardSize() {\n    return this.standardBoardSize;\n  }\n  static computerTurn(computer, playerBoard, playerReferenceBoard) {\n    const attackCoordinates = computer.selectRandomSquare();\n    computer.attack(playerBoard, attackCoordinates[0], attackCoordinates[1]);\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].updateReferenceBoardAfterAttack(\n      playerBoard,\n      playerReferenceBoard,\n      attackCoordinates[0],\n      attackCoordinates[1]\n    );\n  }\n  static runGame() {\n    Game.gameOver = false;\n    const userInterface = new _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    const p1 = new _Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    const p2 = new _AI__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    const p1Board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    const p2Board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    p1Board.placeShipsRandomly(p1.shipFleet);\n    p2Board.placeShipsRandomly(p2.shipFleet);\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].renderPlayerShips(p1Board);\n    _UI__WEBPACK_IMPORTED_MODULE_4__[\"default\"].initAttackListeners(\n      p1,\n      p2,\n      p1Board,\n      p2Board,\n      userInterface.computerReferenceBoard,\n      userInterface.playerReferenceBoard\n    );\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://battleship/./src/modules/Game.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shipFleet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFleet */ \"./src/modules/shipFleet.js\");\n\n\nclass Player {\n  constructor(name = 'Player') {\n    this.name = name;\n    this.shipFleet = (0,_shipFleet__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  }\n  attack(board, x, y) {\n    board.receiveAttack(x, y);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/modules/Player.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game */ \"./src/modules/Game.js\");\n\n\n\n\nclass UI {\n  constructor() {\n    this.playerReferenceBoard = _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard(7, null);\n    this.computerReferenceBoard = _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard(7, null);\n  }\n  static generateApp() {\n    UI.generateHeader();\n    UI.generateBoards();\n    _Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].runGame();\n  }\n  static generateHeader() {\n    const main = document.getElementById('main');\n    const header = document.createElement('div');\n    header.setAttribute('id', 'header');\n    header.textContent = 'BATTLESHIP';\n    main.appendChild(header);\n  }\n  static generateBoards() {\n    const main = document.getElementById('main');\n    const gameboards = document.createElement('div');\n    const playerBoard = document.createElement('div');\n    const computerBoard = document.createElement('div');\n\n    gameboards.setAttribute('id', 'gameboards');\n    playerBoard.classList.add('board');\n    playerBoard.setAttribute('id', 'playerBoard');\n    computerBoard.classList.add('board');\n    computerBoard.setAttribute('id', 'computerBoard');\n\n    gameboards.appendChild(playerBoard);\n    gameboards.appendChild(computerBoard);\n    main.appendChild(gameboards);\n\n    for (let i = 0; i < 7; i++) {\n      const boardSquare = document.createElement('div');\n      boardSquare.classList.add('board-square');\n      boardSquare.setAttribute('data-i', i);\n      for (let j = 0; j < 7; j++) {\n        boardSquare.setAttribute('data-j', j);\n        playerBoard.appendChild(boardSquare.cloneNode());\n        computerBoard.appendChild(boardSquare.cloneNode());\n      }\n    }\n  }\n  static initPlacementListeners() {\n    const playerBoard = document.getElementById('playerBoard');\n    const boardSquares = playerBoard.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      square.addEventListener('click', (e) => {\n        const i = parseInt(e.target.getAttribute('data-i'));\n        const j = parseInt(e.target.getAttribute('data-j'));\n        console.log(i, j);\n      });\n    });\n  }\n  static updateReferenceBoardAfterAttack(targetBoard, displayBoard, i, j) {\n    if (targetBoard.board[i][j] === 'empty') {\n      displayBoard[i][j] = 'miss';\n    } else if (targetBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      displayBoard[i][j] = 'hit';\n    }\n    for (let i = 0; i < 7; i++) {\n      for (let j = 0; j < 7; j++) {\n        if (targetBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n          if (targetBoard.board[i][j].isSunk()) {\n            displayBoard[i][j] = 'sunk';\n          }\n        }\n      }\n    }\n  }\n  static renderPlayerShips(playerBoard) {\n    const board = document.getElementById('playerBoard');\n    const boardSquares = board.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      const i = square.getAttribute('data-i');\n      const j = square.getAttribute('data-j');\n      if (playerBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n        square.classList.add('ship');\n      }\n    });\n  }\n  static renderComputerships(computerBoard) {\n    const board = document.getElementById('computerBoard');\n    const boardSquares = board.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      const i = square.getAttribute('data-i');\n      const j = square.getAttribute('data-j');\n      if (computerBoard.board[i][j] instanceof _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n        square.classList.add('ship');\n      }\n    });\n  }\n  static renderBoard(referenceBoard, playerName) {\n    let board;\n    if (playerName === 'player') {\n      board = document.getElementById('playerBoard');\n    }\n    if (playerName === 'computer') {\n      board = document.getElementById('computerBoard');\n    }\n    const boardSquares = board.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      const i = square.getAttribute('data-i');\n      const j = square.getAttribute('data-j');\n      square.classList.remove('hit', 'miss', 'sunk');\n      if (referenceBoard[i][j] !== null) {\n        square.classList.add(referenceBoard[i][j]);\n      }\n      if (square.classList.contains('miss')) {\n        square.textContent = 'X';\n      }\n    });\n  }\n  static initAttackListeners(\n    player,\n    computer,\n    playerBoard,\n    computerboard,\n    computerReferenceBoard,\n    playerReferenceBoard\n  ) {\n    const computerBoard = document.getElementById('computerBoard');\n    const boardSquares = computerBoard.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      square.addEventListener('click', (e) => {\n        console.log(square);\n        if (\n          square.classList.contains('hit') ||\n          square.classList.contains('miss') ||\n          square.classList.contains('sunk')\n        ) {\n          return;\n        }\n        if (_Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isGameOver()) {\n          return;\n        }\n        UI.handleAttackClick(player, computerboard, computerReferenceBoard, e);\n        UI.renderBoard(computerReferenceBoard, 'computer');\n        _Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].checkGameOver(playerBoard, computerboard);\n        if (_Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isGameOver()) {\n          UI.displayResult('You Win');\n          return\n        }\n        if (!_Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isGameOver()) {\n          _Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].computerTurn(computer, playerBoard, playerReferenceBoard);\n          UI.renderBoard(playerReferenceBoard, 'player');\n        }\n        _Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].checkGameOver(playerBoard, computerboard);\n        if (_Game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isGameOver()) {\n          UI.displayResult('You Lose!');\n          return\n        }\n      });\n    });\n  }\n  static handleAttackClick(player, computerboard, referenceBoard, e) {\n    const i = parseInt(e.target.getAttribute('data-i'));\n    const j = parseInt(e.target.getAttribute('data-j'));\n    player.attack(computerboard, i, j);\n    UI.updateReferenceBoardAfterAttack(computerboard, referenceBoard, i, j);\n  }\n  static removeEventListenersBoardSquares() {\n    const boardSquares = document.querySelectorAll('.board-square');\n    boardSquares.forEach((square) => {\n      let newElement = square.cloneNode(true);\n      square.parentNode.replaceChild(newElement, square);\n    });\n  }\n  static displayResult(result) {\n    UI.removeEventListenersBoardSquares();\n    const main = document.getElementById('main');\n    const resetBtn = document.createElement('button');\n    const resultContainer = document.createElement('div');\n\n    while (main.firstChild) {\n      main.removeChild(main.firstChild);\n    }\n\n    resetBtn.textContent = 'Play Again';\n    resetBtn.classList.add('reset-button');\n\n    resultContainer.classList.add('result-container');\n    resultContainer.textContent = result;\n    resultContainer.appendChild(resetBtn);\n    main.appendChild(resultContainer);\n\n    resetBtn.addEventListener('click', () => {\n      UI.removeResults();\n      UI.generateApp();\n    });\n  }\n\n  static removeResults() {\n    const main = document.getElementById('main');\n    while (main.firstChild) {\n      main.removeChild(main.firstChild);\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);\n\n\n//# sourceURL=webpack://battleship/./src/modules/UI.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nclass Gameboard {\n  constructor(boardSize = 7) {\n    this.board = Gameboard.createBoard(boardSize);\n    this.ships = [];\n  }\n  static createBoard(boardSize, value = 'empty') {\n    let board = Array(boardSize)\n      .fill(null)\n      .map(() => Array(boardSize).fill(value));\n    return board;\n  }\n  placeShip(ship, x, y, direction) {\n    if (direction === 'horizontal') {\n      for (let i = 0; i < ship.length; i++) {\n        this.board[x][y + i] = ship;\n      }\n    } else {\n      for (let i = 0; i < ship.length; i++) {\n        this.board[x + i][y] = ship;\n      }\n    }\n    this.ships.push(ship);\n  }\n  placeShipsRandomly(shipFleet) {\n    shipFleet.forEach((ship) => {\n      let x = Math.floor(Math.random() * this.board.length);\n      let y = Math.floor(Math.random() * this.board.length);\n      let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';\n      while (!this.canPlaceShip(ship, x, y, direction)) {\n        x = Math.floor(Math.random() * this.board.length);\n        y = Math.floor(Math.random() * this.board.length);\n        direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';\n      }\n      this.placeShip(ship, x, y, direction);\n    });\n  }\n  canPlaceShip(ship, x, y, direction) {\n    if (direction === 'horizontal') {\n      if (y + ship.length > this.board.length) {\n        return false;\n      }\n      for (let i = 0; i < ship.length; i++) {\n        if (this.board[x][y + i] !== 'empty') {\n          return false;\n        }\n      }\n    } else {\n      if (x + ship.length > this.board.length) {\n        return false;\n      }\n      for (let i = 0; i < ship.length; i++) {\n        if (this.board[x + i][y] !== 'empty') {\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n  receiveAttack(x, y) {\n    if (this.board[x][y] instanceof _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      this.board[x][y].hit();\n    }\n  }\n  allShipsSunk() {\n    return this.board.every((row) =>\n      row.every((space) => space === 'empty' || space === 'miss' || space.isSunk())\n    );\n  }\n  static resetBoard() {\n    this.board = Gameboard.createBoard(this.board.length);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/shipFleet.js":
/*!**********************************!*\
  !*** ./src/modules/shipFleet.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nfunction shipfleet() {\n  return [\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Carrier', 5),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Battleship', 4),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Cruiser', 3),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Cruiser', 3),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Destroyer', 2),\n  ];\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipfleet);\n\n\n//# sourceURL=webpack://battleship/./src/modules/shipFleet.js?");

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