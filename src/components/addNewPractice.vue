<template>
  <q-form
    @submit.prevent="addPracticeAndValidate"
    style="width: 640px; margin-top: 50px"
  >
    <q-card class="add-prac-card">
      <div class="card-flex" style="width: 80%">
        <q-card-section>
          <h1 style="text-align: center; font-size: 37px">הוסף תרגול</h1>
        </q-card-section>

        <q-input
          style="margin-bottom: 0px !important"
          v-model.trim="practice.Title"
          required
          label="שם התרגול"
          filled
          :rules="[(val) => val != '' || 'אנא הכנס/י שם תרגול']"
        />

        <q-card-section
          class="card-item"
          v-for="(question, qIndex) in practice.questions"
          :key="qIndex"
        >
          <div class="header-flex">
            <div class="remove">
              <q-icon
                name="fas fa-times"
                class="remove-icon"
                size="25px"
                @click="removeQuestion(qIndex)"
              />
            </div>
            <h5 class="que-number">שאלה {{ qIndex + 1 }}</h5>
          </div>
          <q-select
            v-model="question.type"
            :options="questionTypes"
            label="בחר סוג שאלה"
            required
            filled
            :rules="[(val) => val != '' || 'אנא בחר/י סוג שאלה']"
            option-value="value"
            @update:model-value="resetNewQuestion(qIndex)"
          />
          <q-input
            v-model.trim="question.Title"
            label="שאלה"
            filled
            required
            :rules="[(val) => val != '' || 'אנא הכנס/י שאלה']"
          />

          <div v-if="question.type && question.type.value === 'radio'">
            <div class="flex-add">
              <div style="width: 40%; margin-left: 10px; margin-top: 20px">
                <q-input
                  v-model.trim="question.newOption"
                  label="אפשרות חדשה"
                  filled
                  @keyup.enter="addOption(qIndex)"
                  :rules="[(val) => validateRadioOption(val, qIndex)]"
                />
              </div>
              <div>
                <q-btn
                  class="add-option-btn"
                  color="primary"
                  @click="addOption(qIndex)"
                  :disable="isCheckBoxValid"
                >
                  <q-icon
                    name="fas fa-plus"
                    size="13px"
                    style="width: 100%; height: 100%"
                  />
                </q-btn>
              </div>
            </div>

            <div class="q-mt-md">
              <q-chip
                v-for="(option, index) in question.options"
                :key="index"
                removable
                @remove="removeOption(qIndex, index)"
              >
                {{ option }}
              </q-chip>
            </div>
            <q-input
              v-model.trim="question.correctAnswer"
              label="תשובה נכונה"
              filled
              required
              :rules="[(val) => validateRadioCorrectAnswer(val, qIndex)]"
            />
          </div>

          <div v-if="question.type && question.type.value === 'checkbox'">
            <q-input
              v-model.trim="question.newOption"
              label="אופצייה חדשה"
              filled
              :rules="[(val) => validateCheckboxOption(val, qIndex)]"
              @keyup.enter="addOption(qIndex)"
            />
            <q-btn
              @click="addOption(qIndex)"
              label="הוסף אופצייה"
              color="primary"
              class="q-mt-sm"
              :disable="isCheckBoxValid"
            />

            <div class="q-mt-md">
              <q-chip
                v-for="(option, index) in question.options"
                :key="index"
                removable
                @remove="removeOption(qIndex, index)"
              >
                {{ option }}
              </q-chip>
            </div>

            <q-input
              v-model.trim="question.correctAnswer"
              label="תשובות נכונות (מופרדות בפסיק)"
              filled
              required
              :rules="[(val) => validateCheckboxCorrectAnswer(val, qIndex)]"
            />
          </div>

          <div
            v-if="question.type && question.type.value === 'dragDropComplete'"
          >
            <q-input
              v-model.trim="question.sentences"
              label="הוסף משפט (מופרד באמצעות פסיק, הוספ/י מרכאות במקום ההשלמה)"
              filled
              :rules="[(val) => validateDragDropCompleteSentence(val, qIndex)]"
            />

            <q-input
              v-model.trim="question.newOption"
              label="בנק מילים"
              filled
              @keyup.enter="addOption(qIndex)"
            />
            <q-btn
              @click="addOption(qIndex)"
              label="הוסף מילה"
              color="primary"
              class="q-mt-sm"
              :disable="isDragDropCompleteValid"
            />

            <div class="q-mt-md">
              <q-chip
                v-for="(word, index) in question.bankWords"
                :key="index"
                removable
                @remove="removeOption(qIndex, index)"
              >
                {{ word }}
              </q-chip>
            </div>

            <q-input
              v-model.trim="question.correctAnswer"
              label="(מופרד עם פסיקים)המשפט הנכון"
              filled
              :rules="[
                (val) => validateDragDropCompleteCorrectAnswer(val, qIndex),
              ]"
            />
          </div>

          <div v-if="question.type && question.type.value === 'dragDropTable'">
            <q-input
              v-model="question.newOption"
              label="בנק מילים"
              filled
              @keyup.enter="addOption(qIndex)"
            />

            <q-btn
              @click="addOption(qIndex)"
              label="הוסף מילה לבנק מילים"
              color="primary"
              class="q-mt-sm"
            />

            <div class="q-mt-md">
              <q-chip
                v-for="(word, index) in question.bankWords"
                :key="index"
                removable
                @remove="removeOption(qIndex, index)"
              >
                {{ word }}
              </q-chip>
            </div>

            <q-input
              v-model="question.newSubject"
              label="נושא חדש"
              filled
              @keyup.enter="addSubject(qIndex)"
            />
            <q-btn @click="addSubject(qIndex)" label="הוסף נושא"></q-btn>

            <div class="q-mt-md">
              <q-chip
                v-for="(subject, index) in question.subjects"
                :key="index"
                removable
                @remove="removeSubject(qIndex, index)"
              >
                {{ subject }}
              </q-chip>
            </div>

            <q-input
              v-model="question.newConcept"
              label="קונספט חדש לנושא"
              filled
              @keyup.enter="addConcept(qIndex)"
            />
            <q-btn
              @click="addConcept(qIndex)"
              label="הוסף קונספט"
              color="primary"
              class="q-mt-sm"
            />

            <div class="q-mt-md">
              <q-chip
                v-for="(match, index) in question.correctMatches"
                :key="index"
                removable
                @remove="removeMatch(qIndex, index)"
              >
                {{ match.subject }}: {{ match.concepts.join(", ") }}
              </q-chip>
            </div>
          </div>
        </q-card-section>

        <q-card-section style="padding: 10px 0em">
          <q-btn
            @click="addQuestion"
            label="הוסף שאלה"
            color="green"
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            type="submit"
            label="הוסף תרגול"
            color="primary"
            :disable="practice.questions.length < 1"
          />
        </q-card-actions>
      </div>
    </q-card>
  </q-form>
