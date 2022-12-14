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

    <div class="progress-info">
         <div class="progress-item">
           <div class="title">כמה עברתי מהחפיפה</div> 
        <div class="progress-circle">
          <circle-progress 
          :percent="70"
          :show-percent="true"
           fill-color="#00a2f3"
           :viewport="true"
           :transition="600"
          />
        </div>
        </div>
     </div>

  </div> 
</div>
 
</template>

<script>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"
import axios from 'axios';
export default {
  components:{
    CircleProgress
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
    margin-top: 10px;
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
   direction: rtl;
  margin-right: 100px;
}

.personal-info{
    background-color: #fff  ;
    width: 500px;
    height: 250px;
    border-radius: 20px 20px 20px 20px;
    margin-bottom: 30px 
}
 .progress-info{
    background-color: #fff  ;
    width: 420px;
    height: 290px;
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
   .all-progress {
    display: flex;
    justify-content: center;
    height: 100%;
   }
   .progress-item{
    display: flex;
    flex-direction: column;
    height: 90%;
    align-items: center;
    justify-content: space-evenly;

   }
   .title{
      width: 45%;
      padding-bottom: 7px;
      font-size: 20px;
      text-align: center;
      border-bottom: 1px solid var(--main-background-color)  ;
    }
 
</style>