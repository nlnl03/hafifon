<template>
  <form class="exam-box">
    <div class="exam" v-for="(item, index) in exam.parts" :key="index">
      <div>{{ item.Title }}</div>
      <div
        class="question"
        v-for="(que, queIndex) in item.questions"
        :key="queIndex"
        :ref="`inputRef_${currentIndexCheck(index, queIndex)}`"
      >
        <div class="que-text">
          <div class="part-text">{{ currentIndexCheck(index, queIndex) }}</div>

          {{ que.label }}
        </div>
        <div class="open-que">
          <textarea
            id=""
            cols="30"
            rows="10"
            placeholder="הכנס תשובה"
            @input="clickHandler($event, index, queIndex)"
            v-model="que.value"
          >
          </textarea>
        </div>
      </div>
    </div>
  </form>

  <div class="send">
    <p class="show-red-Warn" v-if="showRedWarn">
      * אנא בדוק שענית על כל השאלות
    </p>
    <button class="submit-btn" @click="sendData">סיים</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    exam: Object,
    questions: Array,
    boolIfEmpty: Array,
    totalQue: Number,
    examId: Number,
  },

  data() {
    return {
      showRedWarn: false,
      isUserDataEmpty: true,
      realIndex: 0,
      token: null,
    };
  },
  methods: {
    clickHandler(event, index, queIndex) {
      const currentIndex = this.currentIndexCheck(index, queIndex);
      this.showRedWarn = false;
      const pressedAnswer = event.target.value;
      console.log(currentIndex);

      if (pressedAnswer.trim()) {
        this.isUserDataEmpty = false;
        this.boolIfEmpty[currentIndex - 1] = this.isUserDataEmpty;
        console.log(this.boolIfEmpty);
      } else {
        this.boolIfEmpty[currentIndex - 1] = true;
        console.log(this.boolIfEmpty);
        console.log("is empty");
        // event.target.classList.add("text-aria-placeholder")
      }
    },
    currentIndexCheck(partIndex, queIndex) {
      return (
        (partIndex * this.totalQue) / this.exam.parts.length + queIndex + 1
      );
    },

    submit() {
      var allowed = true;
      this.boolIfEmpty.forEach((bool) => {
        if (bool != false) {
          allowed = false;
        }
      });
      console.log(allowed);

      if (allowed == true) {
        this.showRedWarn = false;
        this.subRouterIsShow = true;
      } else {
        this.showRedWarn = true;
      }
    },

    async sendData() {
      console.log(this.exam);
      this.submit();
      for (let i = 0; i < this.boolIfEmpty.length; i++) {
        // console.log(this.$refs[`inputRef_${i}`]);
        console.log(i);
        var value = this.$refs[`inputRef_${i + 1}`];

        if (this.boolIfEmpty[i] == true) {
          value.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          value.classList.add("text-aria-placeholder");
          return alert(`אנא הכנס תשובה בשאלה ${i + 1}`);
        }
      }
      if (this.subRouterIsShow == true) {
        this.showAlertConfirmBeforeSend();
      }
    },

    showAlertConfirmBeforeSend() {
      console.log("exam:", this.exam);
      this.$swal({
        title: "האם אתה בטוח שברצונך להגיש מבחן זו ?",
        text: "אם תגיש לא תוכל/י לחזור עליו...",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--main-background-color)",
        confirmButtonText: "כן, הגש מבחן",
        cancelButtonText: "ביטול",
        customClass: {
          popup: "submit-swal",
        },
      }).then((result) => {
        if (result.value) {
          if (this.postExams()) {
            this.showExitAlertFunc();
            this.$swal({
              title: "נשלח בהצלחה",
              icon: "success",
              confirmButtonColor: "var(--main-background-color)",
              confirmButtonText: "סיים",
            });
            console.log(this.showExitAlert);
            this.$router.push({
              name: "submitted",
              params: { Title: this.$route.params.Title },
            });
            // this.deletePer();
          } else {
            this.$swal("Not Send", "אירעה שגיעה", "not succeeded");
          }
          console.log(this.$route);
        }
      });
    },
    showExitAlertFunc() {
      this.showExitAlert = false;
      this.$emit("updatedExitAlertShow", this.showExitAlert);
    },

    async postExams() {
      console.log(this.$route.params.Title);
      var res = null;
      var userId = JSON.parse(localStorage.getItem("userId"));

      if (this.$isSharePointUrl) {
        this.token = await this.$asyncGetToken();
        res = await axios.post(
          this.$sharePointUrl + "getByTitle('submittedExams')/Items",
          {
            Title: this.exam.Title,
            test: JSON.stringify(this.exam),
            userId: userId,
            examId: this.examId,
            status: "pending",
          },

          {
            headers: {
              "X-RequestDigest": this.token,
            },
          }
        );
      } else {
        console.log(this.$route.params);
        res = await axios.post(this.$sharePointUrl + "submittedExams", {
          value: [
            {
              Title: this.exam.Title,
              test: JSON.stringify(this.exam),
              userId: userId,
              examId: this.examId,
              status: "pending",
            },
          ],
        });
      }
      if (res.status >= 200 && res.status < 300) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.title-timer {
  top: 50px;
  display: flex;
  width: 90%;
  position: relative;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 20px;
}
.title {
  /* top:30px; */
  font-size: 45px;
  font-weight: 700;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  /* width: 200px; */
}
.timer {
  position: relative;
  left: 80%;
  transform: translateX(-80%);
  font-size: 25px;
}
.exam {
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 75%;
  min-height: 400px;
  margin-top: 80px;
  border-top: 1.5px solid rgba(0, 0, 0, 0.1);
}
.exam:first-child {
  border-top: none;
  margin-top: 85px;
}
.part-text {
  font-size: 32px;
  position: relative;
  font-weight: 700;
  top: 30px;
  right: 50px;
}
.regular-que {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  width: 80%;
}
.question {
  position: relative;
  margin: 1em 0;
  min-height: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  font-weight: 700;
}
.que-text {
  width: 90%;
  font-size: 25px;
}
.open-que {
  position: relative;
  display: flex;
  top: 20px;
  width: 80%;
  align-items: center;
  justify-content: center;
}
.send {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 80px;
  bottom: 60px;
  align-items: center;
}
.show-red-Warn {
  position: relative;
  color: red;
  margin-bottom: 5px;
}

.submit-btn {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-decoration: none;
  color: #fff;
  width: 120px;
  border: 1px solid var(--main-background-color);
  border-radius: 15px;
  font-size: 18px;
  cursor: pointer;
  background-color: var(--main-background-color);
}
</style>
