import { createRouter, createWebHistory } from 'vue-router'
 import Practice from '../views/Practice.vue'
 import Exams from '../views/Exams.vue'
 import FinalExam from '../views/FinalExam.vue'
 import User from '../views/User.vue'

const routes = [
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
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
