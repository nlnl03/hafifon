<template>
  <div class="spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div>
  <div class="form-flex">
    <form class="quiz-box" v-if="isFinished&&isLoadForSpinner" >  
        <div v-for="(question,index) in examData" :key="index"  >
          <div v-if="index==ite">
              <div class="question" v-if="question.type!= null"> 
                  <span class="questions-text">{{question.label}}</span> 
                  <div class="current-que">{{ite+1}}/{{examData.length}}</div> 
              </div> 

              <div class="answer-options" v-if="question.type == 'radio' " >
                <label v-for="(opt, optIndex) in question.options" :key="optIndex" >
                  <input type="radio" v-model="question.value" :value="opt" />
                  <span>{{opt}}</span>
                </label>
                 <!-- <q-radio v-for="(opt, optIndex) in question.options" :key="optIndex" :label="opt" v-model="question.value" :val="opt" :color="getRadioColor(question, opt)"  :ripple="false" /> -->
              </div>
               
              <div class="bank-quiz" v-if=" question.type == 'bankQue' ">
                <div class="bank-quiz-que"  v-for="(option,midIndex) in Object.keys(question.bankOptions)" :key="option+midIndex" >
                        <div class="option-title" >{{option}}</div>
                        <div class="VX" :ref="option"></div>
                    <div class="bank-options" :ref="option+midIndex">
                        <div class="bank-words-items"  v-for="(item,indexInner) in question.bankCorrect" :key="item+indexInner">
                           <input type="radio" v-model="bankUserData[question.Title][option]" :id="item+midIndex" :value="item" @click="clickBankHandler($event,option,bankUserData[question.Title],index,midIndex)" :disabled="bankUserData[question.Title][option]!=''" />
                           <label class="bank-options-text" :for="item+midIndex" >{{item}}</label>  
                        </div>
                    </div>
                </div>
              </div>

              <div v-if=" question.type == null">
                <div class="que-title">שאלה {{ite+1}} נסו בעצמכם</div>
                <div class="questions-without-ans">
                    <span>{{question.Title}}</span>
                 </div>
                  <button class="next-btn-on-type-null" @click="nextQue" v-if="examData.length!=ite+1" >הבא</button>
                  <button class="next-btn-on-type-null" @click="submit" v-if="examData.length==ite+1" >סיים</button>
              </div>

              <div class="drag-drop" v-if=" question.type == 'dragDrop' ">
                  <dragAndDrop :question="question"/>
              </div>
                <button class="next-button" @click="nextQue" ref="nextBtn" :disabled="!userData[question.Title]&&isDisabled" v-if="ite!=examData.length-1&&question.type != null" :style="`--next-btn-cusror:${nextBtnCursor}`">הבא</button>
          </div>
        </div>  
              <button @click="submit" class="next-button" v-if="examData.length==ite+1&&examData[ite].type != null" :disabled="!isEndBtnAllow" ref="endBtn" :style="`--next-btn-cusror:${nextBtnCursor}`"> 
                  <span class="finish-btn-text"> סיים </span>
              </button>
     </form>
  </div>
</template>

