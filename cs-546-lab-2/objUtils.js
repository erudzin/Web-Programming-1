function checkIfArray(array) {
    if(!Array.isArray(array)) {
        throw 'Provided variable is not an array.';
    }
}

function checkIfEmpty(array) {
    if(array.length <= 0) {
        throw 'Provided array is empty.'
    }
}

function checkIfObject(object) {
    if(typeof object !== 'object' || Array.isArray(object)) {
        throw 'Provided variable is not an object.'
    }
}



function makeArrays(objects) {
    checkIfArray(objects);
    checkIfEmpty(objects);
    if(objects.length < 2) {
        throw "Object array is not of at least length 2."
    }
    for(i = 0; i < objects.length; i++) {
        if(typeof objects[i] != 'object') {
            throw "Array does not contain only objects."
        }
        if(Object.keys(objects[i]).length == 0) {
            throw "Object within array is empty."
        }
    }
    let keyArray = [];
    for(i = 0; i < objects.length; i++) {
        keyArray.push(Object.keys(objects[i]));
    }
    let valueArray = [];
    for(i = 0; i < objects.length; i++) {
        valueArray.push(Object.values(objects[i]));
    }
    keyArray = keyArray.flat();
    valueArray = valueArray.flat();
    let objectsArray = []
    for(i = 0; i < keyArray.length; i++) {
        objectsArray.push([]);
        objectsArray[i].push(keyArray[i]);
        objectsArray[i].push(valueArray[i]);
    }
    return objectsArray;
}

function isDeepEqual(obj1, obj2) {
    checkIfObject(obj1);
    checkIfObject(obj2);
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) {
        return false;
    }

    for (const key of keys1){
        let value1 = obj1[key];
        let value2 = obj2[key];
        if(typeof value1 != typeof value2) {
            return false;
        }
        else if(typeof value1 == 'object' && typeof value2 == 'object') {
            return isDeepEqual(value1,value2);
        }
        else{
            if (value1 != value2){
                return false;
            }
        }
    }
    return true;
}

function computeObject(object,func) {
    checkIfObject(object);
    if(typeof func !== 'function') {
        throw "Provided variable is not a function."
    }
    let arr = Object.values(object)
    for(i = 0; i < arr.length; i++) {
        if(typeof arr[i] !== 'number'){
            throw "Provided object values are not all numbers."
        }
    }
    let updated_arr = arr.map(func);
    let keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        object[keys[i]] = updated_arr[i]
    }
    return object;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}