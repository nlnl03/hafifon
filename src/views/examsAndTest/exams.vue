<template>
  <div class="loader-spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div>

  <div class="title-timer" v-if="isLoadForSpinner">
    <div class="title">
      {{ examData.Title }}
    </div>
    <div class="timer">
      <timer :totalTime="examData.time" :routeName="examType" />
    </div>
  </div>

  <examForm
    :exam="examData"
    :questions="questions"
    :boolIfEmpty="boolIfEmpty"
    :totalQue="totalQuestions"
    @updatedExitAlertShow="updateExitAlertShow"
    v-if="isLoadForSpinner"
    :examId="examData.Id"
  />
</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";
import timer from "@/components/timer.vue";
import examForm from "@/components/examForm.vue";
export default {
  components: {
    loadingSpinner,
    timer,
    examForm,
  },
  data() {
    return {
      examData: [],
      examUserData: {},
      isUserDataEmpty: true,
      boolIfEmpty: [],
      dataToPost: [],
      token: "",
      examType: null,
      userName: "",
      userId: "",
      isAlreadySub: null,
      isLoadForSpinner: false,
      examExistData: [],
      showRedWarn: false,
      showRedWarnToAmerican: false,
      showExitAlert: true,
      urlForId:
        "https://portal.army.idf/sites/hafifon383/_api/web/sitegroups/getbyname('מבקרי חפיפון')/id",
      groupId: null,
      isTime: true,
      questions: [],
      totalQuestions: 20,
    };
  },
  methods: {
    getHebLetters(subIndex) {
      return this.$getHebLetters(subIndex);
    },
    updateExitAlertShow(showExitAlert) {
      this.showExitAlert = false;
      console.log(this.showExitAlert);
    },

    clickHandler(event, index, inner, subIndex, id) {
      console.log(id);
      this.showRedWarn = false;
      const v = this.$refs[`inputRef_${index}${inner}`];
      console.log(v);
      const pressedAnswer = event.target.value;
      this.message = pressedAnswer;

      if (pressedAnswer.trim()) {
        this.isUserDataEmpty = false;
        this.boolIfEmpty[id] = this.isUserDataEmpty;
        console.log(this.boolIfEmpty);
      } else {
        this.boolIfEmpty[id] = true;
        console.log(this.boolIfEmpty);
        console.log("is empty");
        // event.target.classList.add("text-aria-placeholder")
      }
    },

    checkIfExamExist() {
      this.userId = localStorage.getItem("userId");
      if (this.$isSharePointUrl) {
        return axios
          .get(
            this.$sharePointUrl +
              `getByTitle('pending tests')/Items?$filter=(num eq '${this.userId}') and (type eq '${this.$route.params.Title}')`
          )
          .then((res) => res.data.value);
      } else {
        return axios
          .get(
            this.$sharePointUrl +
              `pendingTests?num=${this.userId}&type=${this.$route.params.Title}`
          )
          .then((res) => res.data.value);
      }
    },

    pushToArrToCheckIfEmpty() {
      this.examData.parts.forEach((data) => {
        data.questions.forEach((que) => {
          this.boolIfEmpty.push(true);
        });
      });
      console.log(this.boolIfEmpty);
    },
    handlePageReload(event) {
      event.preventDefault();
      event.returnValue = "";
    },
    getIdOfgroup() {
      return axios.get(this.urlForId).then((res) => res.data.value);
    },
    async deletePer() {
      this.groupId = await this.getIdOfgroup();
      console.log(this.groupId);
      const res = await axios.post(
        this.$sharePointUrl +
          `getByTitle('${this.$route.params.Title}')/roleassignments/getbyprincipalid('${this.groupId}')`,
        {
          __metadata: { type: "SP.Data.IsPermissionActiveListItem" },
        },
        {
          headers: {
            "X-HTTP-Method": "DELETE",
            "IF-MATCH": "*",
            "X-RequestDigest": this.token,
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
          },
        }
      );
    },
    getMahlakot() {
      if (this.$isSharePointUrl) {
        return axios
          .get(
            this.$sharePointUrl +
              `getByTitle('mahlakot')/Items?$filter=Title eq '${this.mahlaka}'`
          )
          .then((res) => res.data.value[0].Id);
      } else {
        return axios
          .get(this.$sharePointUrl + `mahlakot?Title=${this.mahlaka}`)
          .then((res) => res.data[0].Id);
      }
    },

    async getExams() {
      this.mahlaka = this.$route.params.selectedItem;
      this.examType = this.$route.params.Title;
      var mahlakaId = await this.getMahlakot();
      var res = null;
      console.log(mahlakaId);
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('testsAndExams')/Items?$filter=(mahlaka eq ${mahlakaId}) and (type eq '${this.examType}') `
        );
        const examData = res.data.value;
        this.examData = examData;

        const promiseParts = await Promise.all(
          this.examData.map((item) => {
            return this.$asyncParse(item.parts).then((inner) => {
              item.parts = inner;
              return { item };
            });
          })
        );
        this.examData = this.examData[0];
      } else {
        console.log("yessssss");

        res = await axios.get(
          this.$sharePointUrl +
            `testsAndExams?mahlaka=${mahlakaId}&type=${this.examType}`
        );
        this.examData = res.data[0];
      }
      console.log(this.examData);

      const totalParts = this.examData.parts.length;
      const questionsPerPart = Math.floor(this.totalQuestions / totalParts);
      var remainingQuestions = this.totalQuestions % totalParts;
      var allQuestions = [];

      this.examData.parts.forEach((part) => {
        const shuffledQuestions = this.shuffleArray(part.questions);
        const numQustions = questionsPerPart + (remainingQuestions > 0 ? 1 : 0);
        const selectedQuestions = shuffledQuestions.slice(0, numQustions);
        part.questions = selectedQuestions;
        // allQuestions.push(selectedQuestions);
        remainingQuestions--;
      });
      // this.questions = allQuestions.flat();
      console.log(this.examData);
      this.isLoadForSpinner = true;
    },
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    async showSubmitted() {
      const res = await axios.get(
        this.$sharePointUrl + "getByTitle('submittedExams')/items"
      );
    },
  },

  async beforeMount() {
    // this.userName = localStorage.getItem("userName");
    // console.log(this.userName);

    await this.getExams();
    console.log(this.examData);

    this.pushToArrToCheckIfEmpty();
    // this.showSubmitted();
  },

  mounted() {
    window.addEventListener("beforeunload", this.handlePageReload);
  },

  beforeRouteLeave(to, from, next) {
    var prevExit = JSON.parse(localStorage.getItem("prevExit"));
    console.log(prevExit);
    console.log(this.showExitAlert);
    if (this.showExitAlert && prevExit != false) {
      this.$swal({
        title: "את/ה בטוח/ה שברצונך לצאת ממבחן זה ?",
        text: "אם תצא/י השינויים לא ישמרו !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "צא/י",
        cancelButtonText: "הישאר/י",
        confirmButtonColor: "var(--main-background-color)",
      }).then((result) => {
        if (result.isConfirmed) {
          next();
        } else {
          next(false);
        }
      });
    } else {
      next();
    }
    localStorage.setItem("prevExit", true);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handlePageReload);
  },
};
</script>
<style scoped>
.title-timer {
  top: 50px;
  display: flex;
  width: 90%;
  position: relative;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 20px;
}
.timer {
  position: relative;
  left: 80%;
  transform: translateX(-80%);
  font-size: 25px;
}
.title {
  /* top:30px; */
  font-size: 45px;
  font-weight: 700;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  /* width: 200px; */
}
.loader-spinner {
  position: relative;
  width: 100%;
  height: 100%;
}
.no-permission-mess {
  font-size: 35px;
  margin-top: 150px;
  text-align: center;
}
.exam {
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 75%;
  min-height: 400px;
  margin-top: 80px;
  border-top: 1.5px solid rgba(0, 0, 0, 0.1);
}
.exam:first-child {
  border-top: none;
  margin-top: 85px;
}
.show-red-Warn-american {
  display: inline;
}

form {
  min-height: 400px;
}
label {
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
}
.label-text {
  width: 100%;
  height: 100%;
  margin-right: 10px;
  font-size: 22px;
}
.que-index {
  font-size: 27px;
  position: relative;
  right: 45%;
  top: 30px;
  transform: translate(-45%, 30px);
  font-weight: 700;
}
.title-que {
  position: relative;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 70px;
  top: 24px;
  left: 35px;
}
.question {
  position: relative;
  margin: 1em 0;
  min-height: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  font-weight: 700;
}
.american-answer-options {
  /* padding: 25px 30px 20px 30px; */
  margin-top: 60px;
  margin-bottom: 50px;
  /* max-height: 510px; */
  overflow-y: auto;
  direction: ltr;
  width: 63%;
  position: relative;
}
.part-text {
  font-size: 32px;
  position: relative;
  font-weight: 700;
  top: 30px;
}
.answer-items {
  min-height: 45px;
  display: flex;
  background-color: rgba(192, 192, 192, 0.363);
  border-radius: 10px;
  position: relative;
  padding: 1.5em;
  margin-bottom: 45px;
}
.answer-items:last-child {
  margin-bottom: 0px;
}
.answer-items:hover:not(.checked) {
  background-color: rgba(150, 148, 148, 0.363);
}
.answer-items.checked {
  background-color: rgba(150, 148, 148, 0.637);
  transition: all 0.2s ease-in-out;
}
input {
  appearance: none;
  display: flex;
  height: 100%;
  position: relative;
  cursor: pointer;
}
textarea {
  width: 70%;
  margin-top: 30px;
  position: relative;
  padding: 12px;
  height: 120px;
  border-radius: 5px;
  border: 1px solid rgba(169, 169, 169, 0.774);
  outline: none;
  font-size: 20px;
  font-weight: normal;
}
.que-text {
  width: 90%;
  font-size: 25px;
}
.sub-que,
.regular-que {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  width: 80%;
}
.sub-que-letter {
  font-size: 28px;
  margin-right: 15px;
}
.open-que {
  position: relative;
  display: flex;
  top: 20px;
  width: 80%;
  align-items: center;
  justify-content: center;
}
.send {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 80px;
  bottom: 60px;
  align-items: center;
}
.submit-btn {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-decoration: none;
  color: #fff;
  width: 120px;
  border: 1px solid var(--main-background-color);
  border-radius: 15px;
  font-size: 18px;
  cursor: pointer;
  background-color: var(--main-background-color);
}
.alreadySubmitted {
  font-size: 70px;
  margin-top: 150px;
  text-align: center;
}
.text-aria-placeholder::-webkit-input-placeholder {
  color: red;
}
.show-red-Warn {
  position: relative;
  color: red;
  margin-bottom: 5px;
}
</style>
