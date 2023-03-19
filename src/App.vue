<template>
  <div>
    <MainNavbar/>
    <router-view/>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue'
export default {
    name: 'App',
    components:{
        MainNavbar
    },
     
    }

</script>

<style>
.vue3-circular-progressbar .current-counter{
    font-size: 45px;
    top: 47%;
    left: 52%;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.progress-item .vue3-circular-progressbar .current-counter::after{
    font-size: 35px;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    content: '%' ;
}
   .average-items .vue3-circular-progressbar .current-counter::after{
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
}


@media (max-width:1280px) {
    :root{
      --user-link-pos:30px ;
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
  button{
        outline: none;
     }
</style>
