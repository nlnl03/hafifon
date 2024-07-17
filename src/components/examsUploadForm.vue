<template>
  <div class="main">
    <q-form @submit.prevent="submitForm" class="main-form">
      <div class="title">העלאת בחנים ומבחנים</div>

      <!-- //שם מבחן -->
      <q-input
        filled
        v-model.trim="exam.Title"
        label="שם"
        maxlength="20"
        required
        lazy-rules
        :rules="[
          (val) => {
            return (val && val.length > 0) || 'אנא בחר שם לבוחן\מבחן';
          },
        ]"
      />

      <!-- //(route name)סוג מבחן -->
      <q-input
        filled
        v-model="examType"
        label="סוג (באנגלית,יופיע בכתובת העמוד)"
        maxlength="20"
        required
        ref="examTypeInput"
        lazy-rules
        :rules="titleRules"
      />

      <!-- //(route name)סוג מבחן -->
      <q-input
        filled
        v-model="calcTime"
        type="number"
        label="בחר זמן (בדקות)"
        required
        style="margin-bottom: 20px"
      />

      <!-- //מס חלקים -->
      <q-input
        filled
        type="number"
        v-model="partCount"
        label="מס' החלקים"
        required
        @keyup="createParts"
        :min="1"
        :max="5"
        ref="partCountInput"
      />

      <!-- //החלקים עצמם -->
      <div
        class="parts"
        v-for="(part, partIndex) in exam.parts"
        :key="partIndex"
      >
        <div class="part-item">
          <span>חלק {{ partIndex + 1 }}</span>

          <!-- //שם החלק -->
          <q-input
            filled
            v-model.trim="part.Title"
            label="בחר שם לחלק"
            lazy-rules
            required
            :rules="[
              (val) => {
                (val && val.trim().length > 0) || 'אנא בחר\י כותרת לחלק';
              },
            ]"
          />

          <div
            v-for="(question, questionIndex) in part.questions"
            :key="questionIndex"
          >
            <!-- //העלאת שאלה -->
            <q-input
              filled
              v-model.trim="part.questions[questionIndex]['label']"
              :label="`שאלה ${questionIndex + 1}`"
              lazy-rules
              required
              :rules="[
                (val) => {
                  (val && val.trim().length > 0) || 'אנא הכנס\י שאלה';
                },
              ]"
            />
          </div>
        </div>

        <!-- //הוספת שאלות -->
        <div class="add-que-div">
          <q-btn
            color="primary"
            @click="addQuestions(partIndex)"
            class="add-que"
          >
            <q-icon name="fas fa-plus-circle" />
          </q-btn>
        </div>
      </div>

      <!-- //העלאה -->
      <div class="submit-btn">
        <q-btn type="submit" color="primary" label="העלאה" />
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      exam: {
        Title: "",
        type: "",
        time: "",
        parts: [],
        mahlaka: null,
      },
      partCount: null,
      examTime: null,
      englishPattern: /^[a-zA-Z\s]*$/,
    };
  },

  methods: {
    createParts() {
      this.exam.parts = [];
      for (var i = 0; i < this.partCount; i++) {
        this.exam.parts.push({
          questions: [{ label: "", value: "" }],
        });
      }
      console.log(this.exam);
    },

    submitForm() {
      console.log("parts", this.exam.parts);
      console.log("exam", this.exam);
      var mahlakaId = JSON.parse(localStorage.getItem("mahlakaId"));
      console.log(mahlakaId);
      this.exam.mahlaka = mahlakaId;

      this.$swal.fire({
        title: "האם את/ה בטוח/ה שברצונך להעלות מבדק זה ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "אישור",
        confirmButtonColor: "var(--main-background-color)",
        cancelButtonText: "ביטול",
        showLoaderOnConfirm: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.postExam();
        }
      });
    },

    async postExam() {
      const stringifiedData = JSON.stringify(this.exam.parts);
      console.log(stringifiedData);

      const data = {
        Title: this.exam.Title,
        type: this.exam.type,
        time: this.exam.time,
        mahlakaId: this.exam.mahlaka,
        parts: stringifiedData,
      };
      console.log(data);

      const url = this.$sharePointUrl + "getByTitle('testsAndExams')/items";
      try {
        const res = await axios.post(url, data, {
          headers: {
            "X-RequestDigest": await this.$asyncGetToken(),
          },
        });

        const testsNames = await JSON.parse(localStorage.getItem("testsNames"));
        console.log(testsNames);
        testsNames.push({
          Title: this.exam.type,
          subject: this.exam.Title,
        });
        console.log(testsNames);

        const dataUpdatedStringified = JSON.stringify(testsNames);
        const res2 = await axios.post(
          this.$sharePointUrl +
            `getByTitle('mahlakot')/items(${this.exam.mahlaka})`,
          {
            __metadata: { type: "SP.Data.MahlakotListItem" },
            testsNames: dataUpdatedStringified,
          },
          {
            headers: {
              "X-HTTP-Method": "MERGE",
              "IF-MATCH": "*",
              "X-RequestDigest": await this.$asyncGetToken(),
              Accept: "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
            },
          }
        );

        localStorage.setItem("testsNames", dataUpdatedStringified);
        console.log("yesss");
        console.log("the exam uploaded successfully");
        this.$swal.fire({
          title: "המבדק הועלה בהצלחה",
          icon: "success",
          confirmButtonText: "סיים",
        });
      } catch (error) {
        console.log("error uploading exam :", error);
        this.$swal.fire({
          icon: "error",
          text: "קרתה שגיאה בהעלאת המבדק",
        });
      }
    },

    addQuestions(partIndex) {
      this.exam.parts[partIndex].questions.push({ label: "", value: "" });
    },

    toCamelCase(str) {
      return str
        .replace(/(?:^\w[A-Z]|\b\w)/g, (letter, index) => {
          return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        })
        .replace(/\s+/g, "");
    },
  },

  mounted() {
    const examTypeInput = this.$refs.examTypeInput.$el.querySelector("input");
    examTypeInput.addEventListener("input", () => {
      const cleanedType = this.exam.type.replace(/[^a-zA-Z\s]/g, "");
      if (cleanedType !== this.exam.type) {
        this.exam.type = cleanedType;
        alert("שדה זה ניתן למילוי באנגלית בלבד !");
      }
    });

    const partCountInput = this.$refs.partCountInput.$el.querySelector("input");

    partCountInput.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        console.log("using arrows");
        this.createParts();
      }
    });
  },

  computed: {
    examType: {
      get() {
        return this.exam.type;
      },
      set(value) {
        this.exam.type = this.toCamelCase(value);
      },
    },

    calcTime: {
      get() {
        return this.exam.time;
      },
      set(value) {
        this.exam.time = value * 60;
      },
    },

    titleRules() {
      return [
        (val) => {
          console.log("type", val);
          const trimmedVal = val.trim();
          console.log("type trimmed", trimmedVal);
          return (trimmedVal && trimmedVal.length > 0) || "אנא בחר סוג";
        },
      ];
    },
  },
};
</script>

<style scoped>
.submit-btn {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  top: 50px;
  margin-bottom: 70px;
}
.main-form {
  width: 65%;
  display: flex;
  flex-direction: column;
}
.title {
  text-align: center;
  font-size: 2.125rem;
  color: rgba(128, 128, 128, 0.764);
  font-weight: 600;
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>
