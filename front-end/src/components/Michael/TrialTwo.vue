<template>
    <div class="navbar flex justify-between sticky top-0 z-999">
        <div class="flex my-auto text-2xl sm:text-3xl font-bold">To Do List App</div>
        <div class="icon shadow-lg rounded-full h-10 w-10 flex items-center justify-center" id="myButton">
            <i class="fa-solid fa-plus text-2xl"></i>
        </div>
    </div>

    <div class="bg" id="PopupEdit" :class="{ 'show': editedTask !== null }">
        <div class="submit rounded-xl">
            <button @click="closeEditPopup" class="icon shadow-lg rounded-md h-10 w-10 items-center justify-center">
                <i class="fa-solid fa-x text-2xl"></i>
            </button><br><br>
            <input type="text" v-model="taskTitle" class="submit-title" placeholder="Title"><br>
            <textarea rows="6" v-model="taskText" class="submit-text" placeholder="input notes"></textarea><br><br>
            <button @click="submitTask"
                class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Update</button>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div class="cards rounded-md shadow-lg my-2 btn" :style="{
            backgroundColor: task.completed ? '#a6a6a6' : (task.activeButton === 'daily' ? '#F9C975' : task.activeButton === 'urgent' ? '#ED8080' : task.activeButton === 'important' ? '#B388F9' : '#f8f8f8'),
            color: task.completed ? '#545454' : '#2a2a2a'
        }" v-for="(task, index) in tasks" :key="index">
            <div class="flex justify-between">
                <div></div>
                <input type="checkbox" class="checkbox" :checked="task.completed" @click="handleClick(index)"
                    :disabled="task.completed">
            </div>
            <div class="title text-4xl font-bold">{{ task.title }}</div>
            <div class="text my-5">{{ task.text }}</div>
            <div class="acc flex justify-between">
                <div id="time">{{ task.time }}</div>
                <div class="buttons flex gap-4">
                    <div class="edit" @click="editTask(index)" :disabled="task.completed || task.editing">
                        <i class="fa-solid fa-pen-to-square text-2xl"></i>
                    </div>
                    <div class="delete" @click="deleteTask(index)"><i class="fa-solid fa-trash text-2xl"></i></div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg" id="myPopup">
        <div class="submit rounded-xl">
            <button id="closePopup" class="icon shadow-lg rounded-md h-10 w-10 items-center justify-center">
                <i class="fa-solid fa-x text-2xl"></i>
            </button><br><br>
            <input type="text" v-model="taskTitle" class="submit-title" placeholder="Title"><br>
            <textarea rows="6" v-model="taskText" class="submit-text" placeholder="input notes"></textarea><br><br>
            <div class="flex justify-between">
                <div @click="toggleButton('daily')" class="rounded-full border-solid border flex px-4 py-2 border-black"
                    :class="{ 'active': activeButton === 'daily', 'orange': activeButton === 'daily' }" id="btn">daily</div>
                <div @click="toggleButton('urgent')" class="rounded-full border-solid border flex px-4 py-2 border-black"
                    :class="{ 'active': activeButton === 'urgent', 'red': activeButton === 'urgent' }" id="btn">urgent</div>
                <div @click="toggleButton('important')" class="rounded-full border-solid border flex px-4 py-2 border-black"
                    :class="{ 'active': activeButton === 'important', 'purple': activeButton === 'important' }" id="btn">
                    important
                </div>
                <button @click="submitTask"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';

