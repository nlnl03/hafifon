<template>
  <div v-if="!isLoad">00:00:00</div>
  <div v-if="isLoad">{{ fullTimer }}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "timer",
  props: {
    totalTime: {
      type: Number,
      required: true,
    },
    routeName: String,
    deletePer: Function,
  },
  data() {
    return {
      timer: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timeRemaining: this.totalTime,
      fullTimer: null,
      isLoad: false,
    };
  },

  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.updateTimer();
      }, 1000);
    },
    updateTimer() {
      // console.log(this.timeRemaining);
      if (this.timeRemaining > 0) {
        this.hours = Math.floor(this.timeRemaining / 3600);
        var x = this.timeRemaining % 3600;
        this.minutes = Math.floor(x / 60);
        this.seconds = Math.floor(x % 60);
        const formattedHours = this.addZeroBefore(this.hours);
        const formattedMinutes = this.addZeroBefore(this.minutes);
        const formattedSeconds = this.addZeroBefore(this.seconds);
        this.fullTimer = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        this.isLoad = true;
        this.timeRemaining--;
      } else {
        this.fullTimer = "00:00:00";
        clearInterval(this.timer);
        console.log("time over");
        // this.timerEnded();
      }
    },
    timerEnded() {
      localStorage.setItem("prevExit", false);
      console.log("time is end");
      this.deletePer()
        .then((success) => {
          if (success) {
            this.$swal.fire({
              title: "נגמר הזמן...",
              text: "שים לב שנגמר לך הזמן. המבחן יוגש עם כל מה שפתרת עד עכשיו !",
              icon: "warning",
              confirmButtonColor: "var(--main-background-color)",
              confirmButtonText: "OK",
            }).then((res) => {
              this.$router.push({
                name: "submitted",
                params: { Title: this.routeName },
              });
            });
          } else {
            this.$swal.fire({
              title: "שגיאה!",
              text: "נגמר לך הזמן, אך קרתה שגיאה בשליחת המבחן. אנא פנה לאחראי",
              icon: "error",
              confirmButtonColor: "var(--main-background-color)",
              confirmButtonText: "OK",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          this.$swal.fire({
            title: "אין רשת!",
            text: "שים לב שנגמר לך הזמן, אך משום שאין רשת המבחן לא הוגש. אנא פנה לאחראי...",
            icon: "error",
            confirmButtonColor: "var(--main-background-color)",
            confirmButtonText: "OK",
          });
        });
    },

    addZeroBefore(value) {
      return value < 10 ? `0${value}` : value;
    },
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped></style>
