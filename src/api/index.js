import { async } from "@firebase/util";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getAllArtists = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/artists`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
export const getArtist = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/artists/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAlbum = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/albums/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchSongByName = async (name) => {
  try {
    const res = await axios.get(`${BASE_URL}/songs/search?name=${name}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllSongs = async (name) => {
  try {
    let queryString = "";
    if (name) {
      queryString = `${BASE_URL}/songs?name=${name}`;
    } else {
      queryString = `${BASE_URL}/songs`;
    }
    const res = await axios.get(queryString);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllArtists = async (name) => {
  try {
    let queryString = "";
    if (name) {
      queryString = `${BASE_URL}/artists?name=${name}`;
    } else {
      queryString = `${BASE_URL}/artists`;
    }
    const res = await axios.get(queryString);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllAlbums = async (name) => {
  try {
    let queryString = "";
    if (name) {
      queryString = `${BASE_URL}/albums?name=${name}`;
    } else {
      queryString = `${BASE_URL}/albums`;
    }
    const res = await axios.get(queryString);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSong = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/songs/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getLikedSongs = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/likedSongs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

////////////////////////////////////////////////////////////////
export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/genres`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getSectionsByCategories = async (category) => {
  try {
    const res = await axios.get(`${BASE_URL}/sections?genre=${category}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSongsBySections = async (sectionId) => {
  try {
    const res = await axios.get(`${BASE_URL}/songs/sections/${sectionId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//////////////////////////////// PLAYLIST API //////////////////////////////////
export const getMyPlaylists = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/playlists/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaylist = async (token, playlistId) => {
  try {
    const res = await axios.get(`${BASE_URL}/playlists/me/${playlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPlaylist = async (
  name = `Playlist ${Date.now()}`,
  description = "",
  songs = [],
  imageURL,
  token
) => {
  imageURL =
    imageURL === ""
      ? "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
      : imageURL;
  try {
    const data = { name, description, songs, imageURL };
    const res = await axios.post(`${BASE_URL}/playlists/me`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlaylist = async (playlistId, data, token) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/playlists/me/${playlistId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePlaylist = async (playlistId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/playlists/me/${playlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addLikedSongs = async (songId, token) => {
  try {
    const url = `${BASE_URL}/users/likedSongs/${songId}`;
    const res = await axios.post(url, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLikedSongs = async (songId, token) => {
  try {
    const url = `${BASE_URL}/users/likedSongs/${songId}`;
    const res = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// get home section

export const getHomeSections = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/songs/sections`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

///////////////////////////////////PLAYLIST

// add song to playlist

export const addSongToPlaylist = async (playlistId, songId, token) => {
  try {
    const url = `${BASE_URL}/playlists/${playlistId}/${songId}`;
    const res = await axios.post(url, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlaylistSong = async (playlistId, songId, token) => {
  try {
    const url = `${BASE_URL}/playlists/${playlistId}/${songId}`;
    const res = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
