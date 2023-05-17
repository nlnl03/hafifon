<template>
  
    <MainNavbar/>
    <router-view/>
  
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue'
import axios from 'axios'
export default {
    name: 'App',
    components:{
        MainNavbar
    },
    data(){
      return{
        token:null,
        currentUser: process.env.NODE_ENV =='development'? "http://localhost:3000/currentUser" : "https://portal.army.idf/sites/gdud0383/Team/_api/web/currentUser",
        urlForToken: process.env.NODE_ENV =='development'? `http://localhost:3000/`:"https://portal.army.idf/sites/hafifon383/_api/contextinfo",
        Id:null,
        userName:null,
        isAdmin:null
        
      }
    },
      methods:{
        async getToken(){
          const res = await axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
          this.token = res.data.FormDigestValue
          // console.log(this.token)
      },
      async getCurrentUser(){
         const res = await axios.get(this.currentUser)
          this.currentUserData = res.data;
          this.Id=this.currentUserData.Id
          const Title = this.currentUserData.Title.split(' -')
          this.userName = Title[0]
           localStorage.setItem("userName",this.userName)
          localStorage.setItem("userId",this.Id)
          console.log(this.Id)
          // console.log(this.currentUserData)
        },

    
    async checkIfAdmin(){
            var res = null
            if(this.$isSharePointUrl){
                res = await axios.get(this.$sharePointUrl+"getByTitle('AdminCheck')/Items")
            }
            else{
                 res = await axios.get(this.$sharePointUrl + "AdminCheck")
            }
                // console.log(res.data.value)
                if(res.data.value.length){
                    this.isAdmin = true
                }
                else{
                    this.isAdmin = false
                 }
                // console.log("isAdmin: "+ this.isAdmin)
                sessionStorage.setItem("isAdmin",this.isAdmin)
        }      
 },

        beforeMount(){
          this.getCurrentUser()
          this.checkIfAdmin()
      }
      
     
    }

</script>

<style>
.vue3-circular-progressbar .current-counter{
    font-size: 45px;
    top: 47%;
    left: 52%;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.users-progress-item .vue3-circular-progressbar .current-counter::after{
    font-size: 35px;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    content: '%' ;
}
 .practice-results-score .vue3-circular-progressbar .current-counter::after{
    font-size: 35px;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    content: '%' ;
  }
  .average-items .vue3-circular-progressbar .current-counter{
        font-size: 40px;
        /* top:20px */
  }
   .average-items .vue3-circular-progressbar .current-counter::after{
      content: '%';
      font-size: 25px;
  }
  .average-items .vue3-circular-progressbar .loading-spinner{
      content: '%';
      font-size: 28px;
  }
   ::-webkit-scrollbar{
  width: 10px;
}
::-webkit-scrollbar-track{
  background-color: #c5c2c2;
    border-radius: 5px;

 }
::-webkit-scrollbar-thumb{
  background: #888;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover{
  background: rgb(117, 116, 116);
}
 
:root{
  --main-background-color: #4EADAF;
  --user-link-pos: 100px;
  --table-width: 950px;
  --table-header-width: calc(var(--table-width)/3);
  --exams-form-width:1400px;
  --box-check-width: 1200px ;
}
 

@media (max-width:1280px) {
    :root{
      --user-link-pos:50px ;
      --box-check-width:1050px
    }
    form[class="exam"]{
      --exams-form-width:1150px;
    }
}
@font-face {
  src: url(./assets/Assistant-Regular.ttf);
  font-family: Assistant-Regular ;

}
*, body{
      margin: 0;
      padding: 0;
      font-family: Assistant-Regular;
      direction: rtl;

  }
  body{
    min-height: 100vh;
    height: 100vh;
    min-width: 100vw;
    width: 100vw;
    overflow-x: hidden;
  }
  button{
        outline: none;
     }
  .swal2-popup{
     height: 470px;
     width: 48em !important;
     border-radius:10px !important ;
  }
 </style>
