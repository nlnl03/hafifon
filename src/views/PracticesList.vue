<template>
  <div class="loader-spinner" v-if="!isLoad">
        <loadingSpinner />
  </div>
    
<div class="main" v-if="isLoad">
    <h1>תרגולים</h1>
   <div class="text-under-line"></div>

    <div class="q-pa-md" style="max-width:300px;">
      <div class="q-gutter-md">
        <q-select v-model="selectedValue" :options="practices" option-value="timeline" label="מיין לפי שבוע" >
          
        </q-select>
      </div>
    </div>





   <select name="" id="" @change="filterPractices($event)">
     <option value="" disabled selected hidden>מיין לפי שבוע</option>
     <option :value="practice.timeline" v-for="practice in practices" :key="practice" >
       שבוע {{practice.timeline}}
     </option>
   </select>

   <div class="container-cards" >
     <div class="without-timeline">
         <div class="timeline" ref="timeline" >
             <q-timeline color="secondary" > 
              <q-timeline-entry :subtitle="`שבוע ${practice.timeline}`" v-for="practice in practices" :key="practice" :value="practice.timeline">
                <div class="flex-cards" >
                  <div class="items" v-for="item in practice.items" :key="item">
                    <router-link class="router-text"
                    :to="{name:'beforeEnterQuiz', params:{practices:JSON.stringify(item.exam),title:item.Title}}">
                      <img class="image-of-items" :src="require(`@/assets/${item.Img}`)">
                        <div class="inner-flex">
                          <h4 class="text">
                              {{item.Subject}}
                          </h4>
                          <span class="num-of-que">מספר שאלות: {{item.numOfQue}}</span>
                        </div>
                    </router-link>
                  </div>
                </div>
              </q-timeline-entry>             
            </q-timeline>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import beforeEnterQuiz from './beforeEnterQuiz.vue'
import loadingSpinner from '../components/loadingSpinner.vue'
import axios from 'axios'
export default {
  name:"PracticesList",
  components:{
    beforeEnterQuiz,
    loadingSpinner
  },
  data(){
    return{
      practices:[],
      selectedValue:null,
      isLoad:false,
      timeOut:null,
      weekOrganize:["ראשון","שני","שלישי","רביעי"],
      fhdh:[
        {label:'fgkflg',value:'dfhudfh'},
        {label:'aaaa',value:'dddd'},
        {label:'qdf',value:'avcvd'}
      ]
    }
  },
  methods:{
    async getPractices(){
      var res = null
        if(this.$isSharePointUrl){
          res = await axios.get(this.$sharePointUrl+"getByTitle('tirgulim')/Items")
        }
        else{
          res = await axios.get(this.$sharePointUrl+"practice")
        }
          this.practices = res.data.value
            console.log(this.practices)
            this.isLoad = true;
    },
    filterPractices(event){
      const optionValue = event.target.value
      const timelineFiltered = this.$refs["timeline"].children[0].children[optionValue-1]
      console.log(timelineFiltered)
      for(var i = 0; i<this.practices.length;i++){
          if(i!==optionValue-1){
            console.log(i)
            const hideItem = this.$refs["timeline"].children[0].children[i]
            hideItem.style.display = 'none'
          }
          else{
            const showItem = this.$refs["timeline"].children[0].children[i]
            showItem.style.display = 'block'

             const timeLine = this.$refs["timeline"].children[0].children[i].children[0]
             const timeLinePoint = this.$refs["timeline"].children[0].children[i].children[1]

             timeLine.style.display = 'none'
             timeLinePoint.style.display = 'none'
          }
       }
      
    }
  },
  async beforeMount(){
      this.timeOut = setTimeout(this.getPractices,200)
      console.log(this.fhdh)

  }
}
</script>

<style scoped>
.main{
  position: relative;
  overflow-x: hidden;

 }
.loader-spinner{
  position:relative;
  right: 50%;
  width: 100%;
  height: 100%;
  transform:translateX(50%)
}
.inner-flex{
  display:flex;
  height: 40%;
  flex-direction:column;
  justify-content: space-between; 
  align-items: center;
}
h1{
    font-size: 60px;
    text-align: center;
    color: var(--main-background-color);
    position: relative;
    margin-bottom: 50px;
    top: 30px;
}
.text-under-line{
    position: relative;
    top: -5px;
    width: 130px;
    height: 2px;
    background-color: var(--main-background-color);
    margin: 0 auto;

}
.container-cards{
    margin-top: 100px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;

 }
.flex-cards{
    position: relative;
    flex-wrap: wrap;
    right:80px;
    display: flex;
    justify-content: flex-start;
 
}
.items{
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    vertical-align: middle;
    position: relative;
    height: 390px;
    width: 290px;
    margin-left: 4vw;
     margin-bottom: 7vh;
    border: none;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
    border-radius: 10px;
    transition: all .2s ease-in-out;
}
.items:hover{
  transform:translateY(-5%);
  box-shadow: 0px 15px 30px 0px rgba(0,0,0,.2);

}
 h4{
   font-size: 25px;
   padding: 10px;
   position: relative;
    color: black;
  text-align: center;
 }
 .num-of-que{
    font-size:22px;
    margin-bottom: 30px;
    display: inline-block;
    color:#666;
 }
 .router-text{
   text-decoration: none;
   height: 100%;
   width: 100%;
 }
 .image-of-items{
    width: 100%;
    height: 60%;
 }
 .timeline{
   display: flex;
   align-items: center;
  }
  .without-timeline{
    width: 80%;
    margin-right: 50px;
  }
 </style>