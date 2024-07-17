<template>
  <div class="background" :class="{ loading: !imageLoaded }">
    <div class="main">
      <h1>שיעורים ותרגולים</h1>
      <div class="text-under-line"></div>

      <div class="select-timeline" v-if="isLoad && !showEmptyMessage">
        <q-select
          outlined
          v-model="selectedValue"
          :options="weeksWithIndex"
          map-options
          :option-value="(option) => option.ID"
          :option-label="(option) => option.Title"
          label="מיין לפי שבוע"
          @update:model-value="showFilterCards"
        >
          <template v-if="selectedValue" v-slot:append>
            <q-icon
              name="far fa-times-circle"
              @click.stop.prevent="selectedValue = null"
              @click="returnDotAnd"
              class="cursor-pointer"
            />
          </template>
        </q-select>
      </div>
      <div class="loader-spinner" v-if="!isLoad">
        <loadingSpinner />
      </div>

      <div class="container-cards" v-if="isLoad && !showEmptyMessage">
        <div class="without-timeline">
          <div class="timeline" ref="timeline">
            <q-timeline color="secondary">
              <q-timeline-entry
                :subtitle="week.Title"
                v-for="(week, index) in filteredWeek"
                :key="index"
                :value="week.ID"
              >
                <div class="flex-cards" v-if="showCards">
                  <div
                    v-for="(item, midIndex) in weekLessons(week.ID)"
                    :key="midIndex"
                  >
                    <div
                      class="card"
                      @mouseenter="expandCard(item, index, midIndex, $event)"
                      @mouseleave="collapseCard($event)"
                    >
                      <div class="card-content">
                        <div
                          class="inner-flex"
                          v-if="item.Title != 'הכרת הגדוד'"
                        >
                          <img
                            class="image-of-items"
                            :src="setLessonImg(item.Img)"
                            alt="תמונת שיעור"
                          />
                          <h4 class="text">
                            {{ item.Title }}
                          </h4>
                          <span class="lesson-name">{{
                            item.description
                          }}</span>
                          <span class="num-of-que">מספר תרגולים: </span>
                        </div>

                        <button
                          v-if="item.Title == 'הכרת הגדוד'"
                          class="inner-flex"
                          style="border: none; width: 100%; cursor: pointer"
                          @click="powerpointUrl(index, item.file, midIndex)"
                        >
                          <img
                            class="image-of-items"
                            style="width: 65%; margin-top: 30px"
                            :src="require(`@/assets/383.png`)"
                          />
                          <h4
                            class="text"
                            style="
                              margin-bottom: 50px;
                              color: rgb(102 143 197);
                              font-size: 37px;
                            "
                          >
                            {{ item.Title }}
                          </h4>
                        </button>

                        <div
                          class="expanded-content"
                          v-if="
                            ite === index &&
                            midIte === midIndex &&
                            this.isFinished &&
                            item.Title != 'הכרת הגדוד'
                          "
                          :style="{
                            maxHeight:
                              ite === index && midIte === midIndex
                                ? expandedHeight
                                : '0',
                          }"
                        >
                          <q-btn
                            class="powerPoint-link"
                            @click="
                              powerpointUrl(
                                index,
                                item.file,
                                midIndex,
                                week.Title
                              )
                            "
                            label="מצגת"
                            style="background-color: #eb693e; color: white"
                          />
                          <q-btn
                            class="tirgulim-link"
                            label="תרגולים"
                            @click="openTirgulimModal(item.ID, index)"
                            style="
                              background-color: var(--main-background-color);
                              color: white;
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </div>
      </div>

      <div class="no-data-message" v-if="isLoad && showEmptyMessage">
        <h4>אין מידע</h4>
        <q-btn
          label="לחץ כאן"
          color="primary"
          @click="this.$router.push({ name: 'mainAdminPage' })"
        ></q-btn>
      </div>
    </div>
  </div>

  <q-dialog v-model="dialogVisible" class="custom-dialog">
    <q-card style="width: 450px; height: 200px">
      <q-card-section class="flex-prac-btns">
        <div class="prac-btns" v-for="prac in tirgulimNames" :key="prac">
          <q-btn class="practices-btn" @click="goToPrac(prac)" id="${prac.ID}">
            {{ prac.Title }}</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import loadingSpinner from "@/components/loadingSpinner.vue";
