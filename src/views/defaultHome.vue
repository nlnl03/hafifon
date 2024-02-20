<template>
  <div class="gray-line"><img src="../assets/383.png" alt="" /></div>

  <div class="background-img">
    <div class="welcome" v-if="isLoad">
      <h4>ברוכים הבאים לאתר חפיפה</h4>
      <div class="name" style="margin-top: 5px">
        <h2>שלום {{ userName }}</h2>
      </div>
    </div>

    <div class="flex">
      <div class="flex-item" v-for="(pluga, index) in plugaBtns" :key="index">
        <div
          :style="{ 'background-color': pluga.color }"
          @mouseover="showDropdown = index"
          @mouseleave="showDropdown = null"
          class="item-container"
        >
          <span class="item">
            {{ pluga.label }}
          </span>

          <div class="dropdown-menu" v-if="showDropdown === index">
            <ul>
              <li
                class="mahlaka-item"
                v-for="mahlaka in pluga.mahlakot"
                :key="mahlaka"
                @click="btnClick(mahlaka, pluga.color)"
              >
                {{ mahlaka }}
              </li>
            </ul>
          </div>
        </div>
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
      token2: null,
      isLoad: false,
      showDropdown: null,
      plugaBtns: [
        {
          label: "אגם",
          color: "rgb(253 207 71)",
          mahlakot: [],
        },
        {
          label: "הפתק",
          color: "rgb(145 198 83)",
          mahlakot: [""],
        },
        {
          label: "ת. מטכל",
          color: "rgba(231, 77, 77, 0.979)",
          mahlakot: [""],
        },
        {
          label: "שוב",
          color: "#4EADAF",
          mahlakot: ["pc", "vc", "system", "vip"],
        },
      ],
    };
  },
  methods: {
    btnClick(mahlaka, bgColor) {
      localStorage.setItem("bgColor", bgColor);

      document.documentElement.style.setProperty(
        "--main-background-color",
        bgColor
      );
      this.$store.dispatch("selectItem", mahlaka);
      this.$router.push({ name: "User" });
    },

    async getCurrentUser() {
      if (this.$isSharePointUrl) {
        this.token = this.$asyncGetToken();
        console.log(this.token);
      }
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
                finalTest: null,
              },
              {
                headers: {
                  "X-RequestDigest": this.token,
                },
              }
            );
          } catch (error) {
            console.log(error.message);
          }
        }
      }
      this.isLoad = true;
      console.log(this.isLoad);
    },
  },

  beforeMount() {
    this.getCurrentUser();
  },
  created() {
    const storedColor = localStorage.getItem("bgColor");
    if (storedColor) {
      document.documentElement.style.setProperty(
        "--main-background-color",
        storedColor
      );
    }
  },
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

.flex-item {
  margin: 1.8em;
  margin-top: 0;
}
.item-container {
  position: relative;
  width: 160px;
  height: 90px;
  font-size: 27px;
  color: #fff;
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown-menu {
  position: absolute;
  border-radius: 10px;
  top: 100%;
  right: 50;
  background-color: #fff;
  color: black;
  border: 1px solid #ccc;
  padding: 5px;
  display: none;
  width: 85%;
  margin-bottom: 20px;
  animation: growOut 200ms ease-in-out forwards;
  transform-origin: top center;
}
@keyframes growOut {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.item-container:hover .dropdown-menu {
  display: block;
}
.mahlaka-item {
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  padding: 0.5em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
li:hover {
  background: #f0f0f0;
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
  width: 190px;
  height: 110px;
  border: none;
  border-radius: 20px;
  font-size: 27px;
  cursor: pointer;
  color: white;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.welcome {
  top: 70px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ploga-btns:hover {
  opacity: 0.8;
}
</style>
