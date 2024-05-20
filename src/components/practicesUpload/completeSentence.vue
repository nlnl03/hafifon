<template>
  <div class="q-pa-md">
    <div class="q-gutter-xs">
      <q-chip
        v-for="(word, index) in sentences"
        :key="index"
        :label="!word ? '____' : word"
        removable
        @remove="removeItem(index)"
        :color="!word ? 'red' : 'primary'"
        text-color="white"
      >
      </q-chip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sentences: Array,
    value: Array,
  },
  data() {
    return {};
  },

  methods: {
    removeItem(index) {
      this.sentences.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
