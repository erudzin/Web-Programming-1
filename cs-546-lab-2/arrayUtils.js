function checkIfArray(array) {
    if(!Array.isArray(array)) {
        throw 'Provided variable is not an array.';
    }
}

function checkIfEmpty(array){
    if(array.length <= 0) {
        throw 'Provided array is empty.'
    }
}

function checkContainsNumbers(array) {
    array.forEach(value => {
        if(typeof value !== 'number'){
            throw 'Array does not contain all numbers.'
        }
    }
    )
}


function mean(array) {
    checkIfArray(array);
    checkIfEmpty(array);
    checkContainsNumbers(array);
    let sum = 0;
    array.forEach(value => {
        sum += value;
    }
    );
    if(sum == 0) {
        return 0;
    }
    else {
        return sum/array.length;
    }
}

function medianSquared(array) {
    checkIfArray(array);
    checkIfEmpty(array);
    checkContainsNumbers(array);
    let sortedArray = array.sort(function(a, b){return a-b}); // https://www.w3schools.com/jsref/jsref_sort.asp
    if(sortedArray.length == 1) {
        return Math.pow(sortedArray[0], 2);
    }
    else if (sortedArray.length % 2 == 0) {
        console.log(sortedArray);
        console.log(sortedArray[Math.floor(sortedArray.length/2) - 1]);
        console.log(sortedArray[Math.floor(sortedArray.length/2)]);
        return Math.pow(((sortedArray[Math.floor(sortedArray.length/2) - 1] + sortedArray[Math.floor(sortedArray.length/2)])/2), 2);
    }
    else {
        return Math.pow(sortedArray[Math.floor(sortedArray.length/2)], 2);
    }
}

function maxElement(array) {
    checkIfArray(array);
    checkIfEmpty(array);
    checkContainsNumbers(array);
    let max = array[0];
    let index = 0;
    for(i = 0; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i];
            index = i;
        }
    }
    let maxObject = {};
    maxObject[max] = index;
    return maxObject;
}

function fill(end, value) {
    if(typeof end == 'undefined') {
        throw "End value does not exist."
    }
    if(typeof end !== 'number') {
        throw "End value is not a number."
    }
    if(end <= 0) {
        throw "End value is not greater than 0."
    }
    let fillArray = [];
    if(typeof value == 'undefined'){
        for(i = 0; i < end; i++){
            fillArray.push(i);
        }
    }
    else{
        for(i = 0; i < end; i++){
            fillArray.push(value);
        }
    }
    return fillArray;
}

function countRepeating(array) {
    checkIfArray(array);
    let repeatObject = {};
    if(array.length == 0) {
        return repeatObject;
    }
    for(i = 0; i < array.length; i++) {
        let countRepeats = 0;
        if(!(array[i] in repeatObject)) {
            for(j = 0; j < array.length; j++){
                if((array[i] == undefined) && (array[j] == undefined)) {
                    if(array[i] === array[j]) {
                        countRepeats++;
                    }
                }
                else {
                    if(array[i] == array[j]) {
                        countRepeats++;
                    }
                }
            }
            if(countRepeats > 1) {
                repeatObject[array[i]] = countRepeats;
            }
        }
    }
    return repeatObject;
}

function isEqualHelper(array) {
    if(!Array.isArray(array)) {
        return array;
    }
    if(array.length == 0) {
        return array;
    }
    let isNumArray = true;
    for(i = 0; i < array.length; i++) {
        if(typeof array[i] != 'number') {
            isNumArray = false;
        }
    }
    if(isNumArray) {
        return array.forEach(array.sort(function(a, b){return a-b}));
    }
    else {
        return array.forEach(array.sort());
    }


}

function sort(a){
    a = a.sort((a,b) => a-b);
    for (let i = 0; i < a.length; i++){
        if (Array.isArray(a[i])){
            sort(a[i]);
        }
    }
}
function arrToString(a){
    let str = '';
    str += '[';
    for (let i = 0; i < a.length; i++){
        if (Array.isArray(a[i])){
            str += arrToString(a[i]);
        } else {
            str += a[i];
        }
        str += ',';
    }
    str = str.substring(0, str.length - 1);
    str += ']'
    return str;
}

function isEqual(arrayOne,arrayTwo){
    checkIfArray(arrayOne);
    checkIfArray(arrayTwo);
    sort(arrayOne);
    sort(arrayTwo);
    return (arrToString(arrayOne) == arrToString(arrayTwo));
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}