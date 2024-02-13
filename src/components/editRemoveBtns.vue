<template>
   <div class="change-menu">
       <div class="save-cancel">
         <button class="save-btn" v-if="openSaveCancelBtn" @click="saveChanges(exam,index)"><q-icon name="fas fa-check" size="28px" /></button>
         <button class="cancel-btn"  v-if="openSaveCancelBtn"  @click="cancelChanges(exam,index)"><q-icon name="fas fa-times" size="28px" /></button>
       </div>

        <button v-if="!openSaveCancelBtn" class="edit-btn" @click="openEditBtn(exam,index)"> <q-icon name="fas fa-edit" size="26px" /> </button>
        <button class="remove-btn" @click="deleteBtn(exam,index)"> <q-icon name="fas fa-trash-alt" size="26px"/> </button>         
    </div>
</template>

<script>
export default {
    name:'editRemoveBtns',
     props:{
        exam:Object,
        index:Number,
        subIndex:Number,
        index:Number,
        examData:Object
     },
data(){
    return{
        openEdit:false,
        ite:null,
        openSaveCancelBtn:false,
        preValue:null,
        

    }
},
methods:{
     openEditBtn(exam,index){
            this.openEdit = true
            this.openSaveCancelBtn = true
            // console.log(this.examData.exam)
            this.ite = index
            console.log(this.ite)
            if(exam.type=="regularQue"){
                  this.preValue = exam.questions[0].que
            }
            else if(exam.type=="subQue"){
                console.log(exam.questions[this.subIndex].que)
                this.preValue = exam.questions[this.subIndex].que
            }
        },
        saveChanges(exam,index){
            var value = null
            if(exam.type=="regularQue"){
                value = exam.questions[0].que
                console.log(value)
            }
            else if(exam.type=="subQue"){
                value = exam.questions[this.subIndex].que
                console.log(value)
            }
                if(value != this.preValue){
                    this.swalBeforeSave(exam)
                    console.log("yess")
                }
                else{
                    this.openEdit = false
                    this.openSaveCancelBtn = false
                }
            
        },
        cancelChanges(exam,index){
            this.openEdit = false
            this.openSaveCancelBtn = false
            exam.questions[0].que = this.preValue
        },
        deleteBtn(exam,index){
            var part = this.examData.exam[0].part
          this.$swal({
                title:"האם את/ה בטוח/ה שברצונך למחוק פריט זה ?",
                text:"שימ/י לב כי לא תוכל/י לחזור בך...",
                icon:'warning',
                showCancelButton:true,
                confirmButtonColor:"var(--main-shob-color)",
                confirmButtonText:'כן, מחק פריט',
                cancelButtonText:"ביטול",
                showLoaderOnConfirm:true,
          }).then(result=>{
              if(result.isConfirmed){
                  if(exam.type=='regularQue'){
                    console.log(index)
                    console.log(this.examData.exam)
                    this.examData.exam.splice(index,1)
                    console.log(this.examData.exam)
                  }
                  else if(exam.type=='subQue'){
                      console.log(this.examData.exam[index].questions)
                      console.log(this.examData.exam)
                      this.examData.exam[index].questions.splice(this.subIndex,1)
                      
                  }
                    if(!this.examData.exam[index].questions.length){
                          if(index==0){
                              console.log(part) 
                              this.examData.exam[1]['part'] = part
                          }
                          this.examData.exam.splice(index,1)
                      }
                            this.$forceUpdate()
              }
            })  
        },

        swalBeforeSave(exam){
               this.$swal({
                    title:"האם את/ה בטוח/ה שברצונך לשמור שינויים אלו ?",
                    text:"שימ/י לב כי לא תוכל/י לחזור בך...",
                    icon:'warning',
                    showCancelButton:true,
                    confirmButtonColor:"var(--main-shob-color)",
                    confirmButtonText:'כן, שמור שינויים',
                    cancelButtonText:"ביטול",
                    showLoaderOnConfirm:true,
                }).then(result=>{
                    this.openEdit = false
                    this.openSaveCancelBtn = false
                    if(result.isConfirmed){
                        console.log(this.preValue)
                     }
                    else{
                        if(exam.type=="regularQue"){
                            exam.questions[0].que = this.preValue
                        }
                        else if(exam.type=="subQue"){
                           exam.questions[this.subIndex].que = this.preValue
                        }
                    }
                })
        }
        
    },
        watch:{
            openEdit(newVal){
                var index = this.ite
                var subIndex = this.subIndex
                this.$emit('childEvent', {newVal,index,subIndex})
             },
             
        },
        beforeMount(){
        }
         
}
</script>

<style scoped>
.edit-btn, .remove-btn{
      cursor: pointer;
      position: relative;
      border-radius: 45%;
      border: none ;
      width: 47px;
      height: 47px;
      margin: 5px 7px;
      display: flex;
      align-items: center;
      background: rgba(7, 57, 80, 0.24);
      justify-content: center;
   }
  

  .edit-btn:hover, .remove-btn:hover{
      background: rgb(145, 144, 144);
      border: none;
  }
.save-btn, .cancel-btn{
      cursor: pointer;
      margin:0 3px;
      border-radius: 50%;
      border: 1px solid gray;
      background: rgba(7, 57, 80, 0.24);
      height: 45px;
      width: 45px;
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  
  .save-btn:hover, .cancel-btn:hover{
     background: rgb(145, 144, 144);
      border: none;

  }
  .change-menu{
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      
  }
  .save-cancel{
      animation-name:example;
      animation-duration: 4s;
   }
  @keyframes example{
      0%{
          left:0;
      }
      50%{
          left:10px;
      }
      100%{
          left:20px;
      }
  }
</style>