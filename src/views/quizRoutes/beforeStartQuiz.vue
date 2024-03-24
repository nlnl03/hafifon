<template>
  <div class="main-flex">
    <div class="box">
      <span class="title">{{ this.$route.params }}</span>

      <div class="guide">
        התרגול מורכב מכמה סוגי של שאלות למשל: אמריקאיות, בנק מילים, השלמה ועוד.
      </div>
      <q-btn class="start-btn" label="התחל" @click="goToPrac" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToPrac() {
      this.$router.push({ name: "quiz", params: this.$route.params });
    },
  },
};
</script>

<style scoped>
.main-flex {
  display: flex;
  justify-content: center;
  margin-top: 130px;
}
.box {
  height: 400px;
  width: 600px;
  box-shadow: 0 0 7px 0 rgb(0 0 0 / 21%);
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  flex-direction: column;
  padding: 1.5em;
}
.title {
  font-weight: 700;
  font-size: 65px;
}
.guide {
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.start-btn {
  background-color: var(--main-background-color);
  color: white;
  width: 75px;
  border-radius: 5px;
  font-size: 16px;
}
</style>
