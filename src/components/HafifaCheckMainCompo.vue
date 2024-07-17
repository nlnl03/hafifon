<template>
  <div class="q-pa-md" v-if="Object.keys(testsNames).length > 0">
    <div class="title1">ממתינים לבדיקה</div>

    <q-list :class="isAdmin == 'rashatz' ? 'rashatz-list' : 'dd'">
      <q-expansion-item
        class="overflow-hidden card-expansion"
        v-for="(test, index) in testsNames"
        :key="index"
        :label="test.subject"
      >
        <q-separator />
        <q-card class="card" style="background: rgba(240, 240, 240, 0.916)">
          <q-card-section
            v-for="(pending, pIndex) in filteredPending(test.subject)"
            :key="pIndex"
            class="card-section"
          >
            <div class="card-item">
              <div class="user-name">
                {{ pending.userName }}
              </div>
              <button @click="showPendingExamModal(pending)" class="watch-btn">
                לצפייה
              </button>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

    <div v-if="isAdmin === 'admin'" class="title2">ממתינים לאישור בדיקה</div>

    <q-list v-if="isAdmin === 'admin'">
      <q-expansion-item
        class="overflow-hidden card-expansion"
        v-for="(test, index) in testsNames"
        :key="index"
        :label="test.subject"
      >
        <q-separator />
        <q-card class="card" style="background: rgba(240, 240, 240, 0.916)">
          <q-card-section
            v-for="(awaitingExam, pIndex) in filteredAwaitChecking(
              test.subject
            )"
            :key="pIndex"
            class="card-section"
          >
            <div class="card-item">
              <div class="user-name">
                {{ awaitingExam.userName }}
              </div>
              <button
                @click="showWaitingExamModal(awaitingExam)"
                class="watch-btn"
              >
                לצפייה
              </button>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

    <!-- <div v-else>
      <h4>אין לך הרשאות</h4>
    </div> -->
  </div>

  <div v-else>
    <h4>אין בחנים ומבחנים במחלקה זו</h4>
  </div>

  <q-dialog
    class="checking-exam-dialog"
    style="max-width: unset"
    v-model="showExamCheckingModal"
    persistent
    transition-show="scale"
  >
    <checkingExamForm :submittedExam="currentExamToShow" :type="type" />
  </q-dialog>
</template>

