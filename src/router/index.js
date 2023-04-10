import { createRouter, createWebHashHistory } from 'vue-router'
 import HomePage from '../views/HomePage.vue'
 import PracticesList from '../views/PracticesList.vue'
 import beforeEnterQuiz from '../views/beforeEnterQuiz.vue'
 import FinalExam from '../views/FinalExam.vue'
 import User from '../views/User.vue'
 import MainCheckPage from '../views/hafifonCheck/MainCheckPage.vue'
 import examsIsChecked from '../views/hafifonCheck/examsIsChecked.vue'
 import examsToCheck from '../views/hafifonCheck/examsToCheck.vue'
 import Quiz from '../views/Quiz.vue'
 import exams from '../views/exams.vue'
 import submitExams from '../views/submitExams.vue'
 import practiceResult from '../views/practiceResult'
import displayCheckedExams from '../views/displayCheckedExams'

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
    path: '/User/:title',
    name: 'CheckedExams',
    component: displayCheckedExams
  },
  {
    path: '/MainCheckPage',
    name: 'MainCheckPage',
    component: MainCheckPage
  },
  {
    path: '/examsToCheck/:num/:examType',
    name: 'examsToCheck',
    component: examsToCheck,
    props:true 
  },
  {
    path: '/examsToCheck/:num/:examType/submitted',
    name: 'examsIsChecked',
    component: examsIsChecked,
    props:true 
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
