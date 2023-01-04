<template>
<beforeEnterQuiz  :title="title" />
</template>

<script>
import beforeEnterQuiz from '@/components/beforeEnterQuiz.vue'
export default {
name:"Practice",
components:{
beforeEnterQuiz
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
//  console.log(this.$route.params)
//   if(localStorage.getItem(this.title)){
//      this.practiceObject = JSON.parse(localStorage.getItem(this.title))
//      console.log("second try")
//   }
//   else{
//       localStorage.setItem(this.title,this.$route.params.practices);
//      console.log("first try")

//       this.practiceObject = JSON.parse(this.$route.params.practices)

//   }

//   console.log(this.practiceObject)

}
}
</script>

<style scoped>

</style>