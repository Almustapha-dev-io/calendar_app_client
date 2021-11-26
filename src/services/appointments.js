import axios from '../axios-instance';

const BASE_URL = '/appointments';

export const getAppointmentsForMonth = (month, year, token) => {
    return axios.get(`${BASE_URL}/${month}/${year}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const postAppointment = (data, token) => {
    return axios.post(`${BASE_URL}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteAppointment = (id, token) => {
    return axios.delete(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}