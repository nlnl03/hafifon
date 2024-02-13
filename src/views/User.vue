<template>
 <div class="main-page" >
     <h1>האיזור האישי</h1>
    <div class="under-line"></div>
      <div class="main">
        <div class="right-side-flex">
          <div class="name-progress-details"> 
          <div class="personal-info">
            <div class="personal-info-items">
              <div class="inner-right-flex"> 
                <div v-if="isFinished" class="name-detail">
                    <h2>{{userName}}</h2>  
                </div>

                <div class="hafifa-nickname"> 
                      חפיפון מתחיל
                </div>
              </div>

          <div class="inner-left-flex" >
                <img class="user-image" :src="imgUrl"  v-if="showImg && isImg" ref="myImage"> 
          </div>
      </div>
    </div>

            <div class="progress-info">
                <div class="users-progress-item" >
                  <div class="title" v-if="isLoadForSpinner">כמה עברתי מהחפיפה ?</div>
                      <div class="spinner-for-progress" v-if="!isLoadForSpinner"><loadingSpinner /></div> 
                      <div class="progress-circle-how-much" v-if="isLoadForSpinner">
                        <circle-progress 
                          :percent="calcTotalProgress(val)"
                          :show-percent="true"
                          fill-color="var(--main-shob-color)"
                          :viewport="true"
                          :transition="600"
                        />
                      </div>
                </div>
            </div>
      </div>
  </div> 

        <div class="left-side-flex"  >
            <div class="spinner" v-if="!isLoadForSpinner"><loadingSpinner /></div>

            <div class="grid-container" v-show="isLoadForSpinner" >
              <div class="average" >
                  <span class="items-title" >ממוצע ציונים </span>
                  <span class="gradeAv" ref="gradeAv">{{average}}</span>
              </div>

            <div v-for="(exam,index) in onlyExamData" :key="exam">
              <div :class="dynamicGridClass(index+1)" style="background: white;">
                  <span class="items-title">{{examsNames[index].subject}}</span>
                  <span v-if="exam!=null" class="the-grades">{{exam[exam.length-1]["finalGrade"]}} </span>
                  <span v-if="exam==null" class="the-grades-no-examdata">עוד לא הוזן</span>

                  <div class="show-exam">
                     <router-link v-if="exam!=null" class="exam-Checked-router" :to="{name:'CheckedExams',params:{title:examsNames[index].Title}}">לצפייה במבחן</router-link>
                  </div>
              </div>
            </div>   
          </div>

        </div>
    </div>
</div>
 
</template>

