<template>
    <div class="loader-spinner" v-if="!isLoadForSpinner">
          <loadingSpinner />
    </div>

   <div class="exam-box" v-if="isntSubmmitedYet&&isFinished&&isLoadForSpinner">
      <form class="exam" v-for="(question,index) in examData" :key="index">
          <div class="question"> 
             <span >{{index+1}}.  {{question.Title}}</span> 
          </div> 

          <div class="american-answer-options" v-if="question.type=='american'">
                <div class="answer-items" v-for="(answer,inner) in question.answers"  :key="inner"> 
                  <div><input type="radio" :ref="answer" v-model="examUserData[question.Title]" :value="answer" @change="clickHandler($event,examUserData[question.Title]+index,index)" :name="question.Title"  :id="answer"   /></div>
                  <div class="label-text"><label :for="answer"> {{answer}} </label></div>
                </div>
          </div>

          <div class="open-que" v-if="question.type=='open'">
            <textarea id="" cols="30" rows="10" placeholder="הכנס תשובה" @input="clickHandler($event,examUserData[question.Title]+index,index)"  v-model="examUserData[question.Title]"></textarea>
          </div>

      </form>

      <div class="send">
          <p class="show-red-Warn" v-if="showRedWarn">* אנא בדוק שענית על כל השאלות</p>
                 <button v-if="!subRouterIsShow" class="submit-btn" @click="submit" >סיים</button>
                 <router-link v-if="subRouterIsShow" class="submit-btn" :to="{name:'submitExams'}" @click="sendData">הגש</router-link>
      </div>
    </div>

  <div class="alreadySubmitted" v-if="isntSubmmitedYet==false&&isFinished">
    כבר הגשת מבחן זה...
  </div>
</template>

