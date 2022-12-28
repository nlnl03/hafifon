<template>
<div class="container">
   <div class="title"><h1>ברוכים הבאים לאתר חפיפה</h1></div>
   <div class="name"><h2>שלום טכנאי</h2></div>
      <div class="btns">
         <router-link to="">המשך תרגול</router-link>
         <router-link to="">למבחן הסופי</router-link>
      </div>
</div>
   
</template>

<script>
 export default {
    components:{
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
</style>