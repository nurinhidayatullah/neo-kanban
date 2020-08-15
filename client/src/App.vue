<template>
    <div>
        <LoginPage 
            v-if="pageName == 'loginPage'"
            @loginEvent="login"
            @signUpEvent="register"
            @gAuth="googleLogin"
            :formName="formName"
            @changeFormName="toSignUp"
            @cancelSignUp="cancelSignUp"
            :isError="isError"
            :errorMsg="error"
        ></LoginPage>
        <HomePage 
            v-else-if="pageName == 'homePage'"
            @logoutEvent="logout"
            :organizationTasks="tasks"
            :organizationCategories="categories"
            :userEmail="emailUser"
            @deleteEvent="deleteTask"
            @addEvent="addTask"
            @editEvent="editTask"
            @dragEvent="drag"
        ></HomePage>
    </div>
</template>

<script>
import LoginPage from './views/login-page'
import HomePage from './views/home-page'
import axios from './config/axios'
export default {
    name: "App",
    data() {
        return {
            pageName: 'loginPage',
            tasks: [],
            categories: [],
            emailUser: '',
            formName: 'login',
            error: {
                email: '',
                password: '',
                pwdLength: '',
                taken: '',
            },
            isError: {
                email: false,
                password: false,
                pwdLength: false,
                taken: false,
            }
        }
    },
    components: {
        LoginPage,
        HomePage
    },
    methods: {
        checkAuth() {
            if(localStorage.token){
                this.pageName = 'homePage'
                this.fetchCategories()
                this.fetchTask()
                this.getEmail()
            } else {
                this.pageName = 'loginPage'
            }
        },
        register(payload) {
            axios({
                url: '/register',
                method: 'post',
                data: {
                    email: payload.email,
                    password: payload.password,
                    organization: payload.organization
                }
            })
            .then(({data}) => {
                this.checkAuth()
            })
            .catch( err => {
                this.error = {
                    email: '',
                    password: '',
                    pwdLength: '',
                    taken: '',                 
                }
                this.isError = {
                    email: false,
                    password: false,
                    pwdLength: false,
                    taken: false,
                }
                if(payload.email == '') {
                    this.error.email = 'Email Required'
                    this.isError.email = true
                }
                if(payload.password == '') {
                    this.error.password = 'Password Required'
                    this.isError.password = true
                } 
                if(payload.password.length < 6) {
                    this.error.pwdLength='Password length must be more than 6'
                    this.isError.pwdLength = true
                } 
                else {
                    this.error.taken ='This Email Has been registered'
                    this.isError.taken = true
                } 
            })
        },
        toSignUp(name) {
            this.error = {
                email: '',
                password: '',
                pwdLength: '',
                taken: '',                 
            }
            this.isError = {
                email: false,
                password: false,
                pwdLength: false,
                taken: false,
            }
            this.formName = name
        },
        cancelSignUp(name) {
            this.error = {
                email: '',
                password: '',
                pwdLength: '',
                taken: '',                 
            }
            this.isError = {
                email: false,
                password: false,
                pwdLength: false,
                taken: false,
            }
            this.formName = name
        },
        googleLogin(auth) {
            axios({
                url: "/googleLogin",
                method: "post",
                data: {
                    id_token: auth
                }
            })
            .then(({data}) => {
                localStorage.token = data.token
                localStorage.email = data.email
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        },
        login(payload) {
            axios({
                url: '/login',
                method: 'post',
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then (({ data }) => {
                localStorage.token = data.token
                localStorage.email = data.email
                this.checkAuth()
            })
            .catch(err => {
                this.error.email = ''
                this.isError.email = false
                this.error.email= 'Invalid Email Or Password'
                this.isError.email = true
                console.log(err)
            })
        },
        getEmail() {
            this.emailUser = localStorage.email
        },
        drag(obj) {
            axios({
                url: `/tasks/category/${obj.id}`,
                method: 'put',
                headers: {
                    token: localStorage.token
                },
                data: {
                    category: obj.category
                }
            })
            .then(res => {
                this.fetchTask()
            })
            .catch(err => {
                console.log(err)
            })
        },
        logout() {
            localStorage.clear()
            this.checkAuth()
        },

        fetchTask() {
            axios({
                url: '/tasks',
                method: 'get',
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                this.tasks = data.tasks 
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchCategories() {
            axios({
                url: '/tasks/categories',
                method: 'get',
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                this.categories = data.categories
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteTask(id) {
            axios({
                url: `/tasks/${id}`,
                method: 'delete',
                headers: {
                    token: localStorage.token
                }
            })
                .then(res => {
                    this.checkAuth()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addTask(obj) {
            axios({
                url: '/tasks',
                method: 'post',
                headers: {
                    token: localStorage.token
                },
                data: {
                    title: obj.title,
                    description: obj.description,
                    category: obj.category,
                    priority: obj.priority,
                    due_date: obj.due_date
                }
            })
            .then(data => {
                $(`#staticBackdrop-${obj.categoryId}`).modal('hide')
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        },
        editTask(obj) {
            axios({
                url: `/tasks/${obj.id}`,
                method: 'put',
                headers: {
                    token: localStorage.token
                },
                data: {
                    title: obj.title,
                    description: obj.description,
                    priority: obj.priority,
                    due_date: obj.due_date,
                    category: obj.category
                }
            })
            .then(res => {
                $(`#staticBackdrop-add-${obj.id}`).modal('hide')
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        }
    },

    created() {
        this.checkAuth()
    }
}
</script>

<style>

</style>