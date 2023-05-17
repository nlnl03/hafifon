<template>
<div class="exam">
   <div class="exam-checked" v-for="(exam,index) in checkedExam[examType]" :key="exam">
      <div class="que">
          <div class="que-title">
             <div class="que-index">{{index+1+"."}}</div>
                {{exam.Que}}
          </div>
        <div class="points">
          {{exam.Points}}/{{showTheGradeOutOf(val)}}
        </div>
      </div>
    
        <p>התשובה שענ\תה:</p>
      <div class="ans">
          {{exam.Ans}}
      </div>
      
       <p class="comments-title">הערות הבודק\ת:</p>
          <div v-if="!exam.Comments">אין הערות</div>

      <div class="comments" v-if="exam.Comments">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est tenetur maxime ipsum, illo, in doloremque cumque dolores dolore numquam consectetur id, unde enim non sapiente repellat iure voluptatibus quis. Sint possimus deserunt porro incidunt corporis perferendis fugit tempora voluptatibus. Nostrum, ut similique voluptatibus totam iste, vero tenetur distinctio numquam rerum commodi repellendus, quae nam rem! Rerum blanditiis, recusandae harum itaque asperiores, illo dolores numquam nisi tempora mollitia facilis laboriosam neque culpa ipsa exercitationem in similique tenetur temporibus est ratione explicabo dolore qui quos. Modi, corrupti quidem blanditiis quis ad impedit obcaecati repellat at tempore necessitatibus suscipit ratione facere eaque, aliquam error quisquam commodi unde. Aut aliquam accusantium, esse odio est, illum veniam repellendus maxime quaerat modi mollitia numquam deserunt dolorem, temporibus minima architecto? Unde laborum velit earum ipsa odit numquam eius quod expedita magni aut doloremque totam sunt, possimus voluptates sed veritatis porro quisquam nihil eaque quia ad ipsam aliquid exercitationem distinctio. Inventore dignissimos totam ad quae earum vel in magni dolorem. Distinctio provident nesciunt tenetur, odit pariatur, maxime atque ipsum ab impedit architecto nihil ut magnam voluptate quasi eligendi, neque ullam ducimus et ipsa mollitia a? Fugiat dignissimos, quibusdam recusandae ad consequuntur, quas repellat eius nam neque repudiandae ullam?
       </div>

      <div class="under-line"></div>
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
            var res = null
            if(this.$isSharePointUrl){
                res = await axios.get(this.$sharePointUrl+`getByTitle('students')/Items?$filter=num eq '${this.userId}'&$select=${this.examType}`)
                
            }
            else{
                res = await axios.get(this.$sharePointUrl+`students?num='${this.userId}'`)
 
            }
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
    width: 74%;
    display: flex;
    align-items: center;
    flex-direction: column;

}
  .que{
    margin-bottom: 30px;
    margin-top: 20px;
    min-height: 80px;
    width: 60%;
    position: relative;
     padding: 1em 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 700;
 }
 .que-index{
    display: inline;
    font-size: 30px;
    margin-left: 20px;

 }
 .que-title{
    padding-left: 1.3em;
 }
 .points{
    direction: ltr;
 }
 p{
    position: relative;
    font-size: 22px;
    font-weight: 700;
    border-bottom: 1px solid rgb(211, 210, 210);
    margin-bottom: 30px;
 }
 .ans{
    background: #bfbfbf94;
    min-width: 400px;
    min-height: 40px;
    border-radius: 10px;
    padding: 1em;
 }
 .comments{
    background: #bfbfbf94;
    width: 700px;
    min-height: 40px;
    border-radius: 10px;
    padding: 1.5em;
 }
  .comments-title{
     margin-top: 30px;
 }
.under-line{
    border-bottom: 2px solid hsla(0,0%,74.9%,.5803921568627451);
    width: 60%;
    margin-bottom: 40px;
    margin-top: 100px;
}
</style>