<template>
<div class="main">
  <div class="personal-info">
        <div class="name-detail">
            שם:   
            מחלקה:  
        </div>

  </div>
  <div class="grades-info">
        <div class="name-detail">
            שם:   
            מחלקה: 
        </div>
 </div>
   </div>
   <div class="drer">
     <vue-ellipse-progress />
   </div>

</template>

<script>
 import axios from 'axios';
export default {
  components:{
   },
  data(){
    return{
      userDetails:[]
    }
  },
  async beforeMount(){
   const res = await axios.get('http://localhost:3000/users');
      this.userDetails = res.data;
      console.log(this.userDetails)
  }
}
</script>

<style>
.main{
  display: flex;
  flex-direction: column;
  direction: rtl;
     margin-right: 70px;

  
}
.personal-info{
   background-color: #fff  ;
   transform: translateY(10%);
   width: 32vw;
   height: 250px;
   border-radius: 20px 20px 20px 20px;
   box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
   margin-bottom: 80px 
}
 .grades-info{
   background-color: #fff  ;
   width: 32vw;
   height: 250px;
   border-radius: 20px 20px 20px 20px;
   box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
 }
.name-detail{
   padding:  0px 20px;
   top: 40px;
   margin-bottom: 70px ;
   position: relative;
   font-size: 25px;
   display: flex;
   flex-direction: column;
   text-align: right;
 }
 
</style>