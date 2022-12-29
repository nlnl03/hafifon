<template>
  <h2>{{title}}</h2>
</template>

<script>
export default {
name:"Practice",
props:["title","redirect"],
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