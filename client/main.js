const baseUrl = 'http://localhost:3000'

var app = new Vue({
    el: "#app",
    data: {
        pageName: 'login',
        secondaryPageName: 'signIn',
        email: '',
        password: '',
        organization: ''
    },
    methods: {
        login() {
            axios({
                url: `${baseUrl}/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                localStorage.token = data.token
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        },
        logout(){
            localStorage.clear()
            this.checkAuth()
            this.email = ''
            this.password = ''
            this.organization = ''
        },
        toSignUp() {
            this.secondaryPageName = 'signUp'
            this.email = ''
            this.password = ''
            this.organization = ''
        },
        cancelSignUp() {
            this.secondaryPageName = 'signIn'
            this.email = ''
            this.password = ''
            this.organization = ''
        },
        signUp() {
            axios({
                url: `${baseUrl}/register`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                    organization: this.organization
                }
            })
            .then(res => {
                this.secondaryPageName = 'signIn'
                this.email = ''
                this.password = ''
                this.organization = ''
            })
            .catch(err => {
                console.log(err)
            })
        },
        checkAuth() {
            if(localStorage.token) {
                this.pageName = 'main'
            } 
            else {
                this.pageName = 'login'
            }
        }
    },
    created() {
        this.checkAuth()
    }
})