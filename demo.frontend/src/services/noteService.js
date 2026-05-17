import api from './api';

export const noteService = {
    getAll: async () => {
        const response = await api.get('/notes');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    },
    create: async (note) => {
        const response = await api.post('/notes', note);
        return response.data;
    },
    update: async (id, note) => {
        const response = await api.put(`/notes/${id}`, note);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/notes/${id}`);
    }
};
