<template>
<div class="main">
  <div class="right-side-flex"> 
  <div class="personal-info">
      <div class="inner-right-flex"> 
        <div class="name-detail">
            <h2>נעם לביא</h2>  
            <h5>מרתף הקסמים</h5>
              
        </div>
        <div class="hafifa-nickname"> 

          </div>
          </div>
  <div class="inner-left-flex">
    <img src=""> 
  </div>
  </div>
  <div class="grades-info">
        <!-- <div class="name-detail">
            שם:   
            מחלקה: 
        </div> -->
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

<style scoped>

h5{
  color:grey;
}
.right-side-flex{
    width: 50%;
    height: 80%;
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    justify-content:flex-start;
}
.main{
  /* display: flex; */
  /* flex-direction: column; */
  height: 95vh;
  direction: rtl;
  margin-right: 70px;
}
.personal-info{
   /* background-color: #fff  ; */
   width: 32vw;
   height: 250px;
   border-radius: 20px 20px 20px 20px;
   /* box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2); */
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
   padding:  0px 10px;
   /* margin-top: 40px;
   margin-right: 40px;
   margin-bottom: 70px ; */
   position: relative;
   font-size: 25px;
   display: flex;
   border-right: 2px solid var(--main-background-color);
   flex-direction: column;
   text-align: right;
 }
 
</style>