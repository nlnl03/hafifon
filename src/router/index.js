import { createRouter, createWebHashHistory } from 'vue-router'
 import HomePage from '../views/HomePage.vue'
 import PracticesList from '../views/PracticesList.vue'
 import beforeEnterQuiz from '../views/beforeEnterQuiz.vue'
 import FinalExam from '../views/FinalExam.vue'
 import User from '../views/User.vue'
 import HafifaBook from '../views/HafifaBook.vue'
 import Quiz from '../views/Quiz.vue'
 import exams from '../views/exams.vue'
 import submitExams from '../views/submitExams.vue'
 import practiceResult from '../views/practiceResult'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/Practices',
    name: 'PracticesList',
    component: PracticesList
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
    path: '/exams/:Title',
    name: 'exams',
    component: exams,
    props: (route)=>({...route.params})
  },
  {
    path: '/exams/:Title/submitted',
    name: 'submitExams',
    component: submitExams,
    props: (route)=>({...route.params})
  },
  {
    path: '/Practices/:title',
    name: 'beforeEnterQuiz',
    component: beforeEnterQuiz,
    props: (route)=>({...route.params})
  },
  {
    path: '/Practices/:title/quiz',
    name: 'quiz',
    component: Quiz,
    props: (route)=>({...route.params})
  },
  {
    path: '/Practices/:title/result',
    name: 'result',
    component: practiceResult,
    props: (route)=>({...route.params})
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