<script>
import axios from 'axios';
import loadingSpinner from '../components/loadingSpinner.vue'
export default {
  components:{
    loadingSpinner
  },
data(){
  return{
      urlForTheExams: process.env.NODE_ENV =='development'? `http://localhost:3000/${this.$route.params.Title}/`:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.Title}')/Items`,
      examData:[],
      isFinished:false,
      examUserData:{},
      isUserDataEmpty:true,
      boolIfEmpty:[],
      dataToPost:[],
      token:'',
      isFinished:false,
      userName:'',
      userId:'',
      isntSubmmitedYet:false,
      isLoadForSpinner:false,
      examExistData:[],
      subRouterIsShow:false,
      showRedWarn:false,
      urlForPostUser: process.env.NODE_ENV =='development'?  "http://localhost:3000/pendingTests":"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items",
  }
},
methods:{
      asyncParse(str){
        return new Promise((resolve)=>{
          resolve(JSON.parse(str))
        })
      },

  
      clickHandler(event,theRef,index){
        this.showRedWarn=false
          const pressedAnswer = event.target.value;
          console.log(pressedAnswer)

             if(pressedAnswer.trim()){
                 this.isUserDataEmpty=false
                 this.boolIfEmpty[index]=this.isUserDataEmpty
                 console.log(this.boolIfEmpty)
             }
            else{ 
                   this.boolIfEmpty[index]=true
                  console.log(this.boolIfEmpty)              
                   console.log("is empty")
                  event.target.classList.add("text-aria-placeholder")              
            }
                         
         },

         
      async getToken(){
          const res = await axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
          this.token = res.data.FormDigestValue
          console.log(this.token)
      },

      postDataFormat(){
        Object.entries(this.examUserData).forEach(data=>{
           const [key,value] = data
           this.dataToPost.push({Que:key,Ans:value})
          })
            console.log(this.dataToPost)
       },

      async postExams(){
          if(this.urlForPostUser=="https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items"){
              await this.getToken();
              const res = await axios.post(this.urlForPostUser,{
              Title:this.userName,
              exam:JSON.stringify(this.dataToPost),
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
          var allowed = true
          this.boolIfEmpty.forEach(bool=>{
            if(bool!=false){
              allowed=false
            }
          })
             console.log(allowed)

           if(allowed==true){
             this.showRedWarn = false
             this.subRouterIsShow = true
             console.log(this.examUserData)
          }
             else{
               this.showRedWarn=true
             }           
        },
        async sendData(){
            await this.postDataFormat()
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
                this.isntSubmmitedYet=true
              }
              else{
                console.log("is full")
                this.isntSubmmitedYet=false
              }
          }
          catch{
              console.log("is empty, you should see the exam")
              this.isntSubmmitedYet=true
          }
          
      },
      spinner(){
          this.isLoadForSpinner=true
      },

      pushToArrToCheckIfEmpty(){
        this.examData.forEach(data=>{
          this.boolIfEmpty.push(true)
        })
          
      }
},


async beforeMount(){
   this.userName=localStorage.getItem("userName")
  console.log(this.userName)
    console.log(this.isntSubmmitedYet)
     if(this.urlForTheExams==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.Title}')/Items`){
      await this.checkIfExamExist()
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
              this.isntSubmmitedYet=true
          }
          
       this.isFinished=true
        const myTimeOut = setTimeout(this.spinner,170)
        this.pushToArrToCheckIfEmpty()
       

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
.loader-spinner{
  position:relative;
  right: 50%;
  width: 100%;
  height: 100%;
  transform:translateX(50%)
}

 .exam-box{
   margin-top:50px;
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .exam{
    border-top: 1px solid gray;
  }
  .exam:first-child{
    border-top:none
  }
 
form{
  position: relative;
  /* right: 50%;
  transform: translateX(50%); */
   min-height: 400px;
   width: var(--exams-form-width);
}
 label{
    cursor: pointer;
    width: 100% ;
    height: 100%;
    display: flex;
    align-items: center;
  }
.label-text{
  width: 100% ;
  margin-right: 30px;
  font-size: 22px;
  }
.question{
    min-height: 80px;
    width: 90%;
    position: relative;
    right: 50%;
    transform: translateX(50%);
    padding: 1em 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    /* border-bottom: 1px solid rgba(0,0,0,.1);     */
    font-size: 24px;
    font-weight: 700;
 }
.american-answer-options{
   /* padding: 25px 30px 20px 30px; */
   margin-top: 60px;
   margin-bottom: 150px;
   max-height: 435px;
   overflow-y: auto;
   direction: ltr;
   width: 85%;
   position: relative;
   right: 50%;
   transform: translateX(50%);

}
.answer-items{
    min-height: 40px;
    display: flex;
    background-color: rgba(192, 192, 192, 0.363);
    border-radius: 10px;
    position: relative;
    padding: 1.2em 1.5em;
     margin-bottom: 40px;
}
.answer-items:last-child{
  margin-bottom: 0px;
}
/* .answer-text{
  font-size:24px
} */
 input{
  /* appearance: none; */
  display: flex;
  height: 100%;
  position: relative;
  cursor: pointer;
}
textarea{
  width: 75%;
  position: relative;
  padding: 12px;
  right: 50%;
   transform: translateX(50%);
   height: 80px;
   border-radius:5px;
   border: 1px solid rgba(169, 169, 169, 0.774);
   outline: none;
   font-size: 20px;
}
.open-que{
  position: relative;
  top:20px;
}
.send{
  display: flex;
  flex-direction: column;
  margin-top:30px;
     margin-bottom: 70px;
     align-items: center;

}
.submit-btn{
   margin-top:10px;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 50px;
   text-decoration: none;
   color: #fff;
   width: 120px;
   border: 1px solid var(--main-background-color);
   border-radius: 15px;
   font-size: 18px;
   cursor: pointer;
   background-color: var(--main-background-color);

}
  .alreadySubmitted{
    font-size: 70px;
    margin-top:150px;
    text-align: center;
  }
.text-aria-placeholder::-webkit-input-placeholder{
  color:red;
}
.show-red-Warn{
  position: relative;
  color: red;
  margin-bottom: 5px;
}
 </style>