import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../components/Khansa/NotFound.vue'
import Landing from '../components/Khansa/LandingComp.vue'
import FounderList from '../components/Faldi/FounderList.vue';
import FounderDetail from '../components/Faldi/FounderDetail.vue'
import CreateComp from '../components/Michael/CreateComp.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Landing
  },
  {
    path: '/todolist',
    name: 'post.todo',
    component: HomeView
  },
  {
    path: '/edit/:id',
    name: 'edit-task',
    component: HomeView,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
  {
    path: '/founders',
    name: 'FounderList',
    component: FounderList,
  },

  {
    path: '/founders/:name',
    name: 'FounderDetail',
    component: FounderDetail,
  },
  {
    path: '/create',
    name: 'post.create',
    component: CreateComp,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
