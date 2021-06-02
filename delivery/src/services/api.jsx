import Axios from "axios";

export const baseURL = "http://localhost:3333";

const api = Axios.create({
    baseURL
});

export default api;