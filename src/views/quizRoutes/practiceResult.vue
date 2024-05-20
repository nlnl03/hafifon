<template>
  <!-- <div class="spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div> -->
  <div class="container">
    <div class="results-card">
      <div class="practice-results-score">
        <div class="score-items">
          <circle-progress
            :percent="gradeQuiz()"
            :show-percent="true"
            fill-color="var(--main-background-color)"
            :viewport="true"
            :transition="700"
          />
        </div>
      </div>
      <div class="results-table" v-if="!showMassaAllCorrect">
        <q-btn
          color="primary"
          @click="toggler = !toggler"
          :label="toggler ? 'לתשובות נכונות' : 'לתשובות לא נכונות'"
        />

        <br />
        <table v-if="toggler">
          <thead>
            <tr>
              <th>השאלה</th>
              <th class="bad-answer">התשובה שענית</th>
              <th class="good-answer">התשובה הנכונה</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(result, index) in wrongAnswer" :key="index">
              <td>
                <div class="text">{{ result.Title }}</div>
              </td>
              <td>
                <div class="text">{{ getWrongStrByType(result) }}</div>
              </td>
              <td>
                <div class="text">{{ getcorrectStrByType(result) }}</div>
              </td>
              <!-- <td>{{ result.Title }}</td> -->
            </tr>
            <!-- <tr v-for="(result, index) in wrongAnswer" :key="index">
              <td>
                <div class="text">{{ result.Title }}</div>
              </td>
              <td>
                <div class="text">{{ result.wrongAns }}</div>
              </td>
              <td>
                <div class="text">{{ result.wrongQue }}</div>
              </td>
              <td>{{ result.Title }}</td>
            </tr> -->
          </tbody>
        </table>
        <br />

        <table v-if="!toggler">
          <thead>
            <tr>
              <th>השאלה</th>
              <!-- <th>התשובה שענית</th> -->
              <th class="good-answer">התשובה הנכונה</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(result, index) in correctAnswer" :key="index">
              <td>
                <div class="text">{{ result.Title }}</div>
              </td>
              <td>
                <div class="text">{{ getcorrectStrByType(result) }}</div>
              </td>
              <!-- <td>
                <div class="text">{{ getcorrectStrByType(result) }}</div>
              </td> -->
              <!-- <td>{{ result.Title }}</td> -->
            </tr>
            <!-- <tr v-for="(result, index) in wrongAnswer" :key="index">
              <td>
                <div class="text">{{ result.Title }}</div>
              </td>
              <td>
                <div class="text">{{ result.wrongAns }}</div>
              </td>
              <td>
                <div class="text">{{ result.wrongQue }}</div>
              </td>
              <td>{{ result.Title }}</td>
            </tr> -->
          </tbody>
        </table>
      </div>

      <!-- <div>
      <p>הציון שלך הוא:{{ gradeQuiz() }}</p>
    </div> -->
    </div>
  </div>
</template>

