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
        <table>
          <thead>
            <tr>
              <th>השאלה</th>
              <th>התשובה שענית</th>
              <th>התשובה הנכונה</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="result in answers" :key="result">
              <td>
                <div class="text">{{ result.theCorrectAns }}</div>
              </td>
              <td>
                <div class="text">{{ result.wrongAns }}</div>
              </td>
              <td>
                <div class="text">{{ result.wrongQue }}</div>
              </td>
            </tr>

            <tr v-for="bankResult in userBankResults" :key="bankResult">
              <td>
                <div class="text">{{ bankResult.theCorrectBankAns }}</div>
              </td>
              <td>
                <div class="text">{{ bankResult.wrongBankAns }}</div>
              </td>
              <td>
                <div class="text">{{ bankResult.wrongBankQue }}</div>
              </td>
            </tr>
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
          answers = answers.filter(
            (item) => item.pracId == JSON.parse(this.$route.params.numOfPrac)
          );
          this.answers = answers.map(
            (item) => item.correctAnswer || item.correctMatches
          );
        }

        console.log(this.answers);
        this.pracData = JSON.parse(localStorage.getItem("pracData"));
        console.log(this.pracData);
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
th:nth-child(2)::after {
  content: "❌";
  margin-right: 3px;
}
th:nth-child(3)::after {
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
