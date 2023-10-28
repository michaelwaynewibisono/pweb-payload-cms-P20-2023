<template>
    <input v-model="task" type="text">
    <button @click="submitTask">submit</button>
    <div v-for="(task, index) in tasks" :key="index">
        <div class="flex gap-5">
            <div :class="{ 'finished': task.status === 'finished' }">{{ task.name }}</div>
            <div style="cursor: pointer;"><span @click="changedStatus(index)">{{ firstCharUpper(task.status) }}</span></div>
            <button @click="deleteTask(index)">delete</button>
            <button @click="editTask(index)">edit</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            task: '',
            editedTask: '',
            availableStatuses: ['to-do', 'in-progres', 'finished'],
            tasks: [
                {
                    name: 'Steal banana from a store',
                    status: 'to-do'
                },
                {
                    name: 'Eat a chocolate in one hour',
                    status: 'in-progress'
                },
            ]
        }
    },

    methods: {
        submitTask() {
            if (this.task.length == 0) return;

            if (this.editedTask === null) {
                this.tasks.push({
                    name: this.task,
                    status: 'to-do',
                });
            } else {
                this.tasks[this.editedTask].name = this.task;
                this.editedTask = null;
            }

            this.task = '';
        },

        deleteTask(index) {
            this.tasks.splice(index, 1);
        },

        editTask(index) {
            this.task = this.tasks[index].name;
            this.editedTask = index;
        },

        changedStatus(index) {
            let newIndex = this.availableStatuses.indexOf(this.tasks[index].status);
            if (++newIndex > 2) newIndex = 0;
            this.tasks[index].status = this.availableStatuses[newIndex];
        },

        firstCharUpper(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

    }
}
</script>


<style>
.finished {
    text-decoration: line-through;
}
</style>