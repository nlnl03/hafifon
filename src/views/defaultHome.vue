<template>
  <div class="gray-line"><img src="../assets/383.png" alt="" /></div>

  <div class="background-img">
    <div class="welcome" v-if="isLoad">
      <h4>ברוכים הבאים לאתר חפיפה</h4>
      <div class="name" style="margin-top:5px">
        <h2>שלום {{ userName }}</h2>
      </div>
    </div>
    <div class="flex">
      <div class="btns" v-for="pluga in plugaBtns" :key="pluga">
        <button @click="btnClick" class="ploga-btns" :style="{ 'background-color': pluga.color}">{{pluga.label}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        currentUserData: [],
        currentUser:
          process.env.NODE_ENV == "development"
            ? "http://localhost:3000/currentUser"
            : "https://portal.army.idf/sites/gdud0383/Team/_api/web/currentUser",
        Id: null,
        userName: null,
        userNum: null,
        token: null,
        isLoad: false,
        plugaBtns: [
          {
            label: "אגם",
            color: "rgb(253 207 71)",
            mahlakot:[""]
          },
          {    
            label: "הפתק",
            color: "rgb(145 198 83)",
            mahlakot:[""]
          },
          {
            label: "ת. מטכל",
            color: "rgba(231, 77, 77, 0.979)",
            mahlakot:[""]
          },
          {
            label: "שוב",
            color: "var(--main-shob-color)",
            mahlakot:["pc","vc","system","vip"]
          }
        ]
      };
    },
    methods: {
      btnClick() {
        this.$router.push({ name: "HomePage" });
      },

      async getCurrentUser() {
        this.token = this.$asyncGetToken();
        console.log(this.token);
        const res = await axios.get(this.currentUser);
        this.currentUserData = res.data;
        console.log(this.currentUserData);
        var userNum = this.currentUserData.LoginName.split("s");
        this.userNum = userNum[1];
        // console.log(this.userNum)
        this.Id = this.currentUserData.Id;
        // console.log(this.Id)
        var Title = this.currentUserData.Title;

        if (Title.includes(" -")) {
          Title = Title.split(" -");
          this.userName = Title[0];
          console.log(Title);
        } else {
          Title = Title.split("/");
          this.userName = Title[Title.length - 1];
        }

        localStorage.setItem("userName", this.userName);
        localStorage.setItem("userId", this.Id);
        localStorage.setItem("userNum", this.userNum);
        // console.log(this.Id)
        // console.log(this.currentUserData)

        await this.checkIfUser();
      },

      async checkIfUser() {
        console.log(this.Id);
        console.log(this.$isSharePointUrl);

        if (this.$isSharePointUrl) {
          const res = await axios.get(
            this.$sharePointUrl +
              `getByTitle('students')/items?$filter=num eq '${this.Id}'`
          );
          const resData = res.data.value;
          console.log(resData);
           console.log(this.token);
          if (!resData.length) {
            try {
              const results = await axios.post(
                this.$sharePointUrl + "getByTitle('students')/items",
                {
                  Title: this.userName,
                  num: this.Id,
                  exam1: null,
                  exam2: null,
                  exam3: null,
                  exam4: null,
                  finalTest: null
                },
                {
                  headers: {
                    "X-RequestDigest": this.token
                  }
                }
              );
            } catch (error) {
              console.log(error.message);
            }
          }
        }
        this.isLoad = true;
        console.log(this.isLoad);
      }
    },

    beforeMount() {
      this.getCurrentUser();
    }
  };
</script>

<style scoped>
  img {
    width: 143px;
    height: 202px;
    margin-top: 40px;
  }
  .image {
    text-align: center;
  }
  body {
    overflow: hidden;
  }

  .background-img {
    background-image: url("../assets/homePageBackground.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: calc(100vh - 180px);
    display: flex;
    flex-direction: column;
  }
  .gray-line {
    background: linear-gradient(to top, rgba(128, 128, 128, 0.244), #dddddd);
    /* background-color: rgba(128, 128, 128, 0.244); */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 180px;
    margin-top: 0;
    text-align: center;
  }
  .flex {
    width: 100%;
    justify-content: center;
    position: relative;
    top: 140px;
  }
  button {
    width: 190px;
    height: 110px;
    border: none;
    border-radius: 20px;
    font-size: 27px;
    cursor: pointer;
    color: white;
  }

  .text {
    width: 100%;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    position: relative;
    top: 110px;
  }

  .btns {
    margin: 1.8em;
    margin-top: 0;
   }
   .welcome {
    top: 70px;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ploga-btns:hover{
    opacity: 0.8;
  }
</style>
