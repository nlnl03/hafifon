<template>
  <div class="main">
    <uploadWeeksLessons :formType="formType" :weeks="weeks" />
  </div>
</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";
import uploadWeeksLessons from "@/components/uploadWeeksLessons.vue";
export default {
  name: "uploadForm",
  components: {
    loadingSpinner,
    uploadWeeksLessons,
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
    };
  },

  methods: {},

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
