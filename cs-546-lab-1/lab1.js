//Sums the squares of each number in arr
const questionOne = function questionOne(arr) {
    let sum = 0;
    for(i = 0; i < arr.length; i++){
        sum += Math.pow(arr[i], 2);
    }
    return sum;
}

//Finds Fibonacci value that corresponds to index of num
const questionTwo = function questionTwo(num) { 
    if(num <= 0){
        return 0;
    }
    else if (num == 1){
        return 1;
    }
    else{
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
}

//Returns the number of vowels contained in str
const questionThree = function questionThree(text) {
    let textToLower = text.toLowerCase();
    let countVowels = 0;
    for(i = 0; i < text.length; i++){
        if(textToLower.charAt(i) == 'a' || textToLower.charAt(i) == 'e' || textToLower.charAt(i) == 'i' || textToLower.charAt(i) == 'o' || textToLower.charAt(i) == 'u'){
            countVowels++;
        }
    }
    return countVowels;
}

//Returns the factorial of the number (num) provided
const questionFour = function questionFour(num) {
    if(num < 0){
        return NaN;
    }
    if(num == 0){
        return 1;
    }
    else{
        return num * questionFour(num - 1);
    }
}

module.exports = {
    firstName: "Eric", 
    lastName: "Rudzin", 
    studentId: "10447752",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};