<script>
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import loadingSpinner from "@/components/loadingSpinner.vue";
import axios from "axios";
export default {
  name: "practiceResult",
  components: {
    CircleProgress,
    loadingSpinner,
  },
  data() {
    return {
      toggler: false,
      correctAnswer: [],
      wrongAnswer: [],
      userResults: [],
      userBankResults: [],
      score: "",
      showMassaAllCorrect: false,
      isBankQue: false,
      countRightsAns: null,
      isLoadForSpinner: false,
      timeOut: null,
      answers: [],
      pracData: [],
    };
  },
  methods: {
    getWrongStrByType(result) {
      switch (result.type) {
        case "radio":
          return result.selectedOption;
        case "checkbox":
          const objectOptions = {};
          result.options.forEach((option, index) => {
            objectOptions[option] = result.selectedOption[index];
          });
          let str = "";
          result.options.forEach((item) => {
            if (objectOptions[item]) {
              str = str + " , " + item;
            }
          });
          return str;
        case "dragDropComplete":
          return result.sentences.join(" ");
        case "dragDropTable":
          let strConcepts = "";

          result.correctMatches.forEach((item, index) => {
            if (
              JSON.stringify(item.concepts) !=
              JSON.stringify(result.table[index])
            ) {
              strConcepts = `${strConcepts}
             ${result.subjects[index]} : [${result.table[index]}]
             , `;
            }
          });
          return strConcepts;
      }
    },
    getcorrectStrByType(result) {
      switch (result.type) {
        case "radio":
          return result.correctAnswer;
        case "checkbox":
          return result.correctAnswer.join(", ");
        case "dragDropComplete":
          return result.correctAnswer.join(" ");
        case "dragDropTable":
          let strConcepts = "";

          result.correctMatches.forEach((item) => {
            strConcepts = `${strConcepts}
             ${item.subject} : [${item.concepts}]
             , `;
          });

          return strConcepts;
      }
    },

    getRightAndWrongAnswers() {
      this.pracData.forEach((answer) => {
        if (answer.type === "radio") {
          if (answer.selectedOption === answer.correctAnswer) {
            this.correctAnswer.push(answer);
          } else {
            this.wrongAnswer.push(answer);
          }
        } else if (answer.type === "checkbox") {
          const objectOptions = {};
          answer.options.forEach((option, index) => {
            objectOptions[option] = answer.selectedOption[index];
          });
          for (const correct of answer.correctAnswer) {
            if (!objectOptions[correct]) {
              this.wrongAnswer.push(answer);
              return;
            }
          }
          this.correctAnswer.push(answer);
        } else if (answer.type === "dragDropComplete") {
          answer.sentences.join("") === answer.correctAnswer.join("")
            ? this.correctAnswer.push(answer)
            : this.wrongAnswer.push(answer);
        } else if (answer.type === "dragDropTable") {
          for (const correctMatch of answer.correctMatches) {
            const { subject, concepts } = correctMatch;
            const subjectIndex = answer.subjects.indexOf(subject);
            // if (subjectIndex == -1) {
            this.wrongAnswer.push(answer);
            break;
            // }
          }
          this.correctAnswer.push(answer);
        }
      });
    },
    gradeQuiz() {
      var totalQuestions = this.pracData.length;
      var correctAnswers = 0;

      this.pracData.forEach((question, index) => {
        switch (question.type) {
          case "radio":
            if (question.selectedOption === this.answers[index].correctAnswer) {
              correctAnswers++;
              console.log("radio is correct");
            }
            break;
          case "checkbox":
            var correctOptionsCount = 0;

            question.options.forEach((option, optIndex) => {
              if (
                this.answers[index].correctAnswer.includes(option) &&
                question.selectedOption[optIndex]
              ) {
                correctOptionsCount++;
              }
            });

            var totalPossibleCorrectOptions =
              this.answers[index].correctAnswer.length;
            var fracCorrect = correctOptionsCount / totalPossibleCorrectOptions;

            correctAnswers += fracCorrect;
            break;

          case "dragDropComplete":
            var isCorrect =
              question.sentences.join("") ===
              this.answers[index].correctAnswer.join("");

            if (isCorrect) {
              correctAnswers++;
            }
            break;

          case "dragDropTable":
            var correctConceptsCount = 0;

            this.answers[index].correctMatches.forEach((correctMatch) => {
              const { subject, concepts } = correctMatch;
              console.log(subject);
              const subjectIndex = question.subjects.indexOf(subject);
              if (subjectIndex !== -1) {
                if (
                  question.table[subjectIndex] &&
                  question.table[subjectIndex].every((concept) =>
                    concepts.includes(concept)
                  )
                ) {
                  correctConceptsCount += concepts.length;
                }
              }
            });

            var totalPossibleConcepts = this.answers[
              index
            ].correctMatches.reduce(
              (total, match) => total + match.concepts.length,
              0
            );
            var fractionCorrect = correctConceptsCount / totalPossibleConcepts;
            correctAnswers += fractionCorrect;
            break;
        }
      });
      console.log((correctAnswers / totalQuestions) * 100);
      return (correctAnswers / totalQuestions) * 100;
    },

    async getAnswers() {
      const fieldsToFetch = ["correctAnswer", "correctMatches", "type"];
      var res = null;
      try {
        if (this.$isSharePointUrl) {
          res = await axios.get(
            this.$sharePointUrl +
              `getByTitle('practicesData')/Items?$filter=practiceId eq ${this.$route.params.numOfPrac}&$select=${fieldsToFetch}`
          );
          this.answers = res.data.value;

          const parseOptions = await Promise.all(
            this.answers.map((question) => {
              if (
                question.type === "checkbox" ||
                question.type === "dragDropComplete"
              ) {
                console.log("yes, checkbox");
                return this.$asyncParse(question.correctAnswer).then((ans) => {
                  question.correctAnswer = ans;
                  return { question };
                });
              } else if (question.type === "dragDropTable") {
                return this.$asyncParse(question.correctMatches).then((ans) => {
                  question.correctMatches = ans;
                  return { question };
                });
              }
            })
          );
        } else {
          res = await axios.get(this.$sharePointUrl + `practicesData`);
          var answers = res.data.value;
          console.log(answers);
          answers = answers.filter(
            (item) =>
              item.practiceId == JSON.parse(this.$route.params.numOfPrac)
          );
          this.answers = answers.map((item) =>
            item.correctAnswer
              ? { ...item, correctAnswer: item.correctAnswer }
              : { ...item, correctMatches: item.correctMatches }
          );
        }

        console.log(this.answers);
        this.pracData = JSON.parse(localStorage.getItem("pracData"));
        console.log(this.pracData);
        this.getRightAndWrongAnswers();
        console.log(this.wrongAnswer);
        console.log(this.correctAnswer);
        // this.gradeQuiz();

        this.isLoadForSpinner = true;
      } catch (error) {
        console.log("error", error);
      }
    },
  },

  async beforeMount() {
    // this.timeOut = await setTimeout(this.getData, 300);

    this.getAnswers();
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  padding: 20px;
  margin-top: 80px;
  max-width: 800px;
  position: relative;
}
.results-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  margin: auto;
  padding: 25px;
  overflow: auto;
  min-height: 500px;
}

