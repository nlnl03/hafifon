<template>
  <div class="show">
        <form class="quiz-box" v-for="question in examData" :key="question.title" >
            {{question.title}}
            <div v-for="answer in question.answer"  :key="answer"> 
                <input type="radio" v-model="userData[question.title]" :value="answer" @change="checkIfDone" :name="question.title"  :id="answer"  />
                <label :for="answer" >{{answer}}</label>
            </div>

        </form>
    </div>
        <button v-if="isFinishedButton" ref="submitBtn" @click="submit()">הגש</button>
</template>

<script>
 export default {
    name:'QuizTemplate',
    props:{
        examData: Array,
     },
data(){
    return{
        userData:{},
        points:0,
        isFinishedButton: false,
     }
},
 mounted(){
    console.log(this.userData)

},
methods:{
    checkIfDone(){
        let isFinished = true ;
        Object.keys(this.userData).forEach((questionTitle)=>{
            if(this.userData[questionTitle] ==''){
                isFinished = false
            }
        })
        this.isFinishedButton = isFinished;
    },
   
    submit(){
        this.exam.forEach(que => {
            if(this.userData[que.title]== que.correctAnswer)
            {
                console.log(1)
                this.points+=parseInt(que.points);
            }
            else{
                console.log(que.correctAnswer)
            }
        })
        console.log(this.points)
    },
    mounted(){
        this.exam.forEach((question)=>{
            this.userData[question.title] =""
        })
        console.log(this.userData)
        
     }
  }
}
</script>

<style scoped>

</style>