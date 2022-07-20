<template>
    <div>
        <div>
            <main-dashboard />
        </div>
    </div>
</template>
<script>
    import MainDashboard from './Admin/Main.vue'
    import User from '@/Apis/User'
    export default{
        components: {MainDashboard},
        data() {
            return {
                user:null
            }
        },
        methods: {
              getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data                                  
                    
                }).catch(()=>{
                    this.$router.push('/')
                })
            }
        },
        created(){
            this.getAuth()
        }

    }
</script>