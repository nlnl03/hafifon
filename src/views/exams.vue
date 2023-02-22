<template>
   <div class="exam" v-if="isAllowed&&isFinished">
      <form v-for="(question,index) in examData" :key="index">
          <div class="question"> 
             <span >{{index+1}}.  {{question.Title}}</span> 
          </div> 

          <div class="answer-options">
                <div class="answer-items" v-for="(answer,inner) in question.answers"  :key="inner"> 
                  <input type="radio" :ref="answer" v-model="examUserData[question.Title]" :value="answer" @change="clickHandler($event)" :name="question.Title"  :id="answer"   />
                  <label :for="answer"><div class="answer-text"> {{answer}}</div></label>
                </div>
          </div>
      </form>
          <router-link class="submit-btn" :to="{name:'submitExams'}" @click="submit">הגש</router-link>
  </div>

  <div class="alreadySubmitted" v-if="isAllowed==false">
    כבר הגשת מבחן זה...
  </div>
</template>

<script>
import axios from 'axios';
export default {
data(){
  return{
      urlForTheExams: process.env.NODE_ENV =='development'? `http://localhost:3000/${this.$route.params.Title}/`:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.Title}')/Items`,
      examData:[],
      isFinished:false,
      examUserData:{},
      token:'',
      isFinished:false,
      userName:'',
      userId:'',
      isAllowed:false,
      examExistData:[],
      urlForPostUser: process.env.NODE_ENV =='development'?  "http://localhost:3000/pendingTests":"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items",
  }
},
methods:{
      
      asyncParse(str){
        return new Promise((resolve)=>{
          resolve(JSON.parse(str))
        })
      },

      clickHandler(event){
          const pressedAnswer = event.target;
          const pressedAnswerValue = pressedAnswer.value
          console.log(pressedAnswerValue)
      },

      async getToken(){
          const res = await axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
          this.token = res.data.FormDigestValue
          console.log(this.token)
      },
      
      async postExams(){
          if(this.urlForPostUser=="https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items"){
              await this.getToken();
              const res = await axios.post(this.urlForPostUser,{
              Title:this.userName,
              exam:JSON.stringify(this.examUserData),
              num:this.userId,
              type: this.$route.params.Title
            },
            {
              headers:{
                    'X-RequestDigest':this.token,
                }
            })      
          }
          
          else{
            console.log(this.urlForPostUser)
            const res = await axios.post(this.urlForPostUser,{
              Title:'sdsdsd',
              exam:this.examUserData,
              num:this.userId,
              type: this.$route.params.Title
            })
          }
      },

       submit(){
          console.log(this.examUserData)
          this.postExams()
      },

      async checkIfExamExist(){
          this.userId=localStorage.getItem("userId")
          const res = await axios.get(`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items?$filter=(num eq '${this.userId}') and (type eq '${this.$route.params.Title}')`)
          try{
            this.examExistData=res.data.value
              console.log(this.examExistData)
              if(this.examExistData[0].exam==null){
                console.log("is empty, you should see the exam")
                this.isAllowed=true
              }
              else{
                console.log("is full")
                this.isAllowed=false
              }
          }
          catch{
              console.log("is empty, you should see the exam")
              this.isAllowed=true
          }
          
      }
},


async beforeMount(){
  await this.checkIfExamExist()
  this.userName=localStorage.getItem("userName")
  console.log(this.userName)
    console.log(this.isAllowed)
     if(this.urlForTheExams==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.Title}')/Items`){
             console.log(this.urlForTheExams)
          const res = await axios.get(this.urlForTheExams);
              this.examData = res.data.value;
              console.log(this.examData)
                const promiseAnswers = await Promise.all(this.examData.map((item)=>{
                      return this.asyncParse(item.answers).then((inner)=>{
                            item['answers'] = inner
                            return {item}
                        })
                    }))
          }
  
          else{
              const res = await axios.get(this.urlForTheExams);
              this.examData = res.data.value;
              console.log(this.examData)
          }
          
       this.isFinished=true
       console.log(this.isFinished)
},

mounted(){
  this.examData.forEach((question)=>{ 
      this.examUserData[question.Title] = ""  
               
   })
        console.log(this.examUserData)
}
}
</script>

<style scoped>
 
form{
  height: 650px;
  border-bottom: 1px solid gray;
}
label{
    position: absolute;
    top: 0;
    height: 100%;
    cursor: pointer;
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
    max-height: 410px;
    overflow-y: auto;
    direction: ltr;
}
.answer-items{
    height: 40px;
    background-color: #f0f8ffc2;
    border: 1px solid #b3c5d594;
    position: relative;
    padding: 0.85em;
    margin-bottom: 30px;
}
.answer-text{
  font-size:24px
}
 input{
  /* appearance: none; */
  font-size:27px;
  display: flex;
  height: 90%;
  position: relative;
  cursor: pointer;
}
.submit-btn{
  text-decoration: none;
    position: relative;
    height: 40px;
    width: 110px;
    border: 1px solid #007bff;
    border-radius: 10px;
    right: 50%;
    transform: translateX(50%);
    font-size: 18px;
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
}
.alreadySubmitted{
  font-size: 70px;
  margin-top:150px;
  text-align: center;
}
 </style>