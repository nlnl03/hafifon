<template>
  <div class="loading-spinner" v-if="!isLoad">
    <loadingSpinner />
  </div>

  <div class="box-flex">
    <div class="box">
      <div class="box-flex-content" v-if="isLoad">
        <div class="count-students-cicrcle">
          <div class="count-students-items">
            <div class="ave-title">מבחנים לבדיקה</div>
            <div class="students-in-hafifa">{{ userData.length }}</div>
          </div>
        </div>

        <div class="average-cicrcle">
          <div class="average-items">
            <div class="ave-title">ממוצע ציונים</div>
            <div class="progress-circle">
              <circle-progress
                :percent="gradrPerExam"
                :size="140"
                :show-percent="true"
                :fill-color="changeAveColor(gradrPerExam)"
                :viewport="true"
                :transition="600"
              />
            </div>

            <div
              class="select-to-show-ave-menu"
              v-if="isLoad"
              @click="toggleOptions"
              ref="fixTitleWidth"
            >
              <div class="select-title">
                <div
                  class="select-option-arrow"
                  :class="{ rotate: showOptions }"
                >
                  &#9660;
                </div>
                <div class="selected-option" ref="selectTitle">בחר מבחן</div>
              </div>

              <ul v-show="showOptions" class="exams-list-options">
                <li
                  v-for="(name, index) in testsNames"
                  :key="index"
                  @click="selectOption(name)"
                >
                  {{ name.subject }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="title" v-if="examTitlesFiltered.length && isLoad">
        מבחנים הממתינים לבדיקה
      </div>

      <div class="accordion" v-if="isLoad && examTitlesFiltered.length > 0">
        <div
          class="accordion-item"
          v-for="(item, index) in examTitlesFiltered"
          :key="item"
        >
          <button
            class="accordion-header"
            :class="{ active: ite === index && isOpen }"
            @click="OpenAccordion(item, index)"
            :ref="item + index"
            :value="item"
          >
            <div
              class="accordion-arrow"
              :class="{ rotate: ite === index && isOpen }"
            >
              &#9660;
            </div>
            <div class="text">{{ item }}</div>
          </button>

          <div class="accordion-content" v-if="isOpen && ite == index">
            <div
              class="name-of-hafifot"
              v-for="info in userInfoFilterd"
              :key="info"
            >
              <router-link
                :to="{
                  name: 'examsToCheck',
                  path: `/examsToCheck/${info.num}/${info.type}`,
                  params: { examType: info.type, num: info.num },
                }"
                @click="passName(info)"
                >{{ info.Title }}</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="when-empty" v-if="!examTitlesFiltered.length && isLoad">
        אין מבחנים לבדיקה
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import loadingSpinner from "./loadingSpinner.vue";
export default {
  name: "HafifaCheckMainCompo",
  components: {
    CircleProgress,
    loadingSpinner,
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
    };
  },
  methods: {
    passName(info) {
      localStorage.setItem("infoName", info.Title);
    },
    asyncParse(str) {
      return new Promise((resolve) => {
        resolve(JSON.parse(str));
      });
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    async getGrades(name) {
      var res = null;
      var v = null;
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('students')/items?$select=${name.Title}`
        );
        v = res.data.value;
        const promiseData = await Promise.all(
          v.map((item) => {
            return this.asyncParse(item[name.Title]).then((inner) => {
              item[name.Title] = inner;
              return { item };
            });
          })
        );
        console.log(v);
      } else {
        res = await axios.get(this.$sharePointUrl + `students`);
        console.log(res.data);
        v = res.data;
      }
      var mapExam = v.map((data) => data[name.Title]);
      console.log(mapExam);
      var aveArray = mapExam
        .map((inner) => {
          if (inner != null) {
            return inner
              .map((object) => object.finalGrade)
              .filter((grade) => grade !== undefined);
          }
        })
        .flat()
        .filter((grade) => grade !== undefined);

      console.log(aveArray);
      this.calcAve(aveArray);
    },

    selectOption(name) {
      var selectedText = this.$refs["selectTitle"];
      console.log(selectedText);
      selectedText.innerHTML = name.subject;
      var fixTitleWidth = this.$refs["fixTitleWidth"];
      if (name.subject == "המבחן הסופי") {
        console.log("yes");
        fixTitleWidth.style.width = "125px";
      } else {
        fixTitleWidth.style.width = "100px";
      }
      this.getGrades(name);
    },
    async filterTitles() {
      this.examTitlesFiltered = this.userData.map((data) => data.name);
      const arr = this.examTitlesFiltered;
      this.examTitlesFiltered = this.filterArrayOfTitles(arr);
      console.log(this.examTitlesFiltered);
    },

    filterArrayOfTitles(arr) {
      return arr.filter((value, index) => {
        return arr.indexOf(value) === index;
      });
    },

    async getData() {
      var res = null;
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl + "getByTitle('submittedExams')/Items"
        );
      } else {
        res = await axios.get(this.$sharePointUrl + "submittedExams");
      }
      this.userData = res.data.value;
      console.log(this.userData);
    },

    async OpenAccordion(item, index) {
      // console.log(this.isOpen)
      this.ite = index;
      this.getBtnVal = await this.$refs[item + index].value;
      console.log(this.getBtnVal);
      this.userInfoFilterd = await this.userData.filter(
        (data) => data.name == this.getBtnVal
      );
      console.log(this.userInfoFilterd);
      this.isOpen = !this.isOpen;
    },

    changeAveColor(ave) {
      if (ave >= 80) {
        return "#2E8B57";
      }
      if (ave >= 60 && ave < 80) {
        return "var(--main-background-color)";
      } else {
        return "rgb(175 11 11)";
      }
    },
    showAveOnEachTest(name) {
      console.log(name);
    },

    calcAve(aveArray) {
      console.log("yews");
      console.log(aveArray);
      let sum = 0;
      let count = 0;
      if (aveArray.length) {
        for (let i = 0; i < aveArray.length; i++) {
          sum += aveArray[i];
          count++;
        }
        if (count === 0) {
          return 0;
        }
        this.gradrPerExam = sum / count;
        console.log(this.gradrPerExam);
        return this.gradrPerExam;
      } else {
        this.gradrPerExam = 0;
        console.log(this.gradrPerExam);
        return this.gradrPerExam;
      }
    },

    timeOutForSpinner() {
      this.isLoad = true;
    },
  },

  async beforeMount() {
    var testsNames = JSON.parse(localStorage.getItem("examsName"));
    this.testsNames = testsNames;
    console.log(this.testsNames);
    await this.getData();
    await this.filterTitles();
    const myTimeOut = setTimeout(this.timeOutForSpinner, 250);
  },
};
</script>

<style scoped>
.title {
  position: relative;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: 700;
  z-index: -1;
  text-align: center;
}
.main-title {
  margin-top: 40px;
  font-size: 28px;
  text-align: center;
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
button {
  width: 100%;
  position: relative;
  border: none;
  transition: all 0.2s ease-in-out;
  min-height: 70px;
  /* background-color: rgb(150 149 149 / 39%); */
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
