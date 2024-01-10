<template>
  <div class="loader-spinner" v-if="!isLoad">
        <loadingSpinner />
  </div>
    
<div class="main" v-if="isLoad">
    <h1>שיעורים ותרגולים</h1>
   <div class="text-under-line"></div>

    <div class="select-timeline" >
         <q-select outlined v-model="selectedValue" :options="practices"  :option-value="option => option.timeline" :option-label="option => `שבוע ${option.timeline}`" label="מיין לפי שבוע" 
            @update:model-value="filterPractices"  dir="rtl"/>
          
    </div>
 



   <!-- <select name="" id="" @change="filterPractices($event)">
     <option value="" disabled selected hidden>מיין לפי שבוע</option>
     <option :value="practice.timeline" v-for="practice in practices" :key="practice" >
       שבוע {{practice.timeline}}
     </option>
   </select> -->

   <div class="container-cards" >
     <div class="without-timeline">
         <div class="timeline" ref="timeline" >
             <q-timeline color="secondary" > 
              <q-timeline-entry :subtitle="`שבוע ${practice.timeline}`" v-for="(practice,index) in practicesFilltered" :key="index" :value="practice.timeline">
                <div class="flex-cards" >
                  <div v-for="(item,midIndex) in practice.items" :key="midIndex" >
                    <div class="card" @mouseenter="expandCard(item,index,midIndex)" >
                      <div class="card-content" :ref="item+midIndex">
                        
                          <div class="inner-flex">
                            <img class="image-of-items" :src="require(`@/assets/${item.Img}`)">
                            <h4 class="text">
                                {{item.Subject[0]}}
                            </h4>
                            <span class="lesson-name">{{item.Subject[1]}}</span>
                            <span class="num-of-que">מספר תרגולים: </span>
                          </div>

                          <div class="expanded-content" v-if="(ite === index && midIte === midIndex) && this.isFinished" :style="{ maxHeight: ite === index && midIte === midIndex ? expandedHeight : '0' }">
                              <q-btn class="powerPoint-link" @click="powerpointUrl(index,midIndex,item.Subject)" label="מצגת" color="secondary"/>
                              <q-btn class="tirgulim-link" label="תרגולים" color="secondary"/>
                          </div>

                        </div>
                    </div>

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
      ite: null,
      midIte:null,
      activeCard: null,
      expandedHeight: '200px',
      isFinished: false,
       practicesFilltered:[]
    }
  },
  methods:{
    async getPractices(){
         if(this.$isSharePointUrl){
            const res = await axios.get(this.$sharePointUrl+"getByTitle('tirgulim')/Items")
            this.practices = res.data.value
              const promiseItems = await Promise.all(this.practices.map((item)=>{
                 return this.$asyncParse(item.items).then((inner)=>{
                   item.items = inner
                     return {item}
                })
              }))   
        }
        else{
            const res = await axios.get(this.$sharePointUrl+"practice")
            this.practices = res.data.value
        }   

            this.practicesFilltered = JSON.parse(JSON.stringify(this.practices));

            this.practicesFilltered.forEach(inner => {
                inner.items.forEach(i => {
                    i.Subject=i.Subject.split('-')
                })
            })
            console.log(this.practices)
            console.log(this.practicesFilltered)
             this.isLoad = true;
     },

    filterPractices(){
      console.log(this.selectedValue.timeline)
      const optionValue = this.selectedValue.timeline
      console.log("value: "+optionValue)
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
      
    },
 
     expandCard(item,index,midIndex){
      this.ite = index
      this.midIte = midIndex    
        console.log(midIndex , item)

      console.log(this.$refs[item+midIndex])
      var expandDiv = this.$refs[item+midIndex].children[0]
      expandDiv.style.height = '90%'
      // console.log(expandDiv)
      
      this.isFinished = true
    },
     collapseCard(item,midIndex){
        this.ite = null
        this.midIte = null
        var expandDiv = this.$refs[item+midIndex].children[0]
        expandDiv.style.height = '100%'
        this.isFinished = false
     },

     powerpointUrl(index,midIndex,subjectArr){
        var nameOfPowerP = this.practices[index].items[midIndex].Subject
        console.log(nameOfPowerP)
            const url = `https://portal.army.idf/sites/hafifon383/_layouts/15/WopiFrame.aspx?sourcedoc=https://portal.army.idf/sites/hafifon383/SiteAssets/שבוע ${index+1}/${nameOfPowerP}.pptx`
             window.location.href = url
      },

     async getData(){
        var results = null

        if(this.$isSharePointUrl){
            const res = await axios.get(this.$sharePointUrl+"getByTitle('tirgulim')/Items")
            results = res.data.value
              const promiseItems = await Promise.all(results.map((tirgulim)=>{
                  return this.$asyncParse(tirgulim.items).then((inner)=>{
                   tirgulim.items = inner
                      return {tirgulim}
                  })
              }))   
        }

        else{
            const res = await axios.get(this.$sharePointUrl+"practice")
            results = res.data.value
        }
                results = results[this.timeLine-1].items.filter(data=>data["Title"] == this.$route.params.title)[0]
                this.Subject = results.Subject 
                console.log(this.Subject)
     }
  },
  async beforeMount(){
      this.timeOut = setTimeout(this.getPractices,200)
 
  },
 
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
  height: 100%;
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
        animation: growOut-e0b47cf6 500ms ease-in-out forwards;


 }
   @keyframes growOut{
    0%{
        transform: scale(0);
     }
     80%{
        transform: scale(1.1);
     }
    100%{
        transform: scale(1);
     }    
}

.flex-cards{
    position: relative;
    flex-wrap: wrap;
    right:80px;
    display: flex;
    justify-content: flex-start;
 
}
.card{
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
    /* border-radius: 10px; */
    transition: all .2s ease-in-out;
    overflow: hidden;
}
.card:hover{
  transform:translateY(-5%);
  box-shadow: 0px 15px 30px 0px rgba(0,0,0,.2);
}
.card:hover .expanded-content{
  max-height: 200px;
}

 h4{
   font-size: 32px;
   padding: 15px;
   position: relative;
    color: black;
  text-align: center;
 }
 .num-of-que{
    font-size: 20px;
    margin-bottom: 30px;
    display: inline-block;
    color:#807f7f;
 }
 .card-content{
    position: relative;
   color: black;
   text-align: center;
   overflow: hidden;
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
  .select-timeline{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .q-select{
    width: 180px;
  }
 .lesson-name{
   margin-bottom: 10px;
   font-size: 21px;
   color: #605e5e;
   font-weight: 600;
   margin-right: 0.5em;
   margin-left: 0.5em
 }
 .expanded-content{
    position: absolute;
    height: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f0f0f0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .powerPoint-link, .tirgulim-link{
    position: relative;
    height: 50%;
    margin: 0 7px;
    border-radius: 10px;
  }
  .q-btn{
    height: 60%;
    
  }
  .q-btn span{
    width: 100%;
  }
 </style>