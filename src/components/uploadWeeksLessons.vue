<template>
  <div class="main">
    <q-form class="q-ma-auto" @submit.prevent="submitForm">
      <q-select
        v-if="formType == 'uploadWeeksLessons'"
        :options="options"
        label="בחר אופצייה"
        v-model="optionChose"
        emit-value
        outlined
        :rules="[(val) => !!val || 'אנא בחר/י באחת מהאופציות']"
        map-options
        option-label="label"
        option-value="value"
        @update:model-value="createweek"
      >
      </q-select>
      <div v-if="formType == 'uploadWeeksLessons'">
        <div class="week" v-for="(week, weekIndex) in newWeek" :key="weekIndex">
          <div class="week-item">
            <q-input
              filled
              v-if="optionChose !== 'בחר משבוע קיים'"
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
                    <q-icon
                      name="fas fa-cloud-upload-alt"
                      @click.stop.prevent
                    />
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
                  label="הוסף קובץ"
                  accept=".ppt, .pptx, .docx , .doc, .pdf"
                  class="q-mt-md"
                  required
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="fas fa-cloud-upload-alt"
                      @click.stop.prevent
                    />
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

            <div
              class="add-remove-lesson-div"
              v-if="optionChose !== 'בחר משבוע קיים'"
            >
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
      </div>

      <!-- //משבוע קיים -->
      <q-select
        v-if="choseFromExist || formType == 'uploadPractices'"
        v-model="selectedWeek"
        label="בחר שבוע"
        :rules="[(val) => !!val || 'אנא בחר שבוע']"
        :options="weeks"
        class="q-mt-md"
        outlined
        emit-value
        map-options
        option-label="Title"
        @update:model-value="editLesson"
      >
      </q-select>

      <q-select
        v-if="formType == 'uploadPractices'"
        v-model="selectedLesson"
        label="בחר שיעור"
        :rules="[(val) => !!val || 'אנא בחר שיעור']"
        :options="existLessons"
        class="q-mt-md"
        outlined
        emit-value
        map-options
        option-label="Title"
        @update:model-value="showPrac"
      ></q-select>

      <div class="lessons-add-btns" v-if="formType == 'uploadWeeksLessons'">
        <div class="lessons-btn" v-if="!showIsEmptyArray">
          <div
            v-for="(lesson, lessIndex) in existLessons"
            :key="lessIndex"
            class="lessons-btn-items"
          >
            <q-btn
              :label="lesson.Title"
              class="edit-lesson-btn"
              @click="openLessonCard(lessIndex, lesson)"
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
            @click="addLesson(this.currentWeekIndex)"
            color="green"
            v-if="optionChose === 'בחר משבוע קיים' && selectedWeek"
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
          v-if="allowEdit[lessIndex] && formType == 'uploadWeeksLessons'"
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

                <!-- edit img -->
                <div class="current-img">
                  <div
                    class="show-current-lesson"
                    style="margin-left: 125px"
                    v-if="!showEditImgBtn[lessIndex]"
                  >
                    {{ lesson.Img }}
                  </div>

                  <div style="width: 60%" v-if="showEditImgBtn[lessIndex]">
                    <q-file
                      filled
                      v-model="editedImg[lessIndex]"
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

                      <template
                        v-slot:append
                        v-if="editedImg[lessIndex] != null"
                      >
                        <q-icon
                          name="fas fa-times"
                          @click.stop.prevent="editedImg[lessIndex] = null"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-file>
                  </div>

                  <div class="edit-icon">
                    <q-icon
                      style="margin-left: 10px"
                      name="fa-solid fa-check"
                      @click="
                        (lesson.Img = editedImg[lessIndex].name) &&
                          (showEditImgBtn[lessIndex] = false)
                      "
                      v-if="showEditImgBtn[lessIndex]"
                    ></q-icon>
                    <q-icon
                      name="fas fa-edit"
                      @click="editImgBtn(lessIndex)"
                    ></q-icon>
                  </div>
                </div>

                <!-- edit file -->
                <div class="current-img">
                  <div
                    class="show-current-lesson"
                    style="margin-left: 125px"
                    v-if="!showEditFileBtn[lessIndex]"
                  >
                    {{ lesson.file }}
                  </div>

                  <div style="width: 60%" v-if="showEditFileBtn[lessIndex]">
                    <q-file
                      filled
                      v-model="editedFile[lessIndex]"
                      label="החלף קובץ"
                      accept=".ppt, .pptx, .docx , .doc, .pdf"
                    >
                      <template v-slot:prepend>
                        <q-icon
                          name="fas fa-cloud-upload-alt"
                          @click.stop.prevent
                        />
                      </template>

                      <template
                        v-slot:append
                        v-if="editedFile[lessIndex] != null"
                      >
                        <q-icon
                          name="fas fa-times"
                          @click.stop.prevent="editedFile[lessIndex] = null"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-file>
                  </div>
                  <div class="edit-icon">
                    <q-icon
                      style="margin-left: 10px"
                      name="fa-solid fa-check"
                      @click="
                        (lesson.file = editedFile[lessIndex].name) &&
                          (showEditFileBtn[lessIndex] = false)
                      "
                      v-if="showEditFileBtn[lessIndex]"
                    ></q-icon>
                    <q-icon
                      name="fas fa-edit"
                      @click="editFileBtn(lessIndex)"
                    ></q-icon>
                  </div>
                </div>

                <div
                  style="
                    display: flex;
                    justify-content: center;
                    margin-top: 25px;
                  "
                >
                  <q-btn
                    label="מחק שיעור"
                    style="margin-left: 7px"
                    color="red"
                    @click="deleteLesson(lesson.Id, lessIndex)"
                  >
                    <q-icon
                      name="fas fa-trash-alt"
                      size="20px"
                      style="margin-right: 10px"
                    ></q-icon>
                  </q-btn>

                  <q-btn
                    style="margin-right: 7px"
                    label="שמור והעלה"
                    color="primary"
                    @click="mergeLesson(lesson)"
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

      <div class="lessons-add-btns" v-if="formType === 'uploadPractices'">
        <div class="lessons-btn">
          <div
            v-for="(prac, pracIndex) in filteredPracs"
            :key="pracIndex"
            class="lessons-btn-items"
          >
            <div>
              <q-btn
                :label="prac.Title"
                class="edit-lesson-btn"
                @click="openLessonCard(pracIndex, prac)"
                color="primary"
                size="15px"
                :class="{ checked: selectedIndex === pracIndex }"
              >
                <q-icon
                  name="fa-solid fa-pen"
                  size="13px"
                  style="margin-right: 8px; margin-top: 2px"
                />
              </q-btn>
            </div>
          </div>
        </div>
      </div>

      <div
        class="exist-item"
        v-for="(prac, pracIndex) in filteredPracs"
        :key="pracIndex"
      >
        <q-card
          v-if="allowPracEdit[pracIndex]"
          style="
            min-height: 300px;
            background: #e8e6e61f;
            border: 1px solid #e7e5e5a6;
          "
        >
          <q-card-section class="card-section">
            <div
              class="practice-que"
              style=""
              v-for="(que, queIndex) in practicesDataFiltered"
              :key="queIndex"
            >
              <pracUploadForm :que="que" :queIndex="queIndex" />
            </div>
          </q-card-section>

          <q-inner-loading :showing="!isLoad">
            <q-spinner-gears size="60px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>

      <div class="submit-btn-flex" v-if="showSubmitBtn">
        <q-btn
          class="submit-btn"
          :disabled="newWeek[0].lessons.length < 1"
          type="submit"
          label="העלאה"
          :loading="progress.loading"
          :percentage="progress.percentage"
        />
      </div>

      <q-btn @click="verifyAndSend" v-if="formType === 'uploadPractices'"
        >סיים</q-btn
      >
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import pracUploadForm from "@/components/pracUploadForm.vue";
export default {
  props: {
    weeks: Array,
    formType: String,
  },
  components: { pracUploadForm },
  data() {
    return {
      options: ["הוסף שבוע", "בחר משבוע קיים"],
      optionChose: "",
      selectedWeek: "",
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
      originalExistLessons: [],
      allowEdit: [],
      allowPracEdit: [],
      editedFile: [],
      editedImg: [],
      isLoad: false,
      selectedIndex: null,
      showIsEmptyArray: false,
      currentWeekIndex: null,
      showEditImgBtn: [],
      showEditFileBtn: [],
      mahlakaId: null,
      filteredPracs: [],
      practicesDataFiltered: [],
      showSubmitBtn: false,
      currentPracId: null,
    };
  },

  methods: {
    async verifyAndSend() {
      for (let item = 0; item < this.practicesDataFiltered.length; item++) {
        if (this.practicesDataFiltered[item].type == "radio") {
          if (this.practicesDataFiltered[item].correctAnswer == null) {
            alert(`אנא הכנס תשובה בשאלה :${item + 1}`);
            return;
          } else if (
            !this.practicesDataFiltered[item].options.includes(
              this.practicesDataFiltered[item].correctAnswer
            )
          ) {
            alert(`אנא הכנס תשובה שקיימת באפשרויות :${item + 1}`);
            return;
          }
        } else if (this.practicesDataFiltered[item].type == "checkbox") {
          const exist = this.practicesDataFiltered[item].correctAnswer.every(
            (i) => this.practicesDataFiltered[item].options.includes(i)
          );
          console.log(exist);

          if (!exist) {
            alert(`אנא הכנס תשובה שקיימת באפשרויות :${item + 1}`);
            return;
          }
        } else if (
          this.practicesDataFiltered[item].type == "dragDropComplete"
        ) {
          const fullRightAnswerArray = [
            ...this.practicesDataFiltered[item].sentences.filter(
              (word) => word !== ""
            ),
            ...this.practicesDataFiltered[item].bankWords,
          ];
          const isExistSelectedWords = this.practicesDataFiltered[
            item
          ].correctAnswer.every((i) => {
            return fullRightAnswerArray.includes(i);
          });

          console.log(this.practicesDataFiltered[item]);
          if (
            this.practicesDataFiltered[item].correctAnswer.length !==
            this.practicesDataFiltered[item].sentences.length
          ) {
            alert(
              `ודא שהכנסת כמות מילים התואמת את כמות המילים במשפט הנתון: ${
                item + 1
              }`
            );
            return;
          } else if (!isExistSelectedWords) {
            console.log(isExistSelectedWords);
            alert(`אנא הכנס תשובה שקיימת באפשרויות :${item + 1}`);
            return;
          }
        }
        // else if(this.practicesDataFiltered[item].type =="dragDropTable"){

        // }
      }
      try {
        await this.deletePrac();
        console.log("yess");
        await this.postNewPracticesData();
        this.$swal({
          title: "התרגול הועלה בהצלחה",
          icon: "success",
          confirmButtonText: "סיום",
          confirmButtonColor: "var(--main-background-color)",
        });
      } catch (err) {
        this.$swal({
          title: "שגיאה בהעלאת התרגול",
          icon: "error",
          confirmButtonText: "נסה שוב",
          confirmButtonColor: "var(--main-background-color)",
        });
      }
    },

    async deletePrac() {
      var res = null;
      const token = await this.$asyncGetToken();
      for (const pracData of this.practicesDataFiltered) {
        res = await axios.post(
          this.$sharePointUrl +
            `getByTitle('practicesData')/items(${pracData.Id})`,
          {
            __metadata: { type: "SP.Data.PracticesDataListItem" },
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
      }
    },

    async postNewPracticesData() {
      var token = await this.$asyncGetToken();
      var url = this.$sharePointUrl + "getByTitle('practicesData')/items";

      for (const pracData of this.practicesDataFiltered) {
        if (pracData.type == "radio") {
          pracData.options = JSON.stringify(pracData.options);
        } else if (pracData.type == "checkbox") {
          pracData.options = JSON.stringify(pracData.options);
          pracData.correctAnswer = JSON.stringify(pracData.correctAnswer);
        } else if (pracData.type == "dragDropComplete") {
          pracData.sentences = JSON.stringify(pracData.sentences);
          pracData.correctAnswer = JSON.stringify(pracData.correctAnswer);
          pracData.bankWords = JSON.stringify(pracData.bankWords);
        } else if (pracData.type == "dragDropTable") {
          pracData.subjects = JSON.stringify(pracData.subjects);
          pracData.correctMatches = JSON.stringify(pracData.correctMatches);
          pracData.bankWords = JSON.stringify(pracData.bankWords);
          pracData.table = [];
          pracData.table = JSON.stringify(pracData.table);
        }
        console.log(this.pracData);

        const res = await axios.post(
          url,
          {
            __metadata: { type: "SP.Data.PracticesDataListItem" },
            ...pracData,
          },

          {
            headers: {
              "X-RequestDigest": token,
              Accept: "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
            },
          }
        );
      }
      console.log("posted");
    },

    async mergeLesson(lesson) {
      lesson["__metadata"] = { type: "SP.Data.LessonsListItem" };
      console.log(lesson);
      try {
        const url =
          this.$sharePointUrl + `getByTitle('lessons')/items(${lesson.Id})`;

        const res = await axios.post(
          url,
          lesson,

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

        this.$swal({
          title: `השיעור "${lesson.Title}" נערך בהצלחה`,
          icon: "success",
          confirmButtonText: "סיום",
          confirmButtonColor: "var(--main-background-color)",
        });
      } catch (err) {
        console.log(err);
        this.$swal({
          title: `שגיאה בעריכת "${lesson.Title}"`,
          icon: "error",
          confirmButtonText: "נסה\י שוב",
          confirmButtonColor: "var(--main-background-color)",
        });
      }
    },

    editImgBtn(lessIndex) {
      this.showEditImgBtn[lessIndex] = !this.showEditImgBtn[lessIndex];
      console.log(this.showEditImgBtn);
    },
    editFileBtn(lessIndex) {
      this.showEditFileBtn[lessIndex] = !this.showEditFileBtn[lessIndex];
      console.log(this.showEditFileBtn);
      console.log("yesss");
    },

    createweek(option) {
      console.log(option);
      this.existLessons = [];
      (this.file = []), (this.file2 = []), (this.choseFromExist = false);
      this.currentOption = option;
      if (option == "הוסף שבוע") {
        this.newWeek = [];
        this.newWeek.push({
          lessons: [],
        });
      } else {
        this.newWeek = [{ lessons: [] }];

        this.selectedWeek = null;
        this.choseFromExist = true;
      }
      console.log(this.newWeek);
    },

    addLesson(weekIndex) {
      console.log(weekIndex);
      this.showSubmitBtn = true;
      console.log(this.existLessons);
      if (this.optionChose === "הוסף שבוע") {
        this.newWeek[weekIndex].lessons.push({});
      } else {
        this.showIsEmptyArray = false;
        this.existLessons.push({});
        this.allowEdit.push(false);
        console.log(this.existLessons);
      }
    },
    removeLesson(weekIndex, lessIndex) {
      this.newWeek[weekIndex].lessons.splice(lessIndex, 1);
    },

    async submitForm() {
      console.log(this.newWeek);
      console.log(this.file2);
      this.progress.loading = true;
      this.progress.percentage = 0;

      console.log(this.existLessons);

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
          } else {
            if (this.newWeek[0].lessons < 1) {
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

        const url = this.$sharePointUrl + "getByTitle('weeks')/Items";
        const data = {
          Title: this.newWeek[0].Title,
          mahlakaId: this.mahlakaId,
        };
        const res = await axios.post(url, data, {
          headers: {
            "X-RequestDigest": this.token,
          },
        });

        this.postLessons();
      } catch (error) {
        console.log("error posting to exam list", error);
        throw error;
      }
    },

    getNewWeekId() {
      return axios
        .get(
          this.$sharePointUrl +
            `getByTitle('weeks')/items?$orderby=Id desc&$top=1&$select=Id`
        )
        .then((res) => res.data.value[0].Id);
    },

    async deleteLesson(id, lessIndex) {
      try {
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
              "X-RequestDigest": this.token,
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

    async addNewLesson() {},

    async postLessons() {
      try {
        const newWeekId = await this.getNewWeekId();
        await this.addWeeksFolderToSiteAssets();

        console.log("newWeekId:", newWeekId);
        const url = this.$sharePointUrl + "getByTitle('lessons')/items";

        this.newWeek[0].lessons.forEach((item, index) => {
          item["weekId"] = newWeekId;
          item["mahlakaId"] = this.mahlakaId;
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
      this.selectedLesson = "";

      this.currentWeekIndex = this.weeks.indexOf(option);
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
        this.showEditImgBtn = new Array(this.existLessons.length).fill(false);
        this.showEditFileBtn = new Array(this.existLessons.length).fill(false);
        console.log("showEditFileBtn: ", this.showEditFileBtn);
        console.log(this.allowEdit);
        console.log(this.existLessons);
      } catch (error) {
        console.log("error", error);
      }
    },
    async showPrac(option) {
      console.log(option);
      var res = null;
      try {
        if (this.$isSharePointUrl) {
          res = await axios.get(
            this.$sharePointUrl +
              `getByTitle('practices')/items?$filter=lessonId eq ${option.Id}`
          );
        } else {
          res = await axios.get(this.$sharePointUrl + "practices");
          res.data.value = res.data.value.filter(
            (prac) => prac.lessonId === option.Id
          );
        }
        this.filteredPracs = res.data.value;
        this.allowPracEdit = new Array(this.filteredPracs.length).fill(false);
        console.log(this.filteredPracs);
      } catch (error) {
        console.log(error);
      }
    },

    openLessonCard(index, prac) {
      if (prac) {
        this.currentPracId = prac.Id;
        console.log("currentPracId: ", this.currentPracId);
      }
      this.isLoad = false;
      this.selectedIndex = index;
      setTimeout(async () => {
        if (this.formType === "uploadWeeksLessons") {
          this.originalExistLessons = JSON.parse(JSON.stringify(prac));
          console.log(this.originalExistLessons);

          this.allowEdit = this.allowEdit.map((item, i) => i === index);
          console.log("allowEdit", this.allowEdit);
        } else if (this.formType === "uploadPractices") {
          try {
            this.allowPracEdit = this.allowPracEdit.map(
              (item, i) => i === index
            );
            console.log("allowPracEdit", this.allowPracEdit);
            var res = null;

            if (this.$isSharePointUrl) {
              res = await axios.get(
                this.$sharePointUrl +
                  `getByTitle('practicesData')/items?$filter=practiceId eq ${prac.Id}`
              );
            } else {
              res = await axios.get(this.$sharePointUrl + "practicesData");
              res.data.value = res.data.value.filter(
                (item) => item.practiceId === prac.Id
              );
            }
            this.practicesDataFiltered = res.data.value;
            this.parsePracData();
            console.log(this.practicesDataFiltered);
          } catch (error) {}
        }
        this.isLoad = true;
        console.log(this.isLoad);
      }, 300);
    },

    parsePracData() {
      this.practicesDataFiltered.forEach((item) => {
        if (item.type == "radio") {
          item.options = JSON.parse(item.options);
        } else if (item.type == "checkbox") {
          item.options = JSON.parse(item.options);
          item.correctAnswer = JSON.parse(item.correctAnswer);
        } else if (item.type == "dragDropComplete") {
          item.correctAnswer = JSON.parse(item.correctAnswer);
          item.sentences = JSON.parse(item.sentences);
          item.bankWords = JSON.parse(item.bankWords);
        } else if (item.type == "dragDropTable") {
          item.subjects = JSON.parse(item.subjects);
          item.correctMatches = JSON.parse(item.correctMatches);
          item.bankWords = JSON.parse(item.bankWords);
        }
      });
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

  beforeMount() {
    this.mahlakaId = JSON.parse(localStorage.getItem("mahlakaId"));
  },
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
.edit-icon {
  cursor: pointer;
}
.show-current-lesson {
}
.current-img {
  margin-bottom: 20px;
  font-size: 20px;
  border-radius: 3px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  border-radius: 5px;
  /* background: #dcdcdc; */
  border: 1px solid #80808066;
  padding: 10px;
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
  margin-bottom: 25px;
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
  margin-bottom: 7px;
}
.lessons-btn-items:last-child {
  margin-right: 0px;
}
</style>
