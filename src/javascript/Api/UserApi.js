import axios from 'axios'

let UserApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // baseURL: "http://gateway.sandbox.gabtaxi.com/api",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    },
})

UserApi.defaults.withCredentials = false

export default UserApi
