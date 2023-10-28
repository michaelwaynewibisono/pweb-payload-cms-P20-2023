<template>
  <ToDoList />
</template>

<script>
// @ is an alias to /src
import ToDoList from '@/components/Michael/App.vue'

export default {
  name: 'HomeView',
  components: {
    ToDoList,
  }
}
</script>