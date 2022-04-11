const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");
const bandMethods = require("./bands");

module.exports = {
  async create(bandId, title, releaseDate, tracks, rating) {
    // checking band id
    if (!bandId) throw "You must provide a band ID to search for";
    if (typeof bandId !== "string") throw "Band ID must be a string";
    if (bandId.trim().length === 0) {
      throw "Band ID cannot be an empty string or just spaces";
    }
    bandId = bandId.trim();
    if (!ObjectId.isValid(bandId)) throw "Invalid object Band ID";
    // checking title
    if (!title) throw "You must provide a title for your album";
    if (typeof title !== "string") throw "Title must be a string";
    if (title.trim().length === 0) {
      throw "Title cannot be an empty string or string with just spaces";
    }
    title = title.trim();
    // checking release date
    if (!releaseDate) throw "You must provide a release date for your album";
    if (typeof releaseDate !== "string") throw "Release date must be a string";
    let dateArray = releaseDate.split("/");
    if (dateArray.length !== 3) {
      throw "Date not in proper format";
    }
    let date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]); // https://stackoverflow.com/questions/7582828/how-to-check-if-a-string-is-a-legal-dd-mm-yyyy-date
    if (
      date.getDate() != dateArray[0] &&
      date.getMonth() != dateArray[1] - 1 &&
      date.getFullYear() != dateArray[2]
    ) {
      throw "Date not in proper format";
    }

    if (parseInt(dateArray[2]) < 1900 || parseInt(dateArray[2]) > 2023) {
      throw "Release date is not between 1900 and 2023";
    }
    releaseDate = releaseDate.trim();
    // checking tracks
    let tracksInvalidFlag = false;
    if (!tracks || !Array.isArray(tracks)) {
      throw "You must provide an array of tracks";
    }
    if (tracks.length < 3) throw "You must supply at least three tracks";
    for (i in tracks) {
      if (typeof tracks[i] !== "string" || tracks[i].trim().length === 0) {
        tracksInvalidFlag = true;
        break;
      }
      tracks[i] = tracks[i].trim();
    }
    if (tracksInvalidFlag) {
      throw "One or more tracks is not a string or is an empty string";
    }
    // checking rating
    if (!rating) throw "You must provide a rating for your album";
    if (typeof rating !== "number") throw "Rating must be a number";
    if (rating < 1 || rating > 5) {
      throw "Rating has to be between 1 and 5.";
    }
    if (rating != rating.toFixed(1)) {
      throw "Rating must have 0 or 1 decimal places.";
    }

    const bandCollection = await bands();
    let band = await bandMethods.get(bandId);

    let album = {
      _id: ObjectId(),
      title: title,
      releaseDate: releaseDate,
      tracks: tracks,
      rating: rating,
    };

    let currentAlbums = band.albums;
    currentAlbums.push(album);
    newOverallRating = 0;
    for (i in currentAlbums) {
      newOverallRating += currentAlbums[i].rating;
    }
    newOverallRating = newOverallRating / currentAlbums.length;
    newOverallRating = newOverallRating.toFixed(1);
    band.albums = currentAlbums;
    band.overallRating = newOverallRating;

    let updatedBandData = {
      name: band.name,
      genre: band.genre,
      website: band.website,
      recordLabel: band.recordLabel,
      bandMembers: band.bandMembers,
      yearFormed: band.yearFormed,
      albums: band.albums,
      overallRating: band.overallRating,
    };
    const updateInfo = await bandCollection.updateOne(
      { _id: ObjectId(bandId) },
      { $set: updatedBandData }
    );

    const newAlbumId = album._id.toString();
    console.log(newAlbumId);
    const newAlbum = await this.get(newAlbumId);
    return newAlbum;
  },
  async getAll(bandId) {
    if (!bandId) throw "You must provide a band ID to search for";
    if (typeof bandId !== "string") throw "Band ID must be a string";
    if (bandId.trim().length === 0) {
      throw "Band ID cannot be an empty string or just spaces";
    }
    bandId = bandId.trim();
    if (!ObjectId.isValid(bandId)) throw "Invalid object Band ID";
    const band = await bandMethods.get(bandId);
    for (i in band.albums) {
      band.albums[i]._id = band.albums[i]._id.toString();
    }
    return band.albums;
  },
  async get(albumId) {
    if (!albumId) throw "You must provide an album ID to search for";
    if (typeof albumId !== "string") throw "Album ID must be a string";
    if (albumId.trim().length === 0) {
      throw "Album ID cannot be an empty string or just spaces";
    }
    albumId = albumId.trim();
    if (!ObjectId.isValid(albumId)) throw "Invalid object Album ID";
    const bandCollection = await bands();
    const band = await bandCollection.findOne({
      "albums._id": ObjectId(albumId),
    });
    if (band == null) throw "No album with that ID";
    for (const album of band.albums) {
      if (album._id.toString() == albumId) {
        const foundAlbum = album;
        foundAlbum._id = foundAlbum._id.toString();
        return foundAlbum;
      }
    }
    throw "Album could not be found";
  },
  async remove(albumId) {
    if (!albumId) throw "You must provide an album ID to search for";
    if (typeof albumId !== "string") throw "Album ID must be a string";
    if (albumId.trim().length === 0) {
      throw "Album ID cannot be an empty string or just spaces";
    }
    albumId = albumId.trim();
    if (!ObjectId.isValid(albumId)) throw "Invalid object Album ID";
    const bandCollection = await bands();
    const band = await bandCollection.findOne({
      "albums._id": ObjectId(albumId),
    });
    if (band == null) throw "No album with that ID";
    let currentAlbums = band.albums;
    console.log(currentAlbums);
    console.log("---------");
    for (i in currentAlbums) {
      if (currentAlbums[i]._id.toString() == albumId) {
        currentAlbums.splice(i, 1);
      }
    }
    console.log(currentAlbums);
    newOverallRating = 0;
    for (i in currentAlbums) {
      newOverallRating += currentAlbums[i].rating;
    }
    newOverallRating = newOverallRating / currentAlbums.length;
    newOverallRating = newOverallRating.toFixed(1);
    const updateInfo = await bandCollection.updateOne(
      { _id: band._id },
      { $set: { albums: currentAlbums, overallRating: newOverallRating } }
    );

    return await bandMethods.get(band._id.toString());
  },
};
