'use strict'

//instances of DOM elements
const gridContainerEl = document.querySelector('.eas__grid-container');
const numRowRange = document.getElementById('numRow');
const numColRange = document.getElementById('numCol');

//global variables
const maxRows = 100;
const maxCols = 100;
let numRows = 16;
let numCols = 16;

function generateGrids() {
    //row grids
    for (let i = 0; i < numRows; i++) {
        const gridRowContainerEl = document.createElement('div');
        gridRowContainerEl.classList.add('grid-row-container');
        gridContainerEl.append(gridRowContainerEl);
        for (let j = 0; j < numCols; j++) {
            const grid = document.createElement('div');
            gridRowContainerEl.append(grid);
        }
    }
}

function removeGrids(){
    return ;
}

function initializeEtchASketch() {
    generateGrids();
}

function fillGrid(){

}

numRowRange.addEventListener('change', (e) => {
    const newRows = parseInt(e.target.value);
    numRows = newRows;
    generateGrids();
})

numColRange.addEventListener('change', (e) => {
    const newCols = parseInt(e.target.value);
    numCols = newCols;
    generateGrids();
})
