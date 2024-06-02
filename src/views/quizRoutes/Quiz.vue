<template>
  <div class="spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div>
  <div class="container" v-if="isLoadForSpinner">
    <div class="question-box" v-if="currentQuestion != null">
      <div class="question">
        <h2>
          <span class="que-num">{{ currentQuestionIndex + 1 }}.</span>
          {{ currentQuestion.Title }}
        </h2>
        <template v-if="currentQuestion.type === 'radio'">
          <div class="q-gutter-sm">
            <div
              class="q-gutter-sm"
              v-for="(option, index) in currentQuestion.options"
              :key="index"
            >
              <q-radio
                dense
                v-model="currentQuestion.selectedOption"
                :val="option"
                :label="option"
              />
            </div>
          </div>
        </template>

        <template v-if="currentQuestion.type === 'checkbox'">
          <div style="display: flex; flex-direction: column">
            <q-checkbox
              v-for="(option, optIndex) in currentQuestion.options"
              :key="optIndex"
              v-model="currentQuestion.selectedOption[optIndex]"
              :val="option"
              :label="option"
            />
          </div>
        </template>

        <template v-if="currentQuestion.type === 'dragDropComplete'">
          <!-- <h2>{{ currentQuestion.title }}</h2> -->
          <div
            class="sentence-container"
            :style="{ flexDirection: setTextDirection }"
          >
            <span
              v-for="(word, index) in currentQuestion.sentences"
              :key="index"
              @drop="drop(currentQuestion.sentences, index, $event)"
              @dragover.prevent
            >
              {{ word || "___" }}
            </span>
          </div>
          <h5>בנק מילים:</h5>
          <div class="word-bank">
            <span
              v-for="(word, index) in currentQuestion.bankWords"
              :key="index"
              draggable="true"
              @dragstart="dragStart(word, $event)"
            >
              {{ word }}
            </span>
          </div>
          <button class="reset-btn" @click="resetQuestion(currentQuestion)">
            <span style="margin-left: 5px">אתחל</span>
            <q-icon name="fas fa-undo"></q-icon>
          </button>
        </template>

        <template v-if="currentQuestion.type === 'dragDropTable'">
          <!-- <h2>{{ currentQuestion.title }}</h2> -->
          <div class="drag-drop-table">
            <table>
              <thead>
                <tr>
                  <th
                    v-for="(subject, subIndex) in currentQuestion.subjects"
                    :key="subIndex"
                  >
                    {{ subject }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    v-for="(subject, subIndex) in currentQuestion.subjects"
                    :key="subIndex"
                  >
                    <div
                      class="placeholder"
                      @dragover.prevent
                      @drop="dropTable(currentQuestion, subIndex, $event)"
                    >
                      <div
                        class="placeholder-item"
                        v-if="
                          currentQuestion.table[subIndex] &&
                          currentQuestion.table[subIndex].length > 0
                        "
                      >
                        <div
                          class="word"
                          v-for="(word, wordIndex) in currentQuestion.table[
                            subIndex
                          ]"
                          :key="wordIndex"
                        >
                          {{ word }}
                        </div>
                      </div>
                      <div v-else class="drop-here">גרור לכאן</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h5>בנק מילים</h5>
          <div class="word-bank">
            <div class="bank-items">
              <div
                class="word"
                v-for="(word, wordIndex) in currentQuestion.bankWords"
                :key="wordIndex"
                :draggable="true"
                @dragstart="dragStart(wordIndex, $event)"
              >
                {{ word }}
              </div>
            </div>
          </div>
          <button class="reset-btn" @click="resetQuestion(currentQuestion)">
            <span style="margin-left: 5px">אתחל</span>
            <q-icon name="fas fa-undo" size="20"></q-icon>
          </button>
        </template>
      </div>

      <div class="buttons">
        <button
          v-if="currentQuestionIndex > 0"
          @click="prevQuestion"
          class="back-next-btn"
          style="background-color: #acacac"
        >
          <q-icon
            name="fas fa-long-arrow-alt-right"
            size="17px"
            style="margin-left: 7px"
          ></q-icon>
          הקודם
        </button>

        <button
          v-if="
            canProceedToNextQuestion &&
            currentQuestionIndex !== quizData.length - 1
          "
          @click="nextQuestion"
          class="back-next-btn"
          style="background-color: var(--main-background-color)"
        >
          הבא
          <q-icon
            name="fas fa-long-arrow-alt-left"
            size="17px"
            style="margin-right: 7px"
          ></q-icon>
        </button>

        <button
          v-if="
            canProceedToNextQuestion &&
            currentQuestionIndex === quizData.length - 1
          "
          @click="submitAnswer"
          style="background-color: var(--main-background-color)"
        >
          סיים
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import practiceResult from "../quizRoutes/practiceResult.vue";
import loadingSpinner from "@/components/loadingSpinner.vue";
import axios from "axios";
export default {
  components: {
    practiceResult,
    loadingSpinner,
  },
  data() {
    return {
      quizData: [],
      currentQuestionIndex: 0,
      grade: null,
      isLoadForSpinner: false,
    };
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestionIndex < this.quizData.length - 1) {
        this.currentQuestionIndex++;
        console.log("next");
      }
    },

    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },

    submitAnswer() {
      this.currentQuestionIndex = null;
      console.log(this.quizData);
      localStorage.setItem("pracData", JSON.stringify(this.quizData));
      this.$router.push({ name: "result" });
    },

    dragStart(word, event) {
      event.dataTransfer.setData("text/plain", word);
      console.log(event.dataTransfer);
    },

    drop(sentence, index, event) {
      event.preventDefault();
      const draggedWord = event.dataTransfer.getData("text/plain");
      if (!sentence[index]) {
        sentence.splice(index, 1, draggedWord);
      }
    },

    dropTable(question, columnIndex, event) {
      event.preventDefault();
      const wordIndex = parseInt(event.dataTransfer.getData("text/plain"));
      const word = question.bankWords[wordIndex];

      if (!question.table[columnIndex]) {
        question.table[columnIndex] = [word];
      } else {
        question.table[columnIndex].push(word);
      }
    },

    resetQuestion(question) {
      switch (question.type) {
        case "dragDropComplete":
          question.bankWords = [...question.initialBankWords];
          question.sentences = JSON.parse(
            JSON.stringify(question.initialSentences)
          );
          break;
        case "dragDropTable":
          question.table = [];
          break;
      }
    },

    async getQuiz() {
      try {
        const fieldsToFetch = [
          "Title",
          "practiceId",
          "type",
          "options",
          "selectedOption",
          "subjects",
          "table",
          "sentences",
          "bankWords",
        ];
        var res = null;
        if (this.$isSharePointUrl) {
          res = await axios.get(
            this.$sharePointUrl +
              `getByTitle('practicesData')/Items?$filter=practiceId eq ${this.$route.params.numOfPrac}&$select=${fieldsToFetch}`
          );
          this.quizData = res.data.value;

          const parseOptions = await Promise.all(
            this.quizData.map((question) => {
              if (question.type === "radio") {
                console.log("yes, radio");
                return this.$asyncParse(question.options).then((options) => {
                  question.options = options;
                  return { question };
                });
              } else if (question.type === "checkbox") {
                console.log("yes, checkbox");
                const parseOptions = this.$asyncParse(question.options).then(
                  (options) => {
                    question.options = options;
                    return { question };
                  }
                );

                const parseSelectedOption = this.$asyncParse(
                  question.selectedOption
                ).then((selectedOption) => {
                  question.selectedOption = selectedOption;
                  return { question };
                });

                return {
                  parseOptions,
                  parseSelectedOption,
                };
              } else if (question.type === "dragDropComplete") {
                console.log("yes, dragDropComplete");
                const parseSentences = this.$asyncParse(
                  question.sentences
                ).then((sentences) => {
                  question.sentences = sentences;
                  return { question };
                });

                const parseBankWords = this.$asyncParse(
                  question.bankWords
                ).then((bankWords) => {
                  question.bankWords = bankWords;
                  return { question };
                });

                return { parseSentences, parseBankWords };
              } else if (question.type === "dragDropTable") {
                console.log("yes, dragDropTable");

                const parseSubjects = this.$asyncParse(question.subjects).then(
                  (subjects) => {
                    question.subjects = subjects;
                    return { question };
                  }
                );

                const parseBankWords = this.$asyncParse(
                  question.bankWords
                ).then((bankWords) => {
                  question.bankWords = bankWords;
                  return { question };
                });

                const parseTable = this.$asyncParse(question.table).then(
                  (table) => {
                    question.table = table;
                    return { question };
                  }
                );

                return {
                  parseSubjects,
                  parseBankWords,
                  parseTable,
                };
              }
            })
          );

          console.log(this.quizData);
        } else {
          res = await axios.get(this.$sharePointUrl + `practicesData`);
          var quizData = res.data.value;
          this.quizData = quizData.filter(
            (item) =>
              item.practiceId == JSON.parse(this.$route.params.numOfPrac)
          );
        }
        console.log(this.quizData);
        this.initialize();
        this.isLoadForSpinner = true;
      } catch (error) {
        console.log("error fetching data", error);
      }
    },

    initialize() {
      this.quizData.forEach((question) => {
        if (question.type === "dragDropComplete") {
          question.initialBankWords = [...question.bankWords];
          question.initialSentences = JSON.parse(
            JSON.stringify(question.sentences)
          );
        } else if (question.type === "checkbox") {
          question.selectedOption = Array.from(
            { length: question.options.length },
            () => false
          );
        }
      });
      console.log(this.quizData);
    },

    getRadioColor(question, opt) {
      return question.value === opt ? "positive" : "dark";
    },
  },

  async beforeMount() {
    console.log(this.$route.params);
    this.getQuiz();
  },

  computed: {
    currentQuestion() {
      return this.quizData[this.currentQuestionIndex] || null;
    },
    canProceedToNextQuestion() {
      if (this.currentQuestion.type === "radio") {
        return this.currentQuestion.selectedOption !== null;
      } else if (this.currentQuestion.type === "checkbox") {
        return this.currentQuestion.selectedOption.length > 0;
      } else if (this.currentQuestion.type === "dragDropComplete") {
        var boolCheck = true;
        this.currentQuestion.sentences.forEach((word) => {
          if (word == "") {
            boolCheck = false;
          }
        });
        return boolCheck;
      } else {
        return this.currentQuestion.table.length > 0;
      }
    },

    setTextDirection() {
      const item = this.quizData[this.currentQuestionIndex];
      const firstWord = this.currentQuestion.sentences.find(
        (word) => word.trim().length > 0
      );
      console.log(firstWord);
      return firstWord.match(/[a-zA-Z]/) ? "row-reverse" : "row";
    },
  },
};
</script>

