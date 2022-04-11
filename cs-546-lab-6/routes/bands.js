const express = require("express");
const router = express.Router();
const data = require("../data");
const bandData = data.bands;
const { ObjectId } = require("mongodb");

router.route("/").get(async (req, res) => {
  try {
    const bands = await bandData.getAll();
    let bandArray = [];
    for (const band of bands) {
      let item = {
        _id: band._id,
        name: band.name,
      };
      bandArray.push(item);
    }
    res.send(bandArray);
  } catch (e) {
    res.status(404).json({ error: "Could not find bands" });
  }
});

router.route("/").post(async (req, res) => {
  let bandInfo = req.body;
  if (!bandInfo.name) {
    res.status(400).json({ error: "You must provide a name for your band" });
    return;
  }
  if (typeof bandInfo.name !== "string") {
    res.status(400).json({ error: "Name must be a string" });
    return;
  }
  if (bandInfo.name.trim().length === 0) {
    res.status(400).json({
      error: "Name cannot be an empty string or string with just spaces",
    });
    return;
  }
  bandInfo.name = bandInfo.name.trim();

  //checking genre
  let genreInvalidFlag = false;
  if (!bandInfo.genre || !Array.isArray(bandInfo.genre)) {
    res.status(400).json({ error: "You must provide an array of genres" });
    return;
  }
  if (bandInfo.genre.length === 0) {
    res.status(400).json({ error: "You must supply at least one genre" });
    return;
  }
  for (i in bandInfo.genre) {
    if (
      typeof bandInfo.genre[i] !== "string" ||
      bandInfo.genre[i].trim().length === 0
    ) {
      genreInvalidFlag = true;
      break;
    }
    bandInfo.genre[i] = bandInfo.genre[i].trim();
  }
  if (genreInvalidFlag) {
    res.status(400).json({
      error: "One or more breeds is not a string or is an empty string",
    });
    return;
  }

  //checking website
  if (!bandInfo.website)
    res.status(400).json({ error: "You must provide a website for your band" });
  if (typeof bandInfo.website !== "string") {
    res.status(400).json({ error: "Website must be a string" });
    return;
  }
  if (bandInfo.website.trim().length === 0) {
    res.status(400).json({
      error: "Website cannot be an empty string or string with just spaces",
    });
    return;
  }
  if (
    !(
      bandInfo.website.startsWith("http://www.") &&
      bandInfo.website.endsWith(".com")
    )
  ) {
    res.status(400).json({ error: "Website is an invalid link" });
    return;
  }
  if (
    bandInfo.website.slice(
      bandInfo.website.indexOf(".") + 1,
      bandInfo.website.lastIndexOf(".")
    ).length < 5
  ) {
    res.status(400).json({ error: "Website is an invalid link" });
    return;
  }

  //checking record label
  if (!bandInfo.recordLabel) {
    res
      .status(400)
      .json({ error: "You must provide a record label for your band" });
    return;
  }
  if (typeof bandInfo.recordLabel !== "string") {
    res.status(400).json({ error: "Record label must be a string" });
    return;
  }
  if (bandInfo.recordLabel.trim().length === 0) {
    res.status(400).json({
      error:
        "Record label cannot be an empty string or string with just spaces",
    });
    return;
  }
  bandInfo.recordLabel = bandInfo.recordLabel.trim();

  //checking band members
  let bandMembersInvalidFlag = false;
  if (!bandInfo.bandMembers || !Array.isArray(bandInfo.bandMembers)) {
    res
      .status(400)
      .json({ error: "You must provide an array of band members" });
    return;
  }
  if (bandInfo.bandMembers.length === 0) {
    res.status(400).json({ error: "You must supply at least one band member" });
    return;
  }
  for (i in bandInfo.bandMembers) {
    if (
      typeof bandInfo.bandMembers[i] !== "string" ||
      bandInfo.bandMembers[i].trim().length === 0
    ) {
      bandMembersInvalidFlag = true;
      break;
    }
    bandInfo.bandMembers[i] = bandInfo.bandMembers[i].trim();
  }
  if (bandMembersInvalidFlag) {
    res.status(400).json({
      error: "One or more band members is not a string or is an empty string",
    });
    return;
  }

  //checking year formed
  if (!bandInfo.yearFormed) {
    res
      .status(400)
      .json({ error: "You must provide a year formed for your band" });
    return;
  }
  if (typeof bandInfo.yearFormed !== "number") {
    res.status(400).json({ error: "Year formed must be a number" });
    return;
  }
  if (bandInfo.yearFormed < 1900 || bandInfo.yearFormed > 2022) {
    res.status(400).json({ error: "Year formed is not between 1900 and 2022" });
    return;
  }
  if (Math.floor(bandInfo.yearFormed) !== bandInfo.yearFormed) {
    res.status(400).json({ error: "Year formed cannot be a decimal" });
    return;
  }
  try {
    const newBand = await bandData.create(
      bandInfo.name,
      bandInfo.genre,
      bandInfo.website,
      bandInfo.recordLabel,
      bandInfo.bandMembers,
      bandInfo.yearFormed
    );
    res.status(200).json(newBand);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.route("/:id").get(async (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid object ID" });
    return;
  }
  try {
    let band = await bandData.get(id);
    res.status(200).json(band);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.route("/:id").put(async (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid object ID" });
    return;
  }

  let bandInfo = req.body;
  if (!bandInfo.name) {
    res.status(400).json({ error: "You must provide a name for your band" });
    return;
  }
  if (typeof bandInfo.name !== "string") {
    res.status(400).json({ error: "Name must be a string" });
    return;
  }
  if (bandInfo.name.trim().length === 0) {
    res.status(400).json({
      error: "Name cannot be an empty string or string with just spaces",
    });
    return;
  }
  bandInfo.name = bandInfo.name.trim();

  //checking genre
  let genreInvalidFlag = false;
  if (!bandInfo.genre || !Array.isArray(bandInfo.genre)) {
    res.status(400).json({ error: "You must provide an array of genres" });
    return;
  }
  if (bandInfo.genre.length === 0) {
    res.status(400).json({ error: "You must supply at least one genre" });
    return;
  }
  for (i in bandInfo.genre) {
    if (
      typeof bandInfo.genre[i] !== "string" ||
      bandInfo.genre[i].trim().length === 0
    ) {
      genreInvalidFlag = true;
      break;
    }
    bandInfo.genre[i] = bandInfo.genre[i].trim();
  }
  if (genreInvalidFlag) {
    res.status(400).json({
      error: "One or more breeds is not a string or is an empty string",
    });
    return;
  }

  //checking website
  if (!bandInfo.website)
    res.status(400).json({ error: "You must provide a website for your band" });
  if (typeof bandInfo.website !== "string") {
    res.status(400).json({ error: "Website must be a string" });
    return;
  }
  if (bandInfo.website.trim().length === 0) {
    res.status(400).json({
      error: "Website cannot be an empty string or string with just spaces",
    });
    return;
  }
  if (
    !(
      bandInfo.website.startsWith("http://www.") &&
      bandInfo.website.endsWith(".com")
    )
  ) {
    res.status(400).json({ error: "Website is an invalid link" });
    return;
  }
  if (
    bandInfo.website.slice(
      bandInfo.website.indexOf(".") + 1,
      bandInfo.website.lastIndexOf(".")
    ).length < 5
  ) {
    res.status(400).json({ error: "Website is an invalid link" });
    return;
  }

  //checking record label
  if (!bandInfo.recordLabel) {
    res
      .status(400)
      .json({ error: "You must provide a record label for your band" });
    return;
  }
  if (typeof bandInfo.recordLabel !== "string") {
    res.status(400).json({ error: "Record label must be a string" });
    return;
  }
  if (bandInfo.recordLabel.trim().length === 0) {
    res.status(400).json({
      error:
        "Record label cannot be an empty string or string with just spaces",
    });
    return;
  }
  bandInfo.recordLabel = bandInfo.recordLabel.trim();

  //checking band members
  let bandMembersInvalidFlag = false;
  if (!bandInfo.bandMembers || !Array.isArray(bandInfo.bandMembers)) {
    res
      .status(400)
      .json({ error: "You must provide an array of band members" });
    return;
  }
  if (bandInfo.bandMembers.length === 0) {
    res.status(400).json({ error: "You must supply at least one band member" });
    return;
  }
  for (i in bandInfo.bandMembers) {
    if (
      typeof bandInfo.bandMembers[i] !== "string" ||
      bandInfo.bandMembers[i].trim().length === 0
    ) {
      bandMembersInvalidFlag = true;
      break;
    }
    bandInfo.bandMembers[i] = bandInfo.bandMembers[i].trim();
  }
  if (bandMembersInvalidFlag) {
    res.status(400).json({
      error: "One or more band members is not a string or is an empty string",
    });
    return;
  }

  //checking year formed
  if (!bandInfo.yearFormed) {
    res
      .status(400)
      .json({ error: "You must provide a year formed for your band" });
    return;
  }
  if (typeof bandInfo.yearFormed !== "number") {
    res.status(400).json({ error: "Year formed must be a number" });
    return;
  }
  if (bandInfo.yearFormed < 1900 || bandInfo.yearFormed > 2022) {
    res.status(400).json({ error: "Year formed is not between 1900 and 2022" });
    return;
  }
  if (Math.floor(bandInfo.yearFormed) !== bandInfo.yearFormed) {
    res.status(400).json({ error: "Year formed cannot be a decimal" });
    return;
  }

  try {
    const band = await bandData.update(
      id,
      bandInfo.name,
      bandInfo.genre,
      bandInfo.website,
      bandInfo.recordLabel,
      bandInfo.bandMembers,
      bandInfo.yearFormed
    );

    res.status(200).json(band);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.route("/:id").delete(async (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid object ID" });
    return;
  }
  try {
    await bandData.get(id);
  } catch (e) {
    res.status(404).json({ error: e });
    return;
  }
  try {
    await bandData.remove(id);
    res.status(200).json({
      bandId: id,
      deleted: true,
    });
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = router;
