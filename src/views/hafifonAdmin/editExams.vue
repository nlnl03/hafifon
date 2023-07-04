<template>
<q-icon name="fas fa-search" />
<div class="edit-box">  
         <div class="instra-edit">
        <div v-for="instruction in examData.instructions" :key="instruction">
            {{instruction}}
        </div>
    </div>
    <div class="exam">
      <div class="exam-flex"> 
        <div class="flex" v-for="(exam,index) in examData.exam" :key="exam">
            <div class="part-text" v-if="exam.part">{{exam.part}}</div>
             <div class="que-index">{{index+1+"."}}</div> 
            <div class="regular-que" v-if="exam.type=='regularQue'">
                <div class="question">
                    <div class="que-text"  v-if="!(openEdit&&ite==index)"> {{exam.questions[0]["que"]}}</div>
                     <input type="text" class="que-text" :value="exam.questions[0].que" v-if="openEdit&&ite==index">
                </div>
                <button @click="openEditBtn(index)">fgfg</button>
            </div>


            <div class="sub-que" v-if="exam.type=='subQue'">
                <div class="title-que" v-if="exam.titleQue">
                    <span>{{exam.titleQue}}</span>
                  
                </div>

                <div class="question" v-for="(question,subIndex) in exam.questions" :key="subIndex" >
                    <div class="que-text" v-if="!(openEdit&&ite==index)"> <span class="sub-que-letter"></span> {{question.que}} </div>
                     <input type="text" class="que-text" :value="question.que" v-if="openEdit&&ite==index">

                     
                    <div class="american-answer-options" v-if="question.type=='american'">
                        <label class="answer-items" :class="{'checked': examUserData[question.Title] === option}" v-for="(option,inner) in question.options" :key="inner" > 
                             <div class="label-text">{{option}} </div>
                        </label>
                     </div>
                </div>
            </div>  
        </div>
      </div>
    </div>
</div>
  
</template>

<script>
import axios from 'axios'
 
 export default {
    data(){
        return{
            examData:[],
            openEdit:false,
            ite:null
        }
    },
    methods:{
        async getExamForEdit(){
            var res = null
            if(this.isSharePointUrl){
                 res = await axios.get(this.$sharePointUrl+`getByTitle('${this.$route.params.title})`)
            }
            else{
                res = await axios.get(this.$sharePointUrl+this.$route.params.title)
            }
                this.examData = res.data.value[0]
                console.log(this.examData)
        },
        openEditBtn(index){
            this.openEdit = true
            this.ite = index
            console.log(this.ite)
        }
    },
    beforeMount(){
        this.getExamForEdit()
    }
}
</script>

<style scoped>
.edit-box{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.instra-edit{
    padding: 3em;
    margin-top: 100px;
    width: 60%;
    height: 450px;
    background:rgba(99, 94, 94, 0.151);
    border-radius: 10px;
}
.exam-flex{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
}
.exam{
  padding: 3em;
  align-items: center;
  margin-top: 70px;
  width: 60%;
  background:rgba(99, 94, 94, 0.151);
  border-radius: 10px;
  margin-bottom: 100px;
}
.part-text{
  font-size: 32px;
  position: relative;
  font-weight: 700;
  top:30px
}
.que-index{
   font-size: 27px;
   position: relative;
   left: 45%;
   top: 30px;
   transform: translate(45%,30px);
   font-weight: 700;
 }
.sub-que, .regular-que{
   width: 80%;
 }
 .question{
    position: relative;
    margin: 1em;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    font-size: 24px;
    font-weight: 700;
 }
 .que-text{
   width: 90%;
   font-size: 25px;
 }
 .open-que{
    position: relative;
    display: flex;
    top: 20px;
    width: 80%;
    align-items: center;
    justify-content: center;
}
 .title-que{
    position:relative;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 70px;
    top: 24px;
    left: 35px;
 }
</style>