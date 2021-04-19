import axios from "axios";
import {POSPOS_URL} from "../config/index";

const PosposAxios = axios.create({
    baseURL: POSPOS_URL
});

PosposAxios.interceptors.response.use(
    (response) => response,
    (error) => error.response
);

export { 
    PosposAxios
};

