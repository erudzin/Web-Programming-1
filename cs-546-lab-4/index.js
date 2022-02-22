const bands = require("./data/bands");
const connection = require("./config/mongoConnection");

const main = async () => {
  const db = await connection.connectToDb();
  await db.dropDatabase();
  let band1;
  let band2;
  let band3;

  try {
    //Create a band of your choice.
    band1 = await bands.create(
      "One Direction",
      ["Pop", "Boy Band"],
      "http://www.onedirectionmusic.com",
      "Syco",
      ["Harry Styles", "Niall Horan", "Liam Payne", "Louis Tomlinson"],
      2010
    );
    //Log the newly created band. (Just that band, not all bands)
    console.log(band1);
  } catch (e) {
    console.log(e);
  }

  try {
    //Create another band of your choice.
    band2 = await bands.create(
      "Mayday Parade",
      ["Pop Punk", "Pop Rock", "Alternative Rock", "Emo Pop", "Emo"],
      "http://www.maydayparade.com",
      "Fearless",
      [
        "Derek Sanders",
        "Alex Garcia",
        "Brooks Betts",
        "Jeremy Lenzo",
        "Jake Bundrick",
      ],
      2005
    );
  } catch (e) {
    console.log(e);
  }

  try {
    //Query all bands, and log them all
    console.log(await bands.getAll());
  } catch (e) {
    console.log(e);
  }

  try {
    //Create the 3rd band of your choice.
    band3 = await bands.create(
      "Slipknot",
      ["Heavy Metal", "Nu Metal", "Alternative Metal", "Groove Metal"],
      "http://www.slipknot1.com",
      "Roadrunner",
      [
        "Shawn Crahan",
        "Craig Jones",
        "Mick Thomson",
        "Corey Taylor",
        "Sid Wilson",
        "Jim Root",
        "Alessandro Venturella",
        "Jay Weinberg",
      ],
      1995
    );
    //Log the newly created 3rd band. (Just that band, not all bands)
    console.log(band3);
  } catch (e) {
    console.log(e);
  }

  try {
    //Rename the first band
    await bands.rename(band1._id, "The Wiggles");
    //Log the first band with the updated name. 
    console.log(band1);
  } catch (e) {
    console.log(e);
  }

  try {
    //Remove the second band you created.
    console.log(await bands.remove(band2._id));
  } catch (e) {
    console.log(e);
  }

  try {
    //Query all bands, and log them all
    console.log(await bands.getAll());
  } catch (e) {
    console.log(e);
  }

  try {
    //Try to create a band with bad input parameters to make sure it throws errors.
    const errorBand = await bands.create(
      "Error",
      ["Error Music", "Error Metal"],
      "http://error.org", // error will occur here
      "Error Records",
      [
        "Error One",
        "Error Two",
        "Error Three"
      ],
      1969
    );
  } catch (e) {
    console.log(e);
  }

  try {
    //Try to remove a band that does not exist to make sure it throws errors.
    await bands.remove("6969696969696969696969");
  } catch (e) {
    console.log(e);
  }

  try {
    //Try to rename a band that does not exist to make sure it throws errors.
    await bands.remove("6969696969696969696969", "PEEPEE");
  } catch (e) {
    console.log(e);
  }

  try {
    //Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
    await bands.rename(band1._id, 80085);
  } catch (e) {
    console.log(e);
  }

  try {
    //Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
    await bands.get("1234567890987654321");
  } catch (e) {
    console.log(e);
  }
};

main();
