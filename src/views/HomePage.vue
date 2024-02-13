<template>
    
   <div class="container" >
      <div class="main-background">
         <div class="welcome" >
             <h1>ברוכים הבאים לאתר חפיפה</h1> 
            <div class="name"><h2>שלום {{userName}}</h2></div>
               
         </div>   
      </div>
   </div>
   
</template>

<script>
import axios from 'axios'
import loadingSpinner from '@/components/loadingSpinner.vue'
 export default {
   name:'HomePage',
   components:{
      loadingSpinner
   },
     data(){
      return{
          userName:'',
       }
     },
     methods:{
     
        
     
  },
   

     beforeMount(){
      this.userName = localStorage.getItem("userName")
        
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
 
 .loading-spinner{
   position: relative;
   top:0;
}
h1{
   font-size: 50px;
 }
</style>