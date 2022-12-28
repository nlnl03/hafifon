<template>
  
</template>

<script>
import axios from 'axios';
export default {
data(){
  return{
      exam1Data:[]
  }
},
async beforeMount(){
    const res = await axios.get("http://localhost:3000/exam1");
    this.exam1Data = res.data.value;
    console.log(this.exam1Data)

}
}
</script>

<style scoped>

</style>