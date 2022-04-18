const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcryptjs");
const saltRounds = 16;

async function createUser(username, password) {
  //https://www.w3resource.com/javascript/form/letters-numbers-field.php
  const letterNumber = /^[0-9a-zA-Z]+$/; //used to check if alphanumeric

  //checking username
  if (!username) throw "No username provided";
  if (typeof username !== "string") throw "Username must be a string";
  if (username.trim().length === 0) throw "Username cannot be an empty string";
  if (username.indexOf(" ") >= 0) throw "Username cannot contain any spaces";
  username = username.trim();
  if (username.length < 4) throw "Username must be at least 4 characters long";
  if (!username.match(letterNumber))
    throw "Username must only contain alphanumeric characters";
  username = username.toLowerCase();

  //checking password
  if (!password) throw "No password provided";
  if (typeof password !== "string") throw "Password must be a string";
  if (password.trim().length === 0) throw "Password cannot be an empty string";
  if (password.indexOf(" ") >= 0) throw "Password cannot contain any spaces";
  if (password.length < 6) throw "Password must be at least 6 characters long";

  //hashing password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //pull users from database
  const userCollection = await users();

  //checking if user exists in database
  const user = await userCollection.findOne({ username: username });
  if (user !== null) throw "User already exists with that username";

  //if not, create new user and add
  let newUser = {
    username: username,
    password: hashedPassword,
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not add user to database";

  return { userInserted: true };
}

async function checkUser(username, password) {
  //https://www.w3resource.com/javascript/form/letters-numbers-field.php
  const letterNumber = /^[0-9a-zA-Z]+$/; //used to check if alphanumeric

  //checking username
  if (!username) throw "No username provided";
  if (typeof username !== "string") throw "Username must be a string";
  if (username.trim().length === 0) throw "Username cannot be an empty string";
  if (username.indexOf(" ") >= 0) throw "Username cannot contain any spaces";
  username = username.trim();
  if (username.length < 4) throw "Username must be at least 4 characters long";
  if (!username.match(letterNumber))
    throw "Username must only contain alphanumeric characters";
  username = username.toLowerCase();

  //checking password
  if (!password) throw "No password provided";
  if (typeof password !== "string") throw "Password must be a string";
  if (password.trim().length === 0) throw "Password cannot be an empty string";
  if (password.indexOf(" ") >= 0) throw "Password cannot contain any spaces";
  if (password.length < 6) throw "Password must be at least 6 characters long";

  //pull users from database
  const userCollection = await users();
  //checking if user exists in database
  const user = await userCollection.findOne({ username: username });
  if (user === null) throw "Either the username or password is invalid";
  //check if password matches
  let compareToPassword = false;
  try {
    compareToPassword = await bcrypt.compare(password, user.password);
  } catch (e) {
    throw "Either the username or password is invalid";
  }
  return { authenticated: true };
}

module.exports = {
  createUser,
  checkUser,
};
