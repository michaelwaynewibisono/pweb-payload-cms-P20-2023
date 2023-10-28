<template>
    <div class="submit rounded-xl">
        <router-link :to="{ name: 'post.todo' }">
            <button class="icon shadow-lg rounded-md h-10 w-10 items-center justify-center">
                <i class="fa-solid fa-x text-2xl"></i>
            </button>
        </router-link>
        <br /><br />
        <input type="text" class="submit-title" v-model="taskNewTitle" placeholder="Title" /><br />
        <textarea rows="6" class="submit-text" v-model="taskNewText" placeholder="Input notes"></textarea>
        <br /><br />
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
                    :class="{ 'red': activeButton.activeButton === '653c920e45707c8b37d1e5c3' }" style="cursor: pointer;">
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
                @click="createTask">Submit</button>
        </div>
    </div>
</template>
    
<script>
import { format } from 'date-fns';
import axios from 'axios';

export default {
    data() {
        return {
            showModal1: false,
            showModal2: false,
            taskNewTitle: '',
            taskNewText: '',
            activeButton: { activeButton: 'default' },
            tasks: [],
        };
    },

    methods: {
        async createTask() {
            const timestamp = format(new Date(), 'HH:mm');
            if (this.taskNewTitle.length === 0 || this.taskNewText.length === 0) {
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/api/todo', {
                    title: this.taskNewTitle,
                    description: this.taskNewText,
                    time: timestamp,
                    activeButton: this.activeButton.activeButton,
                });

                if (response.status === 200) {
                    console.log('Task created:', response.data);

                    this.tasks.push({
                        title: this.taskNewTitle,
                        description: this.taskNewText,
                        time: timestamp,
                        activeButton: this.activeButton.activeButton,
                    });

                    this.taskNewTitle = '';
                    this.taskNewText = '';
                    this.activeButton.activeButton = 'default';
                }

            } catch (error) {
                console.error('Error creating task:', error);
            }

            this.$router.push({ name: 'post.todo' });
        },

        toggleCategory(category) {
            this.activeButton.activeButton = category;
        },
    },
};
</script>  