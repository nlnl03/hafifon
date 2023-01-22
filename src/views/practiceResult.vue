<template>
<div class="results-card">
  <div class="score">
      {{score}}
  </div>
  <div class="results-table" v-if="isShow" >
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
          <td>{{result.theCorrectAns}}</td>
          <td>{{result.wrongAns}}</td>
          <td>{{result.wrongQue}}</td>
        </tr>
       </tbody>
    </table>
    <div class="btn">
        <router-link class="back-btn" :to="{name:'PracticesList'}">חזרה לתרגולים</router-link>
        <router-link class="video-btn" :to="{name:'PracticesList'}">לסרטון בנושא</router-link>
        </div>
     </div>
   <div class="perfect-results" v-if="!isShow">
      כל התשבות נכונות, עבודה מעולה !
    </div>
  </div>
</template>

<script>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"
 export default {
    name:'practiceResult',
    components:{
      CircleProgress
    },
 data(){
    return{
        userResults:[],
        score:"",
        isShow: false, 
        value:[]
    }
},
async beforeMount(){
    console.log(score)
     var score = localStorage.getItem("score")
      this.score =score
       console.log(this.score)
      var data = localStorage.getItem("results")
      this.userResults = JSON.parse(data)
      this.userResults.forEach(result => {
        Object.values(result).forEach(val=> {
          this.value.push(val)
          console.log(this.value)
        if(val != '')
        {
          this.isShow = true
        }
      })
     });
         console.log(this.isShow)

  },
  
}
</script>

<style scoped>
  ::-webkit-scrollbar{
  width: 10px;
}
::-webkit-scrollbar-track{
  background-color: #c5c2c2;
    border-radius: 5px;

 }
::-webkit-scrollbar-thumb{
  background: #888;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover{
  background: rgb(117, 116, 116);
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
    width: var(--table-header-width);
  }
  th{
    padding-bottom: 5px ;
    font-size: 22px ;
  }
   td{
      height: 50px;
      font-size: 18px ;
      padding: 0.5em;
     text-align: center;
   }
  tr{
      border-bottom: 1px solid gray;
  }
  tbody tr:last-child{
    border-bottom:none;
  }
  table{
      border-collapse: collapse;
  }
  
  .results-table{
    position: relative;
    top:170px;
    right: 50%;
    transform:translateX(50%) ;
     width: var(--table-width);
    }
.results-card{
    position: relative;
    left: 50%;
    right: 50%;
    transform: translate(50%,10%);
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
    height: 700px;
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
    text-decoration: none;
    color: #007bff;
    background-color: #fff;
    height: 40px;
    width: 110px;
    border: 1px solid #007bff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:30px;
    }
  .video-btn{
      position: relative;
      color: #007bff;
      text-decoration: none;
      height: 40px;
      width: 110px;
      background-color: #fff;
      border: 1px solid #007bff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .score{
      display: flex;
      justify-content: center;
      position: relative;
      top:60px;
      font-size:50px;
     }
  
 </style>