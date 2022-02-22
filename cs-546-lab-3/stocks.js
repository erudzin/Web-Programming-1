const people = require('./people');
const axios = require('axios');

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data; // this will be the array of stock objects
}

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data; // this will be the array of people objects
}

function checkString(string){
    if(typeof string !== 'string'){
        throw "Type of parameter is not a string.";
    }
}

function checkStockExistsAndReturnStock(stockName, stocks){
    let stockExists = false;
    for(const stockItem of stocks){
        if(stockItem.stock_name == stockName){
            stockExists = true;
            return stockItem;
        }
    }
    if(!stockExists){
        throw "Stock name does not exist."
    }
}

function checkWhiteSpace(string){
    if(string.trim().length <= 0){ //https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-spaces
        throw "Parameter is empty whitespace.";
    }
}

async function listShareholders(stockName){
    checkString(stockName);
    checkWhiteSpace(stockName);
    let stocks = await getStocks();
    let stockInfo = checkStockExistsAndReturnStock(stockName, stocks);
    let shareHolderInfo = {};
    shareHolderInfo["id"] = stockInfo.id;
    shareHolderInfo["stock_name"] = stockInfo.stock_name;
    shareHolderInfo["shareholders"] = []
    let shareholders = stockInfo.shareholders;
    for(const user of shareholders){
        let shareholder = {}
        let person = await people.getPersonById(user.userId);
        shareholder["first_name"] = person.first_name;
        shareholder["last_name"] = person.last_name;
        shareholder["number_of_shares"] = user.number_of_shares;
        shareHolderInfo["shareholders"].push(shareholder);
    }
    return shareHolderInfo;
}

async function totalShares(stockName){
    checkString(stockName);
    checkWhiteSpace(stockName);
    let stocks = await getStocks();
    let stockInfo = checkStockExistsAndReturnStock(stockName, stocks);
    let shareholders = stockInfo.shareholders;
    let numShareholders = stockInfo.shareholders.length;
    let numShares = 0;
    for(const shareholder of shareholders){
        numShares += shareholder.number_of_shares;
    }
    if(numShareholders == 0){
        return `${stockName} currently has no shareholders.`
    }
    else if(numShareholders == 1){
        return `${stockName}, has ${numShareholders} shareholder that owns a total of ${numShares} shares.`
    }
    else{
        return `${stockName}, has ${numShareholders} shareholders that own a total of ${numShares} shares.`
    }
}

async function listStocks(firstName, lastName){
    checkString(firstName);
    checkWhiteSpace(firstName);
    checkString(lastName);
    checkWhiteSpace(lastName);
    let people = await getPeople();
    let personExistsInPeople = false;
    let personId = "";
    for(const person of people){
        if(person.first_name == firstName && person.last_name == lastName){
            personExistsInPeople = true;
            personId = person.id;
            break;
        }
    }
    if(!personExistsInPeople){
        throw "This person does not exist in people.json."
    }
    let stocks = await getStocks();
    let ownedStocks = [];
    for(const stock of stocks){
        for(const shareholder of stock.shareholders){
            if(shareholder.userId == personId){
                let ownedStock = {};
                ownedStock["stock_name"] = stock.stock_name;
                ownedStock["number_of_shares"] = shareholder.number_of_shares;
                ownedStocks.push(ownedStock);
            }
        }
    }
    if(ownedStocks.length == 0){
        throw "This person does not own shares in any companies."
    }
    else{
        return ownedStocks;
    }
}

async function getStockById(id){
    checkString(id);
    checkWhiteSpace(id);
    const stocks = await getStocks();
    for(const stock of stocks){
        if(stock.id == id){
            return stock;
        }
    }
    throw "Stock not found.";
}

module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}