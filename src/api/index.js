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

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/albums`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/songs`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getLikedSongs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/likedSongs`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/songs/categories`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getSongsByCategories = async (category) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/songs/search?category=${category}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
