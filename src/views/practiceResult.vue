<template>
<div class="results-card">
  <div class="score">
  
      <h1></h1>
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
        <router-link :to="{name:'PracticesList'}">dfdfdf</router-link>
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
        pointsInPerc:'',
        isShow: false, 
        value:[]
    }
},
async beforeMount(){
    console.log(score)
     var score = localStorage.getItem("score")
      this.score =score
      var pointsInPerc =localStorage.getItem("pointsInPerc")
      this.pointsInPerc = pointsInPerc
      console.log(this.pointsInPerc)
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
    max-height: 270px;
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
    font-size: 20px ;
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
 .score{
   position: relative;
  }
  .results-table{
    position: relative;
    top:135px;
    right: 50%;
    transform:translateX(50%) ;
    width: var(--table-width);
     max-height: 300px;
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
 </style>