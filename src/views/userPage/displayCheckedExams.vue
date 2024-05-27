<template>
  <div class="exam" v-if="exam">
    <div
      class="exam-checked"
      v-for="(item, index) in exam.test.parts"
      :key="index"
    >
      <h3>{{ item.Title }}</h3>
      <div
        class="exam-item"
        v-for="(question, queIndex) in item.questions"
        :key="queIndex"
      >
        <div class="que-index">{{ queIndex + 1 }}</div>

        <div class="regular-que">
          <div class="que-points">
            <div class="que-title">
              {{ question.label }}
            </div>

            <div class="points" v-if="!question.updatedQueScore">
              {{ question.queScore }}/{{ item.points }}
            </div>
            <div class="points" v-if="question.updatedQueScore">
              {{ question.updatedQueScore }}/{{ item.points }}
            </div>
          </div>

          <p>התשובה שענ\תה:</p>
          <div class="ans">
            {{ question.value }}
          </div>

          <p class="comments-title">הערות הבודק\ת:</p>
          <div
            class="comments"
            v-if="!question.updatedQueComments && question.comments"
          >
            {{ question.comments }}
          </div>
          <div class="comments" v-else-if="question.updatedQueComments">
            {{ question.updatedQueComments }}
          </div>
          <div v-else>אין הערות</div>
        </div>
      </div>
      <div class="under-line"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      checkedExam: [],
      examType: null,
      userId: null,
      fullcheckedExam: [],
    };
  },
  props: ["name"],
  mounted() {
    console.log(this.name);
  },
  methods: {
    async getdata() {
      var res = null;

      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('submittedExams')/Items?$filter=userId eq ${this.userId}&$select=${this.examType}`
        );
        this.checkedExam = res.data.value;
        this.parseData();
      } else {
        res = await axios.get(this.$sharePointUrl + `students`);
        var checkedExam = res.data.value[0];
        this.checkedExam[this.examType] = checkedExam[this.examType].filter(
          (item) => Object.keys(item) != "finalGrade"
        );
      }
      console.log(this.checkedExam);
      console.log(this.fullcheckedExam);
    },

    asyncParse(str) {
      return new Promise((resolve) => {
        resolve(JSON.parse(str));
      });
    },
    async parseData() {
      const promiseAnswers = Promise.all(
        this.exam.map((item) => {
          return this.$asyncParse(item.test).then((inner) => {
            item.test = inner;
            return { item };
          });
        })
      );
      this.checkedExam = this.checkedExam[0];
    },
    showTheGradeOutOf(val) {
      var outOfNum = 100 / this.checkedExam[this.examType].length;
      return (val = outOfNum.toFixed(1));
    },
  },

  beforeMount() {
    console.log(this.name);
    this.examType = this.$route.params.title;
    this.userId = localStorage.getItem("userId");
    // this.getdata();
  },

  computed: {
    ...mapGetters(["getExamByName"]),
    exam() {
      var value = this.getExamByName(this.name);

      if (this.$isSharePointUrl) {
        value["test"] = JSON.parse(value["test"]);
      }
      console.log(value);

      return value;
    },
  },
};
</script>

<style scoped>
.exam {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
.exam-checked {
  width: 75%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}
.exam-checked:last-child .under-line {
  border: none;
}
.exam-item {
  width: 80%;
}
.que-points {
  display: flex;
  width: 75%;
  justify-content: space-between;
  position: relative;
  margin-bottom: 50px;
}
.que {
  margin-bottom: 30px;
  margin-top: 20px;
  min-height: 80px;
  width: 60%;
  position: relative;
  padding: 1em 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 700;
}
.que-index {
  font-size: 28px;
  top: 85px;
  position: relative;
  font-weight: 700;
}
.que-title {
  margin-left: 20px;
}
.points {
  direction: ltr;
}
p {
  position: relative;
  font-size: 22px;
  font-weight: 700;
  border-bottom: 1px solid rgb(211, 210, 210);
  margin-bottom: 30px;
}
.ans {
  background: #bfbfbf94;
  min-width: 50%;
  min-height: 25px;
  border-radius: 10px;
  padding: 1em;
}
.comments {
  background: #bfbfbf94;
  width: 700px;
  min-height: 40px;
  border-radius: 10px;
  padding: 1.5em;
}
.comments-title {
  margin-top: 30px;
}
.under-line {
  border-bottom: 2px solid hsla(0, 0%, 74.9%, 0.5803921568627451);
  width: 60%;
  margin-bottom: 30px;
  margin-top: 50px;
}

.sub-que,
.regular-que {
  position: relative;
  margin-top: 1.5em;
  margin-bottom: 90px;
  min-height: 480px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  font-weight: 700;
}
</style>
