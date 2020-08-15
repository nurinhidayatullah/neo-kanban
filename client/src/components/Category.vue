<template>
    <div>
        <div class=" mr-4 ml-4 task-container">
            <div class="container-fluid row rounded task-title-bar">
                <img class="mt-2 mr-2 task-icon" src="../images/backlog.png">
                <p class="mt-2">{{ categoryData.name }}</p>
            </div>
            <div class="container-fluid p-0 overflow-auto mt-2 shadow rounded task-card-container" >
                <div class="card-body m-1 p-0 task-card" >
                    <div v-if="filterTask.length == 0">
                        <div class="container-fluid no-task">
                            <img src="../images/task.png" class="no-task-img">  
                        </div><br>
                        <div class="no-task-text">
                            <small >You don't have task for this category</small>
                            <small>Click add button for input</small>
                        </div>
                    </div>
                        <div class="accordion" :id="`accordionCollapse-${categoryData.id}`">
                            <div :id="`heading-${categoryData.id}`">
                                <draggable :list="filterTask" group="task" :move="onMove" :category="categoryData" @end="updateCategory">
                                <Task 
                                    v-for="task in filterTask" :key="task.id" :id="task.id"
                                    :taskProperty="task"
                                    :categoryProperty="categoryData"
                                    :userEmail="userEmail"
                                    @deleteEvent="deleteTask"
                                    @editEvent="editTask"
                                    >
                                </Task>
                                </draggable>    
                            </div>
                        </div>
                </div>
            </div>
            <div class="container-fluid p-0 shadow rounded add-btn-container">
                <div class="card-body mt-2 p-2 d-flex justify-content-end">
                    <a href=""  data-toggle="modal" :data-target="`#staticBackdrop-${categoryData.id}`" role="button">
                        <img class="add-modal-img" src="../images/plus.png">
                    </a>
                </div>
            </div>
        </div>
        <div class="modal fade add-task-modal" :id="`staticBackdrop-${categoryData.id}`" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content add-form-styling">
                    <div class="modal-header">
                        <h3 class="modal-title" id="staticBackdropLabel">Add Task</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body container-fluid">
                        <form @submit.prevent="addTask">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input type="text" v-model="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="flex-custom">
                                <div class="form-group w-50">
                                    <label for="priorityAdd">Priority</label>
                                    <select v-model="priority" class="form-control" id="priorityAdd">
                                        <option value="">-- Select Priority--</option>
                                        <option value="critical">Critical</option>
                                        <option value="alarming">Alarming</option>
                                        <option value="low">Low</option>
                                        <option value="lowest">Lowest</option>
                                    </select>
                                </div>
                                <div class="form-group date-sizing">
                                    <label for="exampleInputPassword1">Due Date</label>
                                    <input type="date" v-model="due_date" class="form-control" id="exampleInputPassword1">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleTextArea1">Description</label>
                                <textarea class="form-control" v-model="description" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div class="btn-add-edit">
                                <button type="submit" class="btn btn-primary mr-4" :id="`dismiss-${categoryData.id}`">Add Task</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Task from './Task'
import draggable from 'vuedraggable'
import axios from '../config/axios'
export default {
    name: "Category",
    props: ['categoryData', 'tasksDatas', 'userEmail'],
    data() {
        return {
            title: '',
            priority: '',
            description: '',
            due_date: '',
            currentId: null,
            currentCategory: null
        }
    },
    components: {
        Task, draggable
    },
    computed: {
        filterTask() {
            return this.tasksDatas.reduce((res, data) => {
                if(data.category == this.categoryData.name) {
                    res.push(data)
                }
                return res
            }, [])
        }
    },
    methods: {
        updateCategory() {
            let obj= {
                id: this.currentId,
                category: this.currentCategory
            }
            this.$emit('dragEvent', obj)
        },
        onMove(evt) {
            this.currentId = evt.draggedContext.element.id
            this.currentCategory = evt.relatedContext.component.$attrs.category.name
        },
        deleteTask(id) {
            this.$emit('deleteEvent', id)
        },
        addTask() {
             this.$emit('addEvent', {
                categoryId: this.categoryData.id,
                title: this.title,
                category: this.categoryData.name,
                priority: this.priority,
                due_date: this.due_date,
                description: this.description
            })
        },
        editTask(obj) {
            this.$emit('editEvent', obj)
        },
    }
}
</script>

<style>

</style>