import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.43:80/api/",
  headers: {
    Accept: "application/json",
  },
});

export default instance;
