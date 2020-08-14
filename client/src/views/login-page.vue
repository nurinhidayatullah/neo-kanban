<template>
    <div class="login-container container-fluid m-0 p-0">
        <img src="../images/cloud2.png" class="img-login-cloud-1 img-fluid">
        <div class="login-form-container container-fluid m-0 p-0">
            <div class="login-form p-3 mb-5 container-fluid">
                <div class="card-body login-body">
                    <div v-if="formName == 'login'">
                        <p class="login-title">Login to <b>KANBAN</b></p>
                        <form class="mt-2" @submit.prevent="login">
                            <div class="w-75">
                                <div class="form-group">
                                  <label for="exampleInputEmail1">Email address</label>
                                  <input type="email" v-model="email" class="form-control" aria-describedby="emailHelp" id="exampleInputEmail1">
                                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword1">Password</label>
                                  <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                                </div>
                            </div><br><br><br>
                            <small v-if="isError == true"><b><i>{{ errStr }}<i><b></small>
                            <div class="container-fluid w-75 m-0 p-0">
                                    <button type="submit" style="top: 400px;" class="btn btn-secondary position-absolute">Login</button>
                                    <h4 class="mt-1" style="position: absolute; left: 22%; top: 400px">or</h4>
                            </div>
                        </form>
                            <button v-google-signin-button="clientId" style="position: absolute; top: 400px; left: 25%" class="google-signin-button btn btn-secondary"> Continue with Google</button>
                            <small>Don't have an account? <a href="" @click.prevent="toSignUpPage">Sign Up Now!</a></small>
                    </div>
                    <div v-else-if="formName == 'signUp'">
                        <p style="font-size: 32px; text-align: justify; border-bottom: 1px black solid; display: inline;">Start for Free</p>
                        <form class="mt-2" @submit.prevent="register">
                            <div class="w-75">
                                <div class="form-group">
                                  <label for="exampleInputEmail2">Email address</label>
                                  <input type="email" v-model="emailSignUp" class="form-control" aria-describedby="emailHelp" id="exampleInputEmail2">
                                  <small id="emailHelp1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword2">Password</label>
                                  <input type="password" v-model="passwordSignUp" class="form-control" id="exampleInputPassword2">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputOrganization">Organization*</label>
                                    <input type="text" v-model="organization" class="form-control" id="exampleInputOrganization">
                                  </div>
                            </div>
                                <button type="submit" class="btn btn-secondary">Sign Up</button>
                                <button class="btn btn-secondary" @click.prevent="cancelSignUp">Cancel</button><br>
                                <small v-if="isError == true"><b><i>{{ errStr }}<i><b></small>
                                <br>
                        </form>
                    </div>
                </div>
            </div>
            <img src="../images/cloud1.png" class="img-login-cloud-2 img-fluid">
            <img class="img-logo img-fluid" src="../images/leaf.png">
            <h1 class="main-logo">K<img class="img-on-logo img-fluid" src="../images/cursor.png">NBAN</h1>
            <img class="img-login-main img-fluid" src="../images/login.svg">
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: "LoginPage",
    props: ['errorMsg', 'isError', 'formName'],
    data() {
        return {
            clientId: '559460521278-l7nojve7knmj89b0luao668hu455jsqn.apps.googleusercontent.com',
            email: '',
            password: '',
            emailSignUp: '',
            passwordSignUp: '',
            organization: '',
        }
    }, computed :{
        errStr() {
            return this.errorMsg.join('')
        }
    },
    methods: {
        OnGoogleAuthSuccess (idToken) {
            this.$emit('gAuth', idToken)
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        },
        login() {
            this.$emit('loginEvent', {
                email: this.email,
                password: this.password
            })
        },
        toSignUpPage() {
            this.isError = false,
            this.errorMsg = ''
            this.formName = 'signUp'
            this.passwordSignUp = ''
            this.emailSignUp = ''
            this.organization = ''
        },
        cancelSignUp() {
            this.errorMsg = []
            this.isError = false
            this.formName = 'login'
        },
        register() {
            this.$emit('signUpEvent', {
                email: this.emailSignUp,
                password: this.passwordSignUp,
                organization: this.organization
            })
        }
    }
}
</script>

<style>

</style>