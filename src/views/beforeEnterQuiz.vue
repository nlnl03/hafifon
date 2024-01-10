<template>
    <div class="spiner" v-if="!isLoadForSpinner"><loadingSpinner /></div>

  <div class="main-container" v-if="isLoadForSpinner" >
     <div class="about-quiz" v-if="!isShow">
          <div class="quiz-subject">
              {{Subject}}
          </div>
          <div class="quiz-info">
             שלושה משפטים על הנושא  
           </div>
           <div class="enter-powerPoint">
               <a class="powerPoint-link" :href="powerpointUrl()" target="_blank">
                   <span class="powerPoint-link-text">למצגת</span>
               </a>
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
    //   Subject:'',
      isLoadForSpinner:false,
      timeOut:null,
      timeLine:null
    }
},
    methods:{
        goBack(){
            this.$router.go(-1)
        },

        powerpointUrl(){
            const url = `https://portal.army.idf/sites/hafifon383/_layouts/15/WopiFrame.aspx?sourcedoc=https://portal.army.idf/sites/hafifon383/SiteAssets/שבוע ${this.timeLine}/${this.Subject}.pptx`
            return url
        },

        async getData(){
            const weekParam = this.$route.params.week.split('k')
            this.timeLine = JSON.parse(weekParam[1])
            console.log(this.timeLine)
                var results = null
            if(this.$isSharePointUrl){
                const res = await axios.get(this.$sharePointUrl+"getByTitle('tirgulim')/Items")
                 results = res.data.value
                 const promiseItems = await Promise.all(results.map((item)=>{
                    return this.$asyncParse(item.items).then((inner)=>{
                     item.items = inner
                        return {item}
                    })
                 }))   

            }
            else{
                const res = await axios.get(this.$sharePointUrl+"practice")
                results = res.data.value
            }
                 
                // console.log(results[this.timeLine-1].items)
                results = results[this.timeLine-1].items.filter(data=>data["Title"] == this.$route.params.title)[0]
                this.Subject = results.Subject 
                console.log(this.Subject)

                this.isLoadForSpinner = true
        }
      
},


    async beforeMount(){
        this.timeOut = await setTimeout(this.getData,150)
        console.log(this.$route.params)
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
    position: absolute;
    width: 90%;
    display: flex;
    bottom:10px;
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
    min-height: 70px;
    padding-top: 15px;
    font-size: 40px;
    font-weight: 600;
    width: 100%;
    border-bottom: 1px solid lightgray;
}
.quiz-info{
    margin: 25px 10px;
    font-size: 17px;
}
.powerPoint-link{
    border: 1px solid var(--main-background-color);
    border-radius: 10px;
    cursor: pointer;
    background-color: var(--main-background-color);
    color: white;
    display: inline-block;
    text-decoration: none;
    height: 35px;
    width: 85px;

}
   .enter-powerPoint{
        position: absolute;
        bottom: 110px;
        width: 100%;
   }
    .powerPoint-link-text{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 17px;
        
    }

</style>