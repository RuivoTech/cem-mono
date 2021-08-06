import axios from "axios";

export const URL_BASE = "https://cem-api.ruivotech.com.br";
export const URL_RELATORIO = "http://" + window.location.hostname;

const api = axios.create({
    baseURL: URL_BASE
});

export default api;