import http from "./http-commons";

export const loginUserService = (data) => {
    return http.post('/auth/login', data);
}