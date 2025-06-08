import axios from 'axios'

const httpRequest = axios.create({
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    withCredentials: false,
})

export default httpRequest