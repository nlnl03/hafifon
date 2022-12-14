import { createRouter, createWebHistory } from 'vue-router'
 import HomePage from '../views/HomePage.vue'
 import Practice from '../views/Practice.vue'
 import Exams from '../views/Exams.vue'
 import FinalExam from '../views/FinalExam.vue'
 import Statistics from '../views/Statistics.vue'
 import User from '../views/User.vue'
 import HafifaBook from '../views/HafifaBook.vue'
//  import test1 from '../views/test1.vue'
//  import test2 from '../views/test2.vue'
//  import test3 from '../views/test3.vue'
//  import test4 from '../views/test4.vue'


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
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics
  },
  // {
  //   path: '/test1',
  //   name: 'test1',
  //   component: test1
  // },
  // {
  //   path: '/test2',
  //   name: 'test2',
  //   component: test2
  // },
  // {
  //   path: '/test3',
  //   name: 'test3',
  //   component: test3
  // },
  // {
  //   path: '/test4',
  //   name: 'test4',
  //   component: test4
  // },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
