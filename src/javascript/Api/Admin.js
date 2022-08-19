import Api from "./Api"

export default{
    all_admin(){
        return Api.get('/admin/getAdmins')
    },

    active_admin(){        
        return Api.get('/admin/get-active-admin')
    },

    inactive_admin(){
        return Api.get('/admin/get-inactive-admin')
    },
    
    register_admin(form){
        return Api.post('/admin/register', form)
    },

    update_admin(form){
        return Api.post('/admin/update', form)
    },

    reset_admin_password(form){
        return Api.post('/reset-admin-password', form)        
    },

    deactivate_admin_account(form){
        return Api.post('/admin/deactivate', form)        
    },

    activate_admin_account(form){
        return Api.post('/admin/activate', form)
    }

    

    
}