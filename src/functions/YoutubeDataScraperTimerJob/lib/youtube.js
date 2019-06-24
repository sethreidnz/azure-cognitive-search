const fetch = require("node-fetch");

const googleApiBaseUrl = "https://www.googleapis.com/youtube/v3";
const playlistRoute = "/playlistItems";
const videosRoute = "/videos";

const getPlayListItems = async (
  playListId,
  youtubeKey,
  part = "snippet,contentDetails",
  pageToken = null
) => {
  let requestUrl = `${googleApiBaseUrl}${playlistRoute}?part=${part}&playlistId=${playListId}&maxResults=50&key=${youtubeKey}`;
  if (pageToken) {
    requestUrl = requestUrl + `&pageToken=${pageToken}`;
  }
  return await fetch(requestUrl).then(async res => await res.json());
};

const getVideosRequest = async (
  videoIds,
  youtubeKey,
  part = "snippet,contentDetails"
) => {
  const videoIdString = videoIds.join(",");
  let requestUrl = `${googleApiBaseUrl}${videosRoute}?part=${part}&id=${videoIdString}&maxResults=50&key=${youtubeKey}`;
  return await fetch(requestUrl).then(async res => await res.json());
};

const getAllPlaylistItems = async (
  playListId,
  youtubeKey,
  part = "snippet,contentDetails"
) => {
  let playlistItems = [];

  // get the initial first page of youtubeKey
  let response = await getPlayListItems(playListId, youtubeKey, part, null);
  playlistItems = [...playlistItems, ...response.items];
  const totalItems = response.pageInfo.totalResults;
  let totalItemsRetrieved = response.items.length;

  // while we haven't got all the items get the next page using the nextPageToken from the initial request
  while (totalItems > totalItemsRetrieved) {
    response = await getPlayListItems(
      playListId,
      youtubeKey,
      part,
      response.nextPageToken
    );
    playlistItems = [...playlistItems, ...response.items];
    totalItemsRetrieved = totalItemsRetrieved + response.items.length;
  }

  return playlistItems;
};

const getVideos = async (videoIds, youtubeKey, part = "snippet,contentDetails") => {
  let allVideos = [];
  const videoCount = videoIds.length;
  let videosRetrieved = 0;

  while (videoCount > videosRetrieved) {
    const nextVideoIdsEndIndex =
      videosRetrieved + 50 < videoIds.length
        ? videosRetrieved + 50
        : videoIds.length;
    const response = await getVideosRequest(
      videoIds.slice(videosRetrieved, nextVideoIdsEndIndex),
      youtubeKey,
      part
    );
    allVideos = [...allVideos, ...response.items];
    videosRetrieved = videosRetrieved + response.items.length;
  }

  return allVideos.map(video => {
    // create a SafeID for a key for azure search to avoid leading underscore https://docs.microsoft.com/en-us/rest/api/searchservice/naming-rules#chart-of-naming-rules
    video.key = video.id;
    while (video.key.substring(0, 1) === "_") {
      video.key = +video.key.substring(1) + video.key.substring(0, 1); // move _ to the end
    }
    return video;
  });
};

const getAllPlaylistVideos = async (playlistId, youtubeKey) => {
  const allPlaylistItems = await getAllPlaylistItems(playlistId, youtubeKey);
  const videoIds = allPlaylistItems.map(item => item.contentDetails.videoId);
  return await getVideos(videoIds);
};

const getAllVideosFromPlaylists = async (playlistIds, youtubeKey) => {
  let allItems = [];
  for (let index = 0; index < playlistIds.length; index++) {
    const allPlayListItems = await getAllPlaylistVideos(playlistIds[index], youtubeKey);
    allItems = [...allItems, ...allPlayListItems];
  }
  return allItems;
};

module.exports = { getAllPlaylistVideos, getAllVideosFromPlaylists };
