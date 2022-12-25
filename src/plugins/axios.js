import axios from "axios";

const request = axios.create({ baseURL: localStorage.getItem('serverUrl') });

export default request;
