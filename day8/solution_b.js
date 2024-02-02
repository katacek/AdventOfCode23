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

let initialStepValues = [];
for (let key of Object.keys(stepsObject)) {
    if (key.endsWith('A')) {
        initialStepValues.push(key);
    }
}
console.log('🚀 ~ initialStepValues:', initialStepValues);

let stepValue = '';
let count = 0;

function goThroughCycle(initialStepValue, directionsArray){
    for (let i = 0; i < directionsArray.length; i++) {
        // set the first value correctly
        stepValue = i === 0 ? initialStepValue : stepValue;
        stepValue = getNewStepValue(stepValue, directionsArray[i]);
    }
    return stepValue
}

function getEndValues(initialStepValues) {
    let endValues = [];
    for (let i = 0; i < initialStepValues.length; i++) {
       stepValue = goThroughShortcut(initialStepValues[i])
       endValues.push(stepValue) 
    }
    // if (stepValue === 'ZZZ') return count;
    return endValues;
}


function getStartEndPairs(){
    const startEndPairs = {};
    for (const step of Object.keys(stepsObject)) {
        startEndPairs[step] = goThroughCycle(step, directionsArray);
    }
    return startEndPairs;
}

const startEndPairs = getStartEndPairs();

function goThroughShortcut(step) {
    return startEndPairs[step];
}

let endValues = [];
let finalCount = 0;
while (true) {
    if (endValues.length) initialStepValues = endValues;
    endValues = getEndValues(initialStepValues);
    count++;
    if (!endValues.find((value)=> !value.endsWith('Z'))) {
        break;
    }
    if (count * directionsArray.length>10241191004509) {
        break;
    }
}

finalCount = count * directionsArray.length;
console.log(finalCount)