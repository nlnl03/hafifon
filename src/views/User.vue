<template>
<h1>האיזור האישי</h1>
<div class="under-line"></div>
<div class="main">
  <div class="right-side-flex">
    <div class="name-progress-details"> 
    <div class="personal-info">
      <div class="personal-info-items">
        <div class="inner-right-flex"> 
          <div v-if="isFinished" class="name-detail">
              <h2>{{userName}}</h2>  
           </div>

          <div class="hafifa-nickname"> 
                חפיפון מתחיל
          </div>
        </div>

        <div class="inner-left-flex">
              <img class="user-image" src="http://www.portalhr.leshem.idf/KioskServlet?infoOrPic=pic"> 
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
              <div class="average">
                <span class="items-title">ממוצע ציונים </span>
                   <span class="gradeAv"></span>
              </div>
              <div class="test-1-score" >
                <span class="items-title">מבחן 1</span>
                    <span class="the-grades"> </span>
              </div>
              <div class="test-2-score">
                 <span class="items-title">מבחן 2</span>
                    <span class="the-grades"> </span>
              </div>
              <div class="test-3-score">
                 <span class="items-title">מבחן 3</span>
                    <span class="the-grades"> </span>
              </div>
              <div class="test-4-score">
                 <span class="items-title">מבחן 4</span>
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
       userDetails:[],
       gradesAvera: [],
       userName:'',
       isFinished:false
      // tests:[{
      // class:"",color:"" 
      // }]
    }
  },
    beforeMount(){
      var userName = localStorage.getItem("userName")
      this.userName =  userName
      console.log(this.userName)
      this.isFinished = true
      
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
.name-progress-details{
  height: 93%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
    
}
h1{
  font-size: 60px;
  color: var(--main-background-color);
  position: relative;
  margin-bottom: 50px;
   top: 30px ;
  text-align: center;
}
.under-line{
  position: relative;
  top: -5px;
  width: 160px;
  height: 2px;
  background-color:var(--main-background-color) ;
  margin: 0 auto;
}

.hafifa-nickname{
  text-align: center;
  font-size: 20px;
  background:var(--main-background-color);
  color:white;
  border-radius: 20px;
}
.user-image{
  z-index: 0;
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
    justify-content: space-evenly;

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
     justify-content: space-evenly;
    flex-direction: column;
  }
.gradeAv{
    font-size:45px;
    display: block;
    margin-top: 25px;

    }
.personal-info{
    background-color: #fff  ;
    width: 500px;
    height: 250px;
    border-radius: 20px 20px 20px 20px;
    /* margin-bottom: 65px  */
}
 .progress-info{
    background-color: #fff  ;
    width: 420px;
    height: 290px;
    border-radius: 20px 20px 20px 20px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
 }
.name-detail{
    /* padding: 0px 10px; */
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
      margin-top: 5px;  
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
     grid-template-columns: 0.9fr 0.2fr 0.2fr;
    grid-template-rows: 0.6fr 0.6fr 0.6fr;
    gap: 15px 15px;
      grid-template-areas:
      "test-1-score . test-3-score"
      ". average ."
      "test-2-score . test-4-score";
 }
 .average{
   border-top:6px solid var(--main-background-color);
     /* background-color: var(--main-background-color); */
      /* color:white; */
     grid-area: average;
    width: 150px;
    height: 150px;
     box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;


 }
 .test{
    grid-area: var(--grid-area);
    width: 130px;
    height: 130px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
 }
 .items-title{
    font-size: 22px;
    position: relative;
    top: 13px;
     
 }
 .test-1-score{
   /* background-image: linear-gradient(to bottom,#ec9F05,#ff4e00); */
    border-top:6px solid #ff4e00;
    grid-area: test-1-score;
    width: 130px;
    height: 130px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 20px 20px;
 }
 .test-3-score{
      /* background-image: linear-gradient(to bottom,#ff0000,#990000); */
        border-top:6px solid rgb(155, 16, 155);

    grid-area: test-3-score;
    width: 130px;
    height: 130px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 20px 20px;
 }
 .test-4-score{
      border-top:6px solid #ec9F05;

    grid-area: test-4-score;
    width: 130px;
    height: 130px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius: 20px 20px;
 }
 .test-2-score{
      border-top:6px solid teal;

    grid-area: test-2-score;
    width: 130px;
    height: 130px;
    box-shadow: 0px 0px 100px 0px rgba(0,  0,  0,  0.2);
    border-radius:20px 20px;
 }
 .the-grades{
   display: block;
   font-size: 43px;
    margin-top: 20px;
  }
</style>