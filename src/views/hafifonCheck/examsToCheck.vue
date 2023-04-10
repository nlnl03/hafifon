<template>
    <div class="loading-spinner" v-if="!isLoad">
          <loadingSpinner />
    </div>

 <form class="exam-box" v-if="isLoad">
      <div class="exam" v-for="(item,index) in examData" :key="index">
          <div class="question"> 
             <span>{{index+1+"."}}  {{item.Que}}</span> 
          </div> 
                <p>התשובה שענ\תה:</p>  

          <div class="answer-options">
              <div class="answer-items"> 
                 {{item.Ans}} 
              </div>
              <div class="select-right-wrong">
                  <span class="choose-points">בחר ניקוד</span>
                 <input type="number" min="0" :max="pointsForEachQue"  v-model="vModelData[item.Que]" placeholder="אנא בחר ניקוד" @change="handler($event,index)" >
              </div>
              <div class="comments">
                <textarea name="" id="" cols="30" rows="5" v-model="commentsData[item.Que]" placeholder="הכנס הערות (אופציונלי)"></textarea>              
              </div>
          </div>
      </div>
      <div class="bottom-of-page">
          <div class="warning-title" v-if="isOpenWarn">*אנא בדוק שניקדת את כל השאלות</div>
            <div class="send">
               <button :to="{name:'examsIsChecked'}" class="submit-btn" @click="submit">הגש</button>
             </div>
       </div>
   </form>

</template>

<script>
import axios from  'axios';
import Modal from '@/components/Modal.vue'
import loadingSpinner from "@/components/loadingSpinner.vue"
 export default {
  components:{
    loadingSpinner,
    Modal
  },
  data(){
    return{
      urlForPending:process.env.NODE_ENV =='development'? `http://localhost:3000/pendingTests/?num=${this.$route.params.num}&type=${this.$route.params.examType}` : `https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items?$filter=(num eq '${this.$route.params.num}') and (type eq '${this.$route.params.examType}')`,
      urlForStudentsList:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('students')/Items`,
      examData:[],
      vModelData:{},
      isAllInpFull:false,
      isLoad:false,
      pointsForEachQue:null,
      examLength:null,
      pointsArray:[],
      inputVal:[],
      openHalfAns:'',
      ite:0,
      isOpenWarn:false,
      routerIsShown:false,
      finalGrade:null,
      isChecExamNotExist:false,
      token:'',
      id:null,
      pendingTestId:null,
      dataToPost:[],
      commentsData:{},
     }
  },
  methods:{
    pushToArrToCheckGrade(){
        this.examData.forEach(data=>{
          this.pointsArray.push(null)
        })
      },
    handler(event,index){
        console.log(this.vModelData)
        this.isOpenWarn=false
        var val = event.target.value
        console.log(val)
          if(val>=0&&val<=this.pointsForEachQue){
            if(val==16){
                this.pointsArray[index]=(this.pointsForEachQue)
            }
            else{
                this.pointsArray[index]=parseInt(val)
            }
            }
            else{
              this.pointsArray[index]=null
            }
              console.log(this.pointsArray)
     },
      postDataFormat(){
        var comm =null
        var ans = null
        Object.entries(this.vModelData).forEach(data=>{
          console.log(data)
          comm= this.commentsData[data[0]]
          this.examData.forEach(item=>{
            if(item['Que']==data[0]){
               ans = item['Ans']
            }
          })
           console.log(ans)
           const [key,value,Comments,Ans] = data
           this.dataToPost.push({Que:key,Points:value,Comments:comm,Ans:ans})
          })
        },

      calcFinalGrade(){
        for(var p in this.pointsArray){
          this.finalGrade+=this.pointsArray[p]
        }
        console.log(this.finalGrade)
      },
      checkIfAllIsFull(){
        var isFull = true
        this.pointsArray.forEach(point=>{
         if(!point){
           isFull=false
         }
       })
        return isFull
      },

        showAlertConfirm(){
          this.$swal({
          title:"האם את\ה בטוח",
          text:"האם אתה בטוח שברצונך להגיש בדיקה זו ?",
          type:'warning',
          showCancelButton:true,
          confirmButtonColor:"var(--main-background-color)",
          confirmButtonText:'כן, שלח בדיקה'
         }).then((result)=>{
              if(result.value){
                this.calcFinalGrade()
                this.dataToPost.push({finalGrade:this.finalGrade})
                 if(this.postData()){
                   this.delDataFromPending()
                  this.$swal(
                  'Send',
                  'נשלח בהצלחה',
                  'success'
                )
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
 

     async submit(){
        await this.checkIfAllIsFull()
          if(this.checkIfAllIsFull()==true){
              this.postDataFormat()
              console.log(this.dataToPost)
              this.showAlertConfirm()
            }
          else{
              this.isOpenWarn=true
          }
     },

     async checkIfExist(){
       var data=[]
       const res = await axios.get(this.urlForStudentsList+`?$filter=num eq '${this.$route.params.num}'&$select=${this.$route.params.examType}`)
       data=res.data.value
       console.log(data[0][this.$route.params.examType])
       if(data[0][this.$route.params.examType]==null){
         this.isChecExamNotExist=true
       }
     },

        getToken(){
          return  axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo").then((res=> res.data.FormDigestValue))
       },

      async getId(){
        const res = await axios.get(this.urlForStudentsList+`?$filter=num eq ${this.$route.params.num}`) 
        this.id=res.data.value[0].ID
        console.log(this.id)
      },


     async postData(){
       this.token = await this.getToken()
       console.log(this.token)
        const res = await axios.post(`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('students')/Items('${this.id}')`,{
            '__metadata':{'type':'SP.Data.StudentsListItem'},

              [this.$route.params.examType]:JSON.stringify(this.dataToPost)
       },
       {
              headers:{
                    'X-HTTP-Method':"MERGE",
                    'IF-MATCH':"*",
                    'X-RequestDigest':this.token,
                    'Accept':"application/json;odata=verbose",
                    'Content-Type':"application/json;odata=verbose"

              }
       })
          if(res.status=='204'||res.status=='200'){
            return true
          }
          else{
            return false
          }    
    },

    async delDataFromPending(){
        this.token = await this.getToken()
        console.log(this.token)
         const res = await axios.post(`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items('${this.pendingTestId}')`,{
            '__metadata':{'type':'SP.Data.Pending_x0020_testsListItem'},
        },
         {
           headers:{
                    'X-HTTP-Method':"DELETE",
                    'IF-MATCH':"*",
                    'X-RequestDigest':this.token,
                    'Accept':"application/json;odata=verbose",
                    'Content-Type':"application/json;odata=verbose"

              }
         })
         
    },
    
      
     asyncParse(str){
        return new Promise((resolve)=>{
          resolve(JSON.parse(str))
        })
      },
      timeOutForSpinner(){
        this.isLoad=true
      },

      calcTheGrade(){
          this.pointsForEachQue=100/this.examLength
          console.log(this.pointsForEachQue)
      }
  },
  async beforeMount(){
    if(this.urlForPending==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items?$filter=(num eq '${this.$route.params.num}') and (type eq '${this.$route.params.examType}')`){
       const res = await axios.get(this.urlForPending)
     this.examData = res.data.value
     this.pendingTestId = res.data.value[0].ID
       const promiseAnswers = await Promise.all(this.examData.map((item)=>{
             return this.asyncParse(item.exam).then((inner)=>{
                  item['exam'] = inner
               return {item}
              })
            }))
          this.examData = this.examData[0].exam
          console.log(this.examData)
    }

    else{
          const res = await axios.get(this.urlForPending)
          this.examData = res.data.value
          this.examData = res.data.value[0].exam
          console.log(this.examData)
 
    }
        this.examLength = this.examData.length
        console.log(this.examLength)
        this.calcTheGrade()
          const myTimeOut = setTimeout(this.timeOutForSpinner,200)
          this.pushToArrToCheckGrade()
          this.getId()
          console.log(this.$route.params)
    },
   mounted(){
     this.examData.forEach(que=>{
       this.vModelData = ''
     })
   }
  
}
</script>

