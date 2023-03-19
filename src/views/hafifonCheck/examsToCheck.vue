<template>
    <div class="loading-spinner" v-if="!isLoad">
          <loadingSpinner />
    </div>

 <div class="exam" v-if="isLoad">
      <form class="exam-box" v-for="(item,index) in examData" :key="index">
          <div class="question"> 
             <span>{{index+1+"."}}  {{item.Que}}</span> 
          </div> 
                <p>התשובה שהוזנה:</p>  

          <div class="answer-options">
              <div class="answer-items"> 
                 {{item.Ans}} 
              </div>
              <span>בחר ניקוד</span>
              <div class="select-right-wrong">
                 <input type="number" min="0" :max="pointsForEachQue" placeholder="אנא בחר ניקוד" @change="handler($event,index)" >
              </div>
              <div class="comments">
                <textarea name="" id="" cols="30" rows="5" placeholder="הכנס הערות (אופציונלי)" v-model="vModelData[item.Que]"></textarea>              
              </div>
          </div>
      </form>
      <div class="bottom-of-page">
          <div class="warning-title" v-if="isOpenWarn">*אנא בדוק שניקדת את כל השאלות</div>
            <div class="send">
               <button v-if="!routerIsShown" class="submit-btn" @click="submit">חשב ציון</button>
            </div>
          
          <div class="modal" v-if="routerIsShown">
            <div class="modal-cont">
              <span></span>
            </div>
              <router-link :to="{name:'examsIsChecked'}"  class="submit-btn">סיים ושלח בדיקה</router-link>
          </div>
          
      </div>    
   </div>

</template>

<script>
import axios from  'axios';
import loadingSpinner from "@/components/loadingSpinner.vue"
 export default {
  components:{
    loadingSpinner
  },
  data(){
    return{
      url:process.env.NODE_ENV =='development'? `http://localhost:3000/pendingTests/?num=${this.$route.params.num}&type=${this.$route.params.examType}` : `https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items?$filter=(num eq '${this.$route.params.num}') and (type eq '${this.$route.params.examType}')`,
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
      finalGrade:null
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
      calcFinalGrade(){
        for(var p in this.pointsArray){
          this.finalGrade+=this.pointsArray[p]
        }
        console.log(this.finalGrade)
      },
     submit(){
        var isFull = true
       this.pointsArray.forEach(point=>{
         if(!point){
           isFull=false
         }
       })
         if(isFull==true){
            this.routerIsShown=true
            this.calcFinalGrade()
            console.log(this.vModelData)
          }
          else{
            this.isOpenWarn=true
          }
         
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
    if(this.url==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items?$filter=(num eq '${this.$route.params.num}') and (type eq '${this.$route.params.examType}')`){
       const res = await axios.get(this.url)
     this.examData = res.data.value
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
          const res = await axios.get(this.url)
          this.examData = res.data.value
          this.examData = res.data.value[0].exam
          console.log(this.examData)

    }
        this.examLength = this.examData.length
        console.log(this.examLength)
        this.calcTheGrade()
          const myTimeOut = setTimeout(this.timeOutForSpinner,200)
          this.pushToArrToCheckGrade()
    },
   mounted(){
     this.examData.forEach(que=>{
       this.vModelData = ''
     })
   }
  
}
</script>

<style scoped>
form{
  position: relative;
  right: 50%;
  transform: translateX(50%);
   min-height: 400px;
   width: 1200px;
}
.exam{
  margin-top:50px
}
  .exam-box{
    margin-bottom: 100px;
    border-top: 1px solid gray;
  }
  .exam-box:first-child{
     border-top:none
  }
 .question{
    margin-bottom: 30px;
    margin-top: 20px;
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
 .answer-options{
    margin-top: 30px;
   /* margin-bottom: 150px; */
    max-height: 435px;
    width: 70%;
    position: relative;
    right: 50%;
    transform: translateX(50%);
}
.answer-items{
    min-height: 40px;
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
select:invalid{
  color:gray;
}
select{
   font-size: 20px;
   outline: none;
}
option{
  color:black;
}
.select-right-wrong{
  position: relative;
  margin-bottom:50px;
     justify-content: space-around;

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
  width: 140px;
  margin-bottom: 40px;
  right: 50%;
  transform: translateX(50%);
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