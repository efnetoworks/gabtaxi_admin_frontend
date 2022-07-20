import axios from 'axios'

let UserApi = axios.create({
    baseURL: "http://gabtaxi_gateway.test/api", 
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') 
    },
})

UserApi.defaults.withCredentials = false

export default UserApi
