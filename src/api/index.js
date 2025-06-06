import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 1000
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const client = ({ method, data, url, withCredentials = false, auth, ...other }) => {
    return api({
        method,
        data,
        url,
        withCredentials,
        auth,
        ...other
    });
}

export default client;
