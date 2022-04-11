const { searchshows } = require("../data");
const searchShowRoutes = require("./searchshows");

const constructorMethod = (app) => {
  app.use("/", searchShowRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
