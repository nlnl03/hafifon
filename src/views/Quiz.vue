<template> 
    <div class="quiz-box" v-if="isFinished" >  
        <form v-for="(question,index) in examData" :key="index"  >
          <div v-if="index==ite">
              <div class="question"> 
                  <span class="questions-text">{{question.Title}}</span> 
                  <div class="current-que">{{ite+1}}/{{examData.length}}</div> 
              </div> 

              <div class="answer-options" :ref="question['Title']" v-if="question.type == 'american' " >
                <div class="answer-items" :style="`--cursor:${inputsCursor}`" v-for="(answer,inner) in question.answers"  :key="inner"> 
                  <input type="radio" v-model="userData[question.Title]" :ref="answer" :value="answer" @click="clickHandler($event,index,question['Title'])"  :name="question.Title"  :id="answer" :disabled="userData[question.Title]"  />
                  <label :for="answer"><div class="answers-text"> {{answer}}</div></label>
                </div>
              </div>
              
              <div class="bank-quiz" v-if=" question.type == 'bankQue' ">
                <div class="bank-quiz-que"  v-for="(option,midIndex) in Object.keys(question.bankOptions)" :key="option+midIndex" >
                        <div class="option-title" >{{option}}</div>
                        <div class="VX" :ref="option"></div>
                    <div class="bank-options" :ref="option+midIndex">
                        <div class="bank-words-items"  v-for="(item,indexInner) in question.bankCorrect" :key="item+indexInner">
                           <input type="radio" v-model=" bankUserData[question.Title][option]"  :id="item+midIndex" :value="item" @click="clickBankHandler($event,option,bankUserData[question.Title],index,midIndex)" :disabled="bankUserData[question.Title][option]!=''"/>
                           <label class="bank-options-text" :for="item+midIndex" > {{item}}  </label>  
                        </div>
                    </div>
                </div>
              </div>
                <button class="next-button" @click="nextQue" ref="nextBtn" :disabled="!userData[question.Title]&&isDisabled" v-if="ite!=examData.length-1" :style="`--next-btn-cusror:${nextBtnCursor}`">הבא</button>
          </div>
        </form>  
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
       examData:[],
       url: process.env.NODE_ENV =='development'? `http://localhost:3000/practice/`:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`,
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
       bankQuePoints:0
     }
  },
  methods:{
    clickHandler(event,index,titleOfQuestion){
          this.inputsCursor = 'not-allowed' 
          this.nextBtnCursor = 'pointer'
           const pressedAnswer = event.target;
           const pressedAnswerValue = pressedAnswer.value
          const indexOfCorrectAnswer = this.examData[index]["correctAnswer"]
        //  console.log(this.$refs[titleOfQuestion].children[indexOfCorrectAnswer].querySelector("input"))
         const rightAnswer = this.$refs[titleOfQuestion].children[indexOfCorrectAnswer].querySelector("input")
           const rightAnswerValue = rightAnswer.value
               
          if(pressedAnswerValue != rightAnswerValue){ 
                pressedAnswer.classList.add("input-answer-wrong")
            }
                  rightAnswer.classList.add("input-answer-right")
             
              if(this.ite!=this.examData.length-1){
                 var nextBtn = this.$refs["nextBtn"]
                   nextBtn.classList.add("next-btn-on") 
              }
      },
      clickBankHandler(event,option,modelData,index,midIndex){
            var inputsCursor = this.$refs[option+midIndex]
              inputsCursor.classList.add("bank-input-cursor")
              this.checkIfcorrectBank(event,option,modelData,index)
              this.disableNextBtn(modelData)
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
                this.bankQuePoints += (100/this.examData.length)/bankOptionLen
                console.log(this.bankQuePoints)
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

      asyncParse(str){
        return new Promise((resolve)=>{
          resolve(JSON.parse(str))
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
             Object.keys(question.bankOptions).forEach((ans)=>{
               this.bankUserData[question.Title][ans] = ""
            })
          } 
        })
          //  console.log(this.bankUserData)
               this.isFinished = true;
          
    },
     submit(){
       //    console.log(this.userData)
        //  console.log(this.results)
         this.examData.forEach(que => {
           if(que.type=='american'){
              //  console.log(this.userData)
              if(this.userData[que.Title]== que.answers[que.correctAnswer])
              {
                this.grades++
                // console.log(this.grades) 
              }
              else{
                this.wrongQue = que.Title
                this.wrongAns = this.userData[que.Title]
                this.theCorrectAns = que.answers[que.correctAnswer]
                this.results.push({wrongQue:this.wrongQue,wrongAns:this.wrongAns,theCorrectAns:this.theCorrectAns,type:"AmerQue"})     
                }
           } 
           
      })
          var pointsInPerc =  Math.round((this.grades/this.examData.length)*100+this.bankQuePoints)
          localStorage.setItem("pointsInPerc",JSON.stringify(pointsInPerc))
          localStorage.setItem("results", JSON.stringify(this.results))
          localStorage.setItem("bankResults",JSON.stringify(this.bankResults))

    },
     async getSharePointData(){
          const res = await axios.get(this.url)
          this.examData = res.data.value;

           const promiseAnswers = await Promise.all(this.examData.map((item)=>{
             return this.asyncParse(item.answers).then((inner)=>{
                  item['answers'] = inner
               return {item}
              })
            }))
             
            const promiseBankAnswer = await Promise.all(this.examData.map((item)=>{
              if(item.type=='bankQue'){
                  return this.asyncParse(item.bankCorrect).then((corr)=>{
                  item['bankCorrect'] = corr
                  return {item}
                })
              }
          })) 

            const promiseBankOptions = await Promise.all(this.examData.map((bankOption)=>{
               if(bankOption.type=='bankQue'){
                    return this.asyncParse(bankOption.bankOptions).then((opt)=>{
                    bankOption['bankOptions'] = opt
                    return {bankOption}
                  })
               }
            }))
                //  console.log(this.examData)
      },

      async getLocalData(){
        const res = await axios.get(this.url)
          this.examData = res.data.value
          this.examData =this.examData.filter(data=>data.Title==this.$route.params.title)[0]
          this.examData = this.examData.exam
          console.log(this.examData)
      }
  },
   
    async beforeMount(){
        if(this.url == `https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`){
            await this.getSharePointData();
        }

        else{
            await this.getLocalData()
        }

          this.updateVmodelBank()
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
  bottom: 30px;
  cursor: var(--next-btn-cusror);
  right: 50%;
  transform: translateX(50%);
}
.next-btn-on{
    border:none;
    color: #fff;
    background-color: var(--main-background-color);
}
.submit-btn{
    position: absolute;
    text-decoration: none;
    height: 40px;
    width: 110px;
    border: 1px solid var(--main-background-color);
    border-radius: 10px;
    font-size: 18px;
    right: 50%;
    transform: translateX(50%);
    cursor: pointer;
    color: #fff;
    background-color: var(--main-background-color);
}
.quiz-box{
    position: relative;
    left: 50%;
    right: 50%;
    transform: translate(50%,11%);
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
    height: 655px;
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
    max-height: 400px;
    overflow-y: auto;
    direction: ltr;
}
.answer-items{
    height: 40px;
    position: relative;
    background-color: #f0f8ffc2;
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
    background-color: rgba(240,248,255,.7607843137254902);
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
    padding-right: 2.7em;
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