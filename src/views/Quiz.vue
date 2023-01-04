<template>
   <QuizTemplate :examData="examData.exam" />
</template>

<script>
import axios from 'axios'
import QuizTemplate from "../components/QuizTemplate.vue"
export default {
  components:{
    QuizTemplate
  },
  data(){
    return{
      routerName:"",
      examData:[]

    }
  },
   
    async beforeMount(){
      const res = await axios.get("http://localhost:3000/practice")
      this.examData = res.data.value;
      this.examData = this.examData.filter(data=>data.routerTitle==this.$route.params.title )[0]
      console.log(this.examData)
      }
     
    
}
</script>

<style scoped>

</style>