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
 body{
   margin: 0;
 }
 .main-container{
    width: 100vw;
    height: 200vh;
}

</style>
