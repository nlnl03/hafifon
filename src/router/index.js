import { createRouter, createWebHashHistory } from 'vue-router'
 import HomePage from '../views/HomePage.vue'
 import PracticeInfo from '../views/PracticeInfo.vue'
 import Practice from '../views/Practice.vue'
 import FinalExam from '../views/FinalExam.vue'
 import User from '../views/User.vue'
 import HafifaBook from '../views/HafifaBook.vue'
 import exam1 from '../views/exam1.vue'
 import exam2 from '../views/exam2.vue'
 import exam3 from '../views/exam3.vue'
 import exam4 from '../views/exam4.vue'


const routes = [
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/Practices',
    name: 'Practices',
    component: PracticeInfo
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
    path: '/exam1',
    name: 'exam1',
    component: exam1
  },
  {
    path: '/exam2',
    name: 'exam2',
    component: exam2
  },
  {
    path: '/exam3',
    name: 'exam3',
    component: exam3
  },
  {
    path: '/exam4',
    name: 'exam4',
    component: exam4
  },
  {
    path: '/Practices/:title',
    name: 'title',
    component: Practice,
    props: (route)=>({...route.params})
  }

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
