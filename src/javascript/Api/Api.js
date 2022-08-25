import axios from 'axios'

let Api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    // baseURL: "http://gateway.sandbox.gabtaxi.com/api/v1",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    },
})

Api.defaults.withCredentials = false

export default Api