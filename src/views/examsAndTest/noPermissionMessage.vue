<template>
  <div class="loader-spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div>

  <div class="no-permission-mess" v-if="isLoadForSpinner">
    <h1>אין לך הרשאות לעמוד זה...</h1>
  </div>
</template>

<script>
import loadingSpinner from "@/components/loadingSpinner.vue";
export default {
  components: {
    loadingSpinner,
  },
  data() {
    return {
      isLoadForSpinner: false,
    };
  },
  methods: {
    spinner() {
      this.isLoadForSpinner = true;
    },
  },
  beforeMount() {
    const myTimeOut = setTimeout(this.spinner, 170);
  },
};
</script>

<style scoped>
.no-permission-mess {
  font-size: 35px;
  margin-top: 150px;
  text-align: center;
}
.loader-spinner {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
