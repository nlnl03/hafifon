<template>
  <h2>{{title}}</h2>
</template>

<script>
export default {
name:"Practice",
props:["title"],
mounted(){
  console.log(JSON.parse(this.$route.params.practices))
}
}
</script>

<style scoped>

</style>