<script>
import practiceResult from '../quizRoutes/practiceResult.vue'
import loadingSpinner from '@/components/loadingSpinner.vue'
import dragAndDrop from '@/components/dragAndDropQuiz.vue'
import axios from 'axios'
export default {
  components:{
    practiceResult,
    loadingSpinner,
    dragAndDrop
  },
  data(){
    return{
       examData:[],
       userData:{},
       bankUserData:{},
       grades: 0,
       isFinished:false,
       isFinishedButton: false,
       ite: 0,
       inputsCursor:'pointer',
       nextBtnCursor: 'not-allowed',
       wrongAns:'',
       wrongQue:'',
       theCorrectAns:'',
       results:[],
       bankResults:[],
       bankWrongAns:[],
       parseAns:[],
       isDisabled:true,
       bankQuePoints:0,
       isLoadForSpinner:false,
       isEndBtnAllow:false,
       countRightsAns:0,
       queWithoutAns:0
      }
  },
  methods:{
    clickHandler(event,index,titleOfQuestion){
          this.inputsCursor = 'not-allowed' 
          this.nextBtnCursor = 'pointer'
           const pressedAnswer = event.target;
           const pressedAnswerValue = pressedAnswer.value
          const indexOfCorrectAnswer = this.examData[index]["correctAnswer"]
          const rightAnswer = this.$refs[titleOfQuestion].children[indexOfCorrectAnswer].querySelector("input")
           const rightAnswerValue = rightAnswer.value
               var nextBtn = this.$refs["nextBtn"]
                var endBtn = this.$refs["endBtn"]
          if(pressedAnswerValue != rightAnswerValue){ 
                pressedAnswer.classList.add("input-answer-wrong")
            }
            else{
                this.countRightsAns++
                console.log(this.countRightsAns)
            }
                   rightAnswer.classList.add("input-answer-right")
             
              if(this.ite!=this.examData.length-1){
                console.log("yess")
                   nextBtn.classList.add("next-btn-on")
               }
               if(index == this.examData.length-1){
                   this.isEndBtnAllow = true
                   endBtn.classList.add("next-btn-on")
               }
       },
      clickBankHandler(event,option,modelData,index,midIndex){
            var inputsCursor = this.$refs[option+midIndex]
              inputsCursor.classList.add("bank-input-cursor")
              this.checkIfcorrectBank(event,option,modelData,index)
              this.disableNextBtn(modelData)
               if(index == this.examData.length-1){
                   this.isEndBtnAllow = true
                   endBtn.classList.add("next-btn-on")
               }
         },
        checkIfcorrectBank(event,option,modelData,index){
          const pressedBankAnswer = event.target;
          const val = pressedBankAnswer.value 
          const addVX = this.$refs[option]
            var bankOptionLen = 0
               Object.keys(this.examData[index].bankOptions).forEach(key =>{
                    bankOptionLen++
               })

           if(val==this.examData[index].bankOptions[option]){
                console.log("correct")
                addVX.classList.add("input-bank-right")
                this.bankQuePoints += (100/(this.examData.length-this.queWithoutAns))/bankOptionLen
                // console.log(this.bankQuePoints)
                this.countRightsAns++
                console.log(this.countRightsAns)
              }
            else{
              console.log("not correct")
              addVX.classList.add("input-bank-wrong")
              this.bankResults.push({wrongBankQue:this.examData[index].Title,wrongBankAns:val+": "+option,theCorrectBankAns:this.examData[index].bankOptions[option]+": "+option,type:"bankQue"})
              }
          },

           disableNextBtn(modelData){
             var wrongCounter = 0;
              Object.values(modelData).forEach(val => {
                console.log(val)
                if(val == ''){
                     wrongCounter++ ;
                }
              });
              if (wrongCounter >1){
                   this.isDisabled = true;
              }else{
                this.isDisabled = false;
                  const nextBtnActive = this.$refs["nextBtn"]
                   nextBtnActive.classList.add("next-btn-on")
                   this.nextBtnCursor = 'pointer'
              }
            },

      asyncParse(obj, propName){
        return new Promise((resolve)=>{
          const passedVal = JSON.parse(obj[propName])
          obj[propName] = passedVal
          resolve(obj)
        })
      },
            
    nextQue(){
      this.isDisabled = true
        this.inputsCursor='pointer',
        this.nextBtnCursor= 'not-allowed'
        this.ite++
        this.isFinishedButton=false         
    },
    backQue(){
         this.ite--
    },
    updateVmodelAmerican(){
            this.examData.forEach((question)=>{ 
             if(question.type=="american"){
                console.log("american")
                  this.userData[question.Title] = ""  
             }         
       })
        // console.log(this.userData)
        this.isFinished = true;
    },

    updateVmodelBank(){           
            this.examData.forEach((question)=>{ 
             if(question.type=="bankQue"){
              this.bankUserData[question.Title] = {}
             Object.keys(question.bankOptions).forEach((que)=>{
               this.bankUserData[question.Title][que] = ""
            })
          } 
        })
           console.log(this.bankUserData)
               this.isFinished = true;
          
    },
     submit(){
       this.$router.push({name:'result'})
          this.examData.forEach(que => {
           if(que.type=='american'){
                if(this.userData[que.Title]== que.answers[que.correctAnswer])
                  {
                   this.grades++
                  }
                  
              else{
                this.wrongQue = que.Title
                this.wrongAns = this.userData[que.Title]
                this.theCorrectAns = que.answers[que.correctAnswer]
                this.results.push({wrongQue:this.wrongQue,wrongAns:this.wrongAns,theCorrectAns:this.theCorrectAns,type:"AmerQue"})     
              }
           }       
      })
          var pointsInPerc =  Math.round((this.grades/(this.examData.length-this.queWithoutAns))*100+this.bankQuePoints)
          localStorage.setItem("pointsInPerc",JSON.stringify(pointsInPerc))
          localStorage.setItem("results", JSON.stringify(this.results))
          console.log(this.results)
          localStorage.setItem("bankResults",JSON.stringify(this.bankResults))
          console.log(this.bankResults)
          var countRightsAns = this.countRightsAns + "/" + (this.examData.length-this.queWithoutAns)
          localStorage.setItem("countRightsAns",countRightsAns)
    },
    
     async getData(){
       var res = null
       if(this.$isSharePointUrl){
          res = await axios.get(this.$sharePointUrl+`getByTitle('practicesData')/Items?$filter=Title eq '${this.$route.params.title}'`);
          var examData = res.data.value
          this.examData = examData[0]

            await this.asyncParse(this.examData,'data')
            this.examData = this.examData.data
              console.log(this.examData)

       }

        else{
          res = await axios.get(this.$sharePointUrl+`practicesData`)
          var examData = res.data.value
          this.examData = examData.filter((item)=> item.weekId == JSON.parse(this.$route.params.week) && item.pracId == JSON.parse(this.$route.params.numOfPrac))[0].data

        }
          console.log(this.examData)


          //     this.examData.forEach(que=>{
          //       if(que.type==null){
          //         this.queWithoutAns++
          //       }
          //     })
          // console.log(this.examData.length)
          // console.log(this.queWithoutAns)
       },
    asyncSetTimeout(){
      return new Promise((res)=>{
        setTimeout(res,500)
      })
    },




    getRadioColor(question, opt){
      return question.value === opt ? "positive" : "dark"
    }
  },

   
      async beforeMount(){
        console.log(this.$route.params)
        this.getData()
          await this.asyncSetTimeout()
          // console.log(this.examData)
          // this.updateVmodelBank()
          this.isLoadForSpinner = true
    },

      mounted(){
          this.updateVmodelAmerican()
      },
         
}
</script>

