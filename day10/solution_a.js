import { input } from "./input.js";

const pipeFieldMatrix = input.split('\n').map((row) => row.split(''));
console.log('🚀 ~ parsedInput:', pipeFieldMatrix);

// get start coordinates 
// { startPosition: { x: 1, y:1} }
// iterate through the rows
function getStartPosition(pipeFieldMatrix) {
    for (let y=0; y < pipeFieldMatrix.length; y++) {
        // go through columns aka elements of inner arrays
        for (let x=0; x < pipeFieldMatrix.length; x++) {
        if (pipeFieldMatrix[y][x] === 'S') {
            return {x, y}
        } 
        };
    }
}

// currentPosition -> {x:0,y:0}
function getSymbol(currentPosition) {
    return pipeFieldMatrix[currentPosition.y]?.[currentPosition.x]
}

function getNewPosition(previousPosition, currentPosition) {
    const symbol = getSymbol(currentPosition);
    if (symbol === '|' ) {
        // can go up or down
        if (previousPosition.y > currentPosition.y) return {x: currentPosition.x, y: currentPosition.y-1}
        return {x: currentPosition.x, y: currentPosition.y+1}   
    }  
    if (symbol === '-' ) {
        // can go right or left,
        if (previousPosition.x > currentPosition.x) return {x: currentPosition.x-1, y: currentPosition.y}
        return {x: currentPosition.x+1, y: currentPosition.y}
    }
    if (symbol === 'L' ) {
        if (previousPosition.y < currentPosition.y) return {x: currentPosition.x+1, y: currentPosition.y}
        return {x: currentPosition.x, y: currentPosition.y-1}
    }
    if (symbol === 'J' ) {
        if (previousPosition.x < currentPosition.x) return {x: currentPosition.x, y: currentPosition.y-1}
        return {x: currentPosition.x-1, y: currentPosition.y}
    }
    if (symbol === '7' ) {
        if (previousPosition.y > currentPosition.y) return {x: currentPosition.x-1, y: currentPosition.y}
        return  {x: currentPosition.x, y: currentPosition.y+1}
    }
    if (symbol === 'F' ) {
        if (previousPosition.x > currentPosition.x) return {x: currentPosition.x, y: currentPosition.y+1}
        return {x: currentPosition.x+1, y: currentPosition.y}
    }
}

let circle = [];
let start = getStartPosition(pipeFieldMatrix);

// hardcoded
let currentPosition = { x: start.x+1, y:start.y} 

circle.push(currentPosition);

let previousPosition = start;
while (getSymbol(currentPosition) != 'S') {
    const newPosition = getNewPosition(previousPosition, currentPosition);
    previousPosition = currentPosition;
    currentPosition = newPosition;
    circle.push(newPosition)
}

const result = circle.length/2;