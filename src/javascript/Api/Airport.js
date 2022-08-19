import Api from "./Api"

export default{
    all_airports(){
        return Api.get('/admin/airport')
    },
    active_airport(){
        return Api.get('/admin/airport/active')
    },
    inactive_airport(){
        return Api.get('/admin/airport/inactive')
    },


    create_airport(form){
        return Api.post('/admin/airport/create', form)
    },

    update_airport(form){
        return Api.post('/admin/airport/update', form)
    },

    deactivate_airport(form){
        return Api.post('/admin/airport/deactivate', form)
    },

    activate_airport(form){
        return Api.post('/admin/airport/activate', form)
    }
    
}