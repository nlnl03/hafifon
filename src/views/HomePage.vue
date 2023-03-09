<template>
   <div class="loading-spinner" v-if="!isLoad">
      <loadingSpinner />
   </div>

   <div class="container" v-if="isLoad">
      <div class="title"><h1>ברוכים הבאים לאתר חפיפה</h1></div>
      <div class="name"><h2>שלום {{userName}}</h2></div>
         <div class="btns">
            <router-link to="">המשך תרגול</router-link>
            <router-link to="">למבחן הסופי</router-link>
         </div>
   </div>
   
</template>

<script>
import axios from 'axios'
import loadingSpinner from '../components/loadingSpinner.vue'
 export default {
   name:'HomePage',
   components:{
      loadingSpinner
   },
     data(){
      return{
         currentUserData:[],
         Id:null,
         isLoad:false,
         timeOut:null,
         token:'',
         // sharePointUrl:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('students')/items",
         currentUser:"https://portal.army.idf/sites/gdud0383/Team/_api/web/currentUser",
         userName:'',
       }
     },
     methods:{
     async getCurrentUser(){
        const res = await axios.get(this.currentUser)
          this.currentUserData = res.data;
          this.Id=this.currentUserData.Id
         console.log(this.currentUserData.Title)
          const Title = this.currentUserData.Title.split(' -')
          this.userName = Title[0]
          console.log(this.userName)
          localStorage.setItem("userName",this.userName)
          localStorage.setItem("userId",this.Id)
          console.log(this.userName)
          console.log(this.currentUserData)
          this.isLoad = true;
       },
       async getToken(){
          const res = await axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
          this.token = res.data.FormDigestValue
          console.log(this.token)
       },
  },
   

   beforeMount(){
     this.timeOut = setTimeout(this.getCurrentUser,80)
   }
}
</script>

<style scoped>
.container{
   text-align: center;
 }
.btns{
   display: flex;
   flex-direction: row;
   width: 50px;
   height: 50px;
   /* background-color: blue; */
}
.loading-spinner{
   position: relative;
   top:0;
}
</style>