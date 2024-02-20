<template>
  <div class="loading" v-if="!isLoad"><loadingSpinner /></div>
  <div class="main">
    <q-form @submit.prevent="submitForm" class="q-ma-auto">
      <q-select
        v-model="selectedWeek"
        :options="weekOptions"
        label="בחר שבוע"
        @input="updateSelectedWeek"
        emit-value
        map-options
        option-label="label"
        option-value="value"
      >
      </q-select>

      <q-select
        v-model="selectedLesson"
        :options="lessonOptions"
        label="בחר שיעור"
        class="q-mt-md"
        @input="updateSelectedLesson"
        emit-value
        map-options
        option-label="label"
        option-value="value"
      >
      </q-select>

      <q-file
        filled
        bottom-slots
        v-model="file"
        label="בחר קובץ"
        accept=".ppt, .pptx"
        class="q-mt-md"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-cloud-upload-alt" @click.stop.prevent />
        </template>

        <template v-slot:append v-if="file != null">
          <q-icon
            name="fas fa-times"
            @click.stop.prevent="file = null"
            class="cursor-pointer"
          />
        </template>
      </q-file>

      <div class="submit-btn">
        <q-btn
          type="submit"
          label="העלאה"
          color="primary"
          :disable="file == null"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";
export default {
  name: "uploadForm",
  components: {
    loadingSpinner,
  },
  data() {
    return {
      weeksWithDetails: [],
      selectedWeek: null,
      selectedLesson: null,
      file: null,
      isLoad: false,
    };
  },

  methods: {
    updateSelectedWeek(value) {
      this.selectedWeek = value;
      this.checkFormValidity();
    },
    updateSelectedLesson(value) {
      this.selectedLesson = value;
      this.checkFormValidity();
    },
    checkFormValidity() {
      this.isFormValid =
        !!this.selectedWeek && !!this.selectedLesson && this.files.length > 0;
    },

    async getData() {
      if (!this.$isSharePointUrl) {
        this.isLoad = true;
      }
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
        this.isLoad = true;
      } catch (error) {
        console.error("error fetching:", error);
      }
    },

    async submitForm() {
      try {
        console.log(this.file.name);
        const fileName = this.file.name;
        console.log(fileName);

        const weekFolderName = `שבוע ${this.selectedWeek}`;
        const uploadUrl = `https://portal.army.idf/sites/hafifon383/_api/web/getfolderbyserverrelativeurl('/sites/hafifon383/SiteAssets/${weekFolderName}')/Files/add(url='${fileName}',overwrite=true)`;

        const uploadRes = await axios.post(uploadUrl, this.file, {
          headers: {
            Accept: "application/json;odata=verbose",
            "X-RequestDigest": await this.$asyncGetToken(),
            "Content-Type": "application/octet-stream",
          },
        });

        const lessonUpdateUrl =
          this.$sharePointUrl +
          `getByTitle('lessons')/items('${this.selectedLesson}')`;
        const lessonUpdateData = {
          __metadata: { type: "SP.Data.LessonsListItem" },
          file: this.file.name,
        };
        const lessonUpdateRes = await axios.post(
          lessonUpdateUrl,
          lessonUpdateData,
          {
            headers: {
              "X-HTTP-Method": "MERGE",
              "IF-MATCH": "*",
              "X-RequestDigest": await this.$asyncGetToken(),
              Accept: "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
            },
          }
        );
        console.log(
          "file uploaded and lessons list updated successfully:",
          uploadRes,
          lessonUpdateRes
        );
      } catch (error) {
        console.error("error uploading file and updating lessons list:", error);
      }
    },
  },

  beforeMount() {
    this.getData();
  },

  computed: {
    weekOptions() {
      return this.weeksWithDetails.map((week) => ({
        label: `שבוע ${week.weekNumber}`,
        value: week.id,
      }));
    },

    lessonOptions() {
      const selectedWeekObj = this.weeksWithDetails.find(
        (week) => week.id === this.selectedWeek
      );
      if (selectedWeekObj) {
        return selectedWeekObj.lessons.map((lesson) => ({
          label: lesson.title,
          value: lesson.id,
        }));
      } else {
        return [];
      }
    },

    isFormValid: {
      get() {
        return (
          !!this.selectedWeek && !!this.selectedLesson && this.files.length > 0
        );
      },
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.loading {
  position: relative;
  top: 100px;
}
.q-ma-auto {
  width: 60%;
}
.submit-btn {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