import axios from "axios";
import { event } from "quasar";
export default {
  name: "PracticesList",
  components: {
    loadingSpinner,
  },
  data() {
    return {
      practices: [],
      selectedValue: null,
      isLoad: false,
      timeOut: null,
      ite: null,
      midIte: null,
      activeCard: null,
      expandedHeight: "200px",
      isFinished: false,
      practicesFilltered: [],
      weeks: [],
      lesson: [],
      showCards: false,
      dialogVisible: false,
      tirgulimNames: [],
      mahlakaId: null,
      weeksWithIndex: [],
      imageLoaded: false,
    };
  },
  methods: {
    setLessonImg(imgName) {
      const mahlaka = localStorage.getItem("mahlaka");
      if (this.$isSharePointUrl) {
        return `https://portal.army.idf/sites/hafifon383/SiteAssets/${mahlaka}/lessonsPics/${imgName}`;
      } else {
        return require(`@/assets/${imgName}`);
      }
    },
    showFilterCards() {
      const optionValue = this.selectedValue.ID;
      console.log(optionValue);
      const timelineFiltered = this.$refs["timeline"].children[0].children[0];
      timelineFiltered.children[0].style.display = "none";
      timelineFiltered.children[1].style.display = "none";
      console.log(timelineFiltered);
    },
    returnDotAnd() {
      var timelineFiltered = this.$refs["timeline"].children[0].children[0];
      console.log(timelineFiltered);

      timelineFiltered.children[0].style.display = "block";
      timelineFiltered.children[1].style.display = "block";
    },
    expandCard(item, index, midIndex, event) {
      if (item.Title !== "הכרת הגדוד") {
        this.ite = index;
        this.midIte = midIndex;
        const div = event.target.children[0].children[0];
        // console.log(div)
        // console.log(this.$refs[item+midIndex])
        div.style.height = "90%";
        // console.log(expandDiv)

        this.isFinished = true;
      }
    },

    collapseCard(event) {
      this.ite = null;
      this.midIte = null;
      const div = event.target.children[0].children[0];
      div.style.height = "100%";
      this.isFinished = false;
    },

    powerpointUrl(index, fileName, midIndex, title) {
      const mahlaka = localStorage.getItem("mahlaka");
      // var nameOfPowerP = this.practices[index].items[midIndex].Subject
      var url = null;
      if (index === 0 && midIndex === 0) {
        console.log(fileName);
        url = `https://portal.army.idf/sites/hafifon383/_layouts/15/WopiFrame.aspx?sourcedoc=https://portal.army.idf/sites/hafifon383/SiteAssets/${fileName}`;
      } else {
        url = `https://portal.army.idf/sites/hafifon383/_layouts/15/WopiFrame.aspx?sourcedoc=https://portal.army.idf/sites/hafifon383/SiteAssets/${mahlaka}/${title}/${fileName}`;
      }
      window.open(url, "_blank");
    },

    getTirgulimNames(itemId) {
      console.log(itemId);
      if (this.$isSharePointUrl) {
        return axios
          .get(
            this.$sharePointUrl +
              `getByTitle('practices')/Items?$filter=lessonId eq ${itemId}`
          )
          .then((res) => res.data.value);
      } else {
        return axios
          .get(this.$sharePointUrl + `practices`)
          .then((res) => res.data.value)
          .then((results) => results.filter((item) => item.lessonId == itemId));
      }
    },

    async openTirgulimModal(lessonId, index) {
      console.log(index);
      this.tirgulimNames = await this.getTirgulimNames(lessonId);
      console.log(this.tirgulimNames);

      if (this.tirgulimNames.length > 1) {
        this.dialogVisible = true;
      } else if (this.tirgulimNames.length == 1) {
        console.log(this.tirgulimNames[0]);
        localStorage.setItem("pracTitle", this.tirgulimNames[0].Title);

        this.$router.push({
          name: "beforeStartQuiz",
          params: {
            week: index + 1,
            numOfPrac: this.tirgulimNames[0].ID,
            lesson: lessonId,
          },
        });
      }
    },

    goToPrac(prac) {
      localStorage.setItem("pracTitle", prac.Title);
      this.$router.push({
        name: "beforeStartQuiz",
        params: {
          week: this.ite + 1,
          numOfPrac: prac.ID,
          lesson: prac.lessonId,
        },
      });
    },

    async getMahlakot() {
      const url = this.$isSharePointUrl
        ? this.$sharePointUrl + `getByTitle('mahlakot')/items`
        : this.$sharePointUrl + "mahlakot";
      console.log(url);
      var res = await axios.get(url);
      return this.$isSharePointUrl ? res.data.value : res.data;
    },

    async getWeeks() {
      var mahlakaFromLocals = localStorage.getItem("mahlaka");
      var mahlakot = await this.getMahlakot();
      this.mahlakaId = mahlakot.filter(
        (mahlaka) => mahlaka.Title == mahlakaFromLocals
      )[0].Id;
      console.log(this.mahlakaId);
      var res = null;

      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('weeks')/Items?$filter=mahlaka eq ${this.mahlakaId}`
        );
        this.weeks = res.data.value;
      } else {
        res = await axios.get(this.$sharePointUrl + "weeks");
        this.weeks = res.data.value.filter(
          (week) => week.mahlakaId == this.mahlakaId
        );
      }
      if (this.weeks.length < 1) {
        this.showEmptyMessage = true;
        console.log("no data");
      }
      console.log("weeks array :", this.weeks);
      this.loadLesson();
      this.isLoad = true;

      this.weeksWithIndex = JSON.parse(JSON.stringify(this.weeks));
      this.weeksWithIndex = this.weeksWithIndex.map((option, index) => ({
        ...option,
        index,
      }));

      console.log(this.weeksWithIndex);
    },

    async loadLesson() {
      var res = null;
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('lessons')/Items?$filter= mahlaka eq ${this.mahlakaId}`
        );
        this.lessons = res.data.value;
      } else {
        res = await axios.get(this.$sharePointUrl + "lessons");
        this.lessons = res.data.value.filter(
          (lesson) => lesson.mahlakaId == this.mahlakaId
        );
      }
      if (this.weeks.length > 0) {
        const about383 = {
          Img: "printer.jpg",
          Title: "הכרת הגדוד",
          file: "מצגת הצגת הגדוד.pptx",
          mahlakaId: this.mahlakaId,
          weekId: this.lessons[0].weekId,
        };
        this.lessons.unshift(about383);
      }
      console.log("lessons array :", this.lessons);
      this.showCards = true;
    },

    weekLessons(weekId) {
      return this.lessons
        .filter((lesson) => lesson.weekId === weekId)
        .slice()
        .sort((a, b) => a.queNumber - b.queNumber);
    },
  },
  async beforeMount() {
    this.timeOut = await setTimeout(this.getWeeks, 200);
  },
  mounted() {},
  computed: {
    filterPractices(event) {
      console.log(event.target);
    },
    filteredWeek() {
      console.log(this.selectedValue);
      if (this.selectedValue !== null) {
        return this.weeks.filter(
          (week) => week.Title == this.selectedValue.Title
        );
      } else {
        return this.weeks;
      }
    },
  },
};
</script>

