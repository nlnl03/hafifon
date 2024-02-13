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
        required: true
      },
      routeName: String
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
        routeName: this.routeName,
        urlForId:
          "https://portal.army.idf/sites/hafifon383/_api/web/sitegroups/getbyname('מבקרי חפיפון')/id",
        groupId: null,
        token: null,
        PermListId: null
      };
    },

    mounted() {
      this.startTimer();
    },
    methods: {
      getToken() {
        return axios
          .post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
          .then((res) => res.data.FormDigestValue);
      },
      startTimer() {
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      },
      updateTimer() {
        console.log(this.timeRemaining);
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
          this.timerEnded();
        }
      },
      timerEnded() {
        localStorage.setItem("prevExit", false);
        console.log("time is end");
        this.deletePer()
          .then((success) => {
            if (success) {
              this.$swal({
                title: "נגמר הזמן...",
                text:
                  "שים לב שנגמר לך הזמן. המבחן יוגש עם כל מה שפתרת עד עכשיו !",
                icon: "warning",
                confirmButtonColor: "var(--main-shob-color)",
                confirmButtonText: "OK"
              }).then((res) => {
                this.$router.push({
                  name: "submitted",
                  params: { Title: this.routeName }
                });
              });
            } else {
              this.$swal({
                title: "שגיאה!",
                text:
                  "נגמר לך הזמן, אך קרתה שגיאה בשליחת המבחן. אנא פנה לאחראי",
                icon: "error",
                confirmButtonColor: "var(--main-shob-color)",
                confirmButtonText: "OK"
              });
            }
          })
          .catch((error) => {
            console.error(error);
            this.$swal({
              title: "אין רשת!",
              text:
                "שים לב שנגמר לך הזמן, אך משום שאין רשת המבחן לא הוגש. אנא פנה לאחראי...",
              icon: "error",
              confirmButtonColor: "var(--main-shob-color)",
              confirmButtonText: "OK"
            });
          });
      },

      addZeroBefore(value) {
        return value < 10 ? `0${value}` : value;
      },
      getIdOfgroup() {
        return axios.get(this.urlForId).then((res) => res.data.value);
      },

      async deletePer() {
        this.token = await this.getToken();
        this.groupId = await this.getIdOfgroup();
        console.log(this.groupId);
        try {
          const res = await axios.post(
            this.$sharePointUrl +
              `getByTitle('${
                this.routeName
              }')/roleassignments/getbyprincipalid('${this.groupId}')`,
            {
              __metadata: { type: "SP.Data.IsPermissionActiveListItem" }
            },
            {
              headers: {
                "X-HTTP-Method": "DELETE",
                "IF-MATCH": "*",
                "X-RequestDigest": this.token,
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
              }
            }
          );
          console.log(res.status);
          if (res.status >= 200 && res.status < 300) {
            const updatePermList = await this.updatePerm();
            console.log("success deletePer");
            return true;
          } else {
            console.log("no success deletePer");
            return false;
          }
        } catch (error) {
          console.log("no success deletePer, catch");
          return false;
        }
      },
      getPermListId() {
        return axios
          .get(
            this.$sharePointUrl +
              `getByTitle('isPermissionActive')/items?$filter=type eq '${
                this.routeName
              }'`
          )
          .then((res) => res.data.value[0].ID);
      },

      async updatePerm() {
        this.PermListId = await this.getPermListId();
        try {
          const res = await axios.post(
            this.$sharePointUrl +
              `getByTitle('isPermissionActive')/Items('${this.PermListId}')`,
            {
              __metadata: { type: "SP.Data.IsPermissionActiveListItem" },
              isAllow: false
            },
            {
              headers: {
                "X-HTTP-Method": "MERGE",
                "IF-MATCH": "*",
                "X-RequestDigest": this.token,
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
              }
            }
          );
          if (res.status >= 200 && res.status < 300) {
            console.log("success updatePerm");
            return true;
          } else {
            console.log("no success updatePerm");
            return false;
          }
        } catch (error) {
          console.log("no success updatePerm, catch");
          return false;
        }
      }
    },

    beforeUnmount() {
      clearInterval(this.timer);
    }
  };
</script>

<style scoped></style>
