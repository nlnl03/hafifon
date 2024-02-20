<template>
  <div class="spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div>

<div class="results-card" v-if="isLoadForSpinner">
  <div class="practice-results-score">
    <div class="score-items">
    <circle-progress 
           :percent="score"
          :show-percent="true"
           fill-color="var(--main-background-color)"
           :viewport="true"
           :transition="700"
          />
      <div class="countRightsAns">{{countRightsAns}}</div>
      </div>
   </div>
  <div class="results-table" v-if="!showMassaAllCorrect" >
    <table>
      <thead>
        <tr>
          <th>השאלה</th>
          <th>התשובה שענית</th>
          <th>התשובה הנכונה</th>
        </tr>
      </thead>

      <tbody>
          <tr v-for="result in userResults" :key="result">
              <td><div class="text">{{result.theCorrectAns}}</div></td>
              <td><div class="text">{{result.wrongAns}}</div></td>
              <td><div class="text">{{result.wrongQue}}</div></td>
          </tr>

          <tr v-for="bankResult in userBankResults" :key="bankResult">
              <td><div class="text">{{bankResult.theCorrectBankAns}}</div> </td>
              <td><div class="text">{{bankResult.wrongBankAns}}</div></td>      
              <td><div class="text">{{bankResult.wrongBankQue}}</div> </td>
          </tr>
      </tbody> 
    </table>
    
    <div class="btn">
        <router-link class="back-btn" :to="{name:'PracticesList'}">חזרה לתרגולים</router-link>
        <router-link class="video-btn" :to="{name:'PracticesList'}">לסרטון בנושא</router-link>
    </div>
  </div>


   <div class="all-correct" v-if="showMassaAllCorrect">
     <span>כל התשבות נכונות, עבודה מעולה !</span> 
   </div>
</div>
</template>

<script>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"
import loadingSpinner from '@/components/loadingSpinner.vue'
 export default {
    name:'practiceResult',
    components:{
      CircleProgress,
      loadingSpinner
    },
 data(){
    return{
        userResults:[],
        userBankResults:[],
        score:"",
        showMassaAllCorrect: false, 
        isBankQue:false,
        countRightsAns:null,
        isLoadForSpinner:false,
        timeOut:null,
    }
},
methods:{
  getData(){
     var score = localStorage.getItem("pointsInPerc")
      this.score =JSON.parse(score)
      //  console.log(this.score)
      var data = localStorage.getItem("results")
      this.userResults = JSON.parse(data)
      var bankData = localStorage.getItem("bankResults")
      this.userBankResults = JSON.parse(bankData)
      this.countRightsAns = localStorage.getItem("countRightsAns")
      console.log(this.countRightsAns)
      // console.log(this.userResults)
           if(this.userResults.length==0&&this.userBankResults.length==0){
            this.showMassaAllCorrect=true
          }
          
            this.isLoadForSpinner = true
  }
},

  async beforeMount(){
    this.timeOut = await setTimeout(this.getData,300)
    
  },
  
}
</script>

<style scoped>
.all-correct{
  font-size:50px;
  position: relative;
  display: flex;
  justify-content: center;
  top:20%;
   }
 td:first-child{
   border-left: none;
}
tbody{
    display:block;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 275px;
    direction: ltr;
 }
 thead{
    display: block;
    
  }
  th,td{
    width: var(--table-header-width) !important;
  }
  th{
    padding-bottom: 5px;
    font-size: 22px ;
  }
   td{
      height: 50px;

      font-size: 18px ;
      padding: 0.5em 1em;
      text-align: center;
   }
  tr{
      border-bottom: 1px solid gray;
  }
  tbody tr:hover{
    background-color: rgba(192, 192, 192, 0.582);
  }
  th:nth-child(2)::after{
    content: '❌';
    margin-right: 3px
  }
  th:nth-child(3)::after{
    content: '✔';
    color:green;
    font-size:25px;
    margin-right: 8px
  }
  tbody tr:last-child{
    border-bottom:none;
  }
  table{
      border-collapse: collapse;
      table-layout: fixed;
   }
  /* .text{
        width: calc(var(--table-header-width));

   } */
  .results-table{
    position: relative;
    top: 85px;
    right: 50%;
    transform:translateX(50%) ;
     width: var(--table-width);
    }
.results-card{
    position: relative;
    left: 50%;
    right: 50%;
    transform: translate(50%,8%);
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
    height: 710px;
    width: 1200px;
}
.btn{
    position: absolute;
    top:210px;
    transform: translateY(100%);
    display: flex;
    width: 100%;
    height: 120px;
    align-items: center;
    justify-content: center;
  }
.back-btn{
    position: relative;
    color: #7c7c7c;
    background-color: #fff;
    height: 40px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25px;
    }
  .video-btn{
      position: relative;
      color: #fff;
      text-decoration: none;
      height: 40px;
      width: 110px;
      background-color: var(--main-background-color);
      border-radius: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .practice-results-score{
      display: flex;
      justify-content: center;
      position: relative;
      top:40px;
      font-size: 60px;
     }
     .score-items{
       display: flex;
        width: 50%;
       align-items: center;
      justify-content: space-around;
     }
    .spinner{
      position: relative;
      top:100px
    }


  </style>