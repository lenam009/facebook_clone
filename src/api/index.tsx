import axios from 'axios';

const axiosCreate = axios.create({
    baseURL: 'http://localhost:8088/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosCreate.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default axiosCreate;
