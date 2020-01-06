import axios from 'axios';

axios.interceptors.response.use( (response) => {
    return response;
 }, (error) => {
    switch (error.response.status) {
        default:
            return Promise.reject(error);
    }
 });