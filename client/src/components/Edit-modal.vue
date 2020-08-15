<template>
    <div class="modal fade add-task-modal" :id="`staticBackdrop-add-${taskProperty.id}`" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content add-form-styling">
                <div class="modal-header">
                    <h3 class="modal-title" id="staticBackdropLabel">Edit Task</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container-fluid">
                    <form @submit.prevent="editTask">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input type="text" v-model="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="flex-custom">
                            <div class="form-group w-50">
                                <label for="priorityAdd">Priority</label>
                                <select :required="true" v-model="priority" class="form-control" id="priorityEdit">
                                    <option value="">-- Select Priority--</option>
                                    <option value="critical" :selected="priority == 'critical'">Critical</option>
                                    <option value="alarming" :selected="priority == 'alarming'">Alarming</option>
                                    <option value="low" :selected="priority == 'low'">Low</option>
                                    <option value="lowest" :selected="priority == 'lowest'">Lowest</option>
                                </select>
                            </div>
                            <div class="form-group date-sizing">
                                <label for="inputDue_Date">Due Date</label>
                                <input type="date" :value="dateConvert" @input="due_date=$event.target.value" class="form-control" id="inputDue_Date">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputDescription">Description</label>
                            <textarea class="form-control" v-model="description" id="inputDescription" rows="3"></textarea>
                        </div>
                        <div class="btn-add-edit">
                            <button type="submit" class="btn btn-primary mr-4">Edit Task</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="closeButton">Close</button>
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
    data() {
        return {
            title: this.taskProperty.title,
            priority: this.taskProperty.priority,
            description: this.taskProperty.description,
            due_date: this.taskProperty.due_date,
        }
    },
    computed: {
        dateConvert() {
            return new Date(this.taskProperty.due_date).toJSON().slice(0,10)
        }
    },
    methods: {
        editTask() {
            this.$emit('editEvent', {
                id: this.taskProperty.id,
                title: this.title,
                description: this.description,
                category: this.category,
                priority: this.priority,
                due_date: this.due_date
            })
        },

        closeButton() {
            this.title = this.taskProperty.title
            this.priority = this.taskProperty.priority
            this.description = this.taskProperty.description
            this.due_date = this.taskProperty.due_date
        },

        input() {

        }
    }
}
</script>

<style>

</style>