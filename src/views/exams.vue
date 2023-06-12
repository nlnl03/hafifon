<template>
    <div class="loader-spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div>

   <div class="title-timer">
        <div class="title" v-if="!isAlreadySub&&isLoadForSpinner">{{examsName.subject}}</div>
        <div class="timer" v-if="!isAlreadySub&&isLoadForSpinner" > <timer :totalTime="4500" /> </div>
   </div>
 
  
   <form class="exam-box" v-if="!isAlreadySub&&isLoadForSpinner">
      <div class="exam" v-for="(item,index) in examData.exam" :key="index">
          <span class="que-index">{{index+1+"."}}</span> 

            <div class="regular-que" v-if="item.type=='regularQue'">
                <div class="question">
                    <div class="que-text"> {{item.questions[0]["que"]}}</div>
                      <div class="open-que" v-if="item.questions[0].type=='open'" :ref="'inputRef_' + item.id">
                            <textarea id="" cols="30" rows="10" placeholder="הכנס תשובה" @input="clickHandler($event,index,inner,subIndex,item.id)"
                              v-model="item.inputAns" >
                            </textarea>
                      </div>
                </div>
            </div>


            <div class="sub-que" v-if="item.type=='subQue'">
                <div class="question" v-for="(question,subIndex) in item.questions" :key="subIndex" >
                    <div class="que-text"> {{getHebLetters(subIndex)}}. {{question.que}} </div>
                
                    <div class="open-que" v-if="question.type=='open'" :ref="'inputRef_' + question.id">
                        <textarea id="" cols="30" rows="10" placeholder="הכנס תשובה" @input="clickHandler($event,index,inner,subIndex,question.id)"
                          v-model="question.inputAns" >
                        </textarea>
                    </div>
                    
                    <div class="american-answer-options" v-if="question.type=='american'">
                        <label class="answer-items" :class="{'checked': examUserData[question.Title] === option}" v-for="(option,inner) in question.options" :key="inner" :ref="'inputRef_' + index + inner"> 
                            <div><input type="radio"  v-model="question.inputAns"  :value="option" @change="clickHandler($event,index,inner,subIndex,question.id)" :name="option"  :id="option" :ref="'inputRef_' + index" /></div>
                            <div class="label-text">{{option}} </div>
                        </label>
                        <span v-if="false" :ref="'warning_' + index">אנא בחר באחת מהאפשרויות</span>
                    </div>
                </div>
            </div>  

              
       </div>
    </form>
    
      <div class="send" v-if="!isAlreadySub&&isLoadForSpinner">
          <p class="show-red-Warn" v-if="showRedWarn">* אנא בדוק שענית על כל השאלות</p>
              <button class="submit-btn" @click="sendData" >סיים</button>
      </div>

      <div class="alreadySubmitted" v-if="isAlreadySub&&isLoadForSpinner">
          כבר הגשת מבחן זה...
      </div>

</template>

