<template>
    <div class="spiner" v-if="!isLoadForSpinner"><loadingSpinner /></div>
  <div class="main-container" v-if="isLoadForSpinner" >
      <div class="about-quiz" v-if="!isShow">
          <div class="quiz-subject">
              {{Subject}}
          </div>
          <div class="quiz-info">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt eius corrupti expedita necessitatibus voluptatum cumque odit deleniti aspernatur ex, pariatur assumenda labore. Vitae quasi et esse at doloremque ut aliquam, voluptate ab totam aspernatur eius earum reiciendis iste dolor aperiam saepe error eos culpa nobis nisi repellendus inventore quis, temporibus odit? Recusandae autem repellat vitae tempore repudiandae accusantium in illo quidem? Impedit, perspiciatis dignissimos. At numquam non corporis architecto quidem quaerat, ad accusantium ab fuga voluptas minima quam cupiditate ipsam, accusamus praesentium tenetur assumenda, quasi sunt adipisci aliquid necessitatibus? Doloribus ipsum praesentium, ipsa sapiente cumque voluptatem iure error repellendus.
          </div>
          <div class="start-back-buttons">
              <button class="back-btn" @click="goBack()">בחזרה לתרגולים</button>
              <router-link class="start-btn" :to="{name:'quiz'}"> התחל תרגול</router-link>
          </div>
      </div>
     </div>
 
</template>

<script>
import axios from 'axios'
import loadingSpinner from '../components/loadingSpinner.vue'
 export default {
name:"beforeEnterQuiz",
    components:{
        loadingSpinner
    },

  data(){
    return{
      results:[],
      Subject:'',
      isLoadForSpinner:false,
      timeOut:null,

    }
},
    methods:{
        goBack(){
            this.$router.go(-1)
        },

        async getData(){
            if(this.$isSharePointUrl){
                const res = await axios.get(this.$sharePointUrl+"getByTitle('tirgulim')/Items")
                this.results = res.data.value
                this.results = this.results.filter(data=>data.Title == this.$route.params.title)[0]
                this.Subject = this.results.Subject
                // console.log(this.Subject)
            }
                this.isLoadForSpinner = true
        }
      
},


    async beforeMount(){
        this.timeOut = await setTimeout(this.getData,150)
    }
}
</script>

<style scoped>
.spiner{
    position: relative;
      display: flex;
      top:100px
 }
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
    width: 115px;
    border: 1px solid var(--main-background-color);
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
}
.start-btn{
     margin: 0 8px;
     height: 40px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
     border: 1px solid var(--main-background-color);
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;

    color: #fff;
    text-decoration: none;
    background-color:var(--main-background-color) ;
    
}
.back-btn{
    color: var(--main-background-color);
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

</style>