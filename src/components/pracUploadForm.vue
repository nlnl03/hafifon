<template>
  <div class="prac-item">
    <div style="width: 75%">
      <q-select
        v-model="que.type"
        label="סוג"
        :options="queTypes"
        class="q-mt-md"
        outlined
        emit-value
        map-options
        @update:model-value="d"
      ></q-select>

      <q-input :label="`שאלה ${queIndex + 1}`" v-model="que.Title" />
      <br />
      <div v-if="que.type == 'dragDropComplete'">
        <div class="flex-items">
          <q-input label="הוסף מילה" v-model="newWord" />
          <q-btn @click="handleWordAdd(que.sentences)">+</q-btn>
        </div>
        <br />
        <q-btn
          color="primary"
          label="הוסף מקום להשלמה"
          @click="que.sentences.push('')"
        />

        <completeSentence :sentences="que.sentences" />
        <h2>בנק מילים</h2>
        <div class="flex-items">
          <q-input label="הוסף מילק לבנק" v-model="newBankWordWord" />
          <q-btn @click="handleBankWordAdd(que.bankWords)">+</q-btn>
        </div>
        <completeSentence :sentences="que.bankWords" />
      </div>

      <q-input
        label="אפשרויות"
        v-model="que.options"
        v-if="que.type != 'dragDropTable' && que.type != 'dragDropComplete'"
      />

      <div v-if="que.type == 'dragDropTable'">
        <div class="flex-items">
          <q-input label="הוסף נושא" v-model="newSubject" />
          <q-btn @click="handleSubjectAdd(que.subjects)">+</q-btn>
        </div>
        <br />

        <q-select :options="que.subjects" v-model="activeTab" />

        <div v-for="correctMatch in que.correctMatches" :key="correctMatch">
          <div v-if="correctMatch.subject == activeTab">
            <completeSentence :sentences="correctMatch.concepts" />
            <q-input label="הוסף ערך מתאים " v-model="newConcept" />
            <q-btn @click="habdleConceptAdd(correctMatch.concepts)">+</q-btn>
          </div>
        </div>
        <!-- <q-btn
          color="primary"
          label="הוסף מקום להשלמה"
          @click="que.sentences.push('')"
        /> -->

        <completeSentence :sentences="que.sentences" />
        <h2>בנק מילים</h2>
        <div class="flex-items">
          <q-input label="הוסף מילק לבנק" v-model="newBankWordWord" />
          <q-btn @click="habdleConceptAdd(que.subjects)">+</q-btn>
        </div>
        <div>
          <completeSentence :sentences="que.bankWords" />
        </div>
      </div>

      <q-input
        label="תשובה נכונה"
        v-model="que.correctAnswer"
        v-if="que.type != 'dragDropTable'"
      />
    </div>
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

<style scoped>
.flex-items {
  display: flex;
  gap: 10px;
}
.prac-item {
  border: 1px solid rgba(128, 128, 128, 0.439);
  border-radius: 10px;
  padding: 2em;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
