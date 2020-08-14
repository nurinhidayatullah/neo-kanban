<template>
    <div>
        <LoginPage 
            v-if="pageName == 'loginPage'"
            @loginEvent="login"
            @signUpEvent="register"
        ></LoginPage>
        <HomePage 
            v-else-if="pageName == 'homePage'"
            @logoutEvent="logout"
            :organizationTasks="tasks"
            :organizationCategories="categories"
            :userEmail="emailUser"
            @deleteEvent="deleteTask"
            @addEvent="addTask"
            :isAdded="isAdded"
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
            isAdded: ''
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
                console.log(err)
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
            console.log(obj.category)
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
                this.isAdded = 'modal'
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