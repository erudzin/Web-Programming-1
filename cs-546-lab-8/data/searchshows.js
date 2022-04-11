const axios = require("axios");

async function searchShows(searchTerm) {
  searchTerm.trim();
  const showsData = await axios.get("http://api.tvmaze.com/search/shows", {
    params: { q: searchTerm },
  });
  let shows = showsData.data;
  if (shows.length > 5) {
    shows = shows.slice(0, 5);
  }
  return shows;
}

async function searchShowById(id) {
  id.trim();
  const showData = await axios.get("http://api.tvmaze.com/shows/" + id);
  let show = showData.data;
  return show;
}

module.exports = {
  searchShows,
  searchShowById,
};