<style scoped>
.background {
  background-image: url(../../assets/bgrnd.png);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
  min-height: 100vh;
}
.background::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
.background.loading {
  animation: fadeIn 0.7s ease-in-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.main {
  /* overflow-x: hidden; */
}
.loader-spinner {
  position: relative;
  right: 50%;
  transform: translateX(50%);
}
.inner-flex {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
}
h1 {
  font-size: 60px;
  text-align: center;
  color: #625f5f;
  position: relative;
  margin-bottom: 50px;
  top: 30px;
}
.text-under-line {
  position: relative;
  top: -5px;
  width: 130px;
  height: 2px;
  background-color: #625f5f;
  margin: 0 auto;
}
.container-cards {
  margin-top: 100px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  animation: growOut-e0b47cf6 500ms ease-in-out forwards;
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

.flex-cards {
  position: relative;
  flex-wrap: wrap;
  left: 80px;
  display: flex;
  justify-content: flex-start;
}
.card {
  flex-direction: column;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  vertical-align: middle;
  position: relative;
  height: 390px;
  width: 290px;
  margin-left: 4vw;
  margin-bottom: 7vh;
  border: none;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  /* border-radius: 10px; */
  transition: all 0.2s ease-in-out;
  overflow: hidden;
}
.card:hover {
  transform: translateY(-5%);
  box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.2);
}
.card:hover .expanded-content {
  max-height: 200px;
}

h4 {
  font-size: 32px;
  padding: 15px;
  position: relative;
  color: black;
  text-align: center;
}
.num-of-que {
  font-size: 20px;
  margin-bottom: 30px;
  display: inline-block;
  color: #807f7f;
}
.card-content {
  position: relative;
  color: black;
  text-align: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.image-of-items {
  width: 100%;
  height: 60%;
}
.timeline {
  display: flex;
  align-items: center;
}
.without-timeline {
  width: 80%;
  margin-right: 105px !important;
}
.select-timeline {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.q-select {
  width: 180px;
  background: rgba(255, 255, 255, 0.755);
}
.lesson-name {
  margin-bottom: 10px;
  font-size: 21px;
  color: #605e5e;
  font-weight: 600;
  margin-right: 0.5em;
  margin-left: 0.5em;
}
.expanded-content {
  position: absolute;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0%;
  background-color: #f0f0f0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.powerPoint-link,
.tirgulim-link {
  position: relative;
  height: 50%;
  margin: 0 7px;
  border-radius: 10px;
}
.q-btn {
  height: 60%;
}
.q-btn span {
  width: 100%;
}
.practices-btn {
  background: var(--main-background-color);
}
.flex-prac-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
}
.prac-btns {
  margin: 0.5em;
}
.no-data-message {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
