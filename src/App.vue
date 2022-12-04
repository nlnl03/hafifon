<template>
  <div class="main-container">
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
@font-face {
  src: url(./assets/Assistant-Regular.ttf);
  font-family: Assistant-Regular ;

}
 body{
   margin: 0;
     font-family: Assistant-Regular ;

 }
 .main-container{
    width: 100vw;
    height: 200vh;
}

</style>
