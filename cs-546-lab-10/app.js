const express = require("express");
const app = express();
const session = require("express-session");
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

//app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

//logs middleware information
const middlewareLogger = (req, res, next) => {
  let timestamp = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  let authStatus;
  if (req.session.username) {
    authStatus = "Authenticated User";
  } else {
    authStatus = "Non-Authenticated User";
  }
  console.log(`[${timestamp}]: ${method} ${route} (${authStatus})`);
  // let the next middleware run:
  next();
};
app.use(middlewareLogger);

app.use("/private", (req, res, next) => {
  if (!req.session.username) {
    return res.status(403).render("pages/notloggedin");
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
