<template>
    <MainNavbar v-if="!isNotFoundRoute"/>
    <div v-if="scroll >=300">
      <button class="scroll-to-top" @click="scrollToTop">
          &#9650;
      </button>
    </div>
    <router-view  :key="$route.fullPath">  </router-view>
  
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
        userNum:null,
        isAdmin:null,
        scroll:null
      }
    },
      methods:{
        scrollToTop(){
          console.log(window.pageYOffset)
          window.scrollTo({
            top:0,
            behavior:'smooth'
          })
        },
        async getToken(){
          const res = await axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
          this.token = res.data.FormDigestValue
          // console.log(this.token)
      },
      async getCurrentUser(){
         const res = await axios.get(this.currentUser)
          this.currentUserData = res.data;
          var userNum = this.currentUserData.LoginName.split('s')
          this.userNum = userNum[1]
          this.Id=this.currentUserData.Id
          const Title = this.currentUserData.Title.split(' -')
          this.userName = Title[0]
            localStorage.setItem("userName",this.userName)
            localStorage.setItem("userId",this.Id)
            localStorage.setItem("userNum",this.userNum)
          console.log(this.Id)
          // console.log(this.currentUserData)
        },
        showScrollBtn(){
          this.scroll = window.scrollY
        },
        
 },

        beforeMount(){
          this.getCurrentUser()
      },

       created(){
         window.addEventListener('scroll', this.showScrollBtn)
       },
        unmounted(){
          window.removeEventListener('scroll', this.showScrollBtn)
        },
        computed:{
          isNotFoundRoute(){
            return this.$route.matched.some(record => record.meta.notFound)
          }
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
.users-progress-item .vue3-circular-progressbar .current-counter::after,
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
  .progress-circle .vue3-circular-progressbar .current-counter{
    font-size: 32px;
  }
  .progress-circle .vue3-circular-progressbar .current-counter::after{
    font-size: 22px;
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
  --user-main-margin-right: 18%;
  --user-main-margin-left: 15%;
  --home-btn-position:150px;
  --scroll-top-btn-position:110px;
  --scroll-top-btn-size:60px;
  --permission-box-width: 55%
}
 

@media (max-width:1280px) {
    :root{
      --user-link-pos:70px ;
      --home-btn-position:100px;
      --box-check-width:1050px;
      --user-main-margin-right: -1%;
      --user-main-margin-left: -3%;
      --scroll-top-btn-position: 40px;
      --scroll-top-btn-size:50px;
      --permission-box-width:70%

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
      font-family: Assistant-Regular !important;
      direction: rtl;
 
  }
  body{
    min-height: 100vh;
    height: 100vh;
    min-width: 100vw;
    line-height: normal !important;
    width: 100vw;
    overflow-x: hidden;
  }
  *, *:before, *:after{
    box-sizing:revert
  }
  button{
        outline: none;
     }
  .swal2-popup{
     height: 470px;
     width: 48em !important;
     border-radius:10px !important ;
  }
  .scroll-to-top{
    position: fixed;
    z-index: 100000;
    bottom:70px;
    right: var(--scroll-top-btn-position);
    height: var(--scroll-top-btn-size);
    width: var(--scroll-top-btn-size);
    border-radius: 50%;
    background: var(--main-background-color);
    border:none;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
    font-size: 20px;
    line-height: 1;
    transition: background-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }
  .scroll-to-top:hover{
    background-color:  #3b999b;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
  }
 
h4{
  font-weight: bold;
  line-height: unset;
}
 h2{
   line-height: unset;
   letter-spacing:unset;
   display: block;
   font-size: 1.5em;
   font-weight: bold;
 }
 h1{
   font-weight:bold ;
   margin-bottom: 10px;
   line-height: unset;
   letter-spacing:unset
 }

 </style>
