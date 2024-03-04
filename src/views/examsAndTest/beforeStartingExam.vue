<template>
  <div class="main">
    <div class="loader-spinner" v-if="!isLoadForSpinner">
      <loadingSpinner />
    </div>

    <div class="box" v-if="isLoadForSpinner">
      <div class="name-of-exam">{{ title }}</div>
      <div class="edit-remove-btns" v-if="isAdmin">
        <div class="edit-btn">
          <router-link
            :to="{ name: 'editExams', params: { title: name } }"
            style="color: black"
          >
            <q-icon name="fas fa-edit" size="26px" />
          </router-link>
        </div>

        <deleteExam :examName="name" />
      </div>

      <h2 class="instructions-title">לפני שמתחילים אנא קרא/י את ההוראות:</h2>
      <div class="instructions">
        <div
          class="instructions-items"
          v-for="inst in instructions"
          :key="inst"
        >
          {{ inst }}
        </div>
      </div>
      <router-link
        :to="{ name: 'exams', params: { Title: this.$route.params.Title } }"
        class="start-btn"
      >
        <div class="router-text">התחל</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";
import deleteExam from "@/components/deleteExam.vue";
export default {
  components: {
    loadingSpinner,
    deleteExam,
  },
  data() {
    return {
      title: null,
      isLoadForSpinner: false,
      name: "",
      isAdmin: null,
      examType: null,
      instructions: [
        "*מבחן זה רשום בלשון זכר אך פונה אל כל המגדרים כלשון אחד.",
        "*בכל שאלה בה אופן הטיפול כולל סיוע של צוות נוסף, יש לציין את דרך הפנייה אל הצוות ואת הפרטים הנחוצים.",
      ],
      time: null,
    };
  },
  methods: {
    asyncParse(str) {
      return new Promise((resolve) => {
        resolve(JSON.parse(str));
      });
    },

    getMahlakot() {
      var mahlaka = this.$route.params.selectedItem;
      if (this.$isSharePointUrl) {
        return axios
          .get(
            this.$sharePointUrl +
              `getByTitle('mahlakot')/Items?$filter=Title eq '${mahlaka}'`
          )
          .then((res) => res.data.value[0].Id);
      } else {
        return axios
          .get(this.$sharePointUrl + `mahlakot?Title=${mahlaka}`)
          .then((res) => res.data[0].Id);
      }
    },

    async getTime() {
      var mahlakaId = await this.getMahlakot();
      console.log(mahlakaId);
      console.log(this.examType);
      var res = null;
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('testsAndExams')/Items?$filter=(mahlaka eq ${mahlakaId}) and (type eq '${this.examType}')&$select=time`
        );
        this.time = res.data.value[0].time;
      } else {
        res = await axios.get(
          this.$sharePointUrl +
            `testsAndExams?mahlaka=${mahlakaId}&type=${this.examType}`
        );
        this.time = res.data[0].time;
      }

      console.log(this.time);
      this.instructions.push(`*לרשותך ${this.time / 60} דקות.`);
    },
    spinner() {
      this.isLoadForSpinner = true;
    },
  },
  async beforeMount() {
    this.examType = this.$route.params.Title;
    var examNames = localStorage.getItem("examsName");
    examNames = JSON.parse(examNames);
    var title = examNames.filter(
      (item) => item.Title == this.$route.params.Title
    )[0];
    this.title = title.subject;
    this.name = title.Title;
    console.log(this.name);
    this.getTime();
    this.isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
    const myTimeOut = setTimeout(this.spinner, 250);
  },
};
</script>

<style scoped>
.loader-spinner {
  position: relative;
  transform: translateY(10%);
  top: 10%;
}
.main {
  background-image: url("../../assets/homePageBackground.png");
  background-position: center;
  background-size: cover;
  height: 86.5vh;
  width: 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
}
.box {
  height: 530px;
  width: var(--before-start-width);
  background: #fff;
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
  position: relative;
  top: 12%;
  border-radius: 20px;
}
.name-of-exam {
  top: 45px;
  font-size: 45px;
  font-weight: 700;
  /* right: 50%; */
  /* transform: translateX(50%); */
  position: relative;
  text-align: center;
}
.instructions-title {
  position: relative;
  margin-top: 90px;
  margin-left: 30px;
  font-size: 26px !important;
}
.instructions {
  height: 300px;
  margin-left: 10%;
  margin-right: 30px;
  margin-top: 20px;
}
.instructions-items {
  margin: 0.5em 0;
  font-size: 20px;
}
.instructions-items:last-child {
  font-weight: 600;
}
.start-btn {
  position: absolute;
  text-decoration: none;
  display: inline-block;
  color: black;
  top: 80%;
  right: 50%;
  transform: translate(50%, 75%);
  font-size: 22px;
  width: 105px;
  height: 45px;
  border-radius: 15px;
  background: var(--main-background-color);
  color: white;
  border: none;
  cursor: pointer;
}
.start-btn:hover {
  opacity: 0.7;
}
.router-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-flex {
  height: 80px;
}
.edit-remove-btns {
  width: 200px;
  position: absolute;
  left: 75%;
  top: 45px;
  display: flex;
}
.edit-btn,
.remove-btn {
  cursor: pointer;
  position: relative;
  border-radius: 45%;
  border: none;
  width: 47px;
  height: 47px;
  margin: 5px 7px;
  background: rgba(7, 57, 80, 0.24);
}
.edit-btn {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-btn:hover,
.remove-btn:hover {
  background: rgb(145, 144, 144);
  border: none;
}
</style>