<script>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"
import loadingSpinner from '../components/loadingSpinner.vue'
import axios from 'axios';
export default {
  components:{
    CircleProgress,
    loadingSpinner
   },
  data(){
    return{
      userDetails:[],
       gradesAvera: [],
       userNum:'',
       userName:'',
       isFinished:false,
       userId:'',
       checkedExamData:[],
       onlyExamData:[],
       examsNames:[],
       hafifaProgress:null,
       isLoad:false,
       average:null,
       timeOut:null,
       isGradeAve:false,
       isLoadForSpinner:false,
       isCalculated:false,
       onlyExam:null,
       showImg:false,
       imgUrl:'',
       isImg:false,
       dataParsed:[]
     }
  },
    methods:{
      imgSrc(){
        this.imgUrl = `https://hm.mail.idf/owa/service.svc/s/GetPersonaPhoto?email=s${this.userNum}@army.idf.il&UA=0&size=HR96x96&sc=1701085407934`;
         if(this.imgUrl.split('').filter(c => c === '?').length > 1){
          var charToRemove = '?'
          var indexToRemove = this.imgUrl.indexOf(charToRemove)
          var modifiedString = this.imgUrl.slice(0, indexToRemove) + this.imgUrl.slice(indexToRemove + 1)
          this.imgUrl = modifiedString
          console.log(this.imgUrl)
         }
           console.log(this.$refs.myImage)
         this.showImg = true
         console.log(this.showImg)
         
      },
      asyncParse(str){
        return new Promise((resolve)=>{
           resolve(JSON.parse(str))
          })
        },
        

        async parseData(){
          this.examsNames = localStorage.getItem("examsName")
          this.examsNames = JSON.parse(this.examsNames)
          console.log(this.examsNames)
          if(this.$isSharePointUrl){
              this.examsNames.forEach(name=>{
                const promiseAnswers = Promise.all(this.checkedExamData.map((item)=>{
                  return this.asyncParse(item[name.Title]).then((inner)=>{
                    item[name.Title] = inner
                        return {item}
                      })
                  }))
                })
            }
            else{
              return this.examsNames
            }
        },
 
       async getCheckedExam(){
         this.userId=localStorage.getItem("userId")
         console.log(this.userId)
         var res = null
         if(this.$isSharePointUrl){
            return axios.get(this.$sharePointUrl+`getByTitle('students')/Items?$filter=num eq '${this.userId}'`)
            .then(res=>res.data.value)
          }
         else{
            return axios.get(this.$sharePointUrl+`students?num=${this.userId}`)
            .then(res=>{
              console.log(res.data)
                 return res.data.value
            })
           
          }
                
         },
          async filterToExamsOnly(){
            await this.parseData()
            return new Promise((resolve)=>{             
              console.log("yesss")
              if(this.$isSharePointUrl){
                  this.examsNames.forEach(name=>{
                    this.onlyExamData.push(this.checkedExamData[0][name.Title])
                  })
              }
              else{
                  this.examsNames.forEach(name=>{
                      this.onlyExamData.push(this.checkedExamData[0][name.Title])
                  })
              }

                console.log(this.onlyExamData)
                // this.onlyExam = this.onlyExamData
                  resolve(this.onlyExamData)
            })
             },

            dynamicGridClass(index){               
              return 'test-'+index+'-score'
            },

            calcTotalProgress(val){
              var counter=0
              this.onlyExamData.forEach(exam=>{
                if(exam!=null){
                  counter++
                }
              })

              if(counter==0){
                return val=0
              }
              else{
                return  val = (counter/this.onlyExamData.length)*100
              }
            },

            
            asyncSetTimeout(){
              return new Promise((res)=>{
                setTimeout(res,300)
                })
              },
            
           getUserName(){
              var userName = localStorage.getItem("userName")
              this.userName = userName
              // console.log(this.userName)
            },
            calcGradesAve(){
              console.log(this.onlyExamData)
              var ave = 0
              var counter = 0
              var ifEmptyText = 'אין מידע'
              var length = this.onlyExamData.length
              console.log(length)
              console.log(this.onlyExamData)
              this.onlyExamData.forEach(data=>{
                 if(data!=null){
                   console.log("usdfjdh")
                   ave+=data[data.length-1]["finalGrade"]
                }
                else{
                  counter++
                  length=this.onlyExamData.length-counter
                }
              })
              
              console.log(counter)
              if(!length){
                  console.log("is 0")
                  let a = this.$refs["gradeAv"]
                  console.log(a);
                  a.style.fontSize = "35px";
                  this.average = ifEmptyText
              }
              else{
                this.average = ave/length
              }
             },

             async getNewPractice(){
              const res = await axios.get(this.$sharePointUrl + "getByTitle('practices')/Items")
              var data = res.data.value
              console.log(data)
                this.dataParsed = res.data.value

              const promiseData = await Promise.all(this.dataParsed.map((item)=>{
                return this.asyncParse(item.practiceData).then((inner)=>{
                  item['practiceData'] = inner
                    return {item}
                })
              }))

                
              console.log(this.dataParsed)
             }
     },

    async beforeMount(){
      this.userNum = localStorage.getItem("userNum")
      this.imgSrc()
      await this.asyncSetTimeout()
      this.getUserName()
      this.isFinished = true
      this.checkedExamData = await this.getCheckedExam()
      await this.filterToExamsOnly()
      this.calcGradesAve()
      this.isLoadForSpinner=true
      //  this.timeOut = await setTimeout(,200)

      // this.getNewPractice()
      },
 }
</script>

<style scoped>
.main-page{
    background-image: url("../assets/homePageBackground.png");
    background-position: center;
    background-size: cover;
    height: 86.5vh;
    width: 100%;
    background-repeat: no-repeat;

}
.main{
    display: flex;
     text-align: center;
    height: 645px;
    margin-top: 25px;
    margin-right: var(--user-main-margin-right);
    margin-left: var(--user-main-margin-left);
    
}
.name-progress-details{
  display: flex;
  flex-direction: column;
   justify-content: space-evenly;
    
}
h1{
  font-size: 60px;
  color: var(--main-shob-color);
  position: relative;
  margin-bottom: 50px;
   top: 35px ;
  text-align: center;
}
.under-line{
  position: relative;
  top: -5px;
  width: 160px;
  height: 2px;
  background-color:var(--main-shob-color) ;
  margin: 0 auto;
}

