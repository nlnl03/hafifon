<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md">
        <q-form @submit.prevent="addPractice">
          <q-card>
            <q-card-section>
              <div class="text-h6">הוסף תרגול</div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="practice.Title" label="שם התרגול" filled />
            </q-card-section>

            <q-card-section
              v-for="(question, qIndex) in practice.questions"
              :key="qIndex"
            >
              <q-select
                v-model="question.type"
                :options="questionTypes"
                label="בחר סוג שאלה"
                filled
                option-value="value"
                @input="resetNewQuestion(qIndex)"
              />
              <q-input v-model="question.Title" label="שאלה" filled />

              <div v-if="question.type && question.type.value === 'radio'">
                <q-input
                  v-model="question.correctAnswer"
                  label="תשובה נכונה"
                  filled
                />
                <div class="flex-add">
                  <q-input
                    v-model="question.newOption"
                    label="אפשרות חדשה"
                    filled
                    @keyup.enter="addOption(qIndex)"
                  />

                  <q-btn
                    @click="addOption(qIndex)"
                    label="הוסף אפשרות"
                    color="primary"
                  >
                    <q-icon name="fas fa-plus" />
                  </q-btn>
                </div>

                <div class="q-mt-md">
                  <q-chip
                    v-for="(option, index) in question.options"
                    :key="index"
                    removable
                    @remove="removeOption(qInedx, index)"
                  >
                    {{ option }}
                  </q-chip>
                </div>
              </div>

              <div v-if="question.type && question.type.value === 'checkbox'">
                <q-input
                  v-model="question.newOption"
                  label="אופצייה חדשה"
                  filled
                  @keyup.enter="addOption(qIndex)"
                />
                <q-btn
                  @click="addOption(qIndex)"
                  label="הוסף אופצייה"
                  color="primary"
                  class="q-mt-sm"
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
                  v-model="question.correctAnswer"
                  label="תשובות נכונות(מופרד בפסיק)"
                  filled
                />
              </div>

              <div
                v-if="
                  question.type && question.type.value === 'dragDropComplete'
                "
              >
                <q-input
                  v-model="question.sentences"
                  label="הוסף משפט(מופרד באמצעות פסיק, רווח במקום שבו השלמה)"
                  filled
                />
                <q-input
                  v-model="question.newOption"
                  label="בנק מילים"
                  filled
                  @keyup.enter="addOption(qIndex)"
                />
                <q-btn
                  @click="addOption(qIndex)"
                  label="הוסף מילה"
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
                  v-model="question.correctAnswer"
                  label="(מופרד עם פסיקים)המשפט הנכון"
                  filled
                />
              </div>

              <div
                v-if="question.type && question.type.value === 'dragDropTable'"
              >
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
            <q-card-section>
              <q-btn
                @click="addQuestion"
                label="הוסף שאלה"
                color="primary"
                class="q-mt-md"
              />
            </q-card-section>

            <q-card-actions align="center">
              <q-btn type="submit" label="הוסף תרגול" color="primary" />
            </q-card-actions>
          </q-card>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
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
    };
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

    resetNewQuestion(index) {
      console.log(this.practice.type);
      this.$set(this.practice.questions, index, this.getDefaultNewQuestion());
    },

    addOption(qIndex) {
      let question = this.practice.questions[qIndex];
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
    addPractice() {
      console.log(this.practice);
      //   this.$emit("add-practice", this.practice);
      //   this.practice = {
      //     Title: "",
      //     type: null,
      //     questions: [],
      //   };
      //   this.resetNewQuestion();
    },
  },
};
</script>

<style scoped>
.q-mt-md {
  margin: 20px 0;
}
.flex-add {
  display: flex;
}
</style>
