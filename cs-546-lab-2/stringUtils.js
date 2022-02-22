function stringExists(string) {
    if(typeof string !== 'string'){
        throw "Provided variable is not a string."
    }
}

function checkStringLength(string) {
    if(string.length <= 0){
        throw "String is not of length greater than or equal to zero."
    }
}
function checkWhiteSpace(string) {
    let isWhiteSpace = true;
    for(i = 0; i < string.length; i++){
        if(string.charAt(i) != " "){
            isWhiteSpace = false;
        }
    }
    if (isWhiteSpace){
        throw "A string contains only whitespace."
    }
}

function checkSize(string) {
    if(string.length < 2) {
        throw "The size of one string is less than 2."
    }
}

function camelCase(string) {
    stringExists(string);
    checkStringLength(string);
    let lowerCaseString = string.toLowerCase();
    console.log(lowerCaseString);
    let stringArray = lowerCaseString.split(" ");
    console.log(stringArray);
    let camelString = stringArray[0];
    for(i = 1; i < stringArray.length; i++){
        camelString += stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1); // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    }
    return camelString;
}

function replaceChar(string) {
    stringExists(string);
    checkStringLength(string);
    let firstCharToLower = string.charAt(0).toLowerCase();
    let modifiedString = string.charAt(0);
    let symbolCounter = 0;
    for(i = 1; i < string.length; i++) {
        if(string.charAt(i).toLowerCase() === firstCharToLower) {
            if(symbolCounter % 2 == 0){
                modifiedString += "*";
                symbolCounter++;
            }
            else {
                modifiedString += "$";
                symbolCounter++;
            }
        }
        else {
            modifiedString += string.charAt(i);
        }
    }
    return modifiedString;
}

function mashUp(string1, string2) {
    stringExists(string1);
    stringExists(string2);
    checkWhiteSpace(string1);
    checkWhiteSpace(string2);
    checkSize(string1);
    checkSize(string2);
    let stringOneFirstChar = string1.charAt(0);
    let stringTwoFirstChar = string2.charAt(0);

    let mashedString = stringTwoFirstChar + string1.slice(1) + " " + stringOneFirstChar + string2.slice(1);
    return mashedString;
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
}