<template>
<div class="main">
  <div class="right-side-flex">
    <div class="fff"> 
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
        <div class="left-side-flex">
            <div class="grid-container">
              <div class="average"><span>בוחן 1:  </span></div>
              <div class="test-1-score" >sddsd</div>
              <div class="test-2-score">sdsdsd</div>
              <div class="test-3-score">sddsdsw</div>
              <div class="test-4-score">wewewew</div>
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
      userDetails:[],
      gradesAvera: [],
      tests:[{
      class:"",color:"" 
      }]
    }
  },
   

  async beforeMount(){
    const res = await axios.get('http://localhost:3000/users');
    this.userDetails = res.data;
    this.finished = true;
    console.log(this.userDetails)
    for(let i in this.userDetails.grades){
      var exam1 = parseInt(this.userDetails.grades.test1);
          var exam2 = parseInt(this.userDetails[i].grades.test2);
          var exam3 = parseInt(this.userDetails[i].grades.test2);
          var exam4 = parseInt(this.userDetails[i].grades.test2);
          var sum = (exam1 + exam2 + exam3 + exam4)/4;
          this.gradesAvera.push(sum)
    }
               console.log(this.gradesAvera)

  }
}
</script>

<style scoped>
.main{
    display: flex;
    direction: rtl;
    text-align: center;
    height: 620px;
    margin-right: 10%;
    margin-left: 10%;
}
.fff{
  height: 93%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
    
}

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
     height: 100%; 
    align-items: center;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
 }
.left-side-flex{
    width: 50%;
    align-items: center;
    justify-content: center;
     height: 100%;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
  }
  .inner-right-flex{
    display: flex;
    width: 40%;
    height: 100%;
    margin-right: 10px;
    justify-content: space-evenly;
    flex-direction: column;
  }

.personal-info{
    background-color: #fff  ;
    width: 500px;
    height: 250px;
    border-radius: 20px 20px 20px 20px;
    margin-bottom: 65px 
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
  
 .average-title{
    width: 45%;
    padding-bottom: 7px;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid var(--main-background-color);

 }
 .grid-container{
    display: grid;   
    justify-content: end;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-template-columns: 0.1fr 0.1fr 0.1fr;
    grid-template-rows: 0.4fr 0.4fr 0.4fr;
    gap: 5px 5px;
      grid-template-areas:
      "test-1-score . test-3-score"
      ". average ."
      "test-2-score . test-4-score";
 }
 .average{
    grid-area: average;
    width: 200px;
    height: 200px;
    background-color: var(--main-background-color);
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;


 }
 .test{
    grid-area: var(--grid-area);
    width: 160px;
    height: 160px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
 }
 .test-1-score{
    grid-area: test-1-score;
    width: 160px;
    height: 160px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
 }
 .test-3-score{
    grid-area: test-3-score;
    width: 160px;
    height: 160px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
 }
 .test-4-score{
    grid-area: test-4-score;
    width: 160px;
    height: 160px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
 }
 .test-2-score{
    grid-area: test-2-score;
    width: 160px;
    height: 160px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
 }
</style>