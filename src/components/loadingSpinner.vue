<template>
  <div class="spin"></div>
</template>

<script>
  export default {
    name: "loadingSpinner"
  };
</script>

<style scoped>
  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }

  .spin::before {
    animation: 0.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px #cfd0d1;
    border-bottom-color: var(--main-background-color);
    border-radius: 50%;
    content: "";
    height: 100px;
    width: 100px;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    will-change: transform;
  }
</style>
