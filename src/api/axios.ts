import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  response => response,
  error => {

    // El servidor no respondió
    if (!error.response) {
      window.location.href = "/server-down";
    }

    return Promise.reject(error);
  }
);