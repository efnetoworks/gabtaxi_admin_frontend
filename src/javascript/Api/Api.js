import axios from 'axios'

let Api = axios.create({
    baseURL: "http://business-database.test/api/v1",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    },
})

Api.defaults.withCredentials = false

export default Api