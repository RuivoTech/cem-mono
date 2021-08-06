import Axios from "axios";

export const baseURL = "https://cem-api.ruivotech.com.br";

const api = Axios.create({
    baseURL: `${baseURL}/delivery`
});

export default api;