<template>
  <q-card style="padding: 2em 2em" class="main-card">
    <div>
      <q-icon
        name="fas fa-times"
        size="25px"
        style="cursor: pointer; color: #808080d1"
        v-close-popup
      />
    </div>
    <q-card-section class="info-section">
      <h4 style="font-size: 40px; margin-bottom: 10px">
        {{ this.submittedExam["Title"] }}
      </h4>
      <h2 style="font-size: 25px">{{ this.submittedExam["userName"] }}</h2>
    </q-card-section>

    <q-form @submit.prevent="submit" style="margin: 0 30px">
      <q-card-section
        class="part-card"
        v-for="(part, partIndex) in submittedExam.test['parts']"
        :key="partIndex"
      >
        <h4
          style="
            text-align: center;
            margin-bottom: 25px;
            font-size: 35px;
            color: #5c5c5c;
          "
        >
          {{ part.Title }}
        </h4>
        <div
          class="part-items"
          v-for="(question, queIndex) in part.questions"
          :key="queIndex"
        >
          <div class="que-text-num">
            <div style="margin-left: 15px; font-size: 26px; font-weight: 600">
              {{ queIndex + 1 + ".  " }}
            </div>
            <div class="que-text">
              {{ question.label }}
            </div>
          </div>

          <div class="comments-points-flex">
            <div class="comments-points">
              <div class="answer-options">
                <div class="answered-value">
                  <div class="item-title">התשובה שענ\תה:</div>

                  <div class="answer-items">
                    {{ this.submittedExam["userName"] + ":"
                    }}{{ question.value }}
                  </div>
                </div>

                <div class="select-right-wrong">
                  <div v-if="type === 'awaitingExam'">
                    הניקוד: {{ question["queScore"] }}
                  </div>
                  <q-input
                    v-if="type === 'pendingExam'"
                    style="margin-bottom: 20px"
                    required
                    filled
                    type="number"
                    v-model="question['queScore']"
                    label="אנא בחר/י ניקוד"
                    :max="calcMaxPointsForQue"
                  >
                  </q-input>

                  <div class="comments">
                    <div class="answered-value" v-if="type === 'awaitingExam'">
                      <div class="item-title" style="width: 160px">
                        הערות הבודק\ת:
                      </div>
                      <div v-if="question['comments']">
                        {{ question["comments"] }}
                      </div>
                      <div
                        style="
                          text-align: center;
                          font-size: 23px;
                          font-weight: 600;
                        "
                        v-else
                      >
                        אין הערות
                      </div>
                    </div>

                    <q-input
                      v-if="type === 'pendingExam'"
                      type="textarea"
                      autogrow
                      filled
                      v-model="question['comments']"
                      label="הכנס/י הערות (אופצייה)"
                    />
                  </div>
                </div>

                <div v-if="type === 'awaitingExam'">
                  <div class="admin-buttons">
                    <q-btn
                      label="אשר"
                      size="17px"
                      style="margin-left: 10px"
                      @click="permitButton(partIndex, queIndex)"
                      :style="buttonColor"
                    >
                      <q-icon
                        name="fas fa-check"
                        size="15px"
                        style="margin-right: 8px"
                      />
                    </q-btn>

                    <q-btn
                      label="דחה"
                      color="red"
                      size="17px"
                      style="margin-right: 10px"
                      @click="rejectButton(partIndex, queIndex)"
                    >
                      <q-icon
                        name="fas fa-check"
                        size="15px"
                        style="margin-right: 8px"
                      />
                    </q-btn>
                  </div>

                  <div
                    v-if="
                      rejectedQuestion[queIndex] &&
                      currentPartIndex === partIndex
                    "
                  >
                    <q-input
                      style="margin-bottom: 20px"
                      required
                      filled
                      type="number"
                      v-model="question['updatedQueScore']"
                      :max="calcMaxPointsForQue"
                      label="שנה ניקוד"
                    />
                    <q-input
                      style="margin-top: 30px"
                      type="textarea"
                      autogrow
                      filled
                      required
                      v-model="question['updatedQueComments']"
                      label="הכנס/י הערות"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <div style="text-align: center">
        <q-btn label="שלח לאימות" color="primary" type="submit" />
      </div>
    </q-form>
  </q-card>