<script>
import axios from "axios";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import loadingSpinner from "./loadingSpinner.vue";
import checkingExamForm from "./checkingExamForm.vue";
export default {
  name: "HafifaCheckMainCompo",
  components: {
    CircleProgress,
    loadingSpinner,
    checkingExamForm,
  },
  data() {
    return {
      examTitlesFiltered: [],
      userData: [],
      isOpen: false,
      ite: 0,
      getBtnVal: null,
      userInfoFilterd: [],
      isLoad: false,
      testsNames: [],
      showOptions: null,
      gradrPerExam: 0,
      showExamCheckingModal: false,
      currentExamToShow: [],
      type: "",
      isAdmin: null,
    };
  },
  methods: {
    async getData() {
      this.testsNames = JSON.parse(localStorage.getItem("testsNames"));
      console.log(this.testsNames);

      var res = null;
      var res2 = null;
      var mahlakaId = JSON.parse(localStorage.getItem("mahlakaId"));
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('submittedExams')/Items?$filter=mahlakaId eq ${mahlakaId}`
        );
        this.userData = res.data.value;
        const res2 = await Promise.all(
          this.userData.map(async (item) => {
            const res2 = await axios.get(
              this.$sharePointUrl +
                `getByTitle('students')/Items?$filter=num eq ${item.userId}`
            );
            item.userName = res2.data.value[0].Title;
          })
        );
      } else {
        res = await axios.get(this.$sharePointUrl + "submittedExams");
        var data = res.data.value;
        this.data = res.data.value;
        const res2 = await Promise.all(
          this.data.map(async (item) => {
            const res2 = await axios.get(this.$sharePointUrl + "students");
            const res2Filtered = res2.data.value.filter(
              (inner) => inner.num === item.userId
            );
            item.userName = res2Filtered[0].Title;
            console.log(item.userName);
          })
        );

        this.userData = data.filter((item) => item.mahlakaId === mahlakaId);
      }

      console.log(this.userData);
    },

    filteredPending(name) {
      return this.userData.filter(
        (item) => item.Title === name && item.status === "pending"
      );
    },
    filteredAwaitChecking(name) {
      return this.userData.filter(
        (item) => item.Title === name && item.status === "waiting for approve"
      );
    },

    async showPendingExamModal(pending) {
      if (this.$isSharePointUrl) {
        pending["test"] = JSON.parse(pending["test"]);
      }
      this.currentExamToShow = pending;
      this.type = "pendingExam";
      this.showExamCheckingModal = true;
      console.log(this.showExamCheckingModal);
    },

    async showWaitingExamModal(awaitingExam) {
      if (this.$isSharePointUrl) {
        awaitingExam["test"] = JSON.parse(awaitingExam["test"]);
      }

      this.currentExamToShow = awaitingExam;
      this.type = "awaitingExam";

      console.log(awaitingExam);
      this.showExamCheckingModal = true;
      console.log(this.showExamCheckingModal);
    },
  },
  async beforeMount() {
    this.isAdmin = sessionStorage.getItem("isAdmin");
    console.log("status:", this.isAdmin ? "admin" : "checker");
    await this.getData();
  },
};
</script>

<style scoped>
.q-pa-md {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
  /* direction: rtl; */
  padding: 0;
}
.q-list {
  width: 70%;
  max-height: 33.5%;
  padding-right: 7px;
  margin-right: 7px;

  overflow-y: auto;
  /* border: 1px solid #e4f3ff;
  background-color: #f4f7f7;
  box-shadow: -3px 2px 6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%); */
}
.rashatz-list {
  max-height: 100% !important;
  height: 100%;
}
.q-list:last-child {
  margin-top: 20px;
}
.card-item {
  height: 55px;
  width: 75%;
  border-radius: 15px;
  border: 1px solid #e4f3ff;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* box-shadow: -3px 2px 6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%); */
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: black;
  padding-top: 2px;
  font-size: 17px;
}
.watch-btn {
  padding: 0.5em 1.1em !important;

  /* width: 4vw;
  height: 3.5vh; */
  border: none;
  font-size: 13px;
  font-weight: 600;
  border-radius: 10px;
  margin-left: 15%;
  cursor: pointer;
  padding: 0.3em;
}
.card-expansion {
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  background: rgba(240, 240, 240, 0.916);
}
.card-expansion:not(:last-child) {
  margin-bottom: 10px;
}
.card-section {
  padding: 15px !important;
  display: flex;
  justify-content: center;
}
.card {
  max-height: 200px;
  overflow-y: auto;
}
.title1 {
  position: relative;
  margin-top: 15px;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 700;
  z-index: -1;
  text-align: center;
  color: gray;
  padding: 0.3em 0.5em;
  border: 1px solid #80808033;
  border-radius: 18px;
}
.title2 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 28px;
  font-weight: 700;
  color: gray;
  padding: 0.4em 0.5em;
  border: 1px solid #80808033;
  border-radius: 18px;
}
.box-flex {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  margin-top: 50px;
  height: 700px;
}
.box {
  width: var(--box-check-width);
  border-radius: 30px;
  background-color: rgba(230, 230, 230, 0.034);
  box-shadow: 0 0 7px 0 rgb(0 0 0 / 21%);
  border: 1px solid rgba(122, 122, 122, 0.274);
}

.accordion {
  display: flex;
  position: relative;
  z-index: 10;
  flex-direction: column;
  max-height: 255px;
  overflow-y: auto;
  width: 60%;
  left: 50%;
  /* margin-top: 80px; */
  transform: translateX(-50%);
}
button:hover {
  background-color: #cac8c88e;
}
.active .accordion-header,
.accordion-header.active {
  background-color: #7270707c;
  transition: 0.3s ease-in-out;
}

.accordion-item {
  border: 1px solid #ccc;
  border-radius: 7px;
  margin-bottom: 12px;
}
.accordion-header {
  border-radius: 7px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
}
.text {
  margin-right: 10px;
  font-size: 25px;
}

.accordion-content {
  max-height: 123px;
  overflow-y: auto;
  direction: ltr;
  /* padding: 0.7em; */
}
.accordion-arrow {
  font-size: 18px;
  color: rgba(71, 70, 70, 0.596);
  transition: transform 0.2s ease-out;
}
.accordion-arrow.rotate {
  transform: rotate(180deg);
}

.name-of-hafifot {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
}
.name-of-hafifot:hover {
  background: rgb(231, 230, 230);
}
.count-students-cicrcle,
.average-cicrcle {
  position: relative;
  height: 260px;
  width: var(--progress-bar-width);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
}
.average-items,
.count-students-items {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  right: -50%;
  transform: translateX(-50%);
}

.progress-circle {
  margin-top: 15px;
}
.box-flex-content {
  position: relative;
  display: flex;
  top: 10px;
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: space-evenly;
}
.ave-title {
  font-size: 28px;
  font-weight: 800;
}

a {
  text-decoration: none;
  margin-right: 25px;
  position: relative;
  color: black;
  width: 100%;
}
.loading-spinner {
  position: relative;
  top: 150px;
}
.when-empty {
  position: relative;
  right: 50%;
  z-index: -1;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  top: 12%;
  transform: translate(50%, 12%);
}
.students-in-hafifa {
  font-size: 35px;
  position: relative;
  top: 25%;
}
/* select{
      margin-top:15px;
      font-size:17px;
      padding: 0.2em;
      font-weight:700 ;
    } */
.select-option-arrow {
  margin-right: 7px;
  margin-left: 0.5em;
  transition: transform 0.3s ease-out;
}
.select-option-arrow.rotate {
  transform: rotate(180deg);
}

.select-to-show-ave-menu {
  margin-top: 15px;
  position: relative;
  justify-content: space-around;
  width: 105px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: rgba(145, 164, 167, 0.41);
  border-radius: 5px;
}
.select-title {
  display: flex;
  /* justify-content: space-around; */
  /* width: 90%; */
  align-items: center;
  font-size: 17px;
  font-weight: 700;
  align-items: center;
}
.selected-option {
  padding: 3px 0;
  text-align: center;
}
ul {
  border-radius: 5px;
  list-style: none;
  position: absolute;
  display: flex;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  animation: growOut 280ms ease-in-out forwards;
  transform-origin: top center;
}

@keyframes growOut {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
li {
  padding: 0.6em 0;
  text-align: center;
  border-bottom: 1px solid rgb(224, 223, 223);
}
li:last-child {
  border: none;
}
li:hover {
  background: rgb(231, 230, 230);
}
/* .progress-circle .vue3-circular-progressbar .current-counter{
      font-size: 30px;
    } */
</style>
