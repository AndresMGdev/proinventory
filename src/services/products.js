import http from "./http-commons";

export const getAllProductsService = (token) => {
    return http.get('/products', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const createProductService = (token, data) => {
    return http.post('/products/create', data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getProductBySkuService = (sku, token) => {
    return http.get(`/products/${sku}/detail`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const updateProductService = (sku, data, token) => {
    return http.put(`/products/${sku}/update`, data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};


export const deleteProductService = (sku, token) => {
    return http.delete(`/products/${sku}/delete`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}