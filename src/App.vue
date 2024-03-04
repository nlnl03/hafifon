<template>
  <MainNavbar v-if="!isNotFoundRoute && !isHomePage" />

  <div v-if="scroll >= 300" class="scroll-to-top">
    <q-icon
      name="fas fa-arrow-circle-up"
      size="45px"
      style="color: var(--main-background-color)"
      @click="scrollToTop"
      class="scroll-icon"
    />
  </div>
  <router-view :key="$route.fullPath" />
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    MainNavbar,
  },
  data() {
    return {
      // urlForToken: process.env.NODE_ENV =='development'? `http://localhost:3000/`:"https://portal.army.idf/sites/hafifon383/_api/contextinfo",
      isAdmin: null,
      scroll: null,
    };
  },
  methods: {
    scrollToTop() {
      console.log(window.pageYOffset);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    showScrollBtn() {
      this.scroll = window.scrollY;
    },
  },

  created() {
    window.addEventListener("scroll", this.showScrollBtn);
    const storedColor = localStorage.getItem("bgColor");
    if (storedColor) {
      document.documentElement.style.setProperty(
        "--main-background-color",
        storedColor
      );
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.showScrollBtn);
  },
  computed: {
    isNotFoundRoute() {
      return this.$route.matched.some((record) => record.meta.notFound);
    },

    isHomePage() {
      return this.$route.name === "defaultHome";
    },
  },
};
</script>

<style>
.vue3-circular-progressbar .current-counter {
  font-size: 45px;
  top: 47%;
  left: 52%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.users-progress-item .vue3-circular-progressbar .current-counter::after,
.practice-results-score .vue3-circular-progressbar .current-counter::after {
  font-size: 35px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  content: "%";
}

.average-items .vue3-circular-progressbar .current-counter {
  font-size: 40px;
  /* top:20px */
}
.average-items .vue3-circular-progressbar .current-counter::after {
  content: "%";
  font-size: 25px;
}
.average-items .vue3-circular-progressbar .loading-spinner {
  content: "%";
  font-size: 28px;
}
.progress-circle .vue3-circular-progressbar .current-counter {
  font-size: 32px;
}
.progress-circle .vue3-circular-progressbar .current-counter::after {
  font-size: 22px;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #c5c2c2;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(117, 116, 116);
}
.q-timeline--dense--right .q-timeline__dot {
  /* right: -170px;
    left: 0; */
  left: -120px !important;

  top: -5px !important;
}
.q-timeline__dot::after {
  top: 18px !important;
  bottom: -4px !important;
  left: 11px !important;
}
.q-timeline__dot:before {
  height: 25px !important;
  width: 25px !important;
  top: 4px !important;
}

/* .q-field__label {
    left: 12px !important;
    transform-origin: 150px !important;
  } */
.select-timeline .q-field__native {
  margin-right: 10px !important;
  margin-top: 3px;
}
/* .scroll .q-field__label{
    left: 85px !important;
    transform-origin: 80px !important;
  }
  .scroll .q-field__native{
    margin-right: 3px !important;
    margin-top: 10px;
   } */
.rtl-input {
  direction: rtl !important;
}
:root {
  --main-background-color: #4eadaf;
  --user-link-pos: 100px;
  --table-width: 950px;
  --table-header-width: calc(var(--table-width) / 3);
  --exams-form-width: 1400px;
  --box-check-width: 60%;
  --user-main-margin-right: 15%;
  --user-main-margin-left: 18%;
  --home-btn-position: 150px;
  --scroll-top-btn-position: 60px;
  --scroll-top-btn-size: 50px;
  --permission-box-width: 55%;
  --exam-edit-box-width: 50%;
  --exam-edit-flexbox-width: 80%;
  --progress-bar-width: 30%;
  --before-start-width: 750px;
}

@media (max-width: 1280px) {
  :root {
    --user-link-pos: 70px;
    --home-btn-position: 100px;
    --box-check-width: 80%;
    --user-main-margin-right: 0%;
    --user-main-margin-left: 0%;
    --scroll-top-btn-position: 15px;
    --scroll-top-btn-size: 50px;
    --permission-box-width: 70%;
    --exam-edit-box-width: 68%;
    --exam-edit-flexbox-width: 85%;
    --progress-bar-width: 300px;
    --before-start-width: 50%;
    --user-main-margin-right: 0;
    --user-main-margin-left: 0;
  }
  form[class="exam"] {
    --exams-form-width: 1150px;
  }
  .perm-table .q-pa-md {
    width: 70% !important;
  }
  .name-progress-details {
    width: 75% !important;
  }
  .personal-info {
    width: 100% !important;
  }
  .progress-info {
    width: 85% !important;
  }
  .scroll-to-top .q-icon {
    font-size: 40px !important;
  }
}
@font-face {
  src: url(./assets/Assistant-Regular.ttf);
  font-family: Assistant-Regular;
}
*,
body {
  margin: 0;
  padding: 0;
  font-family: Assistant-Regular !important;
}
.fa,
.fas,
.q-icon {
  font-family: "Font Awesome 5 Free" !important;
  font-weight: 900;
}
.material-icons,
.material-icons-outlined,
.material-icons-round,
.material-icons-sharp,
.material-icons-two-tone {
  font-family: "Material Icons" !important;
}
.q-field__control,
.q-item.q-router-link--active,
.q-item--active {
  color: var(--main-background-color) !important;
}

body {
  min-height: 100vh;
  height: 100vh;
  min-width: 100vw;
  line-height: normal !important;
  width: 100vw;
  overflow-x: hidden;
}
/* *, *:before, *:after{
    box-sizing:revert !important;
    box-sizing: border-box !important;

  } */
button {
  outline: none;
}
/* .swal2-popup{
     height: 470px;
     width: 48em !important;
     border-radius:10px !important ;
  } */
/* .delete-swal{
     height: 450px;
     width: 43em !important;
     border-radius:10px !important ;
  } */
.choose-to-remove-swal,
.choose-to-edit {
  width: 550px !important;
  height: 370px !important;
}
.swal2-success-line-tip {
    left: 2.6em !important;
  transform: rotate(-45deg) !important;
}
.swal2-success-line-long {
  left: 0.5em !important;
  transform: rotate(45deg) !important;
}

.scroll-to-top {
  position: fixed;
  z-index: 100000;
  bottom: 70px;
  left: var(--scroll-top-btn-position);
  /* height: var(--scroll-top-btn-size);
  width: var(--scroll-top-btn-size); */
  border: none;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); */
  /* font-size: 20px; */
  line-height: 1;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.scroll-to-top:hover {
  opacity: 0.9;
}

h4 {
  font-weight: bold !important;
  line-height: unset !important;
}
h2 {
  line-height: unset !important;
  letter-spacing: unset !important;
  display: block !important;
  font-size: 1.5em !important;
  font-weight: bold !important;
}
h1 {
  font-weight: bold !important ;
  margin-bottom: 10px;
  line-height: unset !important;
  letter-spacing: unset !important;
}
.q-table th {
  font-size: 19px !important;
  font-weight: 700 !important;
}
.q-table td {
  font-size: 15px !important;
}
.q-table {
  padding: 10px !important;
}
.text-right {
  text-align: center !important;
}
.q-table__container {
  max-height: 495px;
}
.q-timeline__subtitle {
  font-size: 22px !important;
  position: relative;
  left: 30px;
}
.q-timeline--dense--right .q-timeline__entry {
  padding-right: 40px !important;
  padding-left: 0 !important;
}
</style>
