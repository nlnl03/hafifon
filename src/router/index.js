import { createRouter, createWebHistory } from 'vue-router'
 import HomePage from '../views/HomePage.vue'
 import Practice from '../views/Practice.vue'
 import Exams from '../views/Exams.vue'
 import FinalExam from '../views/FinalExam.vue'
 import User from '../views/User.vue'
 import HafifaBook from '../views/HafifaBook.vue'


const routes = [
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/Practice',
    name: 'Practice',
    component: Practice
  },
  {
    path: '/Exams',
    name: 'Exams',
    component: Exams
  },
  {
    path: '/FinalExam',
    name: 'FinalExam',
    component: FinalExam
  },
  {
    path: '/User',
    name: 'User',
    component: User
  },
  {
    path: '/HafifaBook',
    name: 'HafifaBook',
    component: HafifaBook
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
