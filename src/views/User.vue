<template>
<div class="main">
  <div class="right-side-flex"> 
    <div class="personal-info">
      <div class="personal-info-items">
        <div class="inner-right-flex"> 
          <div v-if="finished" class="name-detail">
              <h2 >{{userDetails[0].name}}</h2>  
              <h5>{{userDetails[0].mahlaka}}</h5>
          </div>

          <div class="hafifa-nickname"> 
                חפיפון מתחיל
          </div>
        </div>

        <div class="inner-left-flex">
              <img class="user-image" :src="require('@/assets/KioskServlet.jpg')"  > 
        </div>
      </div>
    </div>

    <div class="grades-info">
      <div class="progress-circle">
          <!-- <v-progress-circular value="70" color="red">

          </v-progress-circular> -->
          <!-- <v-btn> </v-btn> -->
      </div>
    </div>

  </div> 
</div>
 
</template>

<script>
import axios from 'axios';
export default {
  components:{
   },
  data(){
    return{
      finished:false,
      userDetails:[]
    }
  },

  async beforeMount(){
    const res = await axios.get('http://localhost:3000/users');
    this.userDetails = res.data;
    this.finished = true;
    console.log(this.userDetails)
  }
}
</script>

<style scoped>
.hafifa-nickname{
  text-align: center;
  font-size: 20px;
  background:var(--main-background-color);
  color:white;
  border-radius: 20px;
}
.user-image{
  height:150px;
  border-radius: 50%;
  width: 150px;
}
h5{
  color:grey;
 }
 
.personal-info-items{
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }

.right-side-flex{
    width: 50%;
    height: 80%;
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    justify-content:flex-start;
}
  .inner-right-flex{
    display: flex;
    width: 40%;
    height: 100%;
    margin-right: 10px;
    justify-content: space-evenly;
    flex-direction: column;
  }
.main{
  height: 90vh;
  direction: rtl;
  margin-right: 70px;
}
.personal-info{
    background-color: #fff  ;
    width: 500px;
    height: 250px;
    border-radius: 20px 20px 20px 20px;
    margin-bottom: 80px 
}
 .grades-info{
    background-color: #fff  ;
    width: 500px;
    height: 250px;
    border-radius: 20px 20px 20px 20px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
 }
.name-detail{
    padding:  0px 10px;
    font-size: 25px;
    border-right: 2px solid var(--main-background-color);
  }

 .inner-left-flex{
    display: flex;
    height: 100%;
    width: 50%;
    justify-content: center;
    align-items:center;
  }
 
</style>