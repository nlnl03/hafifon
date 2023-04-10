<template>
<div class="exam">
   <div class="exam-checked" v-for="(exam,index) in checkedExam[examType]" :key="exam">
      <div class="que">
          {{index+1+"."}} {{exam.Que}}
      </div>
        <p>התשובה שענ\תה:</p>
      <div class="ans">
          {{exam.Ans}}
      </div>
      <div class="points">
          {{exam.Points}}/{{showTheGradeOutOf(val)}}
      </div>
       <p>הערות הבודק\ת:</p>
      <div class="comments" v-if="exam.Comments">
          <span>הערות הבודק\ת</span>
          {{exam.Comments}}
      </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            checkedExam:[],
            examType:null,
            userId:null,
            fullcheckedExam:[],
            exam:[]
        }
    },
    methods:{
        async getdata(){
            const res = await axios.get(`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('students')/Items?$filter=num eq '${this.userId}'&$select=${this.examType}`)
            this.checkedExam = res.data.value
            this.parseData()
            console.log(this.checkedExam)
            console.log(this.fullcheckedExam)
        },
         asyncParse(str){
            return new Promise((resolve)=>{
           resolve(JSON.parse(str))
          })
        },  
         async parseData(){
               const promiseAnswers = Promise.all(this.checkedExam.map((item)=>{
                return this.asyncParse(item[this.examType]).then((inner)=>{
                    this.fullcheckedExam=[...inner]
                     item[this.examType] = inner.filter(val=>Object.keys(val)!='finalGrade')
                        return {item} 
                        
                      })
                      
                  }))
                    this.checkedExam=this.checkedExam[0]
                    
         },
         showTheGradeOutOf(val){
             var outOfNum = 100/this.checkedExam[this.examType].length
             return val = outOfNum.toFixed(1)
         }
    },

     beforeMount(){
        this.examType = this.$route.params.title
         this.userId=localStorage.getItem("userId")
         this.getdata()
    }
}
</script>

<style scoped>
.exam{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
 }
.exam-checked{
    width: 80%;
}
  .que{
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
    font-size: 24px;
    font-weight: 700;
 }

 .points{
     direction: ltr;
 }

</style>