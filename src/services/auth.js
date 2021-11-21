import axios from 'axios-instance';

const AUTH_BASE = '/auth';

export const sendPost = (body, endpoint='/') => {
    return axios.post(AUTH_BASE + endpoint, body);
};

