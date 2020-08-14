<template>
    <div>
        <a :href="`#multiCollapse-${taskProperty.id}`" data-toggle="collapse" role="button" aria-expanded="false" :aria-controls="`multiCollapse-${taskProperty.id}`">
            <div class=" p-0 pl-3 m-1 task-body" :style="`border-left: 7px solid ${getColor}`" :id="`task-${taskProperty.id}`">
                <div class="d-flex justify-content-between">
                    <p class="m-0">{{ taskProperty.title }}</p>
                    <div>
                        <a href="" data-toggle="modal" :data-target="`#staticBackdrop-add-${taskProperty.id}`"><img class="action-button" src="../images/edit.png"></a>
                        <a href="" @click.prevent="deleteTask"><img class="action-button" src="../images/delete.png"></a>
                    </div>
                </div>
                <p></p>
                <small class="text-muted m-0">By: {{ userEmail }}</small><br>
                <small class="text-muted m-0">{{fetchDay}} {{fetchMonth}} {{fetchYear}}, {{fetchTime}}</small>
            </div>
        </a>
        <div :id="`multiCollapse-${taskProperty.id}`" class="collapse" :aria-labelledby="`heading-${categoryProperty.id}`" :data-parent="`#accordionCollapse-${categoryProperty.id}`">
            <div class="card-body collapse-description">
                <small><u>Description:</u></small><br>
                <small>{{ taskProperty.description }}</small>
            </div>
        </div>
        <EditModal
            :taskProperty="taskProperty"
            @editEvent="editTask"
        ></EditModal>
    </div>
</template>

<script>
import EditModal from './Edit-modal'
export default {
    name: "Task",
    props: ['taskProperty', 'userEmail', 'categoryProperty'],
    components: {
        EditModal
    },
    data() {
        return {
            priorities: {
                isCritical : false,
                isAlarming : false,
                isLow : false,
                isLowest : false
            }
        }
    },
    computed: {
        fetchMonth() {
            let month;
            let monthNumber = new Date(this.taskProperty.due_date).getMonth()
            let monthNumIncrement = monthNumber + 1
            switch(monthNumIncrement) {
                case 1:
                    month = "January"
                    break;
                case 2:
                    month = "February"
                    break;
                case 3:
                    month = "March"
                    break;
                case 4:
                    month = "April"
                    break
                case 5:
                    month = "May"
                    break;
                case 6:
                    month = "Juny"
                    break;
                case 7:
                    month = "July"
                    break;
                case 8:
                    month = "August"
                    break;
                case 9:
                    month = "September"
                    break;
                case 10:
                    month = "October"
                    break;
                case 11:
                    month = "November"
                    break;
                case 12:
                    month = "December"
                    break;
            }
            return month
        },
        fetchDay() {
            return new Date(this.taskProperty.due_date).getDate()
        },
        fetchYear() {
            return new Date(this.taskProperty.due_date).getFullYear()
        },
        fetchTime() {
            return new Date(this.taskProperty.due_date).toTimeString().slice(0,5)
        },
        getColor() {
                switch(this.taskProperty.priority) {
                case 'critical' :
                    return this.priorities.isCritical = 'red'
                case 'alarming' :
                    return this.priorities.isAlarming = 'yellow'
                case 'low' :
                    return this.priorities.isLow = 'green'
                case 'lowest' :
                    return this.priorities.isLowest = 'blue' 
            }
        }
    },
    methods: {
        deleteTask() {
            this.$emit('deleteEvent', this.taskProperty.id)
        },
        checkPriority() {
            
            
        },
        editTask(obj) {
            this.$emit('editEvent', obj)
        }
    }
}
</script>

<style>

</style>