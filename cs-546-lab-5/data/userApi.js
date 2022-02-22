const axios = require("axios");

function checkWhiteSpace(string) {
  if (string.trim().length <= 0) {
    throw "Parameter is empty whitespace.";
  }
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"
  );
  return data; // this will be the array of people objects
}

async function getPersonById(id) {
  checkWhiteSpace(id);
  id.trim();
  const people = await getPeople();
  for (const person of people) {
    if (person.id == id) {
      return person;
    }
  }
  throw "Person not found.";
}

async function getWorks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json"
  );
  return data; // this will be the array of people objects
}

async function getWorkById(id) {
  checkWhiteSpace(id);
  id.trim();
  const works = await getWorks();
  for (const work of works) {
    if (work.id == id) {
      return work;
    }
  }
  throw "Work not found.";
}

module.exports = {
  getPeople,
  getPersonById,
  getWorks,
  getWorkById,
};
