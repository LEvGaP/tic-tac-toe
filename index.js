const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = undefined;
let turn = CROSS;
let isFinish = false;

createTicTacToeBoard();
startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function createTicTacToeBoard() {
    let n = prompt("Введите количество полей для игры в крестики-нолики:", "3"); // Запрашиваем у пользователя размер доски
    n = parseInt(n, 10); // Преобразуем введенное значение в число

    if (isNaN(n) || n <= 0) {
        console.error("Некорректный ввод. Пожалуйста, введите положительное число.");
        return;
    }

    board = Array.from({ length: n }, () => Array(n).fill(EMPTY)); // Создаем массив n*n, инициализируя каждый элемент EMPTY

    console.log(board);
    return board;
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (isFinish || board[row][col] !== EMPTY) {
        return;
    }
    board[row][col] = turn;
    renderSymbolInCell(turn, row, col);
    if ( checkIfSymbolWins(turn) ){
        isFinish = true;
        return;
    }

    if (isFinished(board)){
        alert("Победила дружба");
    }
    changeTurn();
}

function changeTurn() {
    turn = (turn === CROSS) ? ZERO : CROSS;
}


function checkIfSymbolWins(symbol){

    let won = true;

    for (let i = 0; i < board.length; i++) {

        won = true;

        for (let j = 0; j < board.length; j++) {

            if (board[i][j] !== symbol) {

                won = false;

            }

        }

        if (won) {

            for (let j = 0; j < board.length; j++) {

                renderSymbolInCell(symbol, i, j, 'red');

            }

            return true;

        }

    }



    for (let i = 0; i < board.length; i++) {

        won = true;

        for (let j = 0; j < board.length; j++) {

            if (board[j][i] !== symbol) {

                won = false;

            }

        }

        if (won) {

            for (let j = 0; j < board.length; j++) {

                renderSymbolInCell(symbol, j, i, 'red');

            }

            return true;

        }

    }



    won = true;

    for (let i = 0; i < board.length; i++) {



        if (board[i][i] !== symbol)

            won = false;

    }

    if (won){

        for (let i = 0; i < board.length; i++) {

            renderSymbolInCell(symbol, i, i, 'red');

        }

        return true;

    }
}

function checkWin(){
    for (let i = 0; i < board.length; i++){
        if ( checkLineWin(i, 0, board.length, board.length, 0, 1) || checkLineWin(0, i, board.length, board.length, 1, 0) )
            return true;
    }
    if ( checkLineWin(0, 0, board.length, board.length, 1, 1) )
        return true;
    return false;
}

function checkLineWin(stX, stY, endX, endY, dx, dy){
    if ( isLineWin(stX, stY, endX, endY, dx, dy) ) {
        console.log(`${stX} ${stY} ${endX} ${endY}`);
        // renderWonLine(stX, stY, endX, endY, dx, dy);
        return true;
    }
    return false;
}

function isLineWin(stX, stY, endX, endY, dx, dy){
    for (let i = stX; i < endX; i += dx) {
        for (let j = stY; j < endY; j += dy) {
            if (board[i][j] !== turn) {
                console.log(`${stX} ${stY} ${endX} ${endY}`);
                return false;
            }
        }
    }
    return true;
}

function renderWonLine(stX, stY, endX, endY, dx, dy){
    for (let i = stX; i < endX; i += dx) {
        for (let j = stY; j < endY; j += dy) {
            renderSymbolInCell(board[i][j], i, j, '#FF0000');
        }
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    resetField();
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}

function isFinished(board){
    return !board.some(subArray => subArray.includes(EMPTY));
}

function resetField(){
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== EMPTY) {
                board[i][j] = EMPTY;
                renderSymbolInCell(EMPTY, i, j);
            }
        }
    }
    isFinish = false;
}

/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}
