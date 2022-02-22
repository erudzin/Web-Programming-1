const axios = require("axios");

function checkString(string) {
  if (typeof string !== "string") {
    throw "Type of parameter is not a string.";
  }
}

function checkNumber(num) {
  if (isNaN(num)) {
    throw "Type of parameter is not number";
  }
}

function checkWhiteSpace(string) {
  if (string.trim().length <= 0) {
    //https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-spaces
    throw "Parameter is empty whitespace.";
  }
}

//https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function checkTwoLetters(string) {
  let firstSubstr = string.slice(string.indexOf(".") + 1);
  let secondSubstr = string.slice(string.lastIndexOf(".") + 1);

  if (firstSubstr.length < 2) {
    throw "Email domain does not contain 2 letters after dot.";
  }

  if (secondSubstr.length < 2) {
    throw "Email domain does not contain 2 letters after dot.";
  }

  for (i = 0; i < 2; i++) {
    if (!isLetter(firstSubstr[i]) || !isLetter(secondSubstr[i])) {
      throw "Email domain does not contain 2 letters after dot.";
    }
  }
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data; // this will be the array of people objects
}

async function getPersonById(id) {
  checkString(id);
  checkWhiteSpace(id);
  const people = await getPeople();
  for (const person of people) {
    if (person.id == id) {
      return person;
    }
  }
  throw "Person not found.";
}

async function sameEmail(emailDomain) {
  checkString(emailDomain);
  checkWhiteSpace(emailDomain);
  if (!emailDomain.includes(".")) {
    throw "Email domain does not contain a dot.";
  }
  if (emailDomain.indexOf(".") == 0) {
    throw "No domain is included.";
  }
  checkTwoLetters(emailDomain);
  let emailDomainLower = emailDomain.toLowerCase();
  let matchingEmails = [];
  const people = await getPeople();
  for (const person of people) {
    let email = person.email;
    email = email.toLowerCase();
    if (email.slice(email.indexOf("@") + 1) === emailDomainLower) {
      matchingEmails.push(person);
    }
  }
  if (matchingEmails.length < 2) {
    throw "Less than 2 people have a matching email";
  } else {
    return matchingEmails;
  }
}

function ipToNum(string) {
  let newString = string.split(".").join("").split("").sort().join("");
  let newStringtoNum = parseInt(newString);
  return newStringtoNum;
}

async function manipulateIp() {
  const people = await getPeople();
  let peopleWithSortedIp = [];
  for (const person of people) {
    let personWithSortedIp = {};
    personWithSortedIp["firstName"] = person.first_name;
    personWithSortedIp["lastName"] = person.last_name;
    personWithSortedIp["sortedIP"] = ipToNum(person.ip_address);
    peopleWithSortedIp.push(personWithSortedIp);
  }
  peopleWithSortedIp.sort((a, b) => {
    return a.sortedIP - b.sortedIP;
  });
  let totalIp = 0;
  for (const person of peopleWithSortedIp) {
    totalIp += person.sortedIP;
  }
  let ipObject = {};
  let highest = {};
  let lowest = {};
  highest["firstName"] =
    peopleWithSortedIp[peopleWithSortedIp.length - 1].firstName;
  highest["lastName"] =
    peopleWithSortedIp[peopleWithSortedIp.length - 1].lastName;
  lowest["firstName"] = peopleWithSortedIp[0].firstName;
  lowest["lastName"] = peopleWithSortedIp[0].lastName;
  ipObject["highest"] = highest;
  ipObject["lowest"] = lowest;
  ipObject["average"] = Math.floor(totalIp / peopleWithSortedIp.length);
  return ipObject;
}

async function sameBirthday(month, day) {
  checkNumber(month);
  checkNumber(day);
  let numMonth;
  let numDay;
  if (typeof month === "string") {
    checkWhiteSpace(month);
    numMonth = parseInt(month);
  } else {
    numMonth = month;
  }
  if (typeof day === "string") {
    checkWhiteSpace(day);
    numDay = parseInt(day);
  } else {
    numDay = day;
  }

  let months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  if (numMonth < 1 || numMonth > 12) {
    throw "Invalid month input. Not a month.";
  }
  if (
    (numMonth == 1 ||
      numMonth == 3 ||
      numMonth == 5 ||
      numMonth == 7 ||
      numMonth == 8 ||
      numMonth == 10 ||
      numMonth == 12) &&
    (numDay < 1 || numDay > 31)
  ) {
    throw `There are not ${day} days in ${months[numMonth]}`;
  }
  if (
    (numMonth == 4 || numMonth == 6 || numMonth == 9 || numMonth == 11) &&
    (numDay < 1 || numDay > 30)
  ) {
    throw `There are not ${day} days in ${months[numMonth]}`;
  }
  if (numMonth == 2 && (numDay < 1 || numDay > 28)) {
    throw `There are not ${numDay} days in ${months[numMonth]}`;
  }
  const people = await getPeople();
  let peopleWithMatchingBirthdays = [];
  for (const person of people) {
    let birthdayString = person.date_of_birth;
    let birthdayArray = birthdayString.split("/");
    if (birthdayArray[0] == numMonth && birthdayArray[1] == numDay) {
      let fullName = `${person.first_name} ${person.last_name}`;
      peopleWithMatchingBirthdays.push(fullName);
    }
  }
  if (peopleWithMatchingBirthdays.length > 0) {
    return peopleWithMatchingBirthdays;
  } else {
    throw "No people share this birthday.";
  }
}

module.exports = {
  getPersonById,
  sameEmail,
  manipulateIp,
  sameBirthday,
};
