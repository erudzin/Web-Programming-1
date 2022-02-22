const people = require("./people");
const stocks = require("./stocks");

async function main(){
    console.log("Testing getPersonById");
    try{
        console.log(await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.getPersonById(-1));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.getPersonById(1001));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.getPersonById());
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
    }
    catch(e){
        console.log(e);
    }

    console.log("Testing sameEmail");
    try{
        console.log(await people.sameEmail("harvard.edu"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameEmail("foobar"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameEmail("foobar."));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameEmail("foobar.123"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameEmail(".com"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameEmail());
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameEmail("google.com.hk"));
    }
    catch(e){
        console.log(e);
    }
    console.log("Testing manipulateIp");
    try{
        console.log(await people.manipulateIp());
    }
    catch(e){
        console.log(e);
    }
    console.log("Testing sameBirthday");
    try{
        console.log(await people.sameBirthday(9, 25));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameBirthday("09", "25"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameBirthday(9, 31));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameBirthday(13, 25));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameBirthday(2, 29));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameBirthday("09", "31"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameBirthday("      ", "25"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await people.sameBirthday());
    }
    catch(e){
        console.log(e);
    }

    console.log("Testing listShareholders");
    try{
        console.log(await stocks.listShareholders("Aeglea BioTherapeutics, Inc."));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.listShareholders("foobar"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.listShareholders());
    }
    catch(e){
        console.log(e);
    }

    console.log("Testing totalShares");
    try{
        console.log(await stocks.totalShares('Aeglea BioTherapeutics, Inc.'));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.totalShares('Nuveen Preferred and Income 2022 Term Fund'));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.totalShares('Powell Industries, Inc.'));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.totalShares(43));
    }
    catch(e){
        console.log(e);
    }

    try{
        console.log(await stocks.totalShares(' '));
    }
    catch(e){
        console.log(e);
    }

    try{
        console.log(await stocks.totalShares('Foobar Inc'));
    }
    catch(e){
        console.log(e);
    }

    try{
        console.log(await stocks.totalShares());
    }
    catch(e){
        console.log(e);
    }

    console.log("Testing listStocks");

    try{
        console.log(await stocks.listStocks("Grenville", "Pawelke"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.listStocks('Patrick', "Hill"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.listStocks());
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.listStocks("foo"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.listStocks("      ", "        "));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.listStocks(1,2));
    }
    catch(e){
        console.log(e);
    }

    console.log("Testing getStockById");

    try{
        console.log(await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.getStockById(-1));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.getStockById(1001));
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.getStockById());
    }
    catch(e){
        console.log(e);
    }
    try{
        console.log(await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
    }
    catch(e){
        console.log(e);
    }
}

//call main
main();