<style scoped>
button{
    height: 45px;
    width: 120px;
    border: 1px solid var(--main-background-color);
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
}
.next-button{
  border-radius:15px ;
  position: absolute;
  bottom: 25px;
  cursor: var(--next-btn-cusror);
  right: 50%;
  transform: translateX(50%);
}
.next-btn-on{
    border:none;
    color: #fff;
    background-color: var(--main-background-color);
}
.next-btn-on-type-null{
     border:none;
     position: absolute;
     top:80%;
     right: 50%;
     transform: translate(50%,80%);
    color: #fff;
    background-color: var(--main-background-color);
}
.submit-btn{
    position: absolute;
    text-decoration: none;
    height: 40px;
    width: 110px;
    bottom: 25px;
    border: 1px solid var(--main-background-color);
    border-radius: 10px;
    font-size: 18px;
    right: 50%;
    transform: translateX(50%);
    cursor: pointer;
    color: #fff;
    background-color: var(--main-background-color);
}
.form-flex{
  display: flex;
  width: 100%;
  justify-content: center;
}
.quiz-box{
    position: relative;
    display: flex;
    justify-content: center;
     background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
    height: 670px;
    width: 1040px;
}
.question{
    min-height: 80px;
    padding: 0.5em 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.1);    
    font-size: 24px;
    font-weight: 600;
}
.answer-options{
    padding: 25px 30px 20px 30px;
    margin-top: 30px;
    max-height: 397px;
    overflow-y: auto;
    direction: ltr;
}
.answer-items{
    height: 40px;
    position: relative;
    background-color: #eff5fbc2;
    border: 1px solid #b3c5d594;
    border-radius: 30px;
    padding: 0.85em;
    margin-bottom: 30px;
    cursor: var(--cursor);
 }

.bank-quiz{
    padding: 25px 30px 20px 30px;
    margin-top:20px;
    max-height: 385px;
    overflow-y: auto;
    direction: ltr;
}
.bank-quiz-que{
    display: flex;
    align-items: center;
    min-height: 35px;
    justify-content: space-between;
    position: relative;
    background-color: rgba(239,245,251,.7607843137254902);
    border: 1px solid rgba(179,197,213,.5803921568627451);
    border-radius: 30px;
    padding: .85em;
    margin-bottom: 30px;
    cursor: var(--cursor);
 }
 .bank-options{
    cursor: pointer;
    position: relative;
    display: flex;
    width: 50%;
    min-height: 35px;
    text-align: center;
 }
 .bank-words-items{
    border-left: 1px solid rgba(0,0,0,.1);
    position: relative;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
   .bank-options-text{
      display: flex;
      justify-content: center;
      align-items: center; 
   }
   .bank-input-cursor{
    cursor: not-allowed;
   }
   .items-text{
     height: 100%;
   }
   .bank-words-items:first-child{
     border-right: 1px solid rgba(0,0,0,.1);
   }
   .option-title{
     padding: 0.5em 2.3em;
     margin-left: 2em;
   }
   
 .input-answer-right::before{
    margin-right: 8px;
    content: '✔';
    bottom: 2px;
    color: green;
    position: relative;
    right: -2px;
  }
 
 .input-answer-wrong::before{
    position: relative;
    right: 5px;
    top:5px;
    content:"❌";  
    font-size: 20px;
  }
  .input-bank-right::before{
      content: '✔';
      height: 100%;
      display: flex;
      align-items: center;
      /* margin-left:30px; */
      right:20px;
      font-size:24px;
      color: green;
      position: absolute;    
      top:-3px;
    }
    
  .input-bank-wrong::before{
     content:"❌";
      display: flex;
      align-items: center;
      height: 100%;
      right:18px;
      font-size:18px;
      color: green;
      position: absolute;    
      top:0;
    }
 input{
  appearance: none;
   cursor: var(--cursor);
}
label{
  cursor: var(--cursor);
 }
.drag-drop{
    display: flex;
    justify-content: center;
}
.answers-text{
    padding-right: 2.7em;
    padding-left: 2em;
    font-size: 20px;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: var(--cursor);
}

.questions-text{
  width: 80%;
}
.questions-without-ans{
    font-size: 30px;
    margin: 0 10%;
    margin-top: 135px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

}
.finish-btn-text{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.que-title{
  font-size: 45px;
  font-weight: 700;
  position: relative;
  top: 50px;
  text-align: center;
}
.spinner{
  position: relative;
  top:100px
}
</style>