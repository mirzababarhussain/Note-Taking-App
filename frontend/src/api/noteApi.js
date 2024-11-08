import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const fetchNotes = (page = 1, searchQuery = '') =>  api.get(`/notes?page=${page}&search=${searchQuery}`);
export const createNote = (note) => api.post('/notes', note);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
