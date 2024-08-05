import http from "./http-commons";

export const createUserService = (data) => {
    return http.post('/users/create', data);
};

export const getAllUsersService = (token) => {
    return http.get('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getUserByEmailService = (email, token) => {
    return http.get(`/users/${email}/detail`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const updateUserService = (email, data, token) => {
    return http.put(`/users/${email}/update`, data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
