import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: "http://localhost:3000/api/",
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("access_token")}`;

export default instance;
