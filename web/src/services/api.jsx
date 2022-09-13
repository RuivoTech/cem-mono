import axios from "axios";

export const URL_BASE = "http://192.168.100.100:3333";
export const URL_RELATORIO = "http://" + window.location.hostname;

const api = axios.create({
    baseURL: URL_BASE
});

export default api;