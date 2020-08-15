import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kanban-app-nurin.herokuapp.com',
});

export default instance