<script>
import axios from 'axios';
import loadingSpinner from '../components/loadingSpinner.vue'
import timer from '../components/timer.vue' 
export default {
  components:{
    loadingSpinner,
    timer
  },
data(){
  return{
      examData:[],
      examUserData:{},
      isUserDataEmpty:true,
      boolIfEmpty:[],
      dataToPost:[],
      token:'',
      userName:'',
      userId:'',
      isAlreadySub:null,
      isLoadForSpinner:false,
      examExistData:[],
      subRouterIsShow:false,
      showRedWarn:false,
      showRedWarnToAmerican:false,
      showExitAlert:true,
      postS:null
    }
},
methods:{

    getHebLetters(index){
      const hebrewLetters = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"]
      return hebrewLetters[index % hebrewLetters.length]
    },

    asyncParse(str){
       return new Promise((resolve)=>{
          resolve(JSON.parse(str))
       })
    },

  
      clickHandler(event,index,inner,subIndex,id){
         console.log(id)
          this.showRedWarn=false
          const v = this.$refs[`inputRef_${index}${inner}`]
          console.log(v)
           const pressedAnswer = event.target.value;
           this.message = pressedAnswer

                if(pressedAnswer.trim()){
                    this.isUserDataEmpty=false
                    this.boolIfEmpty[id]=this.isUserDataEmpty
                    console.log(this.boolIfEmpty)
                }
                else{ 
                    this.boolIfEmpty[id]=true
                    console.log(this.boolIfEmpty)              
                    console.log("is empty")
                    // event.target.classList.add("text-aria-placeholder")
                }
      },

         
       getToken(){
           return axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo").then((res=>res.data.FormDigestValue))
       },

 
      async postExams(){
        var dataToPost = [...this.examData.exam]
        var res = null
         console.log(this.examsName.subject)
           if(this.$isSharePointUrl){
             this.token = await this.getToken();
              res = await axios.post(this.$sharePointUrl+"getByTitle('pending tests')/Items",{
                Title:this.userName,
                exam:JSON.stringify(dataToPost),
                num:this.userId,
                type: this.$route.params.Title,
                name:this.examsName.subject
            },

            { 
              headers:{
                    'X-RequestDigest':this.token,
                }
            }) 
          }
          
          else{
            console.log(this.$route.params)
             res = await axios.post(this.$sharePointUrl+"pendingTests",{
              value:[
                {
                  Title:'sdsdsd',
                  exam:dataToPost,
                  num:this.userId,
                  type: this.$route.params.Title,
                  name:this.examsName.subject
                }
              ]
            })
          }
            if(res.status=='200'||res.status=='201'){
              return true
            }
            else{
              return false
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
           }
             else{
               this.showRedWarn=true
             }           
        },
      showAlertConfirmBeforeSend(){
          this.$swal({  
            title:"האם אתה בטוח שברצונך להגיש מבחן זו ?",
            text:"אם תגיש לא תוכל/י לחזור עליו...",
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:"var(--main-background-color)",
            confirmButtonText:'כן, הגש מבחן',
            cancelButtonText:"ביטול"
          }).then((result)=>{
              if(result.value){
                  if(this.postExams()){
                   this.showExitAlert = false
                    this.$swal({
                      title:'נשלח בהצלחה',
                      icon:'success',
                      confirmButtonColor:"var(--main-background-color)",
                      confirmButtonText:'סיים'
                    })
                      console.log(this.showExitAlert)
                      this.$router.push({name:'submitted',params:{Title:this.$route.params.Title}})
                       
                   }
              else{
                  this.$swal(
                  'Not Send',
                  'אירעה שגיעה',
                  'not succeeded'
                )
              }
                console.log(this.$route)
           }
         })            
      },

        async sendData(){
           this.submit()
            for(let i=0; i < this.boolIfEmpty.length; i++){
              console.log(this.$refs[`inputRef_${i}`])
              var value = this.$refs[`inputRef_${i}`].children[0]

             if(this.boolIfEmpty[i]==true){
               this.$refs[`inputRef_${i}`].scrollIntoView({behavior:"smooth",block:"center"});
                   value.classList.add("text-aria-placeholder")
                    return alert(`אנא הכנס תשובה בשאלה ${i+1}`)

             }
           }
          if(this.subRouterIsShow==true){
            this.showAlertConfirmBeforeSend()
          }
        },

       checkIfExamExist(){
          this.userId=localStorage.getItem("userId")
          if(this.$isSharePointUrl){
             return axios.get(this.$sharePointUrl+`getByTitle('pending tests')/Items?$filter=(num eq '${this.userId}') and (type eq '${this.$route.params.Title}')`).then((res)=>res.data.value)
          }
          else{
              return axios.get(this.$sharePointUrl+`pendingTests?num=${this.userId}&type=${this.$route.params.Title}`).then((res)=>res.data.value)
          }
      },

      spinner(){
          this.isLoadForSpinner=true
      },

      pushToArrToCheckIfEmpty(){
        this.examData.exam.forEach(data=>{
           data.questions.forEach(que=>{
              this.boolIfEmpty.push(true)
          })
        })
          console.log(this.boolIfEmpty)
      },
      handlePageReload(event){
        event.preventDefault()
        event.returnValue = ''
      },
      async postSh(){
        var inst = ["*מבחן זה רשום בלשון זכר אך פונה אל כל המגדרים כלשון אחד.", "*בכל שאלה בה אופן הטיפול כולל סיוע של צוות נוסף, יש לציין את דרך הפנייה אל הצוות ואת הפרטים הנחוצים."]
        var data = {
         "exam": [
          {
            "type": "subQue",
            "questions": [
              {
                "type": "open",
                "que": "הסבר מהו  IMAGEומדוע משתמשים בו. הסבר מהו IMAGE ייעודי וציין אילו מערכות דורשות אותו (4 נק')",
                "inputAns": "",
                "id": 0,
                "points": 4,
                "pointsReceived": "",
                "comments": ""
              },
              {
                "type": "open",
                "que": "הצג בקצרה את שלושת הדרכים שדרכם ניתן להתקין IMAGE על מחשב וציין איזה מערכת הפעלה בכל דרך? (2  נק')",
                "inputAns": "",
                "id": 1,
                "points": 2,
                "pointsReceived": "",
                "comments": ""
              }
            ]
          },
          {
            "type": "subQue",
            "questions": [
              {
                "type": "open",
                "que": "פרט, כיצד נפיץ אימג' משואה על מחשב? מה חשוב לוודא לפני הפצת האימג'? (3 נק')",
                "inputAns": "",
                "id": 2,
                "points": 3,
                "pointsReceived": "",
                "comments": ""
              },
              {
                "type": "open",
                "que": "פרט את שלבי התקנת המשואה לאחר התקנת האימג' (2 נק')",
                "inputAns": "",
                "id": 3,
                "points": 2,
                "pointsReceived": "",
                "comments": ""
              },
              {
                "type": "open",
                "que": "פרט, כיצד נפיץ מפות על משואה? אילו מפות נפיץ? (2 נק')",
                "inputAns": "",
                "id": 4,
                "points": 2,
                "pointsReceived": "",
                "comments": ""
              },
              {
                "type": "open",
                "que": "פרט, מה ההבדל בין משואה אחודה ללקוח? ציין שני הבדלים עיקריים. (2 נק')",
                "inputAns": "",
                "id": 5,
                "points": 2,
                "pointsReceived": "",
                "comments": ""
              }
            ]
          },
          {
            "type": "subQue",
            "questions": [
              {
                "type": "open",
                "que": "איזה 2 מערכות קיימות ברשת הMOIP? ומה הקונבנציה של כל מערכת? (2 נק')",
                "inputAns": "",
                "id": 6,
                "points": 2,
                "pointsReceived": "",
                "comments": ""
              },
              {
                "type": "open",
                "que": "פרט כיצד נתקין MOIP ואיזה אימג' המערכת דורשת?(2 נק')",
                "inputAns": "",
                "id": 7,
                "points": 2,
                "pointsReceived": "",
                "comments": ""
              },
              {
                "type": "open",
                "que": "ציין בקצרה מה השלבים לאחר ההפצת אימג'? (2 נק')",
                "inputAns": "",
                "id": 8,
                "points": 2,
                "pointsReceived": "",
                "comments": ""
              },
              {
                "type": "open",
                "que": "מה הדומיין של MOIP? (1 נק')",
                "inputAns": "",
                "id": 9,
                "points": 1,
                "pointsReceived": "",
                "comments": ""
              }
            ]
          },
          {
            "type": "regularQue",
            "questions": [
              {
                "que": "ציין 2 דרכים להתקנת WIN10 , בחר דרך אחת ופרט כיצד תתקין מחשב WIN10. (3 נק')",
                "type": "open"
              }
            ],
            "inputAns": "",
            "id": 10,
            "points": 3,
            "pointsReceived": "",
            "comments": ""
          },
          {
            "type": "regularQue",
            "questions": [
              {
                "que": "ציין את תפקיד המקשים F2,F8,F9,F10,F12 הבאים בהפעלת המחשב (2 נק')",
                "type": "open"
              }
            ],
            "inputAns": "",
            "id": 11,
            "points": 2,
            "pointsReceived": "",
            "comments": ""
          },
          {
            
          }
        ]
      }
       this.token = await this.getToken();
        const res = await axios.post(this.$sharePointUrl+`getByTitle('${this.$route.params.Title}')/Items`,{
                Title:"0",
                instructions:JSON.stringify(inst),
                exam:JSON.stringify(data),
                 
            },

            { 
              headers:{
                    'X-RequestDigest':this.token,
                }
            }) 
      }
        
},
 
async beforeMount(){
  console.log(this.$route.params)
  this.userName=localStorage.getItem("userName")
  console.log(this.userName)
  const examsName = localStorage.getItem("examsName")
  const examsNameParsed = JSON.parse(examsName)
   this.examsName = examsNameParsed.filter(data=>data.Title==this.$route.params.Title)[0]
    console.log(this.examsName)
     this.examExistData = await this.checkIfExamExist()
     console.log("yess") 
     var res = null

          if(this.$isSharePointUrl){
               try{
                  console.log(this.examExistData)
                    if(!this.examExistData.length){
                      console.log("is empty, you should see the exam")
                      this.isAlreadySub=false
                    }
                    else{
                      console.log("is full")
                      this.isLoadForSpinner=true
                      this.isAlreadySub=true
                    }
                 }
                catch{
                    console.log("is empty, you should see the exam")
                 }
                    console.log(this.isAlreadySub)


                res = await axios.get(this.$sharePointUrl+`getByTitle('${this.$route.params.Title}')/Items`)
                var examData = res.data.value
                  this.examData = examData;

                    const promiseAnswers = await Promise.all(this.examData.map((item)=>{
                          return this.asyncParse(item.exam).then((inner)=>{
                                item.exam = inner
                                return {item}
                            })
                        }))   
                            this.examData = this.examData[0]              
            }

          else{
              res = await axios.get(this.$sharePointUrl+`${this.$route.params.Title}`)
                  var examData = res.data.value;
                  this.examData = examData[0]
                   this.isAlreadySub=false
   
           }
                  // this.postSh()
                  console.log(this.examData)
                  const myTimeOut = setTimeout(this.spinner,170)
                  this.pushToArrToCheckIfEmpty()
                  
},

  mounted(){
    window.addEventListener('beforeunload',this.handlePageReload)
   },

  beforeRouteLeave(to,from,next){
    if(this.showExitAlert){
        this.$swal({
          title:"את/ה בטוח/ה שברצונך לצאת ממבחן זה ?",
          text:"אם תצא/י השינויים לא ישמרו !",
          icon:'warning',
          showCancelButton:true,
          confirmButtonText:"צא/י",
          cancelButtonText:"הישאר/י",
          confirmButtonColor:"var(--main-background-color)"
        }).then((result)=>{
          if(result.isConfirmed){
            next()
          }
          else{
            next(false)
          }
        })
    }
    else{
      next()
    }
  },
  beforeUnmount(){
    window.removeEventListener('beforeunload', this.handlePageReload)
  }
}
</script>

