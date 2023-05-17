<template>
    <div class="loader-spinner" v-if="!isLoadForSpinner">
          <loadingSpinner />
    </div>
  <div class="title">{{}}</div>

  <div class="no-permission-mess" v-if="!isExamsPer">
    <h1>אין לך הרשאות לעמוד זה...</h1>
  </div>

   <form class="exam-box" v-if="!isAlreadySub&&isLoadForSpinner&&isExamsPer">
      <div class="exam" v-for="(question,index) in examData" :key="index">
          <div class="question">
              <div class="que-index">{{index+1+"."}}</div> 
               <div>{{question.Title}}</div> 
          </div> 
          <div class="american-answer-options" v-if="question.type=='american'">
                <label class="answer-items" :class="{'checked': examUserData[question.Title] === option}" v-for="(option,inner) in question.options" :key="inner" :ref="'inputRef_' + index + inner"> 
                  <div><input type="radio"  v-model="examUserData[question.Title]"  :value="option" @change="clickHandler($event,examUserData[question.Title]+index,index,inner)" :name="option"  :id="option" :ref="'inputRef_' + index" /></div>
                  <div class="label-text">{{option}} </div>
                </label>
                      <span v-if="false" :ref="'warning_' + index">אנא בחר באחת מהאפשרויות</span>

          </div>
          
          <div class="open-que" v-if="question.type=='open'" :ref="'inputRef_' + index">
            <textarea id="" cols="30" rows="10" placeholder="הכנס תשובה" @input="clickHandler($event,examUserData[question.Title]+index,index,inner)" v-model="examUserData[question.Title]"   ></textarea>
          </div>
       </div>
    </form>
    
          <div class="send" v-if="!isAlreadySub&&isLoadForSpinner&&isExamsPer">
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
export default {
  components:{
    loadingSpinner
  },
data(){
  return{
      urlForTheExams: process.env.NODE_ENV =='development'? `http://localhost:3000/${this.$route.params.Title}/`:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.Title}')/Items`,
      examData:[],
      examUserData:{},
      isUserDataEmpty:true,
      boolIfEmpty:[],
      dataToPost:[],
      token:'',
      userName:'',
      userId:'',
      isExamsPer:true,
      isAlreadySub:null,
      isLoadForSpinner:false,
      examExistData:[],
      subRouterIsShow:false,
      showRedWarn:false,
      showRedWarnToAmerican:false,
   }
},
methods:{
      asyncParse(str){
        return new Promise((resolve)=>{
          resolve(JSON.parse(str))
        })
      },

  
      clickHandler(event,theRef,index,inner){
        this.showRedWarn=false
        const v = this.$refs[`inputRef_${index}${inner}`]
           const pressedAnswer = event.target.value;
             if(pressedAnswer.trim()){
                 this.isUserDataEmpty=false
                 this.boolIfEmpty[index]=this.isUserDataEmpty
                 console.log(this.boolIfEmpty)
             }
            else{ 
                this.boolIfEmpty[index]=true
                console.log(this.boolIfEmpty)              
                console.log("is empty")
                // event.target.classList.add("text-aria-placeholder")
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
        var res = null
         console.log(this.examsName.subject)
           if(this.$isSharePointUrl){
              await this.getToken();
              res = await axios.post(this.$sharePointUrl+"getByTitle('pending tests')/Items",{
              Title:this.userName,
              exam:JSON.stringify(this.dataToPost),
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
                  exam:this.dataToPost,
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
             console.log(this.examUserData)
          }
             else{
               this.showRedWarn=true
             }           
        },
      showAlertConfirm(){
          this.$swal({
          title:"האם את\ה בטוח",
          text:"האם אתה בטוח שברצונך להגיש מבחן זו ?",
          type:'warning',
          showCancelButton:true,
          confirmButtonColor:"var(--main-background-color)",
          confirmButtonText:'כן, הגש מבחן'
         }).then((result)=>{
              if(result.value){
                 this.postDataFormat()
                 if(this.postExams()){
                  this.$swal({
                    title:'Send',
                    text:'נשלח בהצלחה',
                    type:'success',
                    confirmButtonColor:"var(--main-background-color)",
                    confirmButtonText:'סיים'
                  })
                      this.$router.push({name:'submitted',params:{Title:this.$route.params.Title}})
              }
              else{
                  this.$swal(
                  'Not Send',
                  'אירעה שגיעה',
                  'not succeeded'
                )
              }
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
               if(this.examData[i].type=='open'){
                  value.classList.add("text-aria-placeholder")
               }
                   return alert(`אנא הכנס תשובה בשאלה ${i+1}`)

             }
           }
          if(this.subRouterIsShow==true){
            this.showAlertConfirm()
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
        this.examData.forEach(data=>{
          this.boolIfEmpty.push(true)
        })
          console.log(this.boolIfEmpty)
      }
},


async beforeMount(){
  console.log(this.$route.params)
  this.userName=localStorage.getItem("userName")
  console.log(this.userName)
  this.examsName = localStorage.getItem("examsName")
  this.examsName = JSON.parse(this.examsName)
   this.examsName = this.examsName.filter(data=>data.Title==this.$route.params.Title)[0]
  console.log(this.examsName)
     this.examExistData = await this.checkIfExamExist()
     console.log("yess") 
    
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


              return axios.get(this.$sharePointUrl+`getByTitle('${this.$route.params.Title}')/Items`)
              .then(response=>{
                return  response.data.value;
              })
              .then(data =>{
                  const promiseAnswers = Promise.all(data.map((item)=>{
                        return this.asyncParse(item.options).then((inner)=>{
                              item['options'] = inner
                              return {item}
                          })
                      }))
                      this.examData = data
                      console.log(this.examData)
                      const myTimeOut = setTimeout(this.spinner,170)
                      this.pushToArrToCheckIfEmpty()

              })
              .catch(error=>{
                 console.log(error)
                   this.isExamsPer = false
                   console.log(this.isExamsPer)
                   this.isLoadForSpinner=true
                 
              })
          }

          else{
              return axios.get(this.$sharePointUrl+`${this.$route.params.Title}`)
              .then(response=>{
                  this.examData = response.data.value;
                  console.log(this.examData)
                  this.isAlreadySub=false
                  const myTimeOut = setTimeout(this.spinner,170)
                  this.pushToArrToCheckIfEmpty()
              })
               .catch(error=>{
                 if(error.response.status === 404){
                   this.isExamsPer = false
                   console.log(this.isExamsPer)
                   this.isLoadForSpinner=true
                 }
               })
           }

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
  width: 100%;
  height: 100%;
 }
 .no-permission-mess{
   font-size:35px;
    margin-top:150px;
    text-align: center;

 }
.exam{
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-left: 20px;
    font-size: 27px;
 }
.question{
    min-height: 80px;
    width: 80%;
    position: relative;
    padding: 1em 32px;
    display: flex;
     align-items: center;
    font-size: 24px;
    font-weight: 700;
 }
 /* .line{
   width: 90%;
    border-bottom: 1px solid rgba(0,0,0,.1);
    position: relative;
    margin-top:15% 
 } */
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