require("dotenv").config();
const { getAllVideosFromPlaylists } = require("./lib/youtube");
const { createTextBlob } = require("./lib/storage");
const {
  STORAGE_ACCOUNT_NAME,
  STORAGE_ACCOUNT_KEY,
  STORAGE_CONTAINER_NAME,
  YOUTUBE_KEY
} = require("./settings");
const { playlists } = require("./constants");

const runFunction = async context => {
  try {
    context.log("Retrieving data from YouTube");
    const allVideos = await getAllVideosFromPlaylists(
      playlists.map(playlist => playlist.id),
      YOUTUBE_KEY
    );
    context.log("Finished retrieving data from YouTube");

    context.log("Storing data in blob storage");
    await createTextBlob(
      STORAGE_ACCOUNT_NAME,
      STORAGE_ACCOUNT_KEY,
      STORAGE_CONTAINER_NAME,
      JSON.stringify(allVideos),
      "channels/jre/podcasts.json"
    );
    context.log("Finished storing data in blob storage");
  } catch (exception) {
    context.log(
      "Something went wrong trying to run sync with YouTube.",
      exception
    );
  }
};

module.exports = runFunction;
