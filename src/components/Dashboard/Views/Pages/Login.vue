<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form @submit.prevent="login">
                <card type="login">
                  <h3 slot="header" class="header text-center">Login</h3>

                  <fg-input v-model="form.phone" addon-left-icon="nc-icon nc-single-02"
                            required placeholder="Phone Number..."></fg-input>

                  <fg-input v-model="form.password" addon-left-icon="nc-icon nc-key-25" placeholder="Password"
                            required type="password"></fg-input>
                  <br>
                  <button type="submit" style="cursor:pointer" class="btn btn-warning mb-3 col-sm-12">Login</button>
                </card>
              </form>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background" style="background-image: url(static/img/gablogo.png) "></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Card, Checkbox, Button } from '@/components/UIComponents';
  import AppNavbar from './Layout/AppNavbar'
  import AppFooter from './Layout/AppFooter'
  import User from '@/javascript/Api/User.js'

  export default {
    components: {
      Card,
      AppNavbar,
      AppFooter,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button
    },
    methods: {
      toggleNavbar() {
        document.body.classList.toggle('nav-open')
      },
      closeMenu() {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },

      login() {
        if(this.form.phone != null && this.form.password != null){
          User.login(this.form).then((result) =>{
            localStorage.setItem("token", result.data['auth_token'])
            window.location.href = '/admin/overview'
            // this.$router.push({name:'dashboard'})
          }).catch((err) => {
            this.message = err.response.data.message
          });
        }else{
          this.message = "Some fields are missing"
        }
      }
    },
    data() {
      return {
        form: {
          phone: '',
          password: '',
          user_type:'admin'
        }
      }
    },
    beforeDestroy() {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
