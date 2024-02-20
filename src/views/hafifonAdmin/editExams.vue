<template>
<div class="edit-box">  
    <div class="exam">
      <div class="exam-flex">
        <div class="flex" v-for="(exam,index) in examData.exam" :key="exam">

            <div class="part-text" v-if="exam.part">
                <div v-if="!(parentOpenEdit&&ite==index)" >{{exam.part}}</div>
                <textarea class="que-text" v-model="exam.part" v-if="parentOpenEdit&&ite==index"></textarea>
                <editRemoveBtns @childEvent="handleChildEvent" :exam="exam" :index="index" :event="$event"/>
            </div>

             <div class="que-index">{{index+1+"."}}</div> 
             <button class="add-que-btn" @click="addQue(exam,index)"><q-icon name="fas fa-plus-circle" size="25px" :color="color" /></button>
                <div class="regular-que-flex" v-if="exam.type=='regularQue'">
                    <div class="regular-que">
                        <div class="question">
                            <div class="que-text" v-if="!(parentOpenEdit&&ite==index)"> {{exam.questions[0]["que"]}}</div>
                            <textarea class="que-text" v-model="exam.questions[0].que" v-if="parentOpenEdit&&ite==index" ></textarea>
                         </div>

                     </div>
                            <editRemoveBtns @childEvent="handleChildEvent" :exam="exam" :index="index" :examData="examData" />
                 </div>

        
            <div class="sub-que" v-if="exam.type=='subQue'">
                    <span class="title-que"  v-if="exam.titleQue">{{exam.titleQue}}</span>  
    
                    <div class="question-sub" v-for="(question,subIndex) in exam.questions" :key="subIndex" >
                        <div class="sub-que-flex">
                            <span class="sub-que-letter">{{getHebLetters(subIndex)}}.</span>
                            <div class="que-text" v-if="!(parentOpenEdit&&ite==index&&subIte==subIndex)"> {{question.que}} </div>
                            <textarea class="que-text" v-model="exam.questions[subIndex].que" v-if="parentOpenEdit&&ite==index&&subIte==subIndex" ></textarea>

                            
                            <div class="american-answer-options" v-if="question.type=='american'">
                                <label class="answer-items" :class="{'checked': examUserData[question.Title] === option}" v-for="(option,inner) in question.options" :key="inner" > 
                                    <div class="label-text">{{option}} </div>
                                </label>
                            </div>
                            
                        </div>
                            <editRemoveBtns @childEvent="handleChildEvent" :exam="exam" :index="index" :subIndex="subIndex" :examData="examData"/>
                    </div>
             </div> 
         </div>
      </div>
    </div>
</div>
  
</template>

<script>
import axios from 'axios'
 import editRemoveBtns from '@/components/editRemoveBtns.vue'
 export default {
     components:{
        editRemoveBtns
     },
    data(){
        return{
            examData:[],
            parentOpenEdit:false,
            showFirstDiv:false,
            showSecondDiv:false,
            ite:null,
            subIte:null,
            isPartText:false,
            color:`var(--main-background-color)`
          }
    },
    methods:{
        getHebLetters(subIndex){
          return this.$getHebLetters(subIndex)
        },
        async getExamForEdit(){
            var res = null
            if(this.$isSharePointUrl){
                 res = await axios.get(this.$sharePointUrl+`getByTitle('${this.$route.params.title}')/Items`)

                    const promiseItems = await Promise.all(res.data.value.map((item)=>{
                        return this.$asyncParse(item.exam).then((inner)=>{
                            item.exam = inner
                            return {item}
                        })
                    }))   

            }
            else{
                res = await axios.get(this.$sharePointUrl+this.$route.params.title)
            }
                this.examData = res.data.value[0]
                console.log(this.examData)
        },
        handleChildEvent(newVal){
            this.parentOpenEdit = newVal["newVal"]
              console.log(this.parentOpenEdit)
              this.ite = newVal["index"]
              this.subIte = newVal["subIndex"] 
              console.log(this.subIte)
              console.log(this.ite)
        },
        addQue(exam,index){
            console.log(this.examData.exam)
            this.examData.exam.splice(index+1,0,{});
            console.log(this.examData.exam)
        }
         
    },
    beforeMount(){
        this.getExamForEdit()
    },
    
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
@keyframes growOut{
    0%{
        transform: scale(0);
     }
     80%{
        transform: scale(1.05);
     }
    100%{
        transform: scale(1);
     }    
}
.flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: var(--exam-edit-flexbox-width);
    animation: growOut 350ms ease-in-out forwards;

}
 .exam{
  padding: 3em;
  align-items: center;
  margin-top: 70px;
  width: var(--exam-edit-box-width);
  background:rgba(99, 94, 94, 0.151);
  border-radius: 10px;
  margin-bottom: 100px;
}
.part-text{
  font-size: 35px;
  margin-bottom: 30px;
  position: relative;
  font-weight: 700;
  top:30px;
  display: flex;
  width: 100%;
  justify-content: center;
}
.que-index{
   font-size: 29px;
   position: relative;
   right: 50%;
   top: 32px;
   transform: translate(-50%,32px);
   font-weight: 700;
 }
.regular-que{
   width: 80%;
 }
.sub-que{
    width: 90%;
    margin-top: 8px;
}
 .question, .question-sub{
    position: relative;
    margin: 1em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    
 }
 .question-sub{
    width: 100%;
    margin: 1.5em 1em;
 }
 /* .question-sub:hover, .regular-que-flex:hover{
     background: rgb(161, 161, 161);
     transition: 0.5s ease-in-out;
     border-radius: 5px;
 
 } */
 .que-text{
   width: 82%;
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
    top: 20px;
      
  }
  
 .regular-que-flex{
     display: flex;
     align-items: center;
     justify-content: space-around;
     width: 100%;
 }
 .sub-que-flex{
     display: flex;
     justify-content: center;
     width: 100%;
     flex-direction: column;
     align-items: baseline;
     flex-direction: row;

 }
 
  textarea{
      border: 1px solid gray;
      padding: 0.4em;
      font-weight: 500;
      border-radius: 5px;
  }
  
  
  .sub-que-letter{
      font-size:27px;
      position: relative;
      right: 20px;
  }
  .add-que-btn{
    position: relative;
    right: 60%;
    top: 50%;
    transform: translate(-60%,50%);
    background: none;
    border: none;
    cursor: pointer;     
  }
</style>