<template>
   <div class="loading-spinner" v-if="!isLoad">
      <loadingSpinner />
   </div>

   <div class="container" >
      <div class="main-background">
         <div class="welcome" v-if="isLoad">
             <h1>ברוכים הבאים לאתר חפיפה</h1> 
            <div class="name"><h2>שלום {{userName}}</h2></div>
               <!-- <div class="btns">
                  <router-link to="">המשך תרגול</router-link>
                  <router-link to="">למבחן הסופי</router-link>
               </div> -->
         </div>   
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
         userName:'',
       }
     },
     methods:{
     
       async getToken(){
               return axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo").then(res=>res.data.FormDigestValue)
       },

      async checkIfUser(){
         this.Id = localStorage.getItem("userId")
         this.userName = localStorage.getItem("userName")
         console.log(this.Id)
         console.log(this.$isSharePointUrl)
         if(this.$isSharePointUrl){
            const res = await axios.get(this.$sharePointUrl+`getByTitle('students')/items?$filter=num eq '${this.Id}'`)
            const resData = res.data.value
            console.log(resData)
           this.token = await this.getToken()
           console.log(this.token)
               if(!resData.length){
                  try{
                     const results = await axios.post(this.$sharePointUrl+"getByTitle('students')/items",{
                        Title:this.userName,
                        num:this.Id,
                        exam1:null,
                        exam2:null,
                        exam3:null,
                        exam4:null,
                        finalTest:null,
                     },
                     {
                        headers:{
                        'X-RequestDigest':this.token,
                        }
                     })
                  }
               catch(error){
                  console.log(error.message)
               }
         }
       }
            this.isLoad = true
            console.log(this.isLoad)
    }
  },
   

     beforeMount(){
        const myTimeOut = setTimeout(this.checkIfUser,500)
        
    }
}
</script>

<style scoped>
.container{
    min-height: 86.5vh;
    height: 86.5vh;
    min-width: 100vw;
    width: 100vw;
 }
   .main-background{
      background-image: url("../assets/homePageBackground.png");
      background-position: center;
      /* animation: animate 10s linear infinite; */
      background-size: cover;
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      overflow: hidden;
  }
  @keyframes animate{
     0%{
        background-position: 0 0;
     }
     50%{
        background-position: 50% 0;
     }
     100%{
        background-position: 100% 0;
     }
     
  }
   .welcome{
      margin-top: 70px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
/* .btns{
   display: flex;
   flex-direction: row;
    background-color: blue;
} */

 .loading-spinner{
   position: relative;
   top:0;
}
h1{
   font-size: 50px;
   margin-bottom: 10px;
 }
</style>