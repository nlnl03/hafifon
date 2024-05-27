<template>
  <q-form @submit.prevent="addNewStudent" style="width: 60%">
    <q-input
      v-model="newStudent.userNum"
      :min="1"
      :max="9999999"
      required
      type="Number"
      label="מס' אישי"
    >
    </q-input>
    <div style="margin-top: 20px">
      <q-btn label="ביטול" @click="closeDialog"></q-btn>
      <q-btn label="הוסף" type="submit"></q-btn>
    </div>
  </q-form>
</template>

<script>
export default {
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
      this.$emit("submit", this.newStudent);
    },
  },
};
</script>

<style></style>
