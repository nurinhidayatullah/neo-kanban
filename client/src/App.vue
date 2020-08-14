<template>
    <div>
        <LoginPage 
            v-if="pageName == 'loginPage'"
            @loginEvent="login"
            @signUpEvent="register"
            @gAuth="googleLogin"
            :errorMsg="error"
            :isError="isError"
            :formName="formName"
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
            error: [],
            isError: false,
            formName: 'login'
        }
    },
    components: {
        LoginPage,
        HomePage
    },
    methods: {
        checkAuth() {
            if(localStorage.token){
                this.errorMsg = []
                this.isError = false
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
                this.formName = 'login'
            })
            .catch( err => {
                this.error = []
                this.isError = false
                if(payload.email == '') this.error.push('Email Required')
                if(payload.password == '') this.error.push('Password Required')
                if(payload.password.length < 6) this.error.push('Password length must be more than 6')
                this.isError = true
                this.formName = 'signUp'
            })
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
                this.error = []
                this.isError = false
                this.error.push('Invalid Email or Password')
                this.isError = true
            })
        },
        
        getEmail() {
            this.emailUser = localStorage.email
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
            console.log(obj)
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