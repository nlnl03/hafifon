import { createRouter, createWebHashHistory } from 'vue-router'
 import HomePage from '../views/HomePage.vue'
 import PracticesList from '../views/PracticesList.vue'
 import beforeEnterQuiz from '../views/beforeEnterQuiz.vue'
 import User from '../views/User.vue'
 import MainCheckPage from '../views/hafifonAdmin/MainCheckPage.vue'
 import examsToCheck from '../views/hafifonAdmin/examsToCheck.vue'
 import uploadEditExams from '../views/hafifonAdmin/uploadEditExams.vue'
 import openPermForExams from '../views/hafifonAdmin/openPermForExams.vue'
 import Quiz from '../views/Quiz.vue'
 import beforeStartingExam from '../views/beforeStartingExam.vue'
 import exams from '../views/exams.vue'
 import submitted from '../views/submitted.vue'
 import noPermissionMessage from '../views/noPermissionMessage.vue'
 import practiceResult from '../views/practiceResult'
import displayCheckedExams from '../views/displayCheckedExams'
import notFound from '../views/notFound'

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
    path: '/Admin/MainCheckPage',
    name: 'MainCheckPage',
    component: MainCheckPage
  },
  
  {
    path: '/Admin/examsToCheck/:num/:examType',
    name: 'examsToCheck',
    component: examsToCheck,
    props:true 
  },
  {
    path: '/Admin/openPermForExams',
    name: 'openPerm',
    component: openPermForExams,
    props:true 
  },
  {
    path:'/Admin/uploadEditExams',
    name:'uploadEditExams',
    component:uploadEditExams
  },
  {
    path: '/examsToCheck/:num/:examType/submitted',
    name: 'submitted',
    component: submitted,
    props:true 
  },
  {
    path: '/exams/:Title',
    name: 'exams',
    component: exams,
    props: (route)=>({...route.params})
  },
  {
    path:'/exams/:Title/beforeStarting',
    name:'beforeStartingExam',
    component:beforeStartingExam,
    props: (route)=>({...route.params})
  },
  {
    path: '/exams/:Title/submitted',
    name: 'submitted',
    component: submitted,
    props: (route)=>({...route.params})
  },
  {
    path: '/exams/:Title/noPermissionMessage',
    name: 'noPermission',
    component: noPermissionMessage,
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
  },
  {
    path:'/:catchAll(.*)',
    name:'notFound',
    component:notFound,
    meta:{notFound: true}
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
