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

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/artists`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getArtist = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/artists/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/albums`);
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
export const createPlaylist = async (
  name = `Playlist ${Date.now()}`,
  description = "",
  songs = [],
  token
) => {
  try {
    const data = { name, description, songs };
    const res = await axios.post(`${BASE_URL}/playlists/me`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
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
