<template>
  <div v-if="isLoad">
    <q-table
      :sticky-header="true"
      :rows="students"
      flat
      :columns="tableColumns"
      row-key="num"
    >
      <template v-slot:top-left>
        <!-- <q-input
          borderless
          dense
          debounce="300"
          v-model="dfdf"
          placeholder="חפש"
        >
          <template v-slot:append>
            <q-icon name="fas fa-search" />
          </template>
        </q-input> -->
      </template>

      <template v-slot:body-cell-name="props">
        {{ props.row.name }}
      </template>

      <template
        v-for="(exam, index) in exams"
        :key="index"
        v-slot:[`body-cell-${exam.Title}`]="props"
      >
        <q-td :props="props">
          <q-toggle
            v-model="props.row.permissions[exam.Title]"
            @click="changePerm(props.row, exam.Title)"
            color="var(--main-background-color)"
            ref="isChecked"
          />
        </q-td>
      </template>
    </q-table>
    <q-btn @click="openDialog" label="הוסף נחפף" color="primary" size="15px">
      <q-icon class="q-icon fas fa-plus-circle" style="margin-right: 10px" />
    </q-btn>
  </div>
  
  
</template>

<script>
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { QPage, QBtn } from "quasar";
import { Quasar } from "quasar";
import quasarUserOptions from "../quasar-user-options";
import addNewUserForm from "@/components/addNewUserForm.vue";
import Vue from "vue";
import axios from "axios";
import { createApp, h } from "vue";
export default defineComponent({
  name: "permTable",
  components: {
    QPage,
    QBtn,
  },
  data() {
    return {
      urlForId: "https://portal.army.idf/sites/hafifon383/_api/web/siteusers/",
      columns: [],
      updatedNameColumns: [],
      students: [],
      textToFilter: "",
      isLoad: false,
      exams: [],
      addStudentDialog: false,
      newStudent: null,
      token: null,
      userId: null,
      permStruc: null,
    };
  },
  async beforeMount() {
    this.exams = await this.$parseTestsNames("testsNames");
    console.log(this.exams);

    this.isLoad = true;
    this.newStudent = {
      Title: "",
      userNum: "",
      num: null,
      mahlaka: localStorage.getItem("mahlaka"),
      permissions: Object.fromEntries(
        this.exams.map((exam) => [exam.Title, false])
      ),
    };
    this.getStudents();
    this.token = await this.$asyncGetToken();
  },
  methods: {
    async getStudents() {
      var res = null;
      var mahlaka = localStorage.getItem("mahlaka");
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('students')/Items?$filter=mahlaka eq '${mahlaka}'`
        );
        this.students = res.data.value;

        const parsedPerm = await Promise.all(
          this.students.map((item) => {
            return this.$asyncParse(item.permissions).then((inner) => {
              item.permissions = inner;
              return { item };
            });
          })
        );
      } else {
        res = await axios.get(this.$sharePointUrl + "students");
        this.students = res.data.value.filter(
          (item) => item.mahlaka == mahlaka
        );
      }
      console.log(this.students);
    },

    openDialog() {
      // this.addStudentDialog = true;
      this.$swal({
        title: "מלא/ה את הפרטים:",
        html: `
        <div id="input-wrapper" class="form-container"></div>`,

        showCancelButton: true,
        confirmButtonText: "אישור",
        cancelButtonText: "ביטול",
        confirmButtonColor: "var(--main-background-color)",
        customClass: {
          container: "swal2-custom-container",
        },
        didOpen: () => {
          const formContainer = document.getElementById("input-wrapper");
          const app = createApp({
            render: () =>
              h(addNewUserForm, {
                onSubmit: this.handleSubmit,
              }),
          });
          app.use(Quasar, quasarUserOptions, { config: { dark: false } });
          app.mount(formContainer);
        },
      });
    },
    handleSubmit({ inputUserNum, inputName }) {
      console.log("success", inputUserNum, inputName);
      this.$swal.close();
    },
    closeDialog() {
      this.addStudentDialog = false;
    },
    resetNewStudent() {
      this.newStudent = {
        Title: "",
        userNum: "",
        mahlaka: "",
        num: null,
      };
    },
    changePerm(row, examTitle) {
      console.log(row);
      const studentId = row.num;
      console.log(studentId);
      this.$emit("childEvent", row, examTitle, studentId);
      console.log(row);
      console.log(examTitle);
    },

    async addNewStudent() {
      console.log(this.newStudent.userNum);
      try {
        if (this.$isSharePointUrl) {
          const userRes = await axios.get(
            this.urlForId +
              `getByEmail('s${this.newStudent.userNum}@army.idf.il')`
          );
          const data = userRes.data;
          this.userId = data.Id;
          console.log(this.userId);
          this.newStudent.num = this.userId;
          this.newStudent.permissions = JSON.stringify(
            this.newStudent.permissions
          );
          console.log(this.newStudent);

          const res = await axios.post(
            this.$sharePointUrl + "getByTitle('students')/Items",
            this.newStudent,
            {
              headers: {
                "X-RequestDigest": this.token,
              },
            }
          );
          if (res.status === 201) {
            this.students.push(res.data);
          }
        } else {
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  computed: {
    rowsFiltered() {
      return this.students.filter(
        (row) =>
          row.Title.includes(this.textToFilter) ||
          row.userNum.includes(this.textToFilter)
      );
    },
    // studentsFiltered(){
    //   return this.students.filter(
    //     (row)=>

    //   )
    // }

    tableColumns() {
      return [
        {
          name: "Title",
          required: true,
          label: "שם",
          align: "center",
          field: "Title",
        },
        {
          name: "userNum",
          required: true,
          label: "מס' אישי",
          align: "center",
          field: "userNum",
        },
        ...this.exams.map((exam) => ({
          name: exam.Title,
          required: true,
          label: exam.subject,
          align: "center",
          sortable: false,
          format: (val) => (val[exam.Title] ? "yes" : "no"),
        })),
      ];
    },
  },
});
</script>

<style scoped>
.q-pa-md {
  width: 50%;
}
.filter-btn {
  display: flex;
  justify-content: center;
  width: 100%;
}
tr {
  text-align: center;
}
.swal2-custom-container {
  z-index: 10060 !important;
}
.form-container {
  z-index: 10060 !important;
}
</style>
