import axios from "axios";
import { getSession } from "./auth";

export const URL_BASE = "http://192.168.100.100:3333";
export const URL_RELATORIO = "http://" + window.location.hostname;

const session = getSession();

const headers = session?.token ? {
    Authorization: `Bearer ${session?.token}`
} : {}

const api = axios.create({
    baseURL: URL_BASE,
    headers
});

export default api;