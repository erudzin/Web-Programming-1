const express = require("express");
const { searchshows } = require("../data");
const router = express.Router();

router.route("/").get(async (req, res) => {
  res.render("shows/index", { title: "Show Finder" });
});

router.route("/searchshows").post(async (req, res) => {
  let searchData = req.body;
  let term = searchData.showSearchTerm;
  if (!term) {
    res.status(400).render("shows/error", {
      title: "Error",
      error: "Form is empty or all whitespace",
    });
    return;
  }
  if (term.trim().length <= 0) {
    res.status(400).render("shows/error", {
      title: "Error",
      error: "Form is empty or all whitespace",
    });
    return;
  }
  let searchResults = await searchshows.searchShows(term);
  res.render("shows/search", {
    title: "Shows Found",
    showSearchTerm: term,
    shows: searchResults,
  });
});

router.route("/show/:id").get(async (req, res) => {
  let id = req.params.id;
  if (isNaN(id) || parseInt(id) < 1 || parseInt(id) > 185054) {
    res.status(404).render("shows/notfound", {
      title: "Error",
      error: "No show found for this ID",
    });
    return;
  }
  let show = await searchshows.searchShowById(id);
  if (show.status == 404) {
    res.status(404).render("shows/notfound", {
      title: "Error",
      error: "No show found for this ID",
    });
    return;
  }
  let name, img, language, genres, rating, network, summary;
  if (!show.name) {
    name = "N/A";
  } else {
    name = show.name;
  }
  if (!show.image) {
    img =
      "https://thumbs.dreamstime.com/b/no-image-vector-symbol-missing-available-icon-no-gallery-moment-no-image-vector-symbol-missing-available-icon-no-gallery-169136238.jpg";
  } else {
    if (!show.image.medium) {
      img =
        "https://thumbs.dreamstime.com/b/no-image-vector-symbol-missing-available-icon-no-gallery-moment-no-image-vector-symbol-missing-available-icon-no-gallery-169136238.jpg";
    } else {
      img = show.image.medium;
    }
  }
  if (!show.language) {
    language = "N/A";
  } else {
    language = show.language;
  }
  if (!show.genres) {
    genres = "N/A";
  } else {
    genres = show.genres;
  }
  if (!show.rating || !show.rating.average) {
    rating = "N/A";
  } else {
    rating = show.rating.average;
  }
  if (!show.network) {
    network = "N/A";
  } else {
    network = show.network.name;
  }
  if (!show.summary) {
    summary = "N/A";
  } else {
    summary = show.summary;
  }
  res.render("shows/show", {
    title: name,
    name: name,
    img: img,
    language: language,
    genres: genres,
    rating: rating,
    network: network,
    summary: summary,
  });
});

module.exports = router;
