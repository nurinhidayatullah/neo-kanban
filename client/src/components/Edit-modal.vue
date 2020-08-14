<template>
    <div class="modal fade add-task-modal" :id="`staticBackdrop-add-${taskProperty.id}`" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content add-form-styling">
                <div class="modal-header">
                    <h3 class="modal-title" id="staticBackdropLabel">Add Task</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container-fluid">
                    <form @submit.prevent="editTask">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input type="text" v-model="taskProperty.title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="flex-custom">
                            <div class="form-group w-50">
                                <label for="priorityAdd">Priority</label>
                                <select :required="true" v-model="taskProperty.priority" class="form-control" id="priorityEdit">
                                    <option value="">-- Select Priority--</option>
                                    <option value="critical" :selected="taskProperty.priority == 'critical'">Critical</option>
                                    <option value="alarming" :selected="taskProperty.priority == 'alarming'">Alarming</option>
                                    <option value="low" :selected="taskProperty.priority == 'low'">Low</option>
                                    <option value="lowest" :selected="taskProperty.priority == 'lowest'">Lowest</option>
                                </select>
                            </div>
                            <div class="form-group date-sizing">
                                <label for="inputDue_Date">Due Date</label>
                                <input type="date" v-model="dateConvert" class="form-control" id="inputDue_Date">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputDescription">Description</label>
                            <textarea class="form-control" v-model="taskProperty.description" id="inputDescription" rows="3"></textarea>
                        </div>
                        <div class="btn-add-edit">
                            <button type="submit" class="btn btn-primary mr-4">Add Task</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditModal",
    props: ['taskProperty'],
    computed: {
        dateConvert() {
            return new Date(this.taskProperty.due_date).toJSON().slice(0,10)
        }
    },
    methods: {
        editTask() {
            console.log(this.taskProperty.priority)
            this.$emit('editEvent', {
                id: this.taskProperty.id,
                title: this.taskProperty.title,
                description: this.taskProperty.description,
                category: this.taskProperty.category,
                priority: this.taskProperty.priority,
                due_date: this.taskProperty.due_date
            })
        }
    }
}
</script>

<style>

</style>