.all-correct {
  font-size: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  top: 20%;
}
td:first-child {
  border-left: none;
}
tbody {
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 275px;
  direction: ltr;
}
thead {
  display: block;
}
th,
td {
  width: var(--table-header-width) !important;
}
th {
  padding-bottom: 5px;
  font-size: 22px;
}
td {
  height: 50px;

  font-size: 18px;
  padding: 0.5em 1em;
  text-align: center;
}
tr {
  border-bottom: 1px solid gray;
}
tbody tr:hover {
  background-color: rgba(192, 192, 192, 0.582);
}
.bad-answer:nth-child(2)::after {
  content: "❌";
  margin-right: 3px;
}

.good-answer::after {
  content: "✔";
  color: green;
  font-size: 25px;
  margin-right: 8px;
}
tbody tr:last-child {
  border-bottom: none;
}
table {
  border-collapse: collapse;
  table-layout: fixed;
}
/* .text{
        width: calc(var(--table-header-width));

   } */
.results-table {
  position: relative;
  top: 85px;
  /* width: 90%; */
}
.btn {
  position: absolute;
  top: 210px;
  transform: translateY(100%);
  display: flex;
  width: 100%;
  height: 120px;
  align-items: center;
  justify-content: center;
}
.back-btn {
  position: relative;
  color: #7c7c7c;
  background-color: #fff;
  height: 40px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
}
.video-btn {
  position: relative;
  color: #fff;
  text-decoration: none;
  height: 40px;
  width: 110px;
  background-color: var(--main-background-color);
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.practice-results-score {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  top: 40px;
  font-size: 60px;
}
.spinner {
  position: relative;
  top: 100px;
}
</style>
