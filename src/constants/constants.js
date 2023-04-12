import axios from "axios";

const PATH_INST = "http://192.168.2.118:3000/api/";
const AXIOS_INST = axios.create({ baseURL: PATH_INST})

export default {
    AXIOS_INST,
};
