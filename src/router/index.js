import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import User from "../views/User.vue";

//quiz
import PracticesList from "../views/quizRoutes/PracticesList.vue";
import Quiz from "../views/quizRoutes/Quiz.vue";
import beforeStartQuiz from "../views/quizRoutes/beforeStartQuiz.vue";
import practiceResult from "../views/quizRoutes/practiceResult.vue";

//manager
import MainCheckPage from "../views/hafifonAdmin/MainCheckPage.vue";
import examsToCheck from "../views/hafifonAdmin/examsToCheck.vue";
// import uploadEditExams from "../views/hafifonAdmin/uploadEditExams.vue";
import uploadButtons from "../views/hafifonAdmin/uploading/uploadButtons.vue";
// import uploadForm from "../views/hafifonAdmin/uploading/uploadForm.vue";
import editExams from "../views/hafifonAdmin/editExams.vue";
import openPermForExams from "../views/hafifonAdmin/openPermForExams.vue";


//exams
import examDeletedMessage from "../views/examsAndTest/examDeletedMessage.vue";
import beforeStartingExam from "../views/examsAndTest/beforeStartingExam.vue";
import exams from "../views/examsAndTest/exams.vue";
import submitted from "../views/examsAndTest/submitExams.vue";
import noPermissionMessage from "../views/examsAndTest/noPermissionMessage.vue";

//more
import displayCheckedExams from "../views/userPage/displayCheckedExams";
import routeNotFound from "../views/routeNotFound.vue";
import defaultHome from "../views/defaultHome.vue";

//checkPermissions
import { checkExamPermissions } from '@/permissions/checkPermissions.js'
import store from "../../store";

const routes = [
  {
    path: "/",
    name: "defaultHome",
    component: defaultHome,
    meta:{ requireMahlaka: false}
  },
  {
    path: "/:selectedItem?/homePage",
    name: "HomePage",
    component: HomePage
  },
  {
    path: "/:selectedItem?/lessons&practices",
    name: "PracticesList",
    component: PracticesList
  },

  {
    path: "/:selectedItem?/user",
    name: "User",
    component: User
  },
  {
    path: "/:selectedItem?/user/:title/results",
    name: "CheckedExams",
    component: displayCheckedExams
  },
  {
    path: "/:selectedItem?/admin/MainCheckPage",
    name: "MainCheckPage",
    component: MainCheckPage
  },

  {
    path: "/:selectedItem?/admin/examsToCheck/:num/:examType",
    name: "examsToCheck",
    component: examsToCheck,
    props: true
  },
  {
    path: "/:selectedItem?/admin/openPermForExams",
    name: "openPerm",
    component: openPermForExams,
    props: true
  },
  {
    path: "/:selectedItem?/admin/uploadButtons",
    name: "uploadButtons",
    component: uploadButtons,
    props: true
  },
  // {
  //   path: "/admin/uploadForm/:title",
  //   name: "uploadForm",
  //   component: uploadForm,
  //   props: true
  // },
  {
    path: "/:selectedItem?/admin/:title/edit",
    name: "editExams",
    component: editExams
  },
  {
    path: "/:selectedItem?/examsToCheck/:num/:examType/submitted",
    name: "submitted",
    component: submitted,
    props: true
  },
  {
    path: "/:selectedItem?/exams/:Title",
    name: "exams",
    component: exams,
  },
  {
    path: "/:selectedItem?/exams/:Title/beforeStarting",
    name: "beforeStartingExam",
    component: beforeStartingExam,
    meta:{ requirePermissionCheck: true}
  //   beforeEnter: (to, from, next) => {
  //     const examType = to.params.Title;
  //     checkExamPermissions(examType, next)
  //  }
  },
  {
    path: "/:selectedItem?/exams/:Title/deletedMessage",
    name: "examDeletedMessage",
    component: examDeletedMessage,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/:selectedItem?/exams/:Title/submitted",
    name: "submitted",
    component: submitted,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/:selectedItem?/exams/:Title/noPermissionMessage",
    name: "noPermission",
    component: noPermissionMessage,
    props: (route) => ({ ...route.params })
  },
  // {
  //   path: "/Practices/:week/:title/beforeEnterQuiz",
  //   name: "beforeEnterQuiz",
  //   component: beforeEnterQuiz,
  //   props: (route) => ({ ...route.params })
  // },

  {
    path: "/:selectedItem?/week:week/:title/practice:numOfPrac/beforeStartQuiz",
    name: "beforeStartQuiz",
    component: beforeStartQuiz,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/:selectedItem?/week:week/:title/practice:numOfPrac",
    name: "quiz",
    component: Quiz,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/:selectedItem?/week:week/:title/practice:numOfPrac/results",
    name: "result",
    component: practiceResult,
    props: (route) => ({ ...route.params })
  },

  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: routeNotFound,
    meta: { notFound: true }
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

var permissionCheckedPerformed = false;
 router.beforeEach(async (to, from, next) => {
  if(to.meta.requireMahlaka != false){
    const selectedItem = store.getters.selectedItem || localStorage.getItem("mahlaka");
    console.log(selectedItem);
    if(selectedItem){
      if(to.params.selectedItem !== selectedItem ){
         next({path: `/${selectedItem}${to.fullPath}`})
      }else{
        next()
      }
       
    }else{
      next()
  
    }
  
  }

  try{
    if(to.meta.requirePermissionCheck){
      const examType = to.params.Title;
      if(!permissionCheckedPerformed){
        permissionCheckedPerformed = true
        await checkExamPermissions(examType, next);
      }
      else{
        await checkExamPermissions(examType, next);
      }
    }else{
      next()
    }
  }catch(error){
    console.error("error in global route guard:", error)
    next('/error')
  }
})

 export default router;