export default {
    data() {
        return {
            activeButton: 'default',
            taskTitle: '',
            taskText: '',
            editedTask: null,
            tasks: [
                {
                    title: 'Tugas SISOP',
                    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, doloremque odit! Necessitatibus dolorum pariatur perspiciatis porro, impedit similique id quos error molestias dolore quidem ipsam excepturi fuga minima magni nam.',
                    time: '12.00',
                },
                {
                    title: 'TKA',
                    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deleniti quisquam deserunt, ipsa vitae voluptatum laborum voluptas fuga explicabo pariatur consequuntur at perspiciatis minus, inventore incidunt nostrum quidem eum sapiente!',
                    time: '12.15',
                },
            ],
        }
    },


    methods: {
        handleClick(index) {
            if (!this.tasks[index].completed) {
                this.tasks[index].completed = true;
                this.tasks[index].editing = false;
            }
        },

        resetButtons() {
            this.activeButton = 'default';
        },

        submitTask() {
            // || this.activeButton !== 'daily' && this.activeButton !== 'urgent' && this.activeButton !== 'important'
            if (this.taskTitle.length == 0 || this.taskText.length == 0) return;

            // const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
            const timestamp = format(new Date(), "HH:mm");

            if (this.editedTask === null) {
                this.tasks.push({
                    title: this.taskTitle,
                    text: this.taskText,
                    time: timestamp,
                    activeButton: this.activeButton,
                })
            } else {
                this.tasks[this.editedTask].title = this.taskTitle;
                this.tasks[this.editedTask].text = this.taskText;
                this.editedTask = null;
            }

            this.taskTitle = '';
            this.taskText = '';

            this.resetButtons(); // Reset the color buttons
        },

        toggleButton(button) {
            /*
            if (this.activeButton === button) {
                // Clicking the active button again deactivates it
                this.activeButton = 'default';
            } else {
                // Clicking a different button activates it
                this.activeButton = button;
            }
            */
            this.activeButton = button;
        },

        editTask(index) {
            if (!this.tasks[index].completed) {
                this.editedTask = index;
                this.tasks[index].editing = true;
                this.taskTitle = this.tasks[index].title;
                this.taskText = this.tasks[index].text;
            }
        },

        closeEditPopup() {
            this.taskTitle = '';
            this.taskText = '';
            this.editedTask = null;
        },

        deleteTask(index) {
            this.tasks.splice(index, 1);
        },
    },

    mounted() {
        const myButton = document.getElementById("myButton");
        const myPopup = document.getElementById("myPopup");
        const closePopup = document.getElementById("closePopup");

        myButton.addEventListener("click", () => {
            myPopup.classList.add("show");
        });

        closePopup.addEventListener("click", () => {
            myPopup.classList.remove("show");
        });

        window.addEventListener("click", (event) => {
            if (event.target == myPopup) {
                myPopup.classList.remove("show");
            }
        });
    },

}
</script>

<style lang="scss" scoped>
.navbar {
    padding: 1rem 2rem;
    background-color: #D2E0FB;
}

.icon {
    cursor: pointer;
    color: #f8f8f8;
    background-color: #2e2e2e;
}

.icon:hover {
    box-shadow: 2px 2px 5px #2e2e2e;
}

.grid {
    padding: 2rem;
}

.cards {
    padding: 2rem;
    background-color: #F9C975;
    border: 2px solid #2e2e2e;
}

.checkbox {
    width: 25px;
    height: 25px;
}

.delete,
.edit {
    cursor: pointer;
}

.submit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 3rem;
}

.bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: none;
}

.show {
    display: block;
    overflow: hidden;
}

.submit-title {
    width: 30rem;
    height: 4rem;
    padding: 1rem 0;
    font-size: 20px;
}

.submit-text {
    width: 30rem;
    padding: 1rem 0;
    font-size: 20px;
}

input[type=text] {
    border: 1px solid black;
    border: 0px solid;
    color: #2e2e2e;
}

textarea:focus,
input:focus {
    outline: none;
}

textarea {
    resize: none !important;
}

#btn {
    cursor: pointer;
}

.default {
    color: #2e2e2e;
}

.orange {
    background-color: #ff8e47;
    border: 1px solid #ff8e47;
    color: #f8f8f8;
}

.red {
    background-color: #ff6262;
    border: 1px solid #ff6262;
    color: #f8f8f8;
}

.purple {
    background-color: #B388F9;
    border: 1px solid #B388F9;
    color: #f8f8f8;
}
</style>