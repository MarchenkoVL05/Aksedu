import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444/api/",
  headers: {
    Accept: "application/json",
  },
});

export default instance;
