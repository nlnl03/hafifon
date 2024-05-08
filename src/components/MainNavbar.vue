<template>
  <div class="main-nav">
    <router-link class="home-title" :to="{ name: 'defaultHome' }">
      חפיפה
    </router-link>

    <q-btn label="האיזור האישי" @click="goToUserPage" class="user-title" />

    <!-- <router-link :to="{ name: 'User' }" class="user-title">
      לאיזור אישי
    </router-link> -->

    <div class="menu">
      <div class="nav-bar">
        <ul>
          <li v-if="checkIfHasTest">
            <div>
              <router-link
                to="/exams/finalTest/beforeStarting"
                class="final-test-btn"
              >
                המבחן הסופי
              </router-link>
            </div>
          </li>

          <li
            class="exams-drop-down"
            @mouseover="isOpen = true"
            @mouseleave="isOpen = false"
          >
            <button
              class="final-test-btn"
              @click="openAdminComp('mainAdminPage')"
            >
              ממשק מנהלים
            </button>
          </li>

          <li
            class="exams-drop-down"
            @mouseover="isExamsDropOpen = true"
            @mouseleave="isExamsDropOpen = false"
          >
            <span>בחנים</span>
            <ul
              class="drop-down-menu"
              v-if="isExamsDropOpen"
              :style="{ height: menuHeight + 'px' }"
            >
              <li v-for="name in examsName" :key="name" class="drop-down-list">
                <router-link
                  :to="`/exams/${name.Title}/beforeStarting`"
                  class="drop-down-items"
                >
                  {{ name.subject }}
                </router-link>
              </li>
            </ul>
          </li>

          <li>
            <div>
              <router-link :to="{ name: 'PracticesList' }"
                >חומרי לימוד</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MainNavbar",
  data() {
    return {
      isExamsDropOpen: false,
      isOpen: false,
      examsPerm: [],
      examsName: [],
      isAdmin: null,
      url:
        process.env.NODE_ENV == "development"
          ? `http://localhost:3000/testsNames/`
          : "https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('testsNames')/Items",
    };
  },
  methods: {
    async getNameOfExams() {
      this.examsName = await this.$parseTestsNames("testsNames");
      console.log(this.examsName);

      if (this.examsName.length > 0) {
        this.examsName = this.examsName.filter(
          (name) => name.subject !== "המבחן הסופי"
        );
        console.log(this.examsName);
      }
    },

    openAdminComp(nameOfRoute) {
      console.log(nameOfRoute);
      if (this.isAdmin) {
        this.$router.push({ name: nameOfRoute });
      } else {
        alert("מצטערים, אך אין לך גישה לעמוד זה...");
      }
    },

    async checkIfAdmin() {
      var url = null;
      if (this.$isSharePointUrl) {
        url = this.$sharePointUrl + "getByTitle('AdminCheck')/Items";
      } else {
        url = this.$sharePointUrl + "AdminCheck";
      }
      return axios
        .get(url)
        .then((res) => res.data.value)
        .then((results) => {
          if (results.length) {
            return JSON.parse(true);
          } else {
            return JSON.parse(false);
          }
        });
    },
    checkIfHasTest() {
      this.examsName.map((item) => {
        if (item.subject.includes("המבחן הסופי")) {
          return true;
        } else return false;
      });
    },
    goToUserPage() {
      this.$router.push({ name: "User" });
    },
  },

  async beforeMount() {
    //  await this.$isSharePointUrl
    this.getNameOfExams();
    this.isAdmin = await this.checkIfAdmin();
    sessionStorage.setItem("isAdmin", this.isAdmin);
    console.log("isAdmin: " + this.isAdmin);
  },
  computed: {
    menuHeight() {
      const listItem = 70;
      const totalListItemHeight = this.examsName.length * listItem;
      return totalListItemHeight;
    },
  },
};
</script>

<style scoped>
.title-logo {
  position: absolute;
  display: flex;
  height: 125px;
  align-items: center;
}
img {
  width: 382px;
  height: 70px;
}
.main-nav {
  height: 125px;
  width: 100%;
  background-color: var(--main-background-color);
}
/* .main-cover{
    width: 100%;
    height: 125px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
} */
.menu {
  width: 60%;
  height: 125px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.exams-drop-down {
  text-align: center;
  box-sizing: border-box;
}
.nav-bar {
  width: 600px;
  height: 100%;
  margin-right: 45px;
  margin-left: 45px;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 22px;
  color: #ffffff;
}
li {
  position: relative;
  height: 50%;
  margin: 0 1em;
  font-size: 23px;
  display: flex;
  align-items: center;
}

a {
  color: white;
  cursor: pointer;
  text-decoration: none;
  height: 125px;
}
/* a:hover, .exams-drop-down:hover,.final-test-btn:hover{
    font-weight: 600;
  } */

.home-title {
  font-weight: bold;
  position: absolute;
  font-size: 40px;
  top: 32px;
  height: 60px;
  left: var(--home-btn-position);
}

.user-title {
  /* width: 100px; */
  /* height: 45px;
  display: flex;
  justify-content: center; */
  align-items: center;
  position: absolute;
  right: var(--user-link-pos);
  top: 40px;
  /* z-index: 1; */
  text-decoration: none;
  font-size: 20px;
  padding: 0.2em 1em;
  color: #6c6b6b;
  border-radius: 25px;
  border: none;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  /* box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2); */
}

.drop-down-menu,
.admin-drop-down-menu {
  position: absolute;
  display: flex;
  z-index: 1000;
  top: 60px;
  width: 120px;
  max-height: 250px;
  right: -37px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  animation: growOut 280ms ease-in-out forwards;
  transform-origin: top center;
}

.drop-down-items,
.admin-routers {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  font-size: 20px;
}
button[class="final-test-btn"] {
  outline: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 23px;
  cursor: pointer;
}

button[class="drop-down-items"] {
  background: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.admin-drop-down-menu {
  height: 220px;
  width: 150px;
  right: -10%;
}
.admin-routers {
  padding: 0.5em;
  background: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.admin-routers:hover {
  background-color: #f3f3f3;
}
.drop-down-list,
.admin-drop-down-list {
  border-bottom: 1px solid #f3f3f3;
  width: 100%;
  min-height: 50px;
  position: relative;
  z-index: 10000;
}
.drop-down-list :hover {
  border-radius: 5px;
  background-color: #f3f3f3;
}
.admin-drop-down-list:hover {
  border-radius: 5px;
  background-color: #f3f3f3;
}
.drop-down-list:last-child {
  border-bottom: none;
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
</style>
