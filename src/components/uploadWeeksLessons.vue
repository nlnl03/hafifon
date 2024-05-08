<template>
  <div class="main">
    <q-form class="q-ma-auto" @submit.prevent="submitForm">
      <q-select
        :options="options"
        label="בחר אופצייה"
        v-model="optionChose"
        emit-value
        outlined
        map-options
        option-label="label"
        option-value="value"
        @update:model-value="createweek"
      >
      </q-select>

      <div class="week" v-for="(week, weekIndex) in newWeek" :key="weekIndex">
        <div class="week-item">
          <q-input
            filled
            style="margin-top: 20px"
            v-model.trim="week['Title']"
            label="בחר שם לשבוע"
            lazy-rules
            required
            :rules="[
              (val) => {
                (val && val.trim().length > 0) || 'אנא בחר\י שם לשבוע';
              },
            ]"
          />

          <q-card
            flat
            bordered
            class="add-lesson-card"
            v-for="(lesson, lessIndex) in week.lessons"
            :key="lessIndex"
          >
            <q-card-section class="card-section">
              <div class="header-flex">
                <div class="remove">
                  <q-icon
                    name="fas fa-times"
                    class="remove-icon"
                    size="25px"
                    @click="removeLesson(weekIndex, lessIndex)"
                  />
                </div>
                <h5 class="lesson-title">שיעור {{ lessIndex + 1 }}</h5>
              </div>

              <q-input
                filled
                style="margin-top: 20px"
                v-model.trim="lesson.Title"
                label="בחר שם לשיעור"
                lazy-rules
                required
                :rules="[
                  (val) => {
                    (val && val.trim().length > 0) || 'אנא הוסף שיעור';
                  },
                ]"
              />
              <q-file
                outlined
                class="q-mt-md"
                v-model="file[lessIndex]"
                label="הוסף תמונת רקע"
                accept=".jpg, .png"
                required
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-cloud-upload-alt" @click.stop.prevent />
                </template>

                <template v-slot:append v-if="file[lessIndex] != null">
                  <q-icon
                    name="fas fa-times"
                    @click.stop.prevent="file[lessIndex] = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-file>

              <q-file
                outlined
                v-model="file2[lessIndex]"
                label="הוסף מצגת"
                accept=".ppt, .pptx"
                class="q-mt-md"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-cloud-upload-alt" @click.stop.prevent />
                </template>

                <template v-slot:append v-if="file2[lessIndex] != null">
                  <q-icon
                    name="fas fa-times"
                    @click.stop.prevent="file2[lessIndex] = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-file>
            </q-card-section>
          </q-card>

          <div class="add-remove-lesson-div">
            <q-btn
              :disabled="!week['Title']"
              color="primary"
              label="הוסף שיעור"
              @click="addLesson(weekIndex)"
              class="add-lesson"
            >
              <q-icon name="fas fa-plus-circle" style="margin-right: 10px" />
            </q-btn>
          </div>
        </div>
      </div>

      <!-- //משבוע קיים -->
      <q-select
        v-if="choseFromExist"
        v-model="selectedLesson"
        label="בחר שבוע"
        :options="weeks"
        class="q-mt-md"
        outlined
        emit-value
        map-options
        option-label="Title"
        @update:model-value="editLesson"
      >
      </q-select>

      <div class="lessons-add-btns">
        <div class="lessons-btn" v-if="!showIsEmptyArray">
          <div
            v-for="(lesson, lessIndex) in existLessons"
            :key="lessIndex"
            class="lessons-btn-items"
          >
            <q-btn
              :label="lesson.Title"
              class="edit-lesson-btn"
              @click="openLessonCard(lessIndex)"
              color="primary"
              size="15px"
              :class="{ checked: selectedIndex === lessIndex }"
            >
              <q-icon
                name="fa-solid fa-pen"
                size="13px"
                style="margin-right: 8px; margin-top: 2px"
              />
            </q-btn>
          </div>
        </div>
        <div
          v-if="showIsEmptyArray"
          style="display: flex; justify-content: center; margin-top: 35px"
        >
          <span style="font-size: 27px; font-weight: 600"
            >לא קיימים שיעורים בשבוע זה...</span
          >
        </div>

        <div
          class="add-lesson-btn"
          :class="{ empty: this.existLessons.length < 1 }"
        >
          <q-btn
            label="הוסף שיעור"
            color="green"
            v-if="optionChose === 'בחר משבוע קיים' && selectedLesson"
            @click="addNewLesson"
          >
            <q-icon
              name="fas fa-plus-circle"
              style="margin-right: 7px"
            ></q-icon>
          </q-btn>
        </div>
      </div>

      <div
        class="exist-item"
        v-for="(lesson, lessIndex) in existLessons"
        :key="lessIndex"
      >
        <q-card
          v-if="allowEdit[lessIndex]"
          style="
            min-height: 300px;
            background: #e8e6e61f;
            border: 1px solid #e7e5e5a6;
          "
        >
          <q-card-section v-if="!showIsEmptyArray" class="card-section">
            <transition
              v-if="isLoad"
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <div>
                <q-input
                  filled
                  style="margin-top: 20px"
                  v-model.trim="lesson.Title"
                  label="שם השיעור"
                  lazy-rules
                  required
                  :rules="[
                    (val) => {
                      (val && val.trim().length > 0) || 'אנא הוסף שיעור';
                    },
                  ]"
                />
                <q-btn label="lesson.Img"></q-btn>
                <q-file
                  outlined
                  class="q-mt-md"
                  v-model="lesson.Img"
                  label="החלף תמונת רקע"
                  accept=".jpg, .png"
                  required
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="fas fa-cloud-upload-alt"
                      @click.stop.prevent
                    />
                  </template>

                  <template v-slot:append v-if="(file = null)">
                    <q-icon
                      name="fas fa-times"
                      @click.stop.prevent="file = null"
                      class="cursor-pointer"
                    />
                  </template>
                </q-file>

                <q-file
                  outlined
                  v-model="lesson.file"
                  label="החלף מצגת"
                  accept=".ppt, .pptx"
                  class="q-mt-md"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="fas fa-cloud-upload-alt"
                      @click.stop.prevent
                    />
                  </template>

                  <template v-slot:append v-if="file2 != null">
                    <q-icon
                      name="fas fa-times"
                      @click.stop.prevent="file2 = null"
                      class="cursor-pointer"
                    />
                  </template>
                </q-file>

                <div
                  style="
                    display: flex;
                    justify-content: center;
                    margin-top: 25px;
                  "
                >
                  <q-btn
                    label="מחק שיעור"
                    color="red"
                    @click="deleteLesson(lesson.Id, lessIndex)"
                  >
                    <q-icon
                      name="fas fa-trash-alt"
                      size="20px"
                      style="margin-right: 10px"
                    ></q-icon>
                  </q-btn>
                </div>
              </div>
            </transition>
          </q-card-section>

          <q-inner-loading :showing="!isLoad">
            <q-spinner-gears size="60px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>

      <div class="submit-btn-flex">
        <q-btn
          class="submit-btn"
          type="submit"
          label="העלאה"
          :loading="progress.loading"
          :percentage="progress.percentage"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    weeks: Array,
  },
  data() {
    return {
      options: ["הוסף שבוע", "בחר משבוע קיים"],
      optionChose: "",
      selectedLesson: "",
      newWeek: [],
      choseFromExist: false,
      file: [],
      file2: [],
      token: null,
      progress: { loading: false, percentage: 0 },
      interval: null,
      currentOption: null,
      existLessons: [],
      allowEdit: [],
      isLoad: false,
      selectedIndex: null,
      showIsEmptyArray: false,
    };
  },

  methods: {
    createweek(option) {
      console.log(option);
      this.existLessons = [];
      (this.file = []), (this.file2 = []), (this.choseFromExist = false);
      this.currentOption = option;
      if (option == "הוסף שבוע") {
        this.newWeek.push({
          lessons: [],
        });
      } else {
        this.newWeek = [];
        this.selectedLesson = null;
        this.choseFromExist = true;
      }
      console.log(this.newWeek);
    },

    addLesson(weekIndex) {
      this.newWeek[weekIndex].lessons.push({});
    },
    removeLesson(weekIndex, lessIndex) {
      this.newWeek[weekIndex].lessons.splice(lessIndex, 1);
    },

    async submitForm() {
      console.log(this.newWeek);
      console.log(this.file2);
      this.progress.loading = true;
      this.progress.percentage = 0;

      this.interval = setInterval(async () => {
        this.progress.percentage += 1;

        if (this.progress.percentage >= 100) {
          this.progress.percentage = 0;
          this.progress.loading = false;
          if (this.currentOption === "הוסף שבוע") {
            try {
              await this.postWeek();
              console.log("has finished");
              this.uploadSucceeded();
            } catch (error) {
              this.uploadFailed(error);
            }
          }
          clearInterval(this.interval);
        }
      }, 10);
    },

    uploadSucceeded() {
      this.$swal({
        title: "הועלה בהצלחה",
        icon: "success",
        confirmButtonText: "סיים",
        confirmButtonColor: "var(--main-background-color)",
      });
    },
    uploadFailed(error) {
      this.$swal({
        title: "אירעה שגיאה בהעלאה",
        text: error,
        icon: "error",
        confirmButtonText: "נסה שוב",
        confirmButtonColor: "var(--main-background-color)",
      });
    },

    async postWeek() {
      try {
        this.token = await this.$asyncGetToken();
        const mahlakaId = JSON.parse(localStorage.getItem("mahlakaId"));
        const url = this.$sharePointUrl + "getByTitle('weeks')/Items";
        const data = {
          Title: this.newWeek[0].Title,
          mahlakaId: mahlakaId,
        };
        const res = await axios.post(url, data, {
          headers: {
            "X-RequestDigest": this.token,
          },
        });

        this.postLessons(mahlakaId);
      } catch (error) {
        console.log("error posting to exam list", error);
        throw error;
      }
    },

    getNewWeekId() {
      return axios
        .get(
          this.$sharePointUrl +
            `getByTitle('weeks')/items?$orderby=ID desc&$top=1&$select=ID`
        )
        .then((res) => res.data.value[0].ID);
    },

    async deleteLesson(id, lessIndex) {
      try {
        const token = await this.$asyncGetToken();
        const url = this.$sharePointUrl + `getByTitle('lessons')/items(${id})`;
        const res = await axios.post(
          url,
          {
            __metadata: { type: "SP.Data.LessonsListItem" },
          },
          {
            headers: {
              "X-HTTP-Method": "DELETE",
              "IF-MATCH": "*",
              "X-RequestDigest": token,
              Accept: "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
            },
          }
        );
        this.existLessons.splice(lessIndex, 1);
        if (this.existLessons) {
          this.showIsEmptyArray = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addNewLesson(){
      
    },

    async postLessons(mahlakaId) {
      try {
        const newWeekId = await this.getNewWeekId();
        await this.addWeeksFolderToSiteAssets();

        console.log("newWeekId:", newWeekId);
        const url = this.$sharePointUrl + "getByTitle('lessons')/items";

        this.newWeek[0].lessons.forEach((item, index) => {
          item["weekId"] = newWeekId;
          item["mahlakaId"] = mahlakaId;
          item["Img"] = this.file[index].name;
          item["file"] = this.file2[index].name;
          item["__metadata"] = {
            type: "SP.Data.LessonsListItem",
          };
        });
        console.log(this.newWeek[0].lessons);

        for (const [index, value] of this.newWeek[0].lessons.entries()) {
          console.log(index, value);
          try {
            const res = await axios.post(url, value, {
              headers: {
                "X-RequestDigest": this.token,
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
              },
            });
            await this.uploadLessonsPics(this.file[index]);
            await this.uploadFileToFolder(this.file2[index]);
            console.log(`השיעור הועלה בהצלחה ${value.Title}`);
          } catch (error) {
            console.error(`שגיאה בהעלאת שיעור ${value.Title}`);
          }
        }
      } catch (error) {
        console.log("שגיאה בהעלאת השיעורים והקבצים");
      }
    },

    async editLesson(option) {
      this.selectedIndex = null;

      console.log(option);
      try {
        var res = null;
        if (this.$isSharePointUrl) {
          res = await axios.get(
            this.$sharePointUrl +
              `getByTitle('lessons')/items?$filter=weekId eq ${option.Id}`
          );
        } else {
          res = await axios.get(this.$sharePointUrl + "lessons");
          res.data.value = res.data.value.filter(
            (item) => item.weekId === option.Id
          );
        }
        this.existLessons = res.data.value;
        if (this.existLessons.length < 1) {
          this.showIsEmptyArray = true;
        } else {
          this.showIsEmptyArray = false;
        }
        this.allowEdit = new Array(this.existLessons.length).fill(false);
        console.log(this.allowEdit);
        console.log(this.existLessons);
      } catch (error) {
        console.log("error", error);
      }
    },

    openLessonCard(index) {
      this.isLoad = false;

      this.selectedIndex = index;
      setTimeout(() => {
        this.allowEdit = this.allowEdit.map((item, i) => i === index);
        console.log(this.allowEdit);
        this.isLoad = true;
        console.log(this.isLoad);
      }, 300);
    },

    async addWeeksFolderToSiteAssets() {
      try {
        const mahlaka = localStorage.getItem("mahlaka");

        const uploadUrl = `https://portal.army.idf/sites/hafifon383/_api/web/getfolderbyserverrelativeurl('/sites/hafifon383/SiteAssets/${mahlaka}')/Folders/add(url='${this.newWeek[0].Title}')`;

        const headers = {
          Accept: "application/json;odata=verbose",
          "X-RequestDigest": this.token,
          "Content-Type": "application/octet-stream",
        };

        const res = await axios.post(uploadUrl, null, { headers });
        console.log(`התקייה ${this.newWeek[0].Title} נוצרה בהצלחה`);
      } catch (error) {
        console.log(`שגיאה ביצירת התקייה ${this.newWeek.Title}`, error);
      }
    },

    async uploadFileToFolder(fileItem) {
      try {
        const mahlaka = localStorage.getItem("mahlaka");
        const fileName = fileItem.name;

        console.log(fileItem);
        const uploadUrl = `https://portal.army.idf/sites/hafifon383/_api/web/getfolderbyserverrelativeurl('/sites/hafifon383/SiteAssets/${mahlaka}/${this.newWeek[0].Title}')/Files/add(url='${fileName}',overwrite=true)`;

        const uploadRes = await axios.post(uploadUrl, fileItem, {
          headers: {
            Accept: "application/json;odata=verbose",
            "X-RequestDigest": this.token,
            "Content-Type": "application/octet-stream",
          },
        });
        console.log(`בוצעה בהצלחה העלאת הקובץ ${fileName}`);
      } catch (error) {
        console.log(`שגיאה בהעלאת הקובץ ${fileName}`, error);
      }
    },

    async uploadLessonsPics(imgItem) {
      try {
        const mahlaka = localStorage.getItem("mahlaka");
        const fileName = imgItem.name;

        const url = `https://portal.army.idf/sites/hafifon383/_api/web/getfolderbyserverrelativeurl('/sites/hafifon383/SiteAssets/${mahlaka}/lessonsPics')/Files/add(url='${fileName}',overwrite=true)`;
        const uploadRes = await axios.post(url, imgItem, {
          headers: {
            Accept: "application/json;odata=verbose",
            "X-RequestDigest": this.token,
            "Content-Type": "application/octet-stream",
          },
        });
        console.log(`בוצעה בהצלחה העלאת התמונה ${fileName}`);
      } catch (error) {
        console.log(`שגיאה בהעלאת התמונה ${fileName}`, error);
      }
    },
  },

  beforeMount() {},
};
</script>

<style scoped>
.q-card {
  box-shadow: none !important;
  border-radius: 10px;
}
.card-section {
  padding: 25px !important;
}
.remove-icon {
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  color: #808080e6;
}
.remove:hover .remove-icon {
  transform: scale(1.1);
}
.q-ma-auto {
  padding: 20px;
  width: 80%;
}
.submit-btn-flex {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 70px;
}
.submit-btn {
  background-color: var(--main-background-color);
  color: white;
}
.header-flex {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}
.lesson-title {
  text-align: center;
  width: 100%;
  font-weight: 600;
  font-size: 30px;
  margin-right: 25px;
}
.add-lesson-card {
  margin-bottom: 30px;
}
.add-lesson-card:nth-last-child() {
  margin-bottom: 10px !important;
}

.lessons-btn {
  display: flex;
  width: unset;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 10px;
}
.edit-lesson-btn.checked {
  background: #808080e6 !important;
  box-shadow: none;
}
.lessons-add-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.add-lesson-btn.empty {
  margin-top: 25px !important;
}
.edit-lesson-btn {
  border-radius: 10px;
}
.lessons-btn-items {
  margin-right: 20px;
  margin-top: 10px;
}
.lessons-btn-items:last-child {
  margin-right: 0px;
}
</style>
