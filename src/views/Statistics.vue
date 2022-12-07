<template>
<div class="main">
  <div class="info">
        <div class="name-detail">
            שם:  {{userDetails[0].name}} 
        </div>

        <div class="name-detail">
           מחלקה: {{userDetails[0].mahlaka}}
        </div>

  </div>
 </div>
 
</template>

<script>
import axios from 'axios';
export default {
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

.info{
  position: relative;
  background-color: rgb(150, 154, 158);
  top: 8%;
  left: 8%;
  width: 35vw;
  height: 280px;
  border-radius: 20px 20px 20px 20px;
  border: 1px black solid;
 
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
.details-items{
  
}
</style>