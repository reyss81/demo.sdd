import api from './api';

export const inventoryService = {
    getAll: async () => {
        const response = await api.get('/inventory');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/inventory/${id}`);
        return response.data;
    },
    create: async (item) => {
        const response = await api.post('/inventory', item);
        return response.data;
    },
    update: async (id, item) => {
        const response = await api.put(`/inventory/${id}`, item);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/inventory/${id}`);
    }
};
