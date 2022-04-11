$("#numForm").submit((event) => {
  event.preventDefault();
  let number = $("#inputBox").val();
  let parsedNumber = parseInt(number);
  if (parsedNumber) {
    //https://stackoverflow.com/questions/40200089/number-prime-test-in-javascript
    let isPrime = true;
    for (let i = 2, s = Math.sqrt(parsedNumber); i <= s; i++)
      if (parsedNumber % i === 0) isPrime = false;
    if (parsedNumber <= 1) {
      isPrime = false;
    }
    if (isPrime) {
      $("#attempts").append(
        `<li class = 'is-prime'> ${number} is a prime number </li>`
      );
      $("#numForm").trigger("reset");
      $("#inputBox").focus();
    } else {
      $("#attempts").append(
        `<li class = 'not-prime'> ${number} is NOT a prime number </li>`
      );
      $("#numForm").trigger("reset");
      $("#inputBox").focus();
    }
  } else {
    alert(`${number} is not a valid input. Please try again.`);
    $("#numForm").trigger("reset");
    $("#inputBox").focus();
  }
});