<style scoped>
/* button {
  height: 45px;
  width: 120px;
  border: 1px solid var(--main-background-color);
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}
.next-button {
  border-radius: 15px;
  position: absolute;
  bottom: 25px;
  cursor: var(--next-btn-cusror);
  right: 50%;
  transform: translateX(50%);
}
.next-btn-on {
  border: none;
  color: #fff;
  background-color: var(--main-background-color);
}
.next-btn-on-type-null {
  border: none;
  position: absolute;
  top: 80%;
  right: 50%;
  transform: translate(50%, 80%);
  color: #fff;
  background-color: var(--main-background-color);
}
.submit-btn {
  position: absolute;
  text-decoration: none;
  height: 40px;
  width: 110px;
  bottom: 25px;
  border: 1px solid var(--main-background-color);
  border-radius: 10px;
  font-size: 18px;
  right: 50%;
  transform: translateX(50%);
  cursor: pointer;
  color: #fff;
  background-color: var(--main-background-color);
} */
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  margin-top: 80px;
  position: relative;
}
.question-box {
  border: 1px solid #ccc;
  padding: 25px;
  min-height: 350px;
  margin-bottom: 20px;
}
.quiz-box {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  height: 670px;
  width: 1040px;
}
.spinner {
  position: relative;
  top: 100px;
}

