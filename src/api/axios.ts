import axios from "axios";

// src/api/axios.ts

export const api = axios.create({
  baseURL: "https://sitio-inexistente.com/api"
});