<style scoped>
.exam-box{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:50px
}
form{
   min-height: 400px;
 }

  .exam{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-bottom: 100px;
    border-top: 1px solid gray;
  }
  .exam:first-child{
     border-top:none
  }
 .question{
    margin-bottom: 30px;
    margin-top: 20px;
    min-height: 80px;
    width: 70%;
    position: relative;
     padding: 1em 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    /* border-bottom: 1px solid rgba(0,0,0,.1);     */
    font-size: 24px;
    font-weight: 700;
 }
 .answer-options{
    margin-top: 30px;
     width: 70%;
    position: relative;
 }
.answer-items{
    min-height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    background-color: rgba(192, 192, 192, 0.363);
    border-radius: 10px;
    position: relative;
    padding: 1.2em 1.5em;
     margin-bottom: 40px;
}
.answer-items:last-child{
  margin-bottom: 0px;
}
input[type="number"]{
  font-size:24px;
  outline: none;
  padding: 0.4em;
  border:1px solid rgba(0,0,0,.2);
 }
 .select-right-wrong{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom:50px;
 
}
.comments{
  position: relative;
  margin-bottom:50px;
  display: flex;
  justify-content: center;
}
textarea{
  width: 90%;
  font-size: 23px;
  padding: 10px;
}
.send{
   margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit-btn{
    padding: 0.1em 0.5em;
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

p{
  position: relative;
  font-size: 22px;
  font-weight: 700;
  border-bottom:1px solid rgb(211, 210, 210);
   margin-bottom: 30px;
 }
 .choose-points{
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
     border-bottom:1px solid rgb(211, 210, 210);

 }
 .loading-spinner{
    position: relative;
    top:150px;
  }

  .warning-title{
    bottom: 15px;
    color: red;
    position: relative;
    display: flex;
    justify-content: center;
  }

 .bottom-of-page{
   position: relative;
    top:30px;
 }
</style>