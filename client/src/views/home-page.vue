<template>
    <div>
        <div class="navbar navbar-expand-lg p-0 ml-2 mr-2 position-fixed mt-3 100">
            <div class="list-style-none container-fluid row d-flex mb-0 mr-0 pr-0 justify-content-lg-between position-fixed">
                <div class="col-lg mt-4 navbar-colapse">
                    <div class="d-flex">
                        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <img class="img-fluid mt-4 mr-4 mb-1" src="../images/menu.png">
                        </a>
                        <p class="mt-3">
                            K<img class="img-fluid mr-2 mb-1 nav-text-logo" src="../images/cursor.png">NBAN
                        </p>
                    </div>
                </div>
                <div class="col-sm mt-4 text-center intro-text">
                    ~ Organize Your Project ~
                </div>
                <div class="col-lg d-flex justify-content-end mt-4 pr-0 text-right">
                    <img class="nav-profile" :src="`https://i.pravatar.cc/150?u=${userEmail}`">
                    <p class="mb-0 mr-4 nav-email">{{ userEmail }}</p>
                </div>
                
            </div>
        </div>
                                
        <div class="container-fluid ml-2 mr-2 width-scroll vh-100">
            <div class="collapse mr-2 logout-colapse" id="collapseExample">
                <div class="card card-body shadow rounded logout-body">
                    <img class="full-profile" :src="`https://i.pravatar.cc/150?u=${userEmail}`"><br>
                    <p class="text-center text-light">{{userEmail}}</p>
                    <button class="btn btn-success" @click.prevent="logout">Logout</button>
                    <img class="img-fluid mt-4 ml-4" src="../images/logout.svg" width="70%">
                </div>
            </div>
        <Category 
            v-for="(category, i) in organizationCategories" 
            :key="i"
            :categoryData="category"
            :tasksDatas="organizationTasks"
            :userEmail="userEmail"
            @deleteEvent="deleteTask"
            @addEvent="addTask"
            @editEvent="editTask"
        ></Category>
        </div>      
    </div>
</template>

<script>
import Category from '../components/Category'
export default {
    name: "HomePage",
    props: ['organizationTasks', 'organizationCategories', 'userEmail'],
    components: {
        Category
    },

    methods: {
        logout() {
            this.$emit('logoutEvent')
        },
        deleteTask(id) {
            this.$emit('deleteEvent', id)
        },
        addTask(obj) {
            this.$emit('addEvent', obj)
        },
        editTask(obj) {
            this.$emit('editEvent', obj)
        }
    }
}
</script>

<style>

</style>