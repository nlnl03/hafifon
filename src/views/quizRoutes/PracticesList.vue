<template>
  <div class="loader-spinner" v-if="!isLoad">
        <loadingSpinner />
  </div>
    
<div class="main" v-if="isLoad">
    <h1>שיעורים ותרגולים</h1>
   <div class="text-under-line"></div>

    <div class="select-timeline" >
         <q-select outlined v-model="selectedValue" :options="weeks"  :option-value="option => option.Id" :option-label="option => `שבוע ${option.Id}`" label="מיין לפי שבוע" 
            @update:model-value="filterPractices"  dir="rtl"/>
          
    </div>

  
   <div class="container-cards" >
     <div class="without-timeline">
         <div class="timeline" ref="timeline" >
             <q-timeline color="secondary" > 
              <q-timeline-entry :subtitle="`שבוע ${week.Id}`" v-for="(week,index) in weeks" :key="index" :value="week.Id">
                <div class="flex-cards" v-if="showCards">
                  <div v-for="(item,midIndex) in weekLessons(week.Id)" :key="midIndex" >
                    <div class="card" @mouseenter="expandCard(item,index,midIndex,$event)" @mouseleave="collapseCard($event)" >
                      <div class="card-content">
                        
                          <div class="inner-flex">
                            <img class="image-of-items" :src="require(`@/assets/${item.Img}`)">
                            <h4 class="text">
                                {{item.Title}}
                            </h4>
                            <span class="lesson-name">{{item.description}}</span>
                            <span class="num-of-que">מספר תרגולים: </span>
                          </div>

                          <div class="expanded-content" v-if="(ite === index && midIte === midIndex) && this.isFinished" :style="{ maxHeight: ite === index && midIte === midIndex ? expandedHeight : '0' }">
                              <q-btn class="powerPoint-link" @click="powerpointUrl(index,item.file)" label="מצגת" style="background-color:#eb693e; color:white"/>
                              <q-btn class="tirgulim-link" label="תרגולים" @click="openTirgulimModal(item.Id,index)"  style="background-color:var(--main-shob-color); color:white" />
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


<q-dialog v-model="dialogVisible" class="custom-dialog"  >
    <q-card style="width: 450px; height:200px" >       
      <q-card-section class="flex-prac-btns">
        <div class="prac-btns" v-for="prac in tirgulimNames" :key="prac">
            <q-btn class="practices-btn" @click="goToPrac(prac)" id="${prac.Id}"> {{prac.Title}}</q-btn>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script>
 import loadingSpinner from '@/components/loadingSpinner.vue'
import axios from 'axios'
export default {
  name:"PracticesList",
  components:{
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
       practicesFilltered:[],
       weeks:[],
       lesson:[],
       showCards:false,
       dialogVisible:false,
       tirgulimNames:[]
     }
  },
  methods:{
    
    filterPractices(){
      console.log(this.selectedValue.timeline)
      const optionValue = this.selectedValue.Id
      console.log("value: "+ optionValue)
      const timelineFiltered = this.$refs["timeline"].children[0].children[optionValue-1]
      console.log(timelineFiltered)
      for(var i = 0; i<this.weeks.length;i++){
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
 
     expandCard(item,index,midIndex,event){
      this.ite = index
      this.midIte = midIndex    
      const div = event.target.children[0].children[0]
          // console.log(div)
      // console.log(this.$refs[item+midIndex])
       div.style.height = '90%'
      // console.log(expandDiv)
      
      this.isFinished = true
    },

     collapseCard(event){
        this.ite = null
        this.midIte = null
        const div = event.target.children[0].children[0]
         div.style.height = '100%'
        this.isFinished = false
     },

     powerpointUrl(index, fileName){
        // var nameOfPowerP = this.practices[index].items[midIndex].Subject
             const url = `https://portal.army.idf/sites/hafifon383/_layouts/15/WopiFrame.aspx?sourcedoc=https://portal.army.idf/sites/hafifon383/SiteAssets/שבוע ${index+1}/${fileName}`
             window.open(url, '_blank')
      },

        getTirgulimNames(itemId){
          console.log(itemId)
           if(this.$isSharePointUrl){
            return axios.get(this.$sharePointUrl + `getByTitle('practices')/Items?$filter=lessonId eq ${itemId}`)
              .then(res => res.data.value) 
           }

          else{
            return axios.get(this.$sharePointUrl + `practices`)
              .then(res => res.data.value)
              .then((results)=>results.filter(item=>item.lessonId==itemId))  
          }
        },

     async openTirgulimModal(lessonId,index){
        console.log(index)
        this.tirgulimNames = await this.getTirgulimNames(lessonId)
        console.log(this.tirgulimNames)

        // const buttonsHtml = tirgulimNames.map(button => `
        //     <q-btn class="practices-btn" id="${button.Id}"> ${button.Title}</q-btn>
        // `).join('')
        
      if(this.tirgulimNames.length>1){
        this.dialogVisible = true
          // this.$swal({
          //     html:`
          //       <div class="tirgulim-btns">
          //         ${buttonsHtml}
          //       </div>
          //     `,
          //     showConfirmButton:false,
          //     showLoaderOnConfirm:true,
          //     didOpen: () => {
          //       tirgulimNames.forEach(button => {
          //         const buttonElement = document.getElementById(button.Id);
          //         if(buttonElement){
          //           buttonElement.addEventListener('click', () => {
          //             console.log(button)
          //             this.$router.push({name: "beforeStartQuiz", params:{week:index+1,numOfPrac:button.Id, title:button.routeName}})
          //             this.$swal.close()
          //           })
          //         }
          //       })
          //     }
          // })
      }

      else if(this.tirgulimNames.length==1){
        console.log(this.tirgulimNames[0])
        this.$router.push({name: "beforeStartQuiz", params:{week:index+1,numOfPrac:this.tirgulimNames[0].Id, title:this.tirgulimNames[0].routeName}})
      }
    },

    goToPrac(prac){
        this.$router.push({name: "beforeStartQuiz", params:{week:this.ite+1,numOfPrac:prac.Id, title:prac.routeName}})

    },


    async getWeeks(){
      var res = null
      if(this.$isSharePointUrl){
        res = await axios.get(this.$sharePointUrl + "getByTitle('weeks')/Items")
      }
      else{
        res = await axios.get(this.$sharePointUrl+ "weeks")
      }
       this.weeks = res.data.value
        console.log(this.weeks)
        this.loadLesson()
        this.isLoad = true;
    },

    async loadLesson(){
      var res = null
      if(this.$isSharePointUrl){
        res = await axios.get(this.$sharePointUrl + "getByTitle('lessons')/Items")
      }
      else{
        res = await axios.get(this.$sharePointUrl + "lessons")
      }
       this.lessons = res.data.value
        console.log(this.lessons)
        this.showCards = true
    },

    weekLessons(weekId){
      return this.lessons.filter(lesson=>lesson.weekId === weekId)
    },
        
   },
  async beforeMount(){
      this.timeOut = setTimeout(this.getWeeks,200)

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
    color: var(--main-shob-color);
    position: relative;
    margin-bottom: 50px;
    top: 30px;
}
.text-under-line{
    position: relative;
    top: -5px;
    width: 130px;
    height: 2px;
    background-color: var(--main-shob-color);
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
    left: 80px;
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
    margin-right: 105px !important;
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
    bottom: 0%;
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
  .practices-btn{
    background: var(--main-shob-color);
  }
  .flex-prac-btns{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-wrap: wrap;
  }
  .prac-btns{
    margin: 0.5em;
  }
 </style>