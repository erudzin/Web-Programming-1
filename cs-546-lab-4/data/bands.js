const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

module.exports = {
  async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
    //checking name
    if (!name) throw "You must provide a name for your band";
    if (typeof name !== "string") throw "Name must be a string";
    if (name.trim().length === 0) {
      throw "Name cannot be an empty string or string with just spaces";
    }
    name = name.trim();

    //checking genre
    let genreInvalidFlag = false;
    if (!genre || !Array.isArray(genre)) {
      throw "You must provide an array of genres";
    }
    if (genre.length === 0) throw "You must supply at least one genre";
    for (i in genre) {
      if (typeof genre[i] !== "string" || genre[i].trim().length === 0) {
        genreInvalidFlag = true;
        break;
      }
      genre[i] = genre[i].trim();
    }
    if (genreInvalidFlag) {
      throw "One or more breeds is not a string or is an empty string";
    }

    //checking website
    if (!website) throw "You must provide a website for your band";
    if (typeof website !== "string") throw "Website must be a string";
    if (website.trim().length === 0) {
      throw "Website cannot be an empty string or string with just spaces";
    }
    if (!(website.startsWith("http://www.") && website.endsWith(".com"))) {
      throw "Website is an invalid link";
    }

    //checking record label
    if (!recordLabel) throw "You must provide a record label for your band";
    if (typeof recordLabel !== "string") throw "Record label must be a string";
    if (recordLabel.trim().length === 0) {
      throw "Record label cannot be an empty string or string with just spaces";
    }
    recordLabel = recordLabel.trim();

    //checking band members
    let bandMembersInvalidFlag = false;
    if (!bandMembers || !Array.isArray(bandMembers)) {
      throw "You must provide an array of band members";
    }
    if (bandMembers.length === 0)
      throw "You must supply at least one band member";
    for (i in bandMembers) {
      if (
        typeof bandMembers[i] !== "string" ||
        bandMembers[i].trim().length === 0
      ) {
        bandMembersInvalidFlag = true;
        break;
      }
      bandMembers[i] = bandMembers[i].trim();
    }
    if (bandMembersInvalidFlag) {
      throw "One or more band members is not a string or is an empty string";
    }

    //checking year formed
    if (!yearFormed) throw "You must provide a year formed for your band";
    if (typeof yearFormed !== "number") throw "Year formed must be a number";
    if (yearFormed < 1900 || yearFormed > 2022) {
      throw "Year formed is not between 1900 and 2022";
    }

    const bandCollection = await bands();

    let newBand = {
      name: name,
      genre: genre,
      website: website,
      recordLabel: recordLabel,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
    };

    const insertInfo = await bandCollection.insertOne(newBand);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add band";

    const newId = insertInfo.insertedId.toString();

    const band = await this.get(newId);
    return band;
  },

  async getAll() {
    const bandCollection = await bands();
    const bandList = await bandCollection.find({}).toArray();
    if (!bandList) throw "Could not get all bands";
    for (i in bandList) {
      bandList[i]._id = bandList[i]._id.toString();
    }
    return bandList;
  },

  async get(id) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "Id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "Invalid object ID";
    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });
    if (band === null) throw "No band with that id";
    band._id = band._id.toString();

    return band;
  },

  async remove(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'Invalid object ID';

    const bandCollection = await bands();
    const deletedBand = await this.get(id);
    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }
    return `${deletedBand.name} has been successfully deleted!`;
  },
  async rename(id, newName) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'Invalid object ID';
    if (!newName) throw 'You must provide a name for your band';
    if (typeof newName !== 'string') throw 'Name must be a string';
    if (newName.trim().length === 0)
      throw 'Name cannot be an empty string or string with just spaces';

    newName = newName.trim();

    const bandCollection = await bands();

    const bandToBeUpdated = await this.get(id);
    if(bandToBeUpdated.name == newName){
      throw "New name is the same as the current name."
    }
    const updatedBand = {
      name: newName,
    };



    const updatedInfo = await bandCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedBand }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update band successfully';
    }

    return await this.get(id);
  }
};
