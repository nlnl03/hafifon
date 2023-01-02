<template>
<Quiz :subject="practiceObject.subject" :exam="practiceObject.exam"/>
</template>

<script>
import Quiz from '@/components/Quiz.vue'
export default {
name:"Practice",
components:{
Quiz
},
props:["title"],
 data(){
    return{
      title:"",
      practiceObject:""
    }
},

beforeMount(){
 this.title = this.$route.params.title
 console.log(this.$route.params)
  if(localStorage.getItem(this.title)){
     this.practiceObject = JSON.parse(localStorage.getItem(this.title))
     console.log("second try")
  }
  else{
      localStorage.setItem(this.title,this.$route.params.practices);
     console.log("first try")

      this.practiceObject = JSON.parse(this.$route.params.practices)

  }

  console.log(this.practiceObject)

}
}
</script>

<style scoped>

</style>