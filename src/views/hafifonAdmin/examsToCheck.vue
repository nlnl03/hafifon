<template>
  <div class="loading-spinner" v-if="!isLoad">
    <loadingSpinner />
  </div>

  <form class="exam-box" v-if="isLoad">
    <div class="exam" v-for="(item, index) in examData" :key="index">
      <div class="que-index">{{ index + 1 + "." }}</div>

      <div
        class="question"
        v-for="(question, subIndex) in item.questions"
        :key="subIndex"
      >
        <div class="regular-que" v-if="item.type == 'regularQue'">
          <div class="que-text">{{ question.que }}</div>
          <p>התשובה שענ\תה:</p>

          <div class="answer-options">
            <div class="answer-items">
              {{ item.inputAns }}
            </div>

            <div class="select-right-wrong">
              <span class="choose-points"
                >*בחר ניקוד (מקס' {{ item.points }} נק')</span
              >
              <input
                type="number"
                min="0"
                :max="question.points"
                step="any"
                v-model="item.pointsReceived"
                placeholder="אנא בחר ניקוד"
                @change="handler($event, item.id, item.points)"
                :ref="'inputRef_' + item.id"
              />
            </div>

            <div class="comments">
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                v-model="item.comments"
                placeholder="הכנס הערות (אופציונלי)"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="sub-que" v-if="item.type == 'subQue'">
          <div class="que-text">
            {{ question.que }}
          </div>

          <p>התשובה שענ\תה:</p>

          <div class="answer-options">
            <div class="answer-items">
              {{ question.inputAns }}
            </div>

            <div class="select-right-wrong">
              <span class="choose-points"
                >*בחר ניקוד (מקס' {{ question.points }} נק')</span
              >
              <input
                type="number"
                min="0"
                :max="question.points"
                step="any"
                v-model="question.pointsReceived"
                placeholder="אנא בחר ניקוד"
                @change="handler($event, question.id, question.points)"
                :ref="'inputRef_' + question.id"
              />
            </div>

            <div class="comments">
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                v-model="question.comments"
                placeholder="הכנס הערות (אופציונלי)"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-of-page">
      <div class="warning-title" v-if="isOpenWarn">
        *אנא בדוק שניקדת את כל השאלות
      </div>
      <div class="send">
        <button class="submit-btn" @click="submit">הגש</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";
