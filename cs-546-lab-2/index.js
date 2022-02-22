const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

//Array Tests

//3
try {
    console.log(arrayUtils.mean([1,2,3,4,5]));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(arrayUtils.mean());
}
catch(e) {
    console.error(e);
}

//4
try {
    console.log(arrayUtils.medianSquared([4,1,2]));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(arrayUtils.medianSquared([]));
}
catch(e) {
    console.error(e);
}

// {'7':2}
try {
    console.log(arrayUtils.maxElement([5, 6, 7]));
}
catch(e) {
    console.error(e);
}
// error
try {
    console.log(arrayUtils.maxElement());
}
catch(e) {
    console.error(e);
}

//['Welcome', 'Welcome', 'Welcome']
try {
    console.log(arrayUtils.fill(3, 'Welcome'));
}
catch(e) {
    console.error(e);
}
//[0, 1, 2, 3, 4, 5]
try {
    console.log(arrayUtils.fill(6));
}
catch(e) {
    console.error(e);
}

//{undefined: 2, null: 2}
try {
    console.log(arrayUtils.countRepeating([undefined, undefined, null, null]));
}
catch(e) {
    console.error(e);
}
//{ '7': 2, true: 3, Hello: 2 }
try {
    console.log(arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]));
}
catch(e) {
    console.error(e);
}

//error
try {
    console.log(arrayUtils.isEqual());
}
catch(e) {
    console.error(e);
}
//true
try {
    console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]));
}
catch(e) {
    console.error(e);
}

//Strings

//myFunctionRocks
try {
    console.log(stringUtils.camelCase("my function rocks"));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(stringUtils.camelCase(""));
}
catch(e) {
    console.error(e);
}

//Hello, *ow are you? I $ope you are well
try {
    console.log(stringUtils.replaceChar("Hello, How are you? I hope you are well"));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(stringUtils.replaceChar(""));
}
catch(e) {
    console.error(e);
}

//Hitrick Pall
try {
    console.log(stringUtils.mashUp("Patrick", "Hill"));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(stringUtils.mashUp(3));
}
catch(e) {
    console.error(e);
}

//Objects
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
//[  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]
try {
    console.log(objUtils.makeArrays([third, first, second]));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(objUtils.makeArrays("peepee"));
}
catch(e) {
    console.error(e);
}

const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
//true
try {
    console.log(objUtils.isDeepEqual(forth, fifth));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(objUtils.isDeepEqual([1,2,3], [1,2,3]));
}
catch(e) {
    console.error(e);
}

//{a: 6, b: 14, c: 10}
try {
    console.log(objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
}
catch(e) {
    console.error(e);
}
//error
try {
    console.log(objUtils.computeObject("poo", n => n * 2));
}
catch(e) {
    console.error(e);
}