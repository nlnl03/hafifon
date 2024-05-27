<template>
  <div class="main">
    <uploadWeeksLessons
      :formType="formType"
      :weeks="weeks"
      title="העלאת ועריכת תרגולים"
    />
  </div>
</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";
import uploadWeeksLessons from "@/components/uploadWeeksLessons.vue";
import addNewPractice from "@/components/addNewPractice.vue";
import practiceResultVue from "../views/quizRoutes/practiceResult.vue";
export default {
  name: "uploadForm",
  components: {
    loadingSpinner,
    uploadWeeksLessons,
    addNewPractice,
  },
  props: {
    existLessons: Array,
    formType: String,
    weeks: Array,
  },

  data() {
    return {
      weeksWithDetails: [],
      filteredLessons: [],
      filteredPractices: [],
      selectedWeek: null,
      selectedLesson: null,
      loading: false,
      currentWeekIndex: null,
      lessons: [
        { id: 1, Title: "lesson 1" },
        { id: 2, Title: "lesson 2" },
      ],
    };
  },

  methods: {
    addPractice(lessonId) {
      return (practice) => {
        const lesson = this.lessons.find((l) => l.Id === lessonId);
        if (lesson) {
          if (!lesson.practices) {
            this.$set(lesson, "practices", []);
          }
          lesson.practices.push(practice);
        }
      };
    },
  },

  beforeMount() {
    console.log(this.formType);
    console.log(this.weeks);
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
        return !!this.selectedWeek && !!this.selectedLesson;
      },
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  color: rgba(0, 0, 0, 0.71);
  margin-bottom: 50px;
  margin-top: 20px;
  font-size: 32px;
  font-weight: 600;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.loading {
  position: relative;
  top: 100px;
}
.main-dialog {
  width: 65%;
}
.submit-btn {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
