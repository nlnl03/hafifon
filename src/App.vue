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
    }
}
</script>

<style>
.vue3-circular-progressbar .current-counter{
   font-size: 45px;
   font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}.vue3-circular-progressbar .current-counter::after{
   font-size: 35px;
      font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

   content: '%' ;
}
:root{
  --main-background-color: #00a2f3;
  --user-link-pos: 100px;
}


@media  (max-width:1280px) {
    :root{
      --user-link-pos:30px ;
    }
}
@font-face {
  src: url(./assets/Assistant-Regular.ttf);
  font-family: Assistant-Regular ;

}
*, body{
   margin: 0;
   padding: 0;
     font-family: Assistant-Regular ;
  }
 .main-container{
     height: 200vh;
}

</style>
