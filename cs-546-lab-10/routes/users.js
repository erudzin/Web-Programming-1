const express = require("express");
const userFunctions = require("../data/users");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.username) {
    res.redirect("/private");
  }
  res.render("pages/login", { title: "Login Page" });
});

router.get("/signup", async (req, res) => {
  if (req.session.username) {
    res.redirect("/private");
  }
  res.render("pages/signup", { title: "Sign-up Page" });
});

router.post("/signup", async (req, res) => {
  //https://www.w3resource.com/javascript/form/letters-numbers-field.php
  const letterNumber = /^[0-9a-zA-Z]+$/; //used to check if alphanumeric
  //checking username
  let userData = req.body;
  let username = userData.username;
  let password = userData.password;
  if (!username) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "No username provided",
    });
    return;
  }
  if (typeof username !== "string") {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Username must be a string",
    });
    return;
  }
  if (username.trim().length === 0) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Username cannot be an empty string",
    });
    return;
  }
  if (username.indexOf(" ") >= 0) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Username cannot contain any spaces",
    });
    return;
  }
  username = username.trim();
  if (username.length < 4) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Username must be at least 4 characters long",
    });
    return;
  }
  if (!username.match(letterNumber)) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Username must only contain alphanumeric characters",
    });
    return;
  }
  username = username.toLowerCase();

  //checking password
  if (!password) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "No password provided",
    });
    return;
  }
  if (typeof password !== "string") {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Password must be a string",
    });
    return;
  }
  if (password.trim().length === 0) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Password cannot be an empty string",
    });
    return;
  }
  if (password.indexOf(" ") >= 0) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Password cannot contain any spaces",
    });
    return;
  }
  if (password.length < 6) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: "Password must be at least 6 characters long",
    });
    return;
  }

  let userCreation;

  try {
    userCreation = await userFunctions.createUser(username, password);
    if (userCreation.userInserted == true) {
      res.redirect("/");
    } else {
      res.status(500).render("pages/signup", {
        title: "Sign-up Page",
        error: "Internal Server Error",
      });
      return;
    }
  } catch (e) {
    res.status(400).render("pages/signup", {
      title: "Sign-up Page",
      error: e,
    });
    return;
  }
});

router.post("/login", async (req, res) => {
  //https://www.w3resource.com/javascript/form/letters-numbers-field.php
  const letterNumber = /^[0-9a-zA-Z]+$/; //used to check if alphanumeric
  //checking username
  let userData = req.body;
  let username = userData.username;
  let password = userData.password;
  if (!username) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "No username provided",
    });
    return;
  }
  if (typeof username !== "string") {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Username must be a string",
    });
    return;
  }
  if (username.trim().length === 0) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Username cannot be an empty string",
    });
    return;
  }
  if (username.indexOf(" ") >= 0) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Username cannot contain any spaces",
    });
    return;
  }
  username = username.trim();
  if (username.length < 4) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Username must be at least 4 characters long",
    });
    return;
  }
  if (!username.match(letterNumber)) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Username must only contain alphanumeric characters",
    });
    return;
  }
  username = username.toLowerCase();

  //checking password
  if (!password) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "No password provided",
    });
    return;
  }
  if (typeof password !== "string") {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Password must be a string",
    });
    return;
  }
  if (password.trim().length === 0) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Password cannot be an empty string",
    });
    return;
  }
  if (password.indexOf(" ") >= 0) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Password cannot contain any spaces",
    });
    return;
  }
  if (password.length < 6) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: "Password must be at least 6 characters long",
    });
    return;
  }
  try {
    const userChecker = await userFunctions.checkUser(username, password);
    if (userChecker.authenticated == true) {
      req.session.username = username;
      res.redirect("/private");
    } else {
      res.status(500).render("pages/login", {
        title: "Login Page",
        error: "Internal Server Error",
      });
      return;
    }
  } catch (e) {
    res.status(400).render("pages/login", {
      title: "Login Page",
      error: e,
    });
    return;
  }
});

router.get("/private", async (req, res) => {
  res.render("pages/private", {
    title: "Private Page",
    username: req.session.username,
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});

module.exports = router;
