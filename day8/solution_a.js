import { input } from "./input.js";

const parsedInput = input.split('\n\n');

const directionsArray = parsedInput[0].split('');
const stepsArray = parsedInput[1].split('\n');

const stepsObject = {};
for (let i = 0; i < stepsArray.length-1; i++) {
        const key = stepsArray[i].split('=')[0].trim();
        const valuesArray = stepsArray[i].split('=')[1].split(',');
        // without first element 
        const value1 = valuesArray[0].trim().slice(1);
        // without last element
        const value2 = valuesArray[1].trim().slice(0, -1);;
        stepsObject[key] = {
            'L': value1,
            'R': value2
        } 
}

function getNewStepValue(currentValue, direction) {
    return stepsObject[currentValue][direction];
}

let stepValue = 'AAA';
let count = 0;

function goThroughCycle(directionsArray){
    for (let i = 0; i < directionsArray.length; i++) {
        count++;
        stepValue = getNewStepValue(stepValue, directionsArray[i]);
    }
    // if (stepValue === 'ZZZ') return count;
    return stepValue
}

while (stepValue !== 'ZZZ') {
    goThroughCycle(directionsArray);
    console.log('🚀 ~ count:', count);
    console.log('🚀 ~ stepValue:', stepValue);
}