</template>

<script>
import axios from "axios";

export default {
  props: {
    lessonId: Number,
  },

  data() {
    return {
      practice: {
        Title: "",
        type: null,
        questions: [],
      },
      questionTypes: [
        { label: "תשובה בודדת", value: "radio" },
        { label: "מספר תשובות נכונות", value: "checkbox" },
        { label: "השלם את המשפט", value: "dragDropComplete" },
        { label: "התאם אופצייה לנושא המתאים", value: "dragDropTable" },
      ],
      token: null,
    };
  },
  computed: {
    isCheckBoxValid() {
      return this.practice.questions.every((question) => {
        return (
          question.newOption.trim() == "" ||
          question.options.includes(question.newOption.trim())
        );
      });
    },
    isDragDropCompleteValid() {
      return this.practice.questions.every((question) => {
        return (
          question.newOption.trim() == "" ||
          question.bankWords.includes(question.newOption.trim())
        );
      });
    },

    validateRadioOption() {
      return (val, qIndex) => {
        let question = this.practice.questions[qIndex];
        if ((!val || !val.trim()) && question.options.length < 1) {
          return "אנא הכנס/י אופציות";
        }
        if (question.options.includes(val.trim())) {
          return "האופצייה שהכנסת כבר קיימת";
        }
        return true;
      };
    },

    validateRadioCorrectAnswer() {
      return (val, qIndex) => {
        let question = this.practice.questions[qIndex];
        if (!val || !val.trim()) {
          return "אנא הכנס/י תשובה נכונה";
        }
        if (!question.options.includes(val.trim())) {
          return "התשובה הנכונה חייבת להיות אחת מהאופציות";
        }
        return true;
      };
    },

    validateCheckboxOption() {
      return (val, qIndex) => {
        let question = this.practice.questions[qIndex];
        if ((!val || !val.trim()) && question.options.length < 1) {
          return "אנא הכנס/י אופציות";
        }
        if (question.options.includes(val.trim())) {
          return "האופצייה שהכנסת כבר קיימת";
        }
        return true;
      };
    },

    validateCheckboxCorrectAnswer() {
      return (val, qIndex) => {
        let question = this.practice.questions[qIndex];
        let answers = val.split(",").map((a) => a.trim());
        if (!val || !val.trim()) {
          return "אנא הכנס/י תשובה";
        }
        if (answers.some((a) => !question.options.includes(a))) {
          return "אחת או יותר מהתשובות הנכונות לא נמצאו באופציות האפשריות";
        }
        return true;
      };
    },

    validateDragDropCompleteSentence() {
      return (val, qIndex) => {
        let question = this.practice.questions[qIndex];

        if (!val || !val.trim()) {
          return "אנא הכנס/י משפט להשלמה";
        }
        console.log(question);

        return true;
      };
    },

    validateDragDropCompleteOption() {
      console.log("yes");
      return (val, qIndex) => {
        let question = this.practice.questions[qIndex];
        if (!val || !val.trim()) {
          return "אנא הכנס/י לפחות מילה אחת לבנק המילים";
        }
        if (question.bankWords.includes(val.trim())) {
          return "המילה הזו כבר קיימת בבנק";
        }
        return true;
      };
    },

    validateDragDropCompleteCorrectAnswer() {
      return (val, qIndex) => {
        let question = this.practice.questions[qIndex];
        let correctAnswer = val.split(",").map((word) => word.trim());
        if (!val || !val.trim()) {
          return "אנא הכנס/י תשובה נכונה";
        }
        let sentences = question.sentences.split(",");
        if (correctAnswer.length !== sentences.length) {
          return "אורך המשפט להשלמה חייב להיות באורך המשפט הנכון";
        }
        let correctWords = val.split(",").map((word) => word.trim());
        let sentenceWords = sentences
          .map((word) => word.trim())
          .filter((word) => word !== "");
        let allWords = [...question.bankWords, sentenceWords];
        console.log(allWords);
        if (correctWords.some((word) => !allWords.includes(word))) {
          return "כל המילים בתשובה הנכונה חייבים להיות או מהבנק או מהמשפט להשלמה";
        }
        console.log(question[qIndex]);
      };
    },
  },

  methods: {
    getDefaultNewQuestion() {
      return {
        type: "",
        Title: "",
        options: [],
        selectedOption: null,
        correctAnswer: "",
        sentences: [],
        bankWords: [],
        subjects: [],
        correctMatches: [],
        table: [],
        newOption: "",
        newSubject: "",
        newConcept: "",
      };
    },
    removeQuestion(questionIndex) {
      this.practice.questions.splice(questionIndex, 1);
    },
    resetNewQuestion(index) {
      let question = this.practice.questions[index];
      console.log(question);

      question.options = [];
      question.selectedOption = null;
      question.correctAnswer = "";
      question.sentences = [];
      question.bankWords = [];
      question.subjects = [];
      question.correctMatches = [];
      question.table = [];
      question.newOption = "";
      question.newSubject = "";
      question.newConcept = "";
    },

    addOption(qIndex) {
      let question = this.practice.questions[qIndex];
      console.log(question);
      if (question.newOption.trim() !== "") {
        if (
          question.type.value === "radio" ||
          question.type.value === "checkbox"
        ) {
          question.options.push(question.newOption);
        } else if (
          question.type.value === "dragDropComplete" ||
          question.type.value === "dragDropTable"
        ) {
          question.bankWords.push(question.newOption);
        }
        question.newOption = "";
      }
    },
    removeOption(qIndex, index) {
      let question = this.practice.questions[qIndex];
      console.log(question);
      if (
        question.type.value === "radio" ||
        question.type.value === "checkbox"
      ) {
        question.options.splice(index, 1);
      } else if (
        question.type.value === "dragDropComplete" ||
        question.type.value === "dragDropTable"
      ) {
        question.bankWords.splice(index, 1);
      }
    },

    addSubject(qIndex) {
      let question = this.practice.questions[qIndex];

      if (question.newSubject.trim() !== "") {
        question.subjects.push(question.newSubject);
        question.newSubject = "";
      }
    },

    removeSubject(qIndex, index) {
      let question = this.practice.questions[qIndex];

      question.subjects.splice(index, 1);
    },

    addConcept(qIndex) {
      let question = this.practice.questions[qIndex];

      if (
        question.newConcept.trim() !== "" &&
        question.newSubject.trim() !== ""
      ) {
        const match = question.correctMatches.find(
          (m) => m.subject === question.newSubject
        );
        if (match) {
          match.concepts.push(question.newConcept);
        } else {
          question.correctMatches.push({
            subject: question.newSubject,
            concepts: [question.newConcept],
          });
        }
        question.newConcept = "";
      }
    },

    removeMatch(qIndex, index) {
      let question = this.practice.questions[qIndex];

      question.correctMatches.splice(index, 1);
    },

    addQuestion() {
      this.practice.questions.push(this.getDefaultNewQuestion());
    },

    async postData() {
      try {
        this.token = await this.$asyncGetToken();
        console.log("yes1");

        const practiceRes = await axios.post(
          this.$sharePointUrl + "getByTitle('practices')/items",
          {
            Title: this.practice.Title,
            lessonId: this.lessonId,
          },
          {
            headers: {
              "X-RequestDigest": this.token,
            },
          }
        );
        const practiceId = practiceRes.data.Id;
        console.log(practiceId);
        console.log("yes2");
        for (const question of this.practice.questions) {
          const questionData = {
            Title: question.Title,
            practiceId: practiceId,
            type: question.type.value,
            options: question.options ? JSON.stringify(question.options) : null,
            selectedOption: question.selectedOption
              ? JSON.stringify(question.selectedOption)
              : null,
            subjects: question.subjects.length
              ? JSON.stringify(question.subjects)
              : null,

            correctMatches: question.correctMatches.length
              ? JSON.stringify(question.sentences)
              : null,
            correctAnswer: question.correctAnswer
              ? question.correctAnswer
              : null,
            table: question.table.length
              ? JSON.stringify(question.table)
              : null,

            sentences: question.sentences.length
              ? JSON.stringify(question.sentences)
              : null,
            bankWords: question.bankWords.length
              ? JSON.stringify(question.bankWords)
              : null,
          };

          if (question.type == "checkbox") {
            questionData.correctAnswer = question.correctAnswer
              ? JSON.stringify(question.correctAnswer)
              : null;
          }
          if (question.type == "dragDropComplete") {
            questionData.sentences = JSON.stringify(question.sentences);
            questionData.bankWords = JSON.stringify(question.bankWords);
            questionData.correctAnswer = JSON.stringify(question.correctAnswer);
          }

          if (question.type == "dragDropTable") {
            questionData.subjects = question.subjects
              ? JSON.stringify(question.subjects)
              : null;
            questionData.bankWords = question.bankWords
              ? JSON.stringify(question.bankWords)
              : null;
            questionData.correctMatches = question.correctMatches
              ? JSON.stringify(question.correctMatches)
              : null;
            questionData.table = question.table
              ? JSON.stringify(question.table)
              : null;
          }

          await axios.post(
            this.$sharePointUrl + "getByTitle('practicesData')/items",
            questionData,
            {
              headers: {
                "X-RequestDigest": this.token,
              },
            }
          );

          console.log("success");
        }
      } catch (err) {
        console.log(err);

        throw err;
      }
    },

    async addPracticeAndValidate() {
      try {
        console.log(this.practice.questions);
        this.$swal({
          title: "מעלה תרגול...",
          text: "אנא המתן/י",
          allowOutsideClick: false,
          didOpen: () => {
            this.$swal.showLoading();
          },
        });

        await this.postData();
        this.$swal.close();
        this.$swal({
          title: "התרגול הועלה בהצלחה",
          icon: "success",
          confirmButtonText: "סיום",
          confirmButtonColor: "var(--main-background-color)",
        });
      } catch (err) {
        this.$swal.close();
        this.$swal({
          title: "שגיאה בהעלאת התרגול",
          icon: "error",
          confirmButtonText: "נסה שוב",
          confirmButtonColor: "var(--main-background-color)",
        });
      }

      //   for (
      //     let question = 0;
      //     question < this.practice.questions.length;
      //     question++
      //   ) {
      //     console.log(this.practice.questions[question]);

      //     if (
      //       this.practice.questions[question].type.value === "dragDropComplete"
      //     ) {
      //       this.practice.questions[question].sentences = this.practice.questions[
      //         question
      //       ].sentences
      //         .split(",")
      //         .map((w) => (w = w.trim()));
      //       console.log(this.practice.questions[question].sentences);

      //       const fullRightAnswerArray = [
      //         ...this.practice.questions[question].sentences.filter(
      //           (word) => word !== ""
      //         ),
      //         ...this.practice.questions[question].bankWords,
      //       ];
      //       const isExistSelectedWords = this.practice.questions[
      //         question
      //       ].correctAnswer.every((i) => {
      //         return fullRightAnswerArray.includes(i);
      //       });

      //       console.log(this.practice.questions[question]);
      //       if (
      //         this.practice.questions[question].correctAnswer.length !==
      //         this.practice.questions[question].sentences.length
      //       ) {
      //         alert(
      //           `ודא שהכנסת כמות מילים התואמת את כמות המילים במשפט הנתון: ${
      //             question + 1
      //           }`
      //         );
      //         return;
      //       } else if (!isExistSelectedWords) {
      //         console.log(isExistSelectedWords);
      //         alert(`אנא הכנס תשובה שקיימת באפשרויות :${question + 1}`);
      //         return;
      //       }
      //     }
      //   }
    },
  },
};
</script>

<style scoped>
.header-flex {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.remove-icon {
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  color: #808080e6;
}
.remove {
  margin-right: 10px;
  margin-bottom: 55px;
}
.remove:hover .remove-icon {
  transform: scale(1.1);
}

.q-input {
  margin-bottom: 20px !important;
}
.q-mt-md {
  margin: 20px 0;
}
.que-number {
  font-weight: 600;
}
.flex-add {
  display: flex;
  align-items: center;
  width: 100%;
}
.add-option-btn {
  background-color: gray;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.add-prac-card {
  border: 1px solid #80808033;
  border-radius: 15px;
  box-shadow: none;
  display: flex;
  justify-content: center;
}
.card-flex {
  width: 80%;
  padding: 1em;
}
.card-item {
  border: 1px solid rgba(128, 128, 128, 0.229);
  border-radius: 20px;
  margin-top: 30px;
  padding: 30px;
}
</style>