<style scoped>
.title-timer{
   top:50px;
   display:flex;
   width: 90%;
   position:relative;
   align-items:center;
   right: 50%;
   transform:translateX(50%);
   margin-bottom:20px;

}
.timer{
  position:relative;
  right: 80%;
  transform:translateX(80%);
  font-size:25px;
  }
.title{ 
  /* top:30px; */
  font-size:45px;
  font-weight:700;
  position:relative;
  right: 50%;
  transform:translateX(50%);
  text-align:center;
   /* width: 200px; */
}
.loader-spinner{
  position:relative;
  width: 100%;
  height: 100%;
 }
 .no-permission-mess{
   font-size:35px;
    margin-top:150px;
    text-align: center;

 }
.exam{
    flex-direction: column;
    align-items: center;
    display: flex;
    width: 75%;
    min-height: 400px;
    margin-top: 80px;
    border-top: 1.5px solid rgba(0,0,0,.1);
  }
  .exam:first-child{
    border-top:none;
    margin-top:75px
  }
.show-red-Warn-american{
  display:inline;
}
 .exam-box{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 
form{
     min-height: 400px;
 }
 label{
    cursor: pointer;
     height: 100%;
    display: flex;
    align-items: center;
   }
.label-text{
  width: 100% ;
  height: 100%;
  margin-right: 10px;
  font-size: 22px;
  }
   .que-index{
    font-size: 27px;
    position: relative;
    left: 45%;
    top: 30px;
    transform: translate(45%,30px);

 }
.question{
    position: relative;
    margin: 1em 0;
    min-height: 350px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    font-size: 24px;
    font-weight: 700;
 }
  .american-answer-options{
   /* padding: 25px 30px 20px 30px; */
   margin-top: 60px;
   margin-bottom: 50px;
   /* max-height: 510px; */
   overflow-y: auto;
   direction: ltr;
   width: 63%;
   position: relative;
}
.answer-items{
    min-height: 45px;
    display: flex;
    background-color: rgba(192, 192, 192, 0.363);
    border-radius: 10px;
    position: relative;
    padding: 1.5em;
    margin-bottom: 45px;
    
}
.answer-items:last-child{
  margin-bottom: 0px;
}
.answer-items:hover:not(.checked){
  background-color: rgba(150, 148, 148, 0.363) ;
 }
 .answer-items.checked{
   background-color: rgba(150, 148, 148, 0.637) ;
       transition: all 0.2s ease-in-out;

 }
  input{
  appearance: none;
  display: flex;
  height: 100%;
  position: relative;
  cursor: pointer;
}
textarea{
  width: 70%;
  margin-top: 30px;
  position: relative;
  padding: 12px;
  height: 120px;
  border-radius:5px;
  border: 1px solid rgba(169, 169, 169, 0.774);
  outline: none;
  font-size: 20px;
}
 .que-text{
  width: 80%;
}
.sub-que, .regular-que{
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  width: 80%;

 }
.open-que{
    position: relative;
    display: flex;
    top: 20px;
    width: 80%;
    align-items: center;
    justify-content: center;
}
.send{
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top:80px;
    bottom: 60px;
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