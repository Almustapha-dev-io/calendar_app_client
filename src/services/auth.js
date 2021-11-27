import axios from 'axios-instance';

const AUTH_BASE = '/auth';

export const sendPost = (body, endpoint='/') => {
    return axios.post(AUTH_BASE + endpoint, body);
};

export const sendPatch = (body, endpoint, token) => {
    return axios.patch(AUTH_BASE + endpoint, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}