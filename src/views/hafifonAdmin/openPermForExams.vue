<template>
  <div class="main">
    <div class="type-user-num">
      <q-input label="הקלד/י מס' אישי" dir="rtl" />
    </div>

    <div class="perm-table">
      <permTable @childEvent="handleChildEvent" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import permTable from "@/components/permissionTable.vue";
export default {
  components: {
    permTable,
  },
  data() {
    return {
      urlForId: "https://portal.army.idf/sites/hafifon383/_api/web/siteusers",
      userId: null,
      targetRoleDefId: null,
      token: null,
      currentPermission: [],
      Id: null,
      isload: false,
      maklakaId: null,
    };
  },
  methods: {
    async getToken() {
      return axios
        .post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
        .then((res) => res.data.FormDigestValue);
    },

    async getIdOfUser(userNum) {
      try {
        const res = await axios.get(
          this.urlForId + `?$filter=Email eq 's${userNum}@army.idf.il'`
        );
        const userData = res.data.value;

        if (userData.length > 0) {
          this.userId = userData[0].Id;
          console.log(this.userId);
        } else {
          throw new Error("user not found");
        }
      } catch (error) {
        throw new Error("error fetching user id" + error.message);
      }
    },

    async getTargetRoleDefenitionId() {
      const res = await axios.get(
        "https://portal.army.idf/sites/hafifon383/_api/web/roledefinitions/getbyname('שליטה מלאה')/id"
      );
      this.targetRoleDefId = res.data.value;
      console.log(this.targetRoleDefId);
    },

    async setNewPermForGroup(name) {
      var itemId = await this.getItemId(name);

      return axios.post(
        this.$sharePointUrl +
          `getByTitle('testsAndExams')/items(${itemId})/roleassignments/addroleassignment(principalid=${this.userId} ,roledefid='${this.targetRoleDefId}')`,
        {},

        {
          headers: {
            "X-RequestDigest": this.token,
          },
        }
      );
    },
    async getItemId(name) {
      this.maklakaId = JSON.parse(localStorage.getItem("maklakaId"));
      console.log(maklakaId);
      return axios
        .get(
          this.$sharePointUrl +
            `getByTitle('testsAndExams')/item?$filter=(mahlaka eq ${this.maklakaId}) and (type eq ${name})`
        )
        .then((result) => result.data.value[0].Id);
    },

    handleChildEvent(col, row, index) {
      this.$swal({
        title: "האם את\ה בטוח\ה שברצונך לעדכן הרשאות אלו ? ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "כן",
        confirmButtonColor: "var(--main-background-color)",
        cancelButtonText: "ביטול",
      }).then((res) => {
        if (res.isConfirmed) {
          this.openPerm(col, row, index);
        } else {
          row[col.name] = !row[col.name];
        }
      });
    },

    async openPerm(col, row, index) {
      console.log(row);
      if (this.$isSharePointUrl) {
        await this.getIdOfUser(row.userNum);
        await this.getTargetRoleDefenitionId();
        this.token = await this.getToken();
        await this.getPermListId(row.userNum);
      }

      if (row[col.name]) {
        console.log("open per");
        this.setNewPermForGroup(col.name);
        this.updatePerm(col.name, row[col.name]);
      } else {
        console.log("delete per");
        this.updatePerm(col.name, row[col.name]);
        this.deletePer(col.name);
      }
    },

    async checkTheCurrentPerm() {
      var res = null;
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl + "getByTitle('isPermissionActive')/items"
        );
      } else {
        res = await axios.get(this.$sharePointUrl + "isPermissionActive");
      }
      this.currentPermission = res.data.value;
    },
    async updatePerm(name, per) {
      const res = await axios.post(
        this.$sharePointUrl +
          `getByTitle('isPermissionActive')/Items('${this.Id}')`,
        {
          __metadata: { type: "SP.Data.IsPermissionActiveListItem" },
          [name]: per,
        },
        {
          headers: {
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*",
            "X-RequestDigest": this.token,
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
          },
        }
      );
    },

    async deletePer(per) {
      var itemId = await this.getItemId(per);
      const res = await axios.post(
        this.$sharePointUrl +
          `getByTitle('testsAndExams')/items(${itemId})roleassignments/getbyprincipalid('${this.userId}')`,
        {
          __metadata: { type: "SP.Data.testsAndExamsListItem" },
        },
        {
          headers: {
            "X-HTTP-Method": "DELETE",
            "IF-MATCH": "*",
            "X-RequestDigest": this.token,
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
          },
        }
      );
    },

    async getPermListId(userNum) {
      const res = await axios.get(
        this.$sharePointUrl +
          `getByTitle('isPermissionActive')/items?$filter=userNum eq '${userNum}'`
      );
      this.Id = res.data.value[0].ID;
      console.log(this.Id);
    },
  },

  async beforeMount() {
    // if(this.$isSharePointUrl){
    //     await this.getIdOfUser()
    //     this.getTargetRoleDefenitionId()
    //     this.token = await this.getToken()
    // }
    // this.checkTheCurrentPerm()
    // this.isload = true
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  margin-top: 50px;
  box-sizing: border-box !important;
}
.perm-flex {
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  width: var(--permission-box-width);
  height: 700px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.212);
  border-radius: 20px;
}
.title {
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  top: 55px;
  position: absolute;
  width: 100%;
}
.permission {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 200px;
  max-height: 480px;
  overflow-y: auto;
  width: 60%;
  flex-wrap: wrap;
}
.permisson-items {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cccccc9c;
  margin-bottom: 35px;
  margin-right: 40px;
  border-radius: 20px;
  height: 90px;
}
.permission-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70%;
  width: 80%;
}

.permisson-items:last-child {
  margin-left: 0;
}
.permission-title {
  margin-left: 10px;
  font-size: 25px;
  font-weight: 700;
  color: #575658;
}
.toggle {
  background-color: #fff;
  border: none;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  appearance: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 3px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6d6c71;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider::before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  top: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: var(--main-background-color);
}
input:focus + .slider {
  box-shadow: 0 0 1px var(--main-background-color);
}
input:checked + .slider::before {
  /* -webkit-transform:translateX(26px);
    -ms-transform:translateX(26px);
    transform:translateX(26px); */
  right: 7%;
}
.slider.round {
  border-radius: 34px;
}
.slider.round::before {
  border-radius: 34px;
}

.type-user-num {
  height: 70px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}
.perm-table {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
