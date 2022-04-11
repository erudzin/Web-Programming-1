const express = require("express");
const router = express.Router();
const data = require("../data");
const bandData = data.bands;
const albumData = data.albums;
const { ObjectId } = require("mongodb");
const { bands } = require("../data");

router.route("/:id").get(async (req, res) => {
  let bandId = req.params.id;
  if (!ObjectId.isValid(bandId)) {
    res.status(400).json({ error: "Invalid object ID" });
    return;
  }
  try {
    let albums = await albumData.getAll(bandId);
    if (albums == []) {
      throw "No albums for Band ID";
    }
    res.status(200).json(albums);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.route("/:id").post(async (req, res) => {
  let bandId = req.params.id;
  let albumInfo = req.body;
  if (!bandId) {
    res.status(400).json({ error: "You must provide a band ID to search for" });
    return;
  }
  if (typeof bandId !== "string") {
    res.status(400).json({ error: "Band ID must be a string" });
    return;
  }
  if (bandId.trim().length === 0) {
    res
      .status(400)
      .json({ error: "Band ID cannot be an empty string or just spaces" });
    return;
  }
  bandId = bandId.trim();
  if (!ObjectId.isValid(bandId)) {
    res.status(400).json({ error: "Invalid object Band ID" });
    return;
  }
  // checking title
  if (!albumInfo.title) {
    res.status(400).json({ error: "You must provide a title for your album" });
    return;
  }
  if (typeof albumInfo.title !== "string") {
    res.status(400).json({ error: "Title must be a string" });
    return;
  }
  if (albumInfo.title.trim().length === 0) {
    res.status(400).json({
      error: "Title cannot be an empty string or string with just spaces",
    });
    return;
  }
  albumInfo.title = albumInfo.title.trim();
  // checking release date
  if (!albumInfo.releaseDate) {
    res
      .status(400)
      .json({ error: "You must provide a release date for your album" });
    return;
  }
  if (typeof albumInfo.releaseDate !== "string") {
    res.status(400).json({ error: "Release date must be a string" });
    return;
  }
  let dateArray = albumInfo.releaseDate.split("/");
  if (dateArray.length !== 3) {
    res.status(400).json({ error: "Date not in proper format" });
    return;
  }
  let date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]); // https://stackoverflow.com/questions/7582828/how-to-check-if-a-string-is-a-legal-dd-mm-yyyy-date
  if (
    date.getDate() != dateArray[0] &&
    date.getMonth() != dateArray[1] - 1 &&
    date.getFullYear() != dateArray[2]
  ) {
    res.status(400).json({ error: "Date not in proper format" });
    return;
  }

  if (parseInt(dateArray[2]) < 1900 || parseInt(dateArray[2]) > 2023) {
    res
      .status(400)
      .json({ error: "Release date is not between 1900 and 2023" });
    return;
  }
  albumInfo.releaseDate = albumInfo.releaseDate.trim();
  // checking tracks
  let tracksInvalidFlag = false;
  if (!albumInfo.tracks || !Array.isArray(albumInfo.tracks)) {
    res.status(400).json({ error: "You must provide an array of tracks" });
    return;
  }
  if (albumInfo.tracks.length < 3) {
    res.status(400).json({ error: "You must supply at least three tracks" });
    return;
  }
  for (i in albumInfo.tracks) {
    if (
      typeof albumInfo.tracks[i] !== "string" ||
      albumInfo.tracks[i].trim().length === 0
    ) {
      tracksInvalidFlag = true;
      break;
    }
    albumInfo.tracks[i] = albumInfo.tracks[i].trim();
  }
  if (tracksInvalidFlag) {
    res.status(400).json({
      error: "One or more tracks is not a string or is an empty string",
    });
    return;
  }
  // checking rating
  if (!albumInfo.rating) {
    res.status(400).json({ error: "You must provide a rating for your album" });
    return;
  }
  if (typeof albumInfo.rating !== "number") {
    res.status(400).json({ error: "Rating must be a number" });
    return;
  }
  if (albumInfo.rating < 1 || albumInfo.rating > 5) {
    res.status(400).json({ error: "Rating has to be between 1 and 5." });
    return;
  }
  if (albumInfo.rating != albumInfo.rating.toFixed(1)) {
    res.status(400).json({ error: "Rating must have 0 or 1 decimal places." });
    return;
  }

  try {
    const newAlbum = await albumData.create(
      bandId,
      albumInfo.title,
      albumInfo.releaseDate,
      albumInfo.tracks,
      albumInfo.rating
    );
    const updatedBand = await bandData.get(bandId);
    res.status(200).json(updatedBand);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.route("/album/:id").get(async (req, res) => {
  let albumId = req.params.id;
  if (!albumId) {
    res
      .status(400)
      .json({ error: "You must provide an album ID to search for" });
    return;
  }
  if (typeof albumId !== "string") {
    res.status(400).json({ error: "Album ID must be a string" });
    return;
  }
  if (albumId.trim().length === 0) {
    res
      .status(400)
      .json({ error: "Album ID cannot be an empty string or just spaces" });
    return;
  }
  albumId = albumId.trim();
  if (!ObjectId.isValid(albumId)) {
    res.status(400).json({ error: "Invalid object Album ID" });
    return;
  }
  try {
    const album = await albumData.get(albumId);
    res.status(200).json(album);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.route("/album/:id").delete(async (req, res) => {
  let albumId = req.params.id;
  if (!ObjectId.isValid(albumId)) {
    res.status(400).json({ error: "Invalid object ID" });
  }
  try {
    await albumData.get(albumId);
  } catch (e) {
    res.status(404).json({ error: e });
  }
  try {
    await albumData.remove(albumId);
    res.status(200).json({
      albumId: albumId,
      deleted: true,
    });
  } catch (e) {
    res.status(404).json({ error: e });
  }
});
module.exports = router;
