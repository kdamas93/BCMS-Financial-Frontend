import axios from "axios";

export const api = axios.create({
    baseURL: "https://bcms-financial-demo.onrender.com/api",
    headers: {
      "Content-Type": "application/json"
    }
  });