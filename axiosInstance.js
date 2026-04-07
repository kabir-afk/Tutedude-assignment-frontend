import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_BASEURL;

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
