<template>
    <div class="hero">
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/:catchAll(.*)">About Us</router-link></li>
                <li><router-link to="/founders">Founder</router-link></li>
                <li><router-link to="/todolist">To Do List</router-link></li>
            </ul>
        </nav>

        <div class="To-Do-List">
            <img src="./images/todo.png" class="todo" />
        </div>

        <div class="text-container">
            <h1 class="larger-text">Empower<br>Your Productivity</h1>
            <p>Start Organizing, Start Achieving, and Try our To-Do List App Today!</p>
            <a href="/todolist">Try Now!</a>
        </div>
    </div>
</template>
  
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
    box-sizing: border-box;
}

.hero {
    background: #f5f5f5;
    min-height: 100vh;
    width: 100%;
    color: #000000;
    position: relative;
}

nav {
    display: flex;
    align-items: center;
    padding: 20px 8%;
}

nav .todo {
    max-width: 100%;
    /* Make the image responsive */
    height: auto;
    margin-right: 20px;
    cursor: pointer;
}

nav ul {
    flex: 1;
    text-align: right;
}

nav ul li {
    display: inline-block;
    list-style: none;
    margin: 0 20px;
}

nav ul li a {
    text-decoration: none;
    color: #000000;
}

.To-Do-List {
    position: absolute;
    top: 100px;
    left: 15%;
    width: 350px;
}

.text-container {
    max-width: 600px;
    margin-top: 7%;
    margin-left: 50%;
}

.text-container h1.larger-text {
    font-size: 40px;
    /* Adjust the font size as needed */
    font-weight: 400;
}

.text-container a {
    text-decoration: none;
    background: #ed8080;
    padding: 14px 40px;
    display: inline-block;
    color: #000000;
    font-size: 18px;
    margin-top: 30px;
    border-radius: 30px;
}
</style>  