.hafifa-nickname{
  text-align: center;
  font-size: 20px;
  background:var(--main-shob-color);
  color:white;
  border-radius: 20px;
}
.user-image{
  z-index: 0;
  height:150px;
  border-radius: 50%;
  width: 150px;
}
h5{
  color:grey;
}
 
.personal-info-items{
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;

  }

.right-side-flex{
    width: 47%;
    height: 100%; 
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    background-color: #fff0;

 }
.left-side-flex{
    width: 50%;
     align-items: center;
    justify-content: center;
     height: 100%;
    display: flex;
     flex-direction: column;
     background: #ffffff00;
  }
  .inner-right-flex{
    display: flex;
    width: 40%;
    height: 100%;
     justify-content: space-evenly;
    flex-direction: column;
  }
.gradeAv{
    font-size:45px;
    display: block;
    margin-top: 25px;

    }
.personal-info{
    width: 500px;
    height: 250px;
    border-radius: 20px 20px 20px 20px;
    /* margin-bottom: 65px  */
}
 .progress-info{
    background-color: #fff  ;
    width: 420px;
    height: 290px;
    border-radius: 20px 20px 20px 20px;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
 }
.name-detail{
    font-size: 25px;
    position: relative;
    top: 10px;
    width: 180px;
    border-right: 2px solid var(--main-shob-color);
  }

 .inner-left-flex{
    display: flex;
    height: 100%;
    width: 50%;
    justify-content: center;
    align-items:center;
  }
  .all-progress {
    display: flex;
    justify-content: center;
    height: 100%;
   }
 .users-progress-item{
    display: flex;
    flex-direction: column;
    height: 90%;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 8px;

  }
 .title{
      width: 45%;
      margin-top: 5px;  
      padding-bottom: 7px;
      font-size: 20px;
      text-align: center;
      /* border-bottom: 1px solid var(--main-shob-color)  ; */
  }
  
 .average-title{
    width: 45%;
    padding-bottom: 7px;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid var(--main-shob-color);

 }
 .grid-container{
    display: grid;   
        /* max-height: 81%;
    overflow-y: auto; */

    justify-content: end;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    /* background: #fff; */
    gap: 25px 25px;
    border-radius: 24px;
    animation: growOut 250ms ease-in-out forwards;

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

 .average{
    border-top:6px solid var(--main-shob-color);
    grid-area: 2/2/3/3;
    width: 150px;
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
    background: #fff;
 }
 .no-gradeAv-yet{
   font-size: 20px;
 }
  .items-title{
    font-size: 22px;
    position: relative;
    top: 13px;
 }
 .test-1-score{
     border-top:6px solid #ff4e00;
     grid-area: 1/1/2/2;
     width: 150px;
     height: 160px;
     box-shadow: 0px 0px 20px 0px rgba(0,  0,  0,  0.2);
     border-radius: 20px 20px;
 }
 .test-3-score{
    border-top:6px solid rgb(155, 16, 155);
    grid-area: 1/3/2/4;
    width: 150px;
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0,  0,  0,  0.2);
    border-radius: 20px 20px;
 }
 .test-4-score{
    border-top:6px solid #ec9F05;
    grid-area: 3/1/4/2;
    width: 150px;
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0,  0,  0,  0.2);
    border-radius: 20px 20px;
 }
 .test-2-score{
    border-top:6px solid teal;
    grid-area: 1/2/2/3;
    width: 150px;
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0,  0,  0,  0.2);
    border-radius:20px 20px;
 }
 .test-5-score{
    border-top:6px solid teal;
    grid-area: 3/3/4/4;
    width: 150px;
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0,  0,  0,  0.2);
    border-radius:20px 20px;
 }
 .the-grades{
    display: block;
    font-size: 43px;
    margin-top: 20px;
  }
  .the-grades-no-examdata{
    display: block;
    font-size: 24px;
    margin-top: 35px;
  }
  .show-exam{
    margin-top: 15px;
  }
  .exam-Checked-router{
    text-decoration: none;
    color:black;
    background: rgba(218, 220, 220, 0.78);
    padding: 0.6em 0.8em;
    font-size: 15px;
    border-radius: 13px;
  }
  .exam-Checked-router:hover{
    background-color: #ccc;

  }
  .spinner{
    position: relative;
    bottom:50%;
    transform: translateY(50%);
   }    
  .spinner .spin::before{
      height: 80px;
      width: 80px;
  }
  .spinner-for-progress{
      position: relative;
       bottom:70%;
       transform: translateY(80%);
  }
  .spinner-for-progress .spin::before{
      height: 45px;
      width: 45px;
   }


</style>