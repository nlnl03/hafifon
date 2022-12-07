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
:root{
  --main-background-color: rgb(0, 162, 243);
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
