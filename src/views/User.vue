<template>
    <div class="loader-spinner" v-if="!isLoadForSpinner">
          <loadingSpinner />
    </div>
<div class="main-page">
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

        <div class="inner-left-flex">
              <img class="user-image" src="http://www.portalhr.leshem.idf/KioskServlet?infoOrPic=pic"> 
        </div>
      </div>
    </div>

    <div class="progress-info">
         <div class="progress-item">
           <div class="title">כמה עברתי מהחפיפה ?</div> 
        <div class="progress-circle">
          <circle-progress 
          :percent="calcTotalProgress(val)"
          :show-percent="true"
           fill-color="var(--main-background-color)"
           :viewport="true"
           :transition="600"
          />
        </div>
        </div>
     </div>
</div>
  </div> 
        <div class="left-side-flex">
            <div class="grid-container" v-if="isLoad">
              <div class="average">
                <span class="items-title">ממוצע ציונים </span>
                   <span class="gradeAv">{{calcGradesAve(average)}}</span>
                </div>

              <div v-for="(exam,index) in onlyExamData" :key="exam">
                <div :class="dynamicGridClass(index+1)" >
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
import axios from 'axios';
export default {
  components:{
    CircleProgress
   },
  data(){
    return{
       userDetails:[],
       gradesAvera: [],
       testsNameUrl:process.env.NODE_ENV =='development'? 'http://localhost:3000/testsNames/' : "https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('testsNames')/Items",
       userName:'',
       isFinished:false,
       userId:'',
       checkedExamData:[],
       onlyExamData:[],
       examsNames:[],
       hafifaProgress:null,
       isLoad:false,
       theAve:0,
       timeOut:null,
       isLoadForSpinner:false
     }
  },
    methods:{
      asyncParse(str){
        return new Promise((resolve)=>{
           resolve(JSON.parse(str))
          })
        },
        async getExamsNames(){
           const res = await axios.get(this.testsNameUrl)
           this.examsNames = res.data.value
           console.log(this.examsNames)
        },

        async parseData(){
          await this.getExamsNames()
              this.examsNames.forEach(name=>{
              const promiseAnswers = Promise.all(this.checkedExamData.map((item)=>{
                return this.asyncParse(item[name.Title]).then((inner)=>{
                    item[name.Title] = inner
                        return {item}
                      })
                  }))
              })
        },
 
       async getCheckedExam(){
         this.userId=localStorage.getItem("userId")
         console.log(this.userId)
         const res = await axios.get(`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('students')/Items?$filter=num eq '${this.userId}'`)
         this.checkedExamData = res.data.value
         await this.parseData()
           console.log(this.checkedExamData)
           this.filterToExamsOnly()
           this.isLoadForSpinner=true
        },
           filterToExamsOnly(){
             this.examsNames.forEach(name=>{
               this.onlyExamData.push(this.checkedExamData[0][name.Title])
             })
              console.log(this.onlyExamData)
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

            calcGradesAve(average){
               var ave = 0
              var counter = 0
             var ifEmptyText = 'אין מידע'
              var length = this.onlyExamData.length
              this.onlyExamData.forEach(data=>{
                 if(data!=null){
                   ave+=data[data.length-1]["finalGrade"]
                }
                else{
                  counter++
                  length=this.onlyExamData.length-counter
                }
              })
              console.log(counter)
              if(length==0){
                  console.log("is 0")
                return average = ifEmptyText
              }
              else{
                return average = ave/length
              }
                 
            }
     },

    async beforeMount(){
      var userName = localStorage.getItem("userName")
      this.userName =  userName
      // console.log(this.userName)
      this.isFinished = true
      this.timeOut = await setTimeout(this.getCheckedExam,100)
        this.isLoad=true
     }
   
}
</script>

<style scoped>
.main{
    display: flex;
    direction: rtl;
    text-align: center;
    height: 620px;
    margin-right: 10%;
    margin-left: 10%;
}
.name-progress-details{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
    
}
h1{
  font-size: 60px;
  color: var(--main-background-color);
  position: relative;
  margin-bottom: 50px;
   top: 30px ;
  text-align: center;
}
.under-line{
  position: relative;
  top: -5px;
  width: 160px;
  height: 2px;
  background-color:var(--main-background-color) ;
  margin: 0 auto;
}

.hafifa-nickname{
  text-align: center;
  font-size: 20px;
  background:var(--main-background-color);
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
    width: 50%;
     height: 100%; 
    align-items: center;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
 }
.left-side-flex{
    width: 50%;
     align-items: center;
    justify-content: center;
     height: 100%;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
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
    background-color: #fff  ;
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
    box-shadow: 0px 0px 30px 0px rgba(0,  0,  0,  0.2)
 }
.name-detail{
    font-size: 25px;
    position: relative;
    top: 10px;
    width: 180px;
    border-right: 2px solid var(--main-background-color);
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
 .progress-item{
    display: flex;
    flex-direction: column;
    height: 90%;
    align-items: center;
    justify-content: space-evenly;

  }
 .title{
      width: 45%;
      margin-top: 5px;  
      padding-bottom: 7px;
      font-size: 20px;
      text-align: center;
      border-bottom: 1px solid var(--main-background-color)  ;
  }
  
 .average-title{
    width: 45%;
    padding-bottom: 7px;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid var(--main-background-color);

 }
 .grid-container{
    display: grid;   
    justify-content: end;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    gap: 25px 25px;
  }
 .average{
    border-top:6px solid var(--main-background-color);
    grid-area: 2/2/3/3;
    width: 150px;
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0,  0,  0,  0.2);
    border-radius: 30px 30px;
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
    padding: 0.5em 0.8em;
    font-size: 15px;
    border-radius: 13px;
  }
  .exam-Checked-router:hover{
    background-color: var(--main-background-color);
;
  }
</style>