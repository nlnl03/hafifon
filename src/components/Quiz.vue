<template>
  <div class="main-container">
      <div class="about-quiz" v-if="!isShow">
          <div class="quiz-subject">
              {{subject}}
          </div>
          <div class="quiz-info">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt eius corrupti expedita necessitatibus voluptatum cumque odit deleniti aspernatur ex, pariatur assumenda labore. Vitae quasi et esse at doloremque ut aliquam, voluptate ab totam aspernatur eius earum reiciendis iste dolor aperiam saepe error eos culpa nobis nisi repellendus inventore quis, temporibus odit? Recusandae autem repellat vitae tempore repudiandae accusantium in illo quidem? Impedit, perspiciatis dignissimos. At numquam non corporis architecto quidem quaerat, ad accusantium ab fuga voluptas minima quam cupiditate ipsam, accusamus praesentium tenetur assumenda, quasi sunt adipisci aliquid necessitatibus? Doloribus ipsum praesentium, ipsa sapiente cumque voluptatem iure error repellendus.
          </div>
          <div class="start-back-buttons">
              <button class="back-btn" @click="goBack()">בחזרה לתרגולים</button>
              <button class="start-btn" @click="startQuiz()">התחל תרגול</button>
          </div>
      </div>

    <div class="show" v-if="isShow">
        <form class="quiz-box" v-for="question in exam" :key="question.title" >
            {{question.title}}
            <div v-for="answer in question.answer"  :key="answer"> 
                <input type="radio" v-model="userData[question.title]" :value="answer" @change="checkData" :name="question.title"  :id="answer"  />
                <label :for="answer" >{{answer}}</label>
            </div>
        </form>
    </div>
    
  </div>
</template>

<script>
export default {
name:'Quiz',
props:{
    subject:String,
    exam:Object,
},
data(){
    return{
        userData:{},
        isShow:false,
        counter: 0
    }
},
methods:{
    checkData(){
        console.log(this.userData)
    },
    startQuiz(){
        this.isShow=true;
    },
    goBack(){
        this.$router.go(-1)
    },
    show(){
        if(this.counter==0){

         }
        else{
         }
        
    },
},
    mounted(){
        this.exam.forEach((question)=>{
            this.userData[question.title] =""
        })
        console.log(this.userData)
        
    },
  beforeMount(){
}
}
</script>

<style scoped>
.main-container{
    height: 813px;
    width: 100vw;
    background-color:#fff;
}
.about-quiz{
    position: relative;
    height: 400px;
    width: 700px;
    left: 50%;
    right: 50%;
    transform: translate(50%,40%);
    background-color: #fff;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);

}
.start-back-buttons{
    height: 70px;
    position: relative;
    display: flex;
    top:20px;
    align-items: center;
    justify-content: flex-end;
    margin: 0 35px;
    border-top: 1px solid lightgray;
}
button{
    margin: 0 8px;
     height: 40px;
    width: 110px;
    border: 1px solid #007bff;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
}
.start-btn{
    color: #fff;
    background-color:#007bff ;
    
}
.back-btn{
    color: #007bff;
    background-color: #fff;
}
 
.quiz-subject{
    height: 70px;
    padding-top: 15px;
    font-size: 40px;
    font-weight: 600;
    width: 100%;
    border-bottom: 1px solid lightgray;
}
.quiz-info{
margin: 10px;
font-size: 17px;
}
/* .questions:last-child{
    display: none;
} */
</style>