<template>
<div class="main">
    <div class="loader-spinner" v-if="!isLoadForSpinner"> <loadingSpinner /></div>
         
    <div class="box" v-if="isLoadForSpinner">
        <div class="name-of-exam">{{title}}</div>
            <div class="edit-remove-btns" v-if="isAdmin">
                <div class="edit-btn">
                    <router-link :to="{name:'editExams',params:{title:name}}" style="color: black;"  > <q-icon name="fas fa-edit" size="26px" /> </router-link>
                </div>
                
                <deleteExam :examName="name"/>         
            </div>
         
        <h2 class="instructions-title">לפני שמתחילים אנא קרא/י את ההוראות:</h2>
           <div class="instructions">
               <div class="instructions-items" v-for="inst in instructions" :key="inst">
                   {{inst}}
               </div>   
           </div>
            <router-link :to="{name:'exams',params:{Title:this.$route.params.Title}}" class="start-btn">
                <div class="router-text">התחל</div>  
            </router-link>
    </div>
</div>
   
</template>

<script>
import axios from 'axios'
import loadingSpinner from '@/components/loadingSpinner.vue'
import deleteExam from '@/components/deleteExam.vue'
 export default {
    components:{
        loadingSpinner,
        deleteExam
     },
data(){
    return{
        title:null,
        isLoadForSpinner:false,
        instructions:[],
        name:'',
        isAdmin:null
    }
},
methods:{
    asyncParse(str){
       return new Promise((resolve)=>{
          resolve(JSON.parse(str))
       })
    },
    async getInstructions(){
        var res = null
        if(this.$isSharePointUrl){
            res = await axios.get(this.$sharePointUrl + `getByTitle('${this.$route.params.Title}')/Items?$select=instructions`)
            var instrData = res.data.value

            const promiseAnswers = await Promise.all(instrData.map((item)=>{
                return this.asyncParse(item.instructions).then((inner)=>{
                    item.instructions = inner
                       return {item}
                })
            }))  
                 this.instructions = instrData[0].instructions
        }
        else{
            console.log(this.$sharePointUrl)
            res = await axios.get(this.$sharePointUrl + this.$route.params.Title)
            const data = res.data.value[0]
            this.instructions = data.instructions
        }
            console.log(this.instructions)
    },
    spinner(){
        this.isLoadForSpinner = true
    }

},
   async beforeMount(){
        var examNames = localStorage.getItem("examsName")
        examNames = JSON.parse(examNames)
        var title = examNames.filter(item=>item.Title==this.$route.params.Title)[0]
        this.title = title.subject
        this.name = title.Title
        console.log(this.name)
        this.getInstructions()
        this.isAdmin = sessionStorage.getItem("isAdmin")
        const myTimeOut = setTimeout(this.spinner,250)
 
    }
}
</script>

<style scoped>
.loader-spinner{
    position: relative;
    transform: translateY(10%);
    top:10%;
}
.main{
    background-image: url("../../assets/homePageBackground.png");
    background-position: center;
    background-size: cover;
    height: 86.5vh;
    width: 100%;
    background-repeat: no-repeat;

}
.box{
    height: 530px;
    width: 800px;
    background: #fff;
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
    position: relative;
    right: 50%;
    top:8%;
    transform: translate(50%,8%);
    border-radius: 20px;
}
.name-of-exam{
    top: 45px;
    font-size: 45px;
    font-weight: 700;
     /* right: 50%; */
    /* transform: translateX(50%); */
    position: relative;
    text-align: center;
}
.instructions-title{
    position: relative;
    margin-top: 90px;
    margin-right: 30px;
    font-size: 25px;
}
.instructions{
     height: 300px;
     margin-left: 10%;
     margin-right: 30px;
     margin-top: 20px;
 }
 .instructions-items{
    margin: 0.5em 0;
    font-size: 20px;

 }
.start-btn{
    position: absolute;
    text-decoration: none;
    display: inline-block;
    color: black;
    top: 80%;
    right: 50%;
    transform: translate(50%,75%);
    font-size: 22px;
    width: 105px;
    height: 45px;
    border-radius: 15px;
    background: var(--main-background-color);
    border: none;
    cursor: pointer;
 }
.start-btn:hover{
    background: #409596ab;
}
.router-text{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.title-flex{
    height: 80px;
}
.edit-remove-btns{
    width: 200px;
    position: absolute;
    right: 75%;
    top: 45px;
    display: flex;
 }
.edit-btn, .remove-btn{
      cursor: pointer;
      position: relative;
      border-radius: 45%;
      border: none ;
      width: 47px;
      height: 47px;
      margin: 5px 7px;
      background: rgba(7, 57, 80, 0.24);
 }
 .edit-btn{
     text-decoration: none;
     display: flex;
     align-items: center;
     justify-content: center;
     
 }
 .edit-btn:hover, .remove-btn:hover{
      background: rgb(145, 144, 144);
      border: none;
  }
</style>