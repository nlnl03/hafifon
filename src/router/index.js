import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PracticesList from "../views/PracticesList.vue";
import beforeEnterQuiz from "../views/beforeEnterQuiz.vue";
import User from "../views/User.vue";
import MainCheckPage from "../views/hafifonAdmin/MainCheckPage.vue";
import examsToCheck from "../views/hafifonAdmin/examsToCheck.vue";
// import uploadEditExams from "../views/hafifonAdmin/uploadEditExams.vue";
import uploadButtons from '../views/hafifonAdmin/uploading/uploadButtons.vue'
import uploadForm from '../views/hafifonAdmin/uploading/uploadForm.vue'
import editExams from "../views/hafifonAdmin/editExams.vue";
import examDeletedMessage from "../views/examDeletedMessage.vue";
import openPermForExams from "../views/hafifonAdmin/openPermForExams.vue";
import Quiz from "../views/Quiz.vue";
import beforeStartingExam from "../views/beforeStartingExam.vue";
import beforeStartQuiz from "../views/beforeStartQuiz.vue";
import exams from "../views/exams.vue";
import submitted from "../views/submitted.vue";
import noPermissionMessage from "../views/noPermissionMessage.vue";
import practiceResult from "../views/practiceResult";
import displayCheckedExams from "../views/displayCheckedExams";
import notFound from "../views/notFound";
import defaultHome from "../views/defaultHome.vue";

const routes = [
  {
    path: "/",
    name: "defaultHome",
    component: defaultHome
  },
  {
    path: "/homePage",
    name: "HomePage",
    component: HomePage
  },
  {
    path: "/lessons&practices",
    name: "PracticesList",
    component: PracticesList
  },

  {
    path: "/User",
    name: "User",
    component: User
  },
  {
    path: "/User/:title",
    name: "CheckedExams",
    component: displayCheckedExams
  },
  {
    path: "/admin/MainCheckPage",
    name: "MainCheckPage",
    component: MainCheckPage
  },

  {
    path: "/admin/examsToCheck/:num/:examType",
    name: "examsToCheck",
    component: examsToCheck,
    props: true
  },
  {
    path: "/admin/openPermForExams",
    name: "openPerm",
    component: openPermForExams,
    props: true
  },
  {
    path: "/admin/uploadButtons",
    name: "uploadButtons",
    component: uploadButtons,
    props: true
  },
  {
    path: "/admin/uploadForm/:title",
    name: "uploadForm",
    component: uploadForm,
    props: true
  },
  // {
  //   path: "/Admin/uploadEditExams",
  //   name: "uploadEditExams",
  //   component: uploadEditExams
  // },
  {
    path: "/Admin/uploadEditExams/:title",
    name: "editExams",
    component: editExams
  },
  {
    path: "/examsToCheck/:num/:examType/submitted",
    name: "submitted",
    component: submitted,
    props: true
  },
  {
    path: "/exams/:Title",
    name: "exams",
    component: exams,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/exams/:Title/beforeStarting",
    name: "beforeStartingExam",
    component: beforeStartingExam,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/exams/:Title/deletedMessage",
    name: "examDeletedMessage",
    component: examDeletedMessage,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/exams/:Title/submitted",
    name: "submitted",
    component: submitted,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/exams/:Title/noPermissionMessage",
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
    path: "/week:week/:title/practice:numOfPrac/beforeStartQuiz",
    name: "beforeStartQuiz",
    component: beforeStartQuiz,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/week:week/:title/practice:numOfPrac",
    name: "quiz",
    component: Quiz,
    props: (route) => ({ ...route.params })
  },
  {
    path: "/week:week/:title/practice:numOfPrac/results",
    name: "result",
    component: practiceResult,
    props: (route) => ({ ...route.params })
  },

  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: notFound,
    meta: { notFound: true }
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
