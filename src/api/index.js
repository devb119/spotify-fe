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
