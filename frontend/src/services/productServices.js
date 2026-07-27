import axios from 'axios'

export const getProduct = (backendUrl) => {
    return axios.get(`${backendUrl}/api/product/list`);
}