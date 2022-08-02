import Axios from "axios";

export const baseURL = "http://192.168.200.103:3333";

const api = Axios.create({
    baseURL: `${baseURL}/delivery`
});

export default api;