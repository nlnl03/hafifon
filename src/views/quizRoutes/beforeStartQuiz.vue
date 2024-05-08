<template>
  <div class="main-flex">
    <div class="box">
      <span class="title">{{ pracTitle }}</span>
      <div class="info">
        <span class="guide-title">התרגול מורכב מכמה סוגי של שאלות למשל:</span>
        <h6 class="guide">אמריקאיות, בנק מילים, השלמה ועוד.</h6>
      </div>
      <q-btn class="start-btn" label="התחל" @click="goToPrac" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pracTitle: "",
    };
  },
  methods: {
    goToPrac() {
      this.$router.push({ name: "quiz", params: this.$route.params });
    },
  },
  beforeMount() {
    this.pracTitle = localStorage.getItem("pracTitle");
  },
};
</script>

<style scoped>
.main-flex {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-right: 20px;
  margin-left: 20px;
}
.box {
  min-height: 450px;
  width: 700px;
  box-shadow: 0 0 7px 0 rgb(0 0 0 / 21%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  padding: 1.5em;
}
.title {
  font-weight: 700;
  font-size: 55px;
  margin-bottom: 25px;
  margin-top: 30px;
}
.info {
  margin-top: 30px;
}
.guide {
  margin-top: 10px;
  font-size: 28px;
  text-align: center;
}
.guide-title {
  font-size: 30px;
}
.start-btn {
  background-color: var(--main-background-color);
  color: white;
  width: 75px;
  border-radius: 5px;
  font-size: 16px;
  position: relative;
  margin-top: 100px;
}
</style>
