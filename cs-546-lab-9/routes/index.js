const path = require("path");

const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not found" });
  });
};

module.exports = constructorMethod;
