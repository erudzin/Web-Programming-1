const express = require("express");
const router = express.Router();
const data = require("../data");
const userApiData = data.userApi;

router.route("/people").get(async (req, res) => {
  try {
    const people = await userApiData.getPeople();
    res.json(people);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route("/work").get(async (req, res) => {
  try {
    const works = await userApiData.getWorks();
    res.json(works);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route("/people/:id").get(async (req, res) => {
  try {
    const person = await userApiData.getPersonById(req.params.id);
    res.json(person);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route("/work/:id").get(async (req, res) => {
  try {
    const work = await userApiData.getWorkById(req.params.id);
    res.json(work);
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
