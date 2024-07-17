<template>
  <div class="main">
    <div class="main-card">
      <div class="card-flex">
        <div class="checking-accordion">
          <HafifaCheckMainCompo />
        </div>

        <div class="upload-btns">
          <div class="btns-flex">
            <q-btn
              ref="1"
              class="grid-btn"
              label="העלאה ועריכת שבועות ושיעורים"
              @click="opendialog('1')"
            >
              <q-icon name=""></q-icon>
            </q-btn>

            <q-btn
              ref="2"
              class="grid-btn"
              label="העלאת ועריכת תרגולים"
              @click="opendialog('2')"
            />

            <q-btn
              ref="3"
              class="grid-btn"
              label="העלאת בחנים ומבחנים"
              @click="opendialog('3')"
            />

            <q-btn
              class="grid-btn"
              label="ניהול הרשאות והוספת נחפפים"
              @click="opendialog('4')"
            />
          </div>
        </div>
      </div>
      <!-- <div class="history">
        <q-btn class="history-btn" label="היסטוריית נחפפים" />
      </div> -->
    </div>
  </div>

  <q-dialog v-model="showModal" @clickaway="colseDialog" class="main-dialog">
    <q-card
      class="reset-media-query"
      :style="{
        width: cardWidth,
        height: cardHeight,
        maxHeight: maxHeight,
        'border-radius': '10px',
      }"
    >
      <q-card-section v-if="item === '1'">
        <uploadWeeksLessons
          :weeks="weeks"
          :formType="formType"
          title="העלאת ועריכת שבועות ושיעורים"
        />
      </q-card-section>

      <q-card-section v-if="item === '2'">
        <uploadPractices
          :weeks="weeks"
          :lessons="existLessons"
          :formType="formType"
        />
      </q-card-section>

      <q-card-section v-if="item === '3'">
        <examsUploadForm />
      </q-card-section>

      <q-card-section v-if="item === '4'">
        <openPermForExams />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import uploadPractices from "@/components/uploadPractices.vue";
// import examsUploadForm from "@/components/examsUploadForm.vue";
import HafifaCheckMainCompo from "@/components/HafifaCheckMainCompo.vue";
import examsUploadForm from "@/components/examsUploadForm.vue";
import uploadWeeksLessons from "@/components/uploadWeeksLessons.vue";
import openPermForExams from "@/components/openPermForExams.vue";
import axios from "axios";

export default {
  components: {
    uploadPractices,
    HafifaCheckMainCompo,
    examsUploadForm,
    uploadWeeksLessons,
    openPermForExams,
  },
  data() {
    return {
      showModal: false,
      item: null,
      cardWidth: 0,
      cardHeight: 0,
      maxHeight: "unset",
      weeks: [],
    };
  },

  beforeMount() {
    this.getWeeks();
  },

  methods: {
    opendialog(val) {
      this.item = val;
      if (this.item === "1") {
        this.formType = "uploadWeeksLessons";
        this.cardWidth = "720px";
        this.cardHeight = "unset";
        this.maxHeight = "450px";
      } else if (this.item === "2") {
        this.formType = "uploadPractices";

        this.cardWidth = "850px";
        this.cardHeight = "450px";
      } else {
        this.cardWidth = "800px";
        this.cardHeight = "510px";
      }
      console.log(this.item);
      this.showModal = true;
    },
    colseDialog() {
      this.showModal = false;
      this.item = null;
    },

    async getWeeks() {
      const mahlakaId = localStorage.getItem("mahlakaId");
      var res = null;
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl +
            `getByTitle('weeks')/items?$filter=mahlaka eq ${mahlakaId}`
        );
      } else {
        res = await axios.get(this.$sharePointUrl + "weeks");
        res.data.value = res.data.value.filter(
          (item) => item.mahlakaId == mahlakaId
        );
      }
      this.weeks = res.data.value;

      console.log("weeks: ", this.weeks);
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  justify-content: center;
}
.main-card {
  margin-top: 30px;
  height: calc(100vh - 200px);
  width: 60vw;
  border-radius: 20px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 10px 0 rgb(25 35 85 / 10%);
  border: solid 1px #dde3ff;
  background-color: #dfe2f214;
  transition: all 0.5s, height 0s;
  z-index: 1;
  position: relative;

  /* background-image: linear-gradient(121deg, #ffffff 12%, #e9f3ff 100%); */
}
.checking-accordion {
  /* justify-content: center; */
  /* min-height: 72vh; */
  width: 60%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.card-flex {
  display: flex;
  height: 90%;
  padding: 1.5em;
}
.upload-btns {
  height: 100%;
  width: 40%;
  margin-right: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btns-flex {
  justify-content: center;
  margin-top: 80px;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 85%;
  width: 75%;
  transition: color 0.5s;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 1px 5px rgb(0 0 0 / 7%), 0 2px 2px rgb(0 0 0 / 3%),
    0 3px 1px -2px rgb(0 0 0 / 8%);
}

.grid-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 22px;
  font-weight: 600;
  color: gray;
  border-bottom: 1px solid #dde3ff;
}
.grid-btn:first-child:hover {
  border-radius: 15px 15px 0 0;
}
.grid-btn:last-child:hover {
  border-radius: 0 0 15px 15px;
}
.q-btn:before {
  box-shadow: none !important;
}
.grid-btn:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
.history {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  bottom: 10px;
}
.history-btn {
  width: 40%;
  background: rgba(240, 240, 240, 0.916);
  box-shadow: none !important;
  border: none;
  /* height: 48px; */
  font-size: 20px;
  font-weight: bold;

  border-radius: 15px;
}
.reset-media-query {
  max-width: unset !important;
}
</style>
