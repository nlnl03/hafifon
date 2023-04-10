<template>
 <div class="loading-spinner" v-if="!isLoad">
      <loadingSpinner />
 </div>

  <div class="box">
    <div class="box-flex" v-if="isLoad">
      <div class="count-students-cicrcle">
        <div class="count-students-items">
          <div class="ave-title"> אנשים בחפיפה </div> 
            <div class="progress-circle">
                <circle-progress
                :percent="userInfo.length"
                :size="165"
                :show-percent="true"
                fill-color="var(--main-background-color)"
                :viewport="true"
                :transition="600"
                />
            </div>
        </div>
      </div>


    <div class="average-cicrcle">
      <div class="average-items">
        <div class="ave-title"> ממוצע ציונים </div> 
          <div class="progress-circle">
            <circle-progress 
            :percent="calcAve(ave)"
            :size="165"
            :show-percent="true"
            :fill-color="changeAveColor(aveColor)"
            :viewport="true"
            :transition="600"
            />
          </div>
      </div>
    </div>
  </div>

  <div class="hafifot" v-if="isLoad&&examTitlesFiltered.length>0">
    <div class="info" v-for="(item,index) in examTitlesFiltered" :key="item">
      <button class="hafifot-item" @click="OpenAccordion(item,index)"  :ref="item+index" :value="item">
          {{item}}
      </button>

      <div class="accordion-items" v-if="isOpen&&ite==index"  >
          <div class="name-of-hafifot" v-for="info in userInfoFilterd" :key="info"  >
                <router-link :to="{name:'examsToCheck',path:`/examsToCheck/${info.num}/${item}`,params:{examType:item,num:JSON.stringify(info.num)}}">{{info.Title}}</router-link>
          </div>
      </div>
    </div>   
  </div>

  <div class="when-empty" v-if="!examTitlesFiltered.length>0&&isLoad">
      אין מבחנים לבדיקה
  </div>
</div>

</template>

<script>
import axios from 'axios'
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"
import loadingSpinner from "./loadingSpinner.vue"
export default {
  name: 'HafifaCheckMainCompo',
  components:{
    CircleProgress,
    loadingSpinner
  },
  data(){
    return{
      examsUrl:process.env.NODE_ENV =='development'? 'http://localhost:3000/pendingTests/' : "https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items",
      examTitles:[],
      examTitlesFiltered:[],
      userInfo:[],
      isOpen:false,
      ite:0,
      getBtnVal:null,
      userInfoFilterd:[],
      ave:80,
      isLoad:false
    }
  },
  methods:{
    async getTitles(){
        const res = await axios.get(this.examsUrl)
        this.examTitles=res.data.value

       if(process.env.NODE_ENV =='development'){
            console.log("yes")
            this.examTitlesFiltered=this.examTitles.map(data=>data.type)
            console.log(this.examTitles)
        }
        else{
          this.examTitles = await this.examTitles.map(data=>data.type)
          const arr = this.examTitles
          this.examTitlesFiltered = this.filterArrayOfTitles(arr)
          console.log(this.examTitlesFiltered)
        }      
      
    },

    filterArrayOfTitles(arr){
      return arr.filter((value,index)=>{
        return arr.indexOf(value)===index;
      })
    },
    async getData(){
      if(this.examsUrl){
        const res = await axios.get(this.examsUrl)
        this.userInfo = res.data.value
        console.log(this.userInfo)             
      }
    },
   async OpenAccordion(item,index){
         // console.log(this.isOpen)
        this.ite=index
        this.getBtnVal = await this.$refs[item+index].value
        console.log(this.getBtnVal)
          this.userInfoFilterd = await this.userInfo.filter(data=>data.type==this.getBtnVal)
          console.log(this.userInfoFilterd)
          this.isOpen=!this.isOpen
    },

    changeAveColor(aveColor){
      if(this.ave>=80){
        return aveColor='#2E8B57'
      }
      if(this.ave>=70&&this.ave<80){
        return this.aveColor = '#FF4500'
      }
      else{
       return this.aveColor = '#FF0000'
      }
    },

      calcAve(ave){
        
      },  

     timeOutForSpinner(){
        this.isLoad=true
    },
  },

  async beforeMount(){
     await this.getTitles()
     await this.getData()
      const myTimeOut = setTimeout(this.timeOutForSpinner,150)
     
  },

 }

</script>

 <style scoped>
 .main-title{
  margin-top:40px;
  font-size:28px;
  text-align: center;
 }
 .box{
  margin-top: 100px;
   position: relative;
   margin-top:50px;
   right: 50%;
   transform: translateX(50%);
   background-color: rgba(230, 230, 230, 0.034);
   height: 700px;
   width:var(--box-check-width);
   box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.212);
   border:1px solid rgba(122, 122, 122, 0.274);
   border-radius: 30px;
 }

 .hafifot{
    position: relative;
    /* min-height: 335px; */
    overflow: auto;
    top: 5%;
    right: 50%;
    transform: translateX(50%);
    width: 85%;
    border:2px solid rgba(128, 128, 128, 0.24);
    border-radius: 10px;
 }
 .hafifot:last-child{
   border-bottom:1px solid rgba(128, 128, 128, 0.24);;
 }
  
 .hafifot-item{
   cursor: pointer;
   display: flex;
   border-right: none;
   border-left: none;
   border-top:none;
   flex-direction: column;
   width: 100%;
   background-color:#fff;
   /* min-height: 70px; */
   padding: 0.7em 1em;
   font-size: 25px;
 }
 .hafifot-item:hover{
   background-color: rgba(0,0,0,.1);
 }
 
 .hafifot-item-clicked{
      background-color: rgba(0,0,0,.1);
 } 
     .text{
    display: flex;
    align-items: center;
    padding: 0.7em 1em;
  }
   .accordion-btn{
     background-color: #fff ;
     padding: 0.7em 1em;
     font-size: 25px;
   }

     button{
       border-bottom: 1px solid  rgba(0,0,0,.1);
       outline: none;
     }
      .name-of-hafifot{
       border-bottom: 1px solid  rgba(0,0,0,.1);
       max-height: 100px;
       overflow: auto;
     }
     .name-of-hafifot:last-child{
       border-bottom: none;
     }
     .count-students-cicrcle, .average-cicrcle{
      position: relative;
      height: 250px;
      width: 350px;
      box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
      border-radius: 20px;
      display: flex;
     }
     .average-items, .count-students-items{
       position: relative;
       display: flex;
       flex-direction: column;
       align-items: center;
       margin: 10px 0;
       right: 50%;
       transform: translateX(50%);
      }
    
      .progress-circle{
        margin-top:15px;
      }
    .box-flex{
      position: relative;
       display: flex;
       width: 100%;
       height: 300px;
       align-items: center;
       justify-content: space-evenly;
     }
    .ave-title{
      font-size: 28px;
      font-weight:800 ;
    }

    a{
      text-decoration: none;
      color:black;
    }
    .loading-spinner{
      position: relative;
      top:150px;
    }
    .when-empty{
      position: relative;
      right: 50%;
      text-align: center;
      top: 12%;
      transform: translate(50%,12%);

    }
   </style>
