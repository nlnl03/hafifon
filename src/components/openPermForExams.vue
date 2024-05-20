<template>
  <div class="perm-table">
    <permTable @childEvent="handleChildEvent" />
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
      targetRoleDefId: null,
      token: null,
      currentPermission: [],
      Id: null,
      isload: false,
      mahlakaId: null,
      userId: null,
    };
  },
  methods: {
    async getTargetRoleDefenitionId() {
      const res = await axios.get(
        "https://portal.army.idf/sites/hafifon383/_api/web/roledefinitions/getbyname('שליטה מלאה')/id"
      );
      this.targetRoleDefId = res.data.value;
      console.log(this.targetRoleDefId);
    },

    async setNewPermForGroup(itemId, studentId) {
      console.log("yessss");

      const res = axios.post(
        this.$sharePointUrl +
          `getByTitle('testsAndExams')/items(${itemId})/roleassignments/addroleassignment(principalid=${studentId} ,roledefid='${this.targetRoleDefId}')`,
        {},

        {
          headers: {
            "X-RequestDigest": this.token,
          },
        }
      );
    },
    async getItemId(examTitle) {
      this.mahlakaId = JSON.parse(localStorage.getItem("mahlakaId"));
      console.log(this.mahlakaId);
      return axios
        .get(
          this.$sharePointUrl +
            `getByTitle('testsAndExams')/items?$filter=(mahlaka eq ${this.mahlakaId}) and (type eq '${examTitle}')`
        )
        .then((result) => result.data.value[0].Id);
    },

    handleChildEvent(row, examTitle, studentId) {
      const newVal = row.permissions;
      console.log(newVal);

      this.$swal({
        title: "האם את\ה בטוח\ה שברצונך לעדכן הרשאות אלו ? ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "כן",
        confirmButtonColor: "var(--main-background-color)",
        cancelButtonText: "ביטול",
      }).then((res) => {
        if (res.isConfirmed) {
          this.openPerm(row, examTitle, studentId);
        } else {
          console.log(row);
          console.log(examTitle);
          console.log("no");

          row.permissions[examTitle] = !newVal[examTitle];
          console.log(row.permissions[examTitle]);
        }
      });
    },
    async getUserId(studentId) {
      const idRes = await axios.get(
        this.$sharePointUrl +
          `getByTitle('students')/Items?$filter=num eq ${studentId}`
      );
      this.userId = idRes.data.value[0].Id;
      console.log(this.userId);
    },

    async openPerm(row, examTitle, studentId) {
      console.log("ty");
      var itemId = await this.getItemId(examTitle);
      console.log(row.permissions[examTitle]);
      await this.getUserId(studentId);

      if (row.permissions[examTitle]) {
        await this.setNewPermForGroup(itemId, studentId);
        console.log("added permission");
      } else {
        await this.deletePer(examTitle, studentId);
        console.log("delete the permission");
      }
      this.updatePerm(row);
    },

    async updatePerm(row) {
      console.log(row.permissions);

      const dataStringified = JSON.stringify(row.permissions);
      const res = await axios.post(
        this.$sharePointUrl + `getByTitle('students')/Items(${this.userId})`,
        {
          __metadata: { type: "SP.Data.StudentsListItem" },
          permissions: dataStringified,
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

    async deletePer(examTitle, studentId) {
      var itemId = await this.getItemId(examTitle);
      const res = await axios.post(
        this.$sharePointUrl +
          `getByTitle('testsAndExams')/items(${itemId})/roleassignments/getbyprincipalid(${studentId})`,
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
  },

  async beforeMount() {
    if (this.$isSharePointUrl) {
      this.token = await this.$asyncGetToken();
      this.getTargetRoleDefenitionId();
    }
    this.isload = true;
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
