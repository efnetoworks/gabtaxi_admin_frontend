import Api from "./Api"
import UserApi from "./UserApi"
export default{
    login(form){
        return Api.post('/login', form)
    },

    logout(){
        return Api.post('/logout')
    },

    auth(){
        return UserApi.get('/user')
    }
}