</template>

<script>
import axios from "axios";
export default {
  props: {
    submittedExam: Object,
    type: String,
  },
  data() {
    return {
      grade: 0,
      rejectedQuestion: [],
      currentPartIndex: null,
      isChecked: false,
      comments: [],
      points: [],
    };
  },
  computed: {
    calcMaxPointsForQue() {
      var allQuestions = 0;
      this.submittedExam.test.parts.forEach((part) => {
        allQuestions += part.questions.length;
      });
      console.log(Math.ceil(100 / allQuestions));

      return Math.ceil(100 / allQuestions);
    },

    buttonColor() {
      return `backgroundColor: ${this.isChecked ? "#006dd3" : "#0b9bf6"}`;
    },
  },
  methods: {
    changeComment(val) {
      console.log(val);
    },
    submit() {
      console.log(this.submittedExam);
      this.postModal();

      // var canSubmit = false;
      // var check = true;
      // this.rejectedQuestion.forEach((que) => {
      //   if (que != "") {
      //     check = false;
      //   }
      // });
    },

    async postModal() {
      console.log(this.submittedExam.test.parts);

      try {
        this.$swal.fire({
          title: "האם את/ה בטוח/ה ?",
          text: `"${this.submittedExam.Title}" של התלמיד/ה: ${this.submittedExam.userName}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "אישור",
          cancelButtonText: "ביטול",
          confirmButtonColor: "var(--main-background-color)",
        }).then((res) => {
          if (res.isConfirmed) {
            if (this.type === "pendingExam") {
              this.$swal.fire({
                title: "שולח לאישור גורם מוסמך...",
                text: "אנא המתן/י",
                allowOutsideClick: false,
                didOpen: () => {
                  this.$swal.fire.showLoading();
                  this.calcTotalGrade();
                  this.updateStatus();
                },
              });
            } else if (this.type === "awaitingExam") {
              this.$swal.fire({
                title: "שולח מבדק לתלמיד/ה...",
                text: "אנא המתן/י",
                allowOutsideClick: false,
                didOpen: () => {
                  this.$swal.fire.showLoading();
                  this.calcTotalGrade();
                  this.updateStatus();
                },
              });
            }
          }
        });
      } catch (err) {
        console.log("שגיאה: ", err);
        throw err;
      }
    },

    async updateStatus() {
      try {
        var dataForPost = JSON.parse(JSON.stringify(this.submittedExam));
        dataForPost["test"] = JSON.stringify(dataForPost["test"]);
        if (this.type === "pendingExam") {
          dataForPost["status"] = "waiting for approve";
        } else if (this.type === "awaitingExam") {
          dataForPost["status"] = "approved";
        }
        console.log(dataForPost);
        const keysToMap = [
          "Title",
          "test",
          "status",
          "examId",
          "userId",
          "grade",
          "mahlakaId",
        ];

        const mappedData = this.mapObject(dataForPost, keysToMap);
        console.log(mappedData);
        var token = await this.$asyncGetToken();

        const url = this.$sharePointUrl + `getByTitle('submittedExams')/Items`;
        const postRes = await axios.post(url, mappedData, {
          headers: {
            "X-RequestDigest": token,
          },
        });

        console.log(postRes);
        console.log("נשלח בהצלחה");

        const deleteRes = await axios.post(
          this.$sharePointUrl +
            `getByTitle('submittedExams')/items(${this.submittedExam.Id})`,
          {
            __metadata: { type: "SP.Data.SubmittedExamsListItem" },
          },
          {
            headers: {
              "X-HTTP-Method": "DELETE",
              "IF-MATCH": "*",
              "X-RequestDigest": token,
              Accept: "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
            },
          }
        );

        console.log(deleteRes);
        console.log("נמחק בהצלחה");

        this.$swal.fire.close();
        this.uploadSucceeded(
          "הבדיקה נשלחה בהצלחה וומתינה לאישור של גורם מוסמך"
        );
      } catch (err) {
        console.log("שגיאה: ", err);
        this.$swal.fire.close();
        this.uploadFailed("שגיאה בשליחת הבדיקה", err);
        this.grade = 0;
        throw err;
      }
    },
    mapObject(obj, keys) {
      return keys.reduce((acc, key) => {
        if (key in obj) {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
    },

    calcTotalGrade() {
      this.submittedExam.test.parts.forEach((part) => {
        part.questions.forEach((question) => {
          if (this.type === "pendingExam") {
            this.grade += parseInt(question["queScore"]);
          } else if (this.type === "awaitingExam") {
            if (question["updatedQueScore"]) {
              this.grade += parseInt(question["updatedQueScore"]);
            } else {
              this.grade += parseInt(question["queScore"]);
            }
          }
        });
      });
      this.grade = Math.round(this.grade);
      this.submittedExam["grade"] = this.grade;
      console.log("total grade: ", this.grade);
    },

    uploadSucceeded(msg) {
      this.$swal.fire({
        title: msg,
        icon: "success",
        confirmButtonText: "סיים",
        confirmButtonColor: "var(--main-background-color)",
      });
    },
    uploadFailed(msg, error) {
      this.$swal.fire({
        title: msg,
        text: error,
        icon: "error",
        confirmButtonText: "נסה שוב",
        confirmButtonColor: "var(--main-background-color)",
      });
    },

    permitButton(partIndex, queIndex) {
      this.currentPartIndex = partIndex;
      this.submittedExam["test"]["parts"][partIndex].questions[queIndex][
        "state"
      ] = "permitted";

      this.rejectedQuestion[queIndex] = false;
      this.isChecked = true;
    },
    rejectButton(partIndex, queIndex) {
      this.currentPartIndex = partIndex;
      this.submittedExam["test"]["parts"][partIndex].questions[queIndex][
        "state"
      ] = "rejected";

      this.rejectedQuestion[queIndex] = true;
    },
  },
  beforeMount() {
    var numOfAllQues = 0;
    this.submittedExam.test.parts.forEach((part) => {
      part.questions.forEach((question) => {
        numOfAllQues++;
      });
    });
    console.log(numOfAllQues);
    this.comments = new Array(numOfAllQues).fill("");
    this.points = new Array(numOfAllQues).fill("");
    console.log(this.submittedExam);
    this.grade = 0;
    console.log("current grade :", this.grade);
  },
};
</script>

<style scoped>
.main-card {
  max-height: 700px;
}
.part-card {
  background: #e8e6e661;
  border-radius: 35px !important;
  margin-bottom: 80px;
  padding: 40px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info-section {
  text-align: center;
  margin-bottom: 20px;
  padding-top: 0 !important ;
}
.part-items {
  margin-bottom: 70px;
  width: 80%;
  border-bottom: 1px solid #808080b0;
  padding-bottom: 55px;
}
.part-items:last-child {
  border-bottom: none;
  margin-bottom: 40px;

  padding-bottom: 0;
}
.que-text {
  font-size: 23px;
  color: #4e4e4e;
  font-weight: 600;
}
.que-text-num {
  display: flex;
  align-items: baseline;
}
.comments-points-flex {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px;
}
.comments-points {
  width: 70%;
}

.answer-items {
  color: #6a6a6a;
  font-weight: 700;
  font-size: 23px;
}
.answered-value {
  background: #80808073;
  border-radius: 15px;
  padding: 1.5em 2em;
  margin-bottom: 65px;
  margin-top: 40px;
}
.admin-buttons {
  display: flex;
  justify-content: center;
}
.item-title {
  font-size: 25px;
  margin-bottom: 15px;
  border-bottom: 1px solid;
  width: 170px;
  font-weight: 600;
}
</style>