export default {
  components: {
    loadingSpinner,
  },
  data() {
    return {
      examData: [],
      vModelData: {},
      isLoad: false,
      pointsForEachQue: null,
      examLength: null,
      pointsArray: [],
      isOpenWarn: false,
      finalGrade: 0,
      isChecExamNotExist: false,
      token: "",
      id: null,
      pendingTestId: null,
      dataToPost: [],
      commentsData: {},
      examType: null,
      alreadyCalc: false,
      fullUserDataToHistory: null,
    };
  },
  methods: {
    pushToArrToCheckGrade() {
      this.examData.forEach((data) => {
        data.questions.forEach((que) => {
          this.pointsArray.push(null);
        });
      });
      console.log(this.pointsArray);
    },

    handler(event, id, maxPointsForEach) {
      console.log(this.vModelData);
      this.isOpenWarn = false;
      var pointsInputted = event.target.value;
      console.log(pointsInputted);
      if (pointsInputted >= 0 && pointsInputted <= maxPointsForEach) {
        this.pointsArray[id] = parseFloat(pointsInputted);
      } else {
        this.pointsArray[id] = null;
      }
      console.log(this.pointsArray);
    },
    postDataFormat() {
      this.dataToPost = [...this.examData];
      this.dataToPost.push({ finalGrade: this.finalGrade });
      console.log(this.dataToPost);
    },

    async calcFinalGrade() {
      return new Promise((resolve) => {
        this.pointsArray.forEach((point) => {
          this.finalGrade += point;
        });
        console.log(this.finalGrade);
        resolve(this.finalGrade);
      });
    },

    checkIfAllIsFull() {
      var value = null;
      var isFull = true;
      this.pointsArray.forEach((point, index) => {
        console.log(`${index}` + point);
        if (!point) {
          isFull = false;
          value = this.$refs[`inputRef_${index}`];
          value.scrollIntoView({ behavior: "smooth", block: "center" });
          console.log(value);
          value.classList.add("input-placeholder");
        }
      });
      return isFull;
    },

    async showAlertConfirm() {
      try {
        const result = await new Promise((resolve) => {
          this.$swal({
            icon: "warning",
            title: "האם את\ה בטוח שברצונך להגיש בדיקה זו ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--main-background-color)",
            confirmButtonText: "כן, שלח בדיקה",
            showLoaderOnConfirm: true,
          }).then((result) => {
            resolve(result);
          });
        });
        if (result.isConfirmed) {
          await this.calcFinalGrade();
          this.postDataFormat();
          this.postData();
        }
      } catch (error) {
        console.log(error);
      }
    },

    submit() {
      if (this.checkIfAllIsFull() == true) {
        this.showAlertConfirm();
      } else {
        this.isOpenWarn = true;
      }
    },

    //  async checkIfExist(){
    //    var data=[]
    //    const res = await axios.get(this.urlForStudentsList+`?$filter=num eq '${this.$route.params.num}'&$select=${this.$route.params.examType}`)
    //    data=res.data.value
    //    console.log(data[0][this.$route.params.examType])
    //    if(data[0][this.$route.params.examType]==null){
    //      this.isChecExamNotExist=true
    //    }
    //  },

    getToken() {
      return axios
        .post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
        .then((res) => res.data.FormDigestValue);
    },

    async getId() {
      if (this.$isSharePointUrl) {
        return axios
          .get(
            this.$sharePointUrl +
              `getByTitle('students')/Items?$filter=num eq ${this.$route.params.num}`
          )
          .then((res) => res.data.value[0].ID);
      } else {
        console.log(this.$route.params);
        return axios
          .get(this.$sharePointUrl + `students?num=${this.$route.params.num}`)
          .then((res) => res.data[0].id);
      }
    },

    async postData() {
      this.id = await this.getId();
      console.log(this.id);
      if (this.$isSharePointUrl) {
        this.token = await this.getToken();
        const res = await axios.post(
          this.$sharePointUrl + `getByTitle('students')/Items('${this.id}')`,
          {
            __metadata: { type: "SP.Data.StudentsListItem" },

            [this.examType]: JSON.stringify(this.dataToPost),
          },
          {
            headers: {
              "X-HTTP-Method": "MERGE",
              "IF-MATCH": "*",
              "X-RequestDigest": this.token,
              Accept: "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
            },
          }
        );
        try {
          if (res.status == 204 || res.status == 200) {
            console.log("its worked");
            this.$swal("Send", "נשלח בהצלחה", "success");
            await this.postToHistoryList();
            this.delDataFromPending();
            this.$router.push({
              name: "submitted",
              params: {
                Title: this.$route.params.examType,
                num: this.$route.params.num,
              },
            });
          } else {
            console.log("not worked");
            this.$swal({
              icon: "error",
              title: "אירעה שגיעה !",
              text: "הבדיקה לא הוגשה...",
            });
          }
        } catch (error) {
          console.log("not working, CATCH", error);
          this.$swal({
            icon: "error",
            title: "אירעה שגיעה !",
            text: "הבדיקה לא הוגשה...",
          });
        }
      } else {
        console.log(this.id);
        const res = await axios.patch(
          this.$sharePointUrl + `students/${this.id}`,
          {
            [this.examType]: this.dataToPost,
          }
        );
        try {
          if (res.status == 204 || res.status == 200) {
            console.log("its worked");
            this.$swal("Send", "נשלח בהצלחה", "success");
            await this.postToHistoryList();
            // this.delDataFromPending()
            this.$router.push({
              name: "submitted",
              params: {
                Title: this.$route.params.examType,
                num: this.$route.params.num,
              },
            });
          } else {
            console.log("not worked");
            this.$swal({
              icon: "error",
              title: "אירעה שגיעה !",
              text: "הבדיקה לא הוגשה...",
            });
          }
        } catch (error) {
          console.log("not working, CATCH", error);
          this.$swal({
            icon: "error",
            title: "אירעה שגיעה !",
            text: "הבדיקה לא הוגשה...",
          });
        }
      }
    },

    async delDataFromPending() {
      if (this.$isSharePointUrl) {
        this.token = await this.getToken();
        console.log(this.token);
        const res = await axios.post(
          this.$sharePointUrl +
            `getByTitle('pending tests')/Items('${this.pendingTestId}')`,
          {
            __metadata: { type: "SP.Data.Pending_x0020_testsListItem" },
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
      }
    },

    asyncParse(str) {
      return new Promise((resolve) => {
        resolve(JSON.parse(str));
      });
    },
    timeOutForSpinner() {
      this.isLoad = true;
    },

    calcTheGrade() {
      this.pointsForEachQue = 100 / this.examLength;
      console.log(this.pointsForEachQue);
    },

    async postToHistoryList() {
      this.fullUserDataToHistory = this.dataToPost;
      console.log(this.fullUserDataToHistory);
      const dateOfSub = new Date();
      if (this.$isSharePointUrl) {
        this.token = await this.getToken();
        return new Promise((resolve, reject) => {
          return axios
            .post(
              this.$sharePointUrl + `getByTitle('hafifotHistory')/Items`,
              {
                Title: localStorage.getItem("infoName"),
                num: this.$route.params.num,
                group: dateOfSub,
                [this.examType]: JSON.stringify(this.fullUserDataToHistory),
              },
              {
                headers: {
                  "X-RequestDigest": this.token,
                },
              }
            )
            .then((response) => {
              return response.data;
            })

            .then((responseData) => {
              resolve(responseData);
            });
        });
      }
    },
  },
  async beforeMount() {
    console.log(this.$route.params.examType);
    this.examType = this.$route.params.examType;
    if (this.$isSharePointUrl) {
      const res = await axios.get(
        this.$sharePointUrl +
          `getByTitle('pending tests')/Items?$filter=(num eq '${this.$route.params.num}') and (type eq '${this.$route.params.examType}')`
      );
      this.examData = res.data.value;
      this.pendingTestId = res.data.value[0].ID;
      
      if (this.$isSharePointUrl) {
        const promiseAnswers = await Promise.all(
          this.examData.map((item) => {
            return this.asyncParse(item.exam).then((inner) => {
              item["exam"] = inner;
              return { item };
            });
          })
        );
      }
      this.examData = this.examData[0].exam;
      console.log(this.examData);
    } else {
      const res = await axios.get(
        this.$sharePointUrl +
          `pendingTests/?num=${this.$route.params.num}&type=${this.$route.params.examType}`
      );
      this.examData = res.data.value;
      this.examData = res.data.value[0].exam;
      console.log(this.examData);
    }
    this.examLength = this.examData.length;
    console.log(this.examLength);
    this.calcTheGrade();
    const myTimeOut = setTimeout(this.timeOutForSpinner, 200);
    this.pushToArrToCheckGrade();
    console.log(this.$route.params);
  },
  mounted() {
    this.examData.forEach((que) => {
      this.vModelData = "";
    });
  },
};
</script>

<style scoped>
.exam-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
form {
  min-height: 400px;
}
.exam {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin-bottom: 100px;
  margin-top: 50px;
  border-top: 1.5px solid rgba(0, 0, 0, 0.1);
}
.exam:first-child {
  border-top: none;
}
.question {
  /* margin-bottom: 50px;
    margin-top: 30px;
    min-height: 80px;
    width: 70%;
    position: relative;
    padding: 1em 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
     font-size: 24px;
    font-weight: 700; */
  width: 80%;
}
.regular-que,
.sub-que {
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
.que-text {
  width: 80%;
}

.answer-options {
  margin-top: 30px;
  width: 70%;
  position: relative;
}
.answer-items {
  min-height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  background-color: rgba(192, 192, 192, 0.363);
  border-radius: 10px;
  position: relative;
  padding: 1.2em 1.5em;
  margin-bottom: 40px;
}
.answer-items:last-child {
  margin-bottom: 0px;
}
input[type="number"] {
  font-size: 24px;
  outline: none;
  padding: 0.4em;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.select-right-wrong {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 55px;
}
.comments {
  position: relative;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
}
textarea {
  width: 90%;
  font-size: 23px;
  padding: 0.6em;
  outline-color: rgba(128, 128, 128, 0.39);
  border-radius: 5px;
  /* outline-color:var(--main-background-color); */
  border: 1px solid rgba(169, 169, 169, 0.774);
}
.send {
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit-btn {
  padding: 0.1em 0.5em;
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

p {
  position: relative;
  font-size: 22px;
  font-weight: 700;
  border-bottom: 1px solid rgb(211, 210, 210);
  margin-bottom: 5px;
  margin-top: 10%;
}
.choose-points {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
  border-bottom: 1px solid rgb(211, 210, 210);
}
.loading-spinner {
  position: relative;
  top: 150px;
}

.warning-title {
  bottom: 15px;
  color: red;
  position: relative;
  display: flex;
  justify-content: center;
}

.input-placeholder::-webkit-input-placeholder {
  color: red;
}

.bottom-of-page {
  position: relative;
  top: 30px;
}
.que-index {
  font-size: 27px;
  position: relative;
  left: 45%;
  top: 20px;
  transform: translate(45%, 20px);
}
</style>
