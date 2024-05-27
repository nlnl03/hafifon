<template>
  <div class="prac-item">
    <div style="width: 75%">
      <div class="que-num">{{ queIndex + 1 }}</div>
      <div class="que-type" style="font-size: 18px">
        <span style="font-weight: 600; margin-left: 5px">סוג השאלה: </span>
        {{ returnQueType(que.type) }}
      </div>
      <!-- <q-select
        v-model="que.type"
        label="סוג"
        :options="queTypes"
        class="q-mt-md"
        outlined
        emit-value
        map-options
        @update:model-value="d"
      ></q-select> -->

      <q-input
        class="prac-input"
        filled
        :label="`שאלה ${queIndex + 1}`"
        v-model="que.Title"
      />
      <br />
      <div v-if="que.type == 'dragDropComplete'">
        <div class="flex-items">
          <q-input
            class="prac-input"
            filled
            label="הוסף מילה"
            v-model="newWord"
          />
          <q-btn @click="handleWordAdd(que.sentences)" class="add-btn">
            <q-icon name="fas fa-plus-circle" />
          </q-btn>
        </div>
        <br />
        <q-btn
          color="primary"
          label="הוסף מקום להשלמה"
          @click="que.sentences.push('')"
        />

        <completeSentence :sentences="que.sentences" />
        <div class="bank-words">
          <h2 class="title">בנק מילים</h2>
          <div class="flex-items">
            <q-input
              class="prac-input"
              filled
              label="הוסף מילק לבנק"
              v-model="newBankWordWord"
            />
            <q-btn @click="handleBankWordAdd(que.bankWords)" class="add-btn">
              <q-icon name="fas fa-plus-circle" />
            </q-btn>
          </div>
        </div>
        <completeSentence :sentences="que.bankWords" />
      </div>

      <q-input
        class="prac-input"
        filled
        label="אפשרויות"
        v-model="que.options"
        v-if="que.type != 'dragDropTable' && que.type != 'dragDropComplete'"
      />

      <div v-if="que.type == 'dragDropTable'">
        <div class="flex-items">
          <q-input
            class="prac-input"
            filled
            label="הוסף נושא"
            v-model="newSubject"
          />
          <q-btn @click="handleSubjectAdd(que.subjects)" class="add-btn">
            <q-icon name="fas fa-plus-circle" />
          </q-btn>
        </div>
        <br />

        <q-select
          :options="que.subjects"
          v-model="activeTab"
          label="הנושאים (עמודות הטבלה)"
          filled
        />

        <div v-for="correctMatch in que.correctMatches" :key="correctMatch">
          <div v-if="correctMatch.subject == activeTab">
            <completeSentence :sentences="correctMatch.concepts" />
            <div style="display: flex; align-item: center; height: 100%">
              <div>
                <q-input
                  class="prac-input"
                  filled
                  label="הוסף ערך מתאים "
                  v-model="newConcept"
                />
              </div>

              <div style="height: 100%">
                <q-btn
                  @click="habdleConceptAdd(correctMatch.concepts)"
                  class="add-btn"
                >
                  <q-icon name="fas fa-plus-circle" />
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- <q-btn
          color="primary"
          label="הוסף מקום להשלמה"
          @click="que.sentences.push('')"
        /> -->

        <completeSentence :sentences="que.sentences" />
        <div class="bank-words">
          <h2 class="title">בנק מילים</h2>
          <div class="flex-items">
            <q-input
              class="prac-input"
              filled
              label="הוסף מילק לבנק"
              v-model="newBankWordWord"
            />
            <q-btn @click="habdleConceptAdd(que.subjects)" class="add-btn">
              <q-icon name="fas fa-plus-circle" />
            </q-btn>
          </div>
        </div>

        <div>
          <completeSentence :sentences="que.bankWords" />
        </div>
      </div>

      <q-input
        class="prac-input"
        filled
        label="תשובה נכונה"
        v-model="que.correctAnswer"
        v-if="que.type != 'dragDropTable'"
      />
    </div>
  </div>

  <div v-for="practice in newPractice" :key="practice">
    <q-select :options="queTypes" />
  </div>
</template>

<script>
import completeSentence from "@/components/practicesUpload/completeSentence.vue";
import dragDropTableVue from "./practicesUpload/dragDropTable.vue";
export default {
  props: {
    que: String,
    queIndex: Number,
  },
  components: {
    completeSentence,
  },
  data() {
    return {
      newConcept: "",
      activeTab: "",
      newSubject: "",
      newBankWordWord: "",
      newWord: "",
      queTypes: ["radio", "checkbox", "dragDropComplete", "dragDropTable"],
      placeholder: "___",
      newPractice: [],
    };
  },
  methods: {
    habdleConceptAdd(concepts) {
      if (this.newConcept) {
        concepts.push(this.newConcept);
        this.newConcept = "";
      }
    },
    handleSubjectAdd(subjects) {
      if (this.newSubject) {
        subjects.push(this.newSubject);
        this.newSubject = "";
      }
    },
    handleBankWordAdd(bankWord) {
      if (this.newBankWordWord) {
        bankWord.push(this.newBankWordWord);
        this.newBankWordWord = "";
      }
    },
    handleWordAdd(sentences) {
      if (this.newWord) {
        sentences.push(this.newWord);
        this.newWord = "";
      }
    },

    handleInput(index, value) {
      this.$set(this.que.sentences, index, value);
      console.log("updated val: ", this.que[index].sentences);
    },
    addPlaceholder(index) {
      console.log(this.que);
      this.que.sentences.splice(index + 1, 0, "");
    },
    returnQueType(type) {
      if (type === "radio") {
        return "תשובה בודדת";
      } else if (type === "checkbox") {
        return "מספר תשובות נכונות";
      } else if (type === "dragDropComplete") {
        return "השלם את המשפט";
      } else if (type === "dragDropTable") {
        return "התאם אופצייה לנושא המתאים";
      }
    },
  },
  mounted() {
    console.log(this.que);
  },
  computed: {
    formattedValue: {
      get() {
        return this.que.sentences
          .map((item) => item || this.placeholder)
          .join(" ");
      },
      set(value) {
        this.que.sentences = value
          .split(" ")
          .map((item) => (item === this.placeholder ? "" : item));
      },
    },
  },
};
</script>

<style>
.que-num {
  width: 50px;
  position: relative;
  right: 50px;
  top: 15px;
  font-size: 20px;
  font-weight: 600;
}
.que-type {
  margin-bottom: 20px;
}
.flex-items {
  display: flex;
  gap: 10px;
  display: flex !important;
  align-items: center !important;
}
.prac-item {
  border: 1px solid rgba(128, 128, 128, 0.184);
  border-radius: 20px;
  padding: 2em;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.prac-input {
  font-size: 16px !important;
  margin-bottom: 15px !important;
}
.prac-input .q-field__label {
  font-size: 21px !important;
  top: 13px;
}
.prac-input.q-field--filled .q-field__control {
  padding: 8px 12px !important;
  height: unset !important;
}
.add-btn {
  width: 50px !important;
  /* display: flex !important;
  justify-content: center !important;
  align-items: center !important; */
}
.add-btn::before {
  box-shadow: none !important;
}
.bank-words {
  margin-top: 20px;
}
.title {
  margin-bottom: 20px !important;
}
</style>