.word,
.placeholder {
  /* cursor: grab; */
  margin: 5px;
  padding: 5px;
  background-color: #f9f9f9;
  display: inline-block;
}
.sentence {
  margin-bottom: 10px;
}
button {
  cursor: pointer;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
}
button:hover {
  opacity: 0.8;
}
.sentence-container {
  display: flex;
  flex-wrap: wrap;

  border: 1px solid #ccc;
  padding: 0.5em;
  font-size: 22px;
  margin-bottom: 20px;
}
.sentence-container span {
  padding: 5px;
}
.sentence-container .empty {
  border: 1px dashed #ccc;
}
.word-bank {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 10px;
  font-size: 17px;
}
.word-bank span {
  background-color: #f2f2f2;
  padding: 0.5em;
  margin: 5px;
  cursor: pointer;
}
.word-bank span:hover {
  background-color: #ddd;
}
.drag-drop-table {
  margin-top: 25px;
  margin-bottom: 25px;
}
.drag-drop-table table {
  width: 100%;
  border-collapse: collapse;
}
.drag-drop-table th,
.drag-drop-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
thead {
  font-size: 22px;
}
.que-num {
  font-size: 27px;
  margin-right: 15px;
}
.placeholder {
  height: 100px;
  width: 150px;

  overflow: auto;
  border: 2px dashed #aaa;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 20px;
}
.placeholder-item {
  display: flex;
  flex-direction: column;
}
.bank-items {
  display: flex;
  justify-content: center;
  font-size: 20px;
}
.word {
  cursor: grab;
  margin: 5px;
  padding: 0.5em;

  background-color: #f9f9f9;
}
.q-pa-md {
  padding: 0 16px 16px 0;
}
.drop-here {
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.word-bank h3 {
  text-align: center;
}
.q-gutter-sm {
  font-size: 20px;
}
input {
  appearance: none;
  font-size: 27px;
  display: flex;
  height: 90%;
  position: relative;
  cursor: pointer;
}
label {
  cursor: pointer;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.question {
  margin-bottom: 70px;
}
h2 {
  margin-bottom: 35px;
  margin-top: 10px;
}
.buttons {
  position: absolute;
  display: flex;
  bottom: 70px;
}
.reset-btn {
  margin-bottom: 70px;
  background: rgba(30, 30, 30, 0.69);
  display: flex;
  align-items: center;
}
.back-next-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
}
</style>
