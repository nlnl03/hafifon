<template>
  <div class="flex-buttons">
    <div class="files-upload" v-for="upload in uploadingSub" :key="upload">
      <button class="open-modal" @click="opendialog(upload.title)">
        {{ upload.label }}
      </button>
    </div>
  </div>

  <q-dialog v-model="dialogVisible" class="custom-dialog" persistent>
    <q-card style="width: 550px; height: 400px">
      <q-card-section class="close-modal">
        <q-icon
          @click="colseDialog"
          style="cursor: pointer"
          name="fad fa-times-circle"
          size="30px"
        />
      </q-card-section>

      <q-card-section>
        <uploadForm :formType="formType" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import uploadForm from "@/components/uploadForm.vue";
import { useRouter } from "vue-router";
import { createApp } from "vue";
export default {
  components: {
    uploadForm,
  },
  data() {
    return {
      uploadingSub: [
        {
          label: "העלאת מצגות",
          title: "filesUpload",
        },
        {
          label: "העלאת תרגולים",
          title: "pracUpload",
        },
        {
          label: "העלאת בחנים ומבחנים",
          title: "examsUpload",
        },
      ],
      vm: null,
      dialogVisible: false,
      weeksWithDetails: [],
      selectedWeek: null,
      selectedLesson: null,
      formType: null,
    };
  },

  beforeMount() {},

  methods: {
    opendialog(title) {
      console.log(title);
      this.dialogVisible = true;
      console.log(this.dialogVisible);
      this.formType = title;
    },
    colseDialog() {
      this.dialogVisible = false;
    },

    async getLessonsStuff() {
      try {
        const weeksRes = await axios.get(
          this.$sharePointUrl + "getByTitle('weeks')/items"
        );
        console.log(weeksRes);
        const weeksData = weeksRes.data.value;

        const promises = weeksData.map(async (week) => {
          const lessonsRes = await axios.get(
            this.$sharePointUrl +
              `getByTitle('lessons')/items?$filter=week eq ${week.ID}`
          );
          const lessonsData = lessonsRes.data.value;

          const lessonsWithDetails = await Promise.all(
            lessonsData.map(async (lesson) => {
              const practicesRes = await axios.get(
                this.$sharePointUrl +
                  `getByTitle('practices')/items?$filter=lesson eq ${lesson.ID}`
              );
              const practicesData = practicesRes.data.value;

              const practicesWithDetails = await Promise.all(
                practicesData.map(async (practice) => {
                  const practicesDataRes = await axios.get(
                    this.$sharePointUrl +
                      `getByTitle('practicesData')/items?$filter=practiceId eq ${practice.ID}`
                  );
                  const practicesData = practicesDataRes.data.value;

                  return {
                    id: practice.ID,
                    title: practice.Title,
                    practicesData: practicesData.map((data) => ({
                      id: data.ID,
                      data: data.Data,
                    })),
                  };
                })
              );

              return {
                id: lesson.ID,
                title: lesson.Title,
                practices: practicesWithDetails,
              };
            })
          );

          return {
            id: week.ID,
            weekNumber: week.weekNum,
            lessons: lessonsWithDetails,
          };
        });
        this.weeksWithDetails = await Promise.all(promises);
        console.log(this.weeksWithDetails);
      } catch (error) {
        console.error("error fetching:", error);
      }
    },
  },
};
</script>

<style scoped>
.flex-buttons {
  display: flex;
  justify-content: center;
  margin-top: 200px;
}
.files-upload,
.prac-upload,
.exams-upload {
  margin: 0 10px;
  background: rgb(173, 173, 173);
  width: 165px;
  height: 90px;
  border-radius: 15px;
  padding: 0.8em;
}
button[class="open-modal"] {
  background: rgb(173, 173, 173);
  cursor: pointer;
  color: black;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
}

.custom-dialog {
  width: 400px;
}
.close-modal {
  display: flex;
  justify-content: flex-end;
}
</style>
