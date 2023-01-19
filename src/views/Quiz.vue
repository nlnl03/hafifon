<template> 
    <div v-if="isFinished"  class="quiz-box">  
        <form v-for="(question,index) in examData" :key="index" >
          <div class="show" v-if="index==ite">
              <div class="question"> 
                  <span class="questions-text">{{question.Title}}</span> 
                  <div class="current-que">{{ite+1}}/{{examData.length}}</div> 
              </div> 

              <div class="answer-options">
                <div class="answer-items" :style="`--cursor:${inputsCursor}`"   v-for="answer in question.answers"  :key="answer"> 
                  <input type="radio" v-model="userData[question.Title]" :ref="answer+index" :value="answer" @change="clickHandler($event,index)"  :name="question.Title"  :id="answer" :disabled="userData[question.Title]"  />
                  <label :for="answer"><span class="answers-text"> {{answer}}</span></label>
                </div>
              </div>

                <button class="next-button" @click="nextQue" :disabled="!userData[question.Title]" v-if="ite!=examData.length-1" :style="`--next-btn-cusror:${nextBtnCursor}`">הבא</button>
          </div>
        </form>  
            <!-- <button class="buttons" @click="backQue"  v-if="examData.exam.length!=ite &&ite!=0" >הקודם</button> -->
             <router-link class="submit-btn" :to="{name:'result'}" v-if="examData.length==ite+1"
               @click="submit"> <span class="finish-btn-text"> סיים </span></router-link>
     </div>
</template>

<script>
import practiceResult from '../views/practiceResult.vue'
import axios from 'axios'
export default {
  components:{
    practiceResult
  },
  data(){
    return{
       routerName:"",
       examData:[],
       url: process.env.NODE_ENV =='development'? `http://localhost:3000/practice/`:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`,
       userData:{},
       grades: 0,
       score:"",
       isFinished:false,
       isFinishedButton: false,
       ite: 0,
       inputsCursor:'pointer',
       nextBtnCursor: 'not-allowed',
       wrongAns:'',
       wrongQue:'',
       theCorrectAns:'',
       results:[]
    }
  },
  methods:{
    clickHandler(event,index){
          this.inputsCursor = 'not-allowed' 
          this.nextBtnCursor = 'pointer'
          const pressedAnwser = event.target;
          const rightAnswer = this.$refs[this.examData[index]["correctAnswer"]+index]
          console.log(pressedAnwser)
          console.log(rightAnswer)
          console.log(this.examData[index]["correctAnswer"]+index)
          pressedAnwser.classList.add("input-answer-right")

          if(pressedAnwser.value != rightAnswer.value){ 
                pressedAnwser.classList.add("input-answer-wrong")
                rightAnswer.classList.add("input-answer-right")  
            }          
      },
   
    checkIfDone(){
      console.log(this.userData)
        let isFinished = true;
        this.isFinishedButton = isFinished;
        console.log(this.ite)
        console.log(this.isFinishedButton)
    },
    nextQue(){
        this.inputsCursor='pointer',
        this.nextBtnCursor= 'not-allowed'
        this.ite++
        this.isFinishedButton=false
    },
    backQue(){
         this.ite--
    },
   
    submit(){
        this.examData.forEach(que => {
            if(this.userData[que.Title]== que.correctAnswer)
            {
              this.grades++      
            }
            else{
               this.wrongQue = que.Title
               this.wrongAns = this.userData[que.Title]
               this.theCorrectAns = que.correctAnswer
               this.results.push({wrongQue:this.wrongQue,wrongAns:this.wrongAns,theCorrectAns:this.theCorrectAns})              
            }
            
        })
        console.log(this.wrongQue)//השאלה שהוא טעה בא
        console.log(this.wrongAns)// התשובה השגויה שהוא בחר
        console.log(this.theCorrectAns)
        console.log(this.results)
         this.score = this.grades+"/"+this.examData.length
         var pointsInPerc =  Math.round((this.grades/this.examData.length)*100)
        console.log(this.score)
          localStorage.setItem("score",this.score)
          localStorage.setItem("pointsInPerc",JSON.stringify(pointsInPerc))
         localStorage.setItem("results", JSON.stringify(this.results))
    }
  },
  
    async beforeMount(){
      if(this.url == `https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`){
       const res = await axios.get(this.url)
       this.examData = res.data.value;
       this.examData.forEach(que => {
         try{
           que.answers =  JSON.parse(que.answers)
         }
         catch(error){
           console.log('error:',error ,  que.answers)
         }
        });
          this.isFinished = true
          console.log(this.examData)
        }

        else{
          this.isFinished = true
             const res = await axios.get(this.url)
            this.examData = res.data.value
             this.examData =this.examData.filter(data=>data.Title==this.$route.params.title)[0]
             this.examData = this.examData.exam
             console.log(this.examData)
        }
      },

      mounted(){
          this.examData.forEach((question)=>{
            this.userData[question.Title] = ""
        })
        console.log(this.userData)
      }  
}
</script>

<style scoped>
button{
    margin: 0 8px;
    height: 40px;
    width: 110px;
    border: 1px solid #007bff;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
}
.next-button{
  position: absolute;
  bottom: 24px;
   cursor: var(--next-btn-cusror);
  right: 670px;
}
.submit-btn{
  position: absolute;
    text-decoration: none;
     height: 40px;
    width: 110px;
    border: 1px solid #007bff;
    border-radius: 10px;
    font-size: 18px;
    right: 50%;
    transform: translateX(50%);
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    
}
.quiz-box{
    position: relative;
    left: 50%;
    right: 50%;
    transform: translate(50%,25%);
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
    height: 500px;
    width: 850px;
}
.question{
    height: 70px;
    padding: 8px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.1);    
    font-size: 24px;
    font-weight: 600;
}
.answer-options{
    padding: 25px 30px 20px 30px;
    margin-top:20px;
}
.answer-items{
    height: 35px;
    position: relative;
    background-color: aliceblue;
    border: 1px solid #84c5fe;
    border-radius: 5px;
    padding: 8px 15px;
    margin-bottom: 20px;
      cursor: var(--cursor);
 }
  
 .input-answer-right::before{
   margin-right: 2px;
     content: '✔';
    bottom: 2px;
    color: green;
    position: relative;
    right: -2px;
 }
 
 .input-answer-wrong::before{
    position: relative;
    right: -5px;
    top:2px;
    content:"❌";   
    font-size: 20px;
  }
 
input{
  appearance: none;
  font-size:27px;
  display: flex;
  height: 90%;
  position: relative;
  cursor: var(--cursor);
}
label{
  cursor: var(--cursor);
  position: absolute;
  height: 100%;
  width: 100%;
  top:0;
  left: 0;
}
.answers-text{
  padding-right: 2.2em;
  font-size: 20px;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: var(--cursor);
}
.questions-text{
  width: 80%;
}
.finish-btn-text{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>