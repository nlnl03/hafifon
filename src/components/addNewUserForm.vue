<template>
  <q-form @submit.prevent="addNewStudent" style="width: 60%" class="form">
    <q-input v-model="newStudent.Title" required label="שם"> </q-input>

    <q-input
      v-model="newStudent.userNum"
      :min="1"
      :max="9999999"
      required
      type="Number"
      label="מס' אישי"
    ></q-input>
  </q-form>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      exam: null,
      newStudent: null,
      token: null,
    };
  },
  async beforeMount() {
    // this.exams = await this.$parseTestsNames("testsNames");
    // console.log(this.exams);

    this.newStudent = {
      Title: "",
      userNum: "",
      num: null,
      mahlaka: localStorage.getItem("mahlaka"),
      //   permissions: Object.fromEntries(
      //     this.exams.map((exam) => [exam.Title, false])
      //   ),
    };
    // this.token = await this.$asyncGetToken();
  },
  methods: {
    addNewStudent() {
      this.$emit("submit", {
        inputUserNum: this.newStudent.userNum,
        inputName: this.newStudent.Title,
      });
    },
  },
};
</script>

<style></style>
