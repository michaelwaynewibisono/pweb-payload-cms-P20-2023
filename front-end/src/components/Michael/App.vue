<template>
    <child-component />

    <div class="bg" :class="{ 'show2': showModal2 }">
        <div class="submit rounded-xl">
            <button class="icon shadow-lg rounded-md h-10 w-10 items-center justify-center" @click="closeEdit">
                <i class="fa-solid fa-x text-2xl"></i>
            </button><br><br>
            <input type="text" v-model="taskTitle" class="submit-title" placeholder="Title"><br>
            <textarea rows="6" v-model="taskText" class="submit-text" placeholder="input notes"></textarea><br><br>
            <div class="flex justify-between">
                <div class="flex gap-3">
                    <div class="rounded border-solid border flex px-4 py-2 border-black"
                        @click="toggleCategory('653c920745707c8b37d1e5b6')"
                        :class="{ 'orange': activeButton.activeButton === '653c920745707c8b37d1e5b6' }"
                        style="cursor: pointer;">
                        Daily
                    </div>
                    <div class="rounded border-solid border flex px-4 py-2 border-black"
                        @click="toggleCategory('653c920e45707c8b37d1e5c3')"
                        :class="{ 'red': activeButton.activeButton === '653c920e45707c8b37d1e5c3' }"
                        style="cursor: pointer;">
                        Urgent
                    </div>
                    <div class="rounded border-solid border flex px-4 py-2 border-black"
                        @click="toggleCategory('653c921545707c8b37d1e5d0')"
                        :class="{ 'purple': activeButton.activeButton === '653c921545707c8b37d1e5d0' }"
                        style="cursor: pointer;">
                        Important
                    </div>
                </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    @click="updateTask">Update
                </button>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div @click="showCard('showAll')"
            class="hover:bg-[#2e2e2e] border-2 border-[#2e2e2e] hover:text-[#F5F5F5] py-2 px-4 rounded cat-but">Show All
        </div>
        <div @click="showCard('653c920745707c8b37d1e5b6')"
            class="hover:bg-[#ff8e47] border-2 border-[#ff8e47] text-[#ff8e47] hover:text-white py-2 px-4 rounded cat-but">
            Daily</div>
        <div @click="showCard('653c920e45707c8b37d1e5c3')"
            class="hover:bg-[#ff6262] border-2 border-[#ff6262] text-[#ff6262] hover:text-white py-2 px-4 rounded cat-but">
            Urgent</div>
        <div @click="showCard('653c921545707c8b37d1e5d0')"
            class="hover:bg-[#B388F9] border-2 border-[#B388F9] text-[#B388F9] hover:text-white py-2 px-4 rounded cat-but">
            Important</div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-0">
        <div class="cards rounded shadow-2xl my-2 btn" v-for="(task, index) in tasks" :key="index" :style="{
            backgroundColor: task.activeButton === '653c920745707c8b37d1e5b6' ? '#ff8e47' :
                task.activeButton === '653c920e45707c8b37d1e5c3' ? '#ff6262' :
                    task.activeButton === '653c921545707c8b37d1e5d0' ? '#B388F9' : '#F5F5F5'
        }" :class="{ 'show3': task.completed }">
            <div class="flex justify-between">
                <div></div>
                <input type="checkbox" class="checkbox" :checked="task.completed" @click="checkList(index)"
                    :disabled="task.completed">
            </div>
            <div class="title text-4xl font-bold">{{ task.title }}</div>
            <div class="text my-5">{{ task.description }}</div>
            <div class="acc flex justify-between">
                <div id="time">{{ task.time }}</div>
                <div class="buttons flex gap-4">
                    <div class="edit" @click="showModal2 = true" v-if="!task.completed">
                        <i class="fa-solid fa-pen-to-square text-2xl" @click="readTask(index)"></i>
                    </div>
                    <div class="delete" @click="deleteTask(index)">
                        <i class="fa-solid fa-trash text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { format } from 'date-fns';
import ChildComponent from './NavbarComp.vue';
import axios from 'axios';
import './style.css';

export default {
    components: {
        ChildComponent,
    },

    data() {
        return {
            showModal1: false,
            showModal2: false,
            taskNewTitle: '',
            taskNewText: '',
            taskTitle: '',
            taskText: '',
            activeButton: { activeButton: 'default' },
            tasks: [],
        }
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            axios.get('http://localhost:3000/api/todo')
                .then(response => {
                    this.tasks = response.data.docs;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        async showCard(category) {
            this.activeButton = category;
            if (category === 'showAll') {
                // If "show all" is clicked, show all tasks.
                this.fetchData();
            } else {
                let activeButtonParam;

                if (category === '653c920745707c8b37d1e5b6' || category === '653c920e45707c8b37d1e5c3' || category === '653c921545707c8b37d1e5d0') {
                    activeButtonParam = category;
                } else {
                    // If category is none of the above, use "showAll."
                    activeButtonParam = 'showAll';
                }

                // Fetch all tasks first.
                try {
                    const response = await axios.get(`http://localhost:3000/api/todo`);
                    if (response.status === 200) {
                        const allTasks = response.data.docs;

                        // Apply the filter based on the selected category.
                        this.tasks = allTasks.filter(task => task.activeButton === activeButtonParam);
                    } else {
                        console.error('Error fetching tasks for category:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching tasks for category:', error);
                }
            }
        },

        readTask(index) {
            this.temp = index;
            this.taskTitle = this.tasks[this.temp].title;
            this.taskText = this.tasks[this.temp].description;
            if (!this.showModal2) this.$router.push({ path: '/' });
            this.$router.push({ path: `/edit/${this.temp}` });
        },

        toggleCategory(category) {
            this.activeButton.activeButton = category;
        },

        async updateTask() {
            if (this.temp !== null) {
                this.tasks[this.temp].title = this.taskTitle;
                this.tasks[this.temp].description = this.taskText;

                try {
                    // Make a PUT request to update the task using your API endpoint
                    const response = await axios.put(`http://localhost:3000/api/todo/${this.tasks[this.temp].id}`, {
                        title: this.taskTitle,
                        description: this.taskText,
                        activeButton: this.activeButton.activeButton,
                    });

                    if (response.status === 200) {
                        this.temp = null;
                        this.showModal2 = false;

                        this.fetchData();
                    } else {
                        console.error('Error updating task:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error updating task:', error);
                }
            }
        },
        closeEdit() {
            this.showModal2 = false;
            this.$router.push({ path: '/todolist' });
        },

        async deleteTask(index) {
            const taskId = this.tasks[index].id;
            console.log('Deleting task with ID:', taskId);

            try {
                await axios.delete(`http://localhost:3000/api/todo/${taskId}`);
                console.log('Task deleted successfully.');

                // Remove the task from the tasks array
                this.tasks.splice(index, 1);

            } catch (error) {
                console.error('Error deleting task:', error);
            }
        },

        async checkList(index) {
            const taskId = this.tasks[index].id;

            try {
                console.log('Task ID:', taskId);
                const response = await axios.put(`http://localhost:3000/api/todo/${taskId}`, {
                    completed: true,
                });

                console.log('Response:', response);

                if (response.status === 200) {
                    this.tasks[index].completed = true;
                    console.log('Task marked as completed.');
                    this.fetchData();
                } else {
                    console.error('Error marking task as completed:', response.status);
                }
            } catch (error) {
                console.error('Error checking task:', error);
            }
        },
    },
}
</script>