import axios from "axios";

export const addCart = (backendUrl, token, itemId, size) => {
    return axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { token } }
    );
};

export const updateCart = (backendUrl, token, itemId, size, quantity) => {
    return axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        { headers: { token } }
    );
};

export const getCart = (backendUrl, token) => {
    return axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
    );
};

export const deleteCart = (backendUrl, itemId, size, quantity, token) => {
    return axios.post(
        `${backendUrl}/api/cart/update`,
        {},
        { headers: { token }}
    )
}