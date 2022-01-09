'use strict'

//instances of DOM elements
const gridContainerEl = document.querySelector('.eas__grid-container');
const numOfGridsRange = document.getElementById('grid-range');
const gridBorderRadiusRange = document.getElementById('grid-border-radius');
const clrBtnContainer = document.querySelector('.eas__colors');

//intances of DOM buttons
const clrBtns = document.querySelectorAll('.eas__colors > .eas__clr-btn');
const clrBlackBtn = document.getElementById('clr-black');
const clrGraysBtn = document.getElementById('clr-grays');
const clrRainbowBtn = document.getElementById('clr-rainbow');
const clrRGBBtn = document.getElementById('clr-rgb');
const eraseBtn = document.getElementById('clr-erase');

//global variables
const MAX_ROWS = 64;
const MAX_COLS = 64;
const COLOR_IDS = ['clr-black', 'clr-grays', 'clr-rainbow', 'clr-rgb'];

//mutable variables
let numRows = 16;
let numCols = 16;
let gridBR = 5;
let currentColors = 'clr-black';

function generateGrids() {
    const gridContainerEl = document.querySelector('.eas__grid-container');
    for (let i = 0; i < numRows; i++) {
        const gridRowContainerEl = document.createElement('div');
        gridRowContainerEl.classList.add('grid-row-container');
        gridContainerEl.append(gridRowContainerEl);
        for (let j = 0; j < numCols; j++) {
            const grid = document.createElement('div');
            grid.classList.add('grid');
            gridRowContainerEl.append(grid);
        }
    }
}

function removeGrids() {
    while (gridContainerEl.firstChild)
        gridContainerEl.removeChild(gridContainerEl.lastChild);
}

function eraseFilledGrids() {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(el => el.style.backgroundColor = '#fff');
}

function colorizeGrid() {
    if (clrGraysBtn.classList.contains('eas__colors--active')) {
        colorizeWithShadesOfGrey(this);
    }
    else if (clrRainbowBtn.classList.contains('eas__colors--active')) {
        colorizeWithRainbow(this);
    }
    else if (clrRGBBtn.classList.contains('eas__colors--active')) {
        colorizeWithRedGreenOrBlue(this);
    }
    else { this.style.backgroundColor = "black"; }
}

function colorizeWithShadesOfGrey(el) {
    const n = randomMinMax(0, 255);
    el.style.backgroundColor = `rgb(${n},${n},${n})`;
}

function colorizeWithRainbow(el) {
    const red = randomMinMax(0, 255);
    const blue = randomMinMax(0, 255);
    const green = randomMinMax(0, 255);
    el.style.backgroundColor = `rgb(${red},${blue},${green})`;
}

function colorizeWithRedGreenOrBlue(el) {
    const unshuffled = [255, 0, 0];
    const shuffled = unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    el.style.backgroundColor = `rgb(${shuffled[0]},${shuffled[1]},${shuffled[2]})`;
}

function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function fillGrid() {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(el => el.addEventListener('mouseenter', colorizeGrid));
}


function removeActiveColorWithId(activeColor) {
    const unselectedClasses = COLOR_IDS.filter(cls => cls !== activeColor);
    unselectedClasses.forEach((c) => {
        document.getElementById(c).classList.remove('eas__colors--active');
    })
}

function changeGridBorderRadius(value) {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(el => el.style.borderRadius = value + 'px');
}
//Change the number of row grids and ovewrite the grids with new ones
function overwriteGrids() {
    removeGrids();
    generateGrids();
    updateGridDimensions();
    fillGrid();
}

function getDimensionGap() {
    const easEl = document.querySelector('.eas__grid-container');
    if (easEl.scrollWidth > easEl.scrollHeight) {
        return easEl.clientWidth / easEl.clientHeight;
    } else {
        return easEl.clientHeight / easEl.clientWidth;
    }
}

function updateGridDimensions() {
    const gridContainerEl = document.querySelector('.eas__grid-container');
    const gridRowContainers = document.querySelectorAll('.grid-row-container');
    gridContainerEl.style.gridTemplateRows = `repeat(${Math.ceil(numRows)},1fr`;
    gridRowContainers.forEach(el => el.style.gridTemplateColumns = `repeat(${Math.ceil(numCols)},1fr`);
}

function updateNumOfGrids(value) {
    const gridContainerEl = document.querySelector('.eas__grid-container');
    const newNumOfGrids = parseInt(value);
    if (gridContainerEl.clientHeight > gridContainerEl.clientWidth) {
        numCols = newNumOfGrids;
        numRows = newNumOfGrids * getDimensionGap();
    } else if (gridContainerEl.clientHeight < gridContainerEl.clientWidth) {
        numCols = newNumOfGrids * getDimensionGap();
        numRows = newNumOfGrids;
    } else {
        numCols = newNumOfGrids;
        numRows = newNumOfGrids;
    }
}

//fetch the current num of grids and update the default value of input range
numOfGridsRange.addEventListener('change', (e) => {
    updateNumOfGrids(e.target.value);
    overwriteGrids();

})

gridBorderRadiusRange.addEventListener('change', (e) => {
    const gridBorderRadius = parseInt(e.target.value);
    changeGridBorderRadius(gridBorderRadius);
})

//Update active buttons once a button is clicked
for (let c = 0; c < COLOR_IDS.length; c++) {
    document.getElementById(COLOR_IDS[c]).addEventListener('click', (e) => {
        const id = e.target.id;
        removeActiveColorWithId(id);
        document.getElementById(id).classList.add('eas__colors--active');
    })
}

//Clicking the erase btn will clear the filled grids
eraseBtn.addEventListener('click', eraseFilledGrids);

function initializeEtchASketch() {
    updateNumOfGrids(numOfGridsRange.value);
    overwriteGrids()
    numOfGridsRange.value = numRows > numCols ? numCols : numRows;
    changeGridBorderRadius(gridBR);
    const currentColorFiller = document.getElementById('clr-black');
    currentColorFiller.classList.add('eas__colors--active');
}

//Change grid sizes and numbers after resizing client screen
window.onresize = () => {
    updateNumOfGrids(numOfGridsRange.value);
    overwriteGrids();
};

//Initialized function after the webpage loaded
initializeEtchASketch();