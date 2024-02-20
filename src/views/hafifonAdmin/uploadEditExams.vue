<template>
 <div class="choose-box" >
     <div class="edit-or-upload">
         <button class="edit" @click="triggerEdit">עריכת בוחן קיים</button>
         <button class="upload" @click="openModal">העלת בוחן חדש</button>
         <button class="remove" @click="removeExamBtn">מחיקת בחנים</button>
      </div>     
        {{dialogVisible}}
            <addExam  :dialog-visible="dialogVisible" @update:dialog-visible="updateDialogVisible" />

     <div class="next-btn" v-if="selectOpened">
         <button  @click="nextBtn" :disabled="!isChecked">המשך</button>
     </div>
     
  </div>
</template>

<script>
import axios from 'axios'
import addExam from '@/components/addExam.vue'
import {QInput} from 'quasar'
export default {
    components:{
        addExam
    },
    data(){
        return{
            examNames:[],
            selectedOption:'',
            isChecked:false,
            selectOpened:false,
            showUploadBtn:true,
            showEditBtn:true,
            selectHtml:null,
            selectedOption:'',
            name:'',
            inputValue:'',
            dialogVisible:false
        }
    },
    methods:{
         openModal(){
             this.dialogVisible = true
             console.log(this.dialogVisible)
         },
        triggerEdit(){                               
             console.log(this.selectHtml)

            this.$swal({
                title:'בחר את הבחינה שברצונך לערוך:',
                html: this.selectHtml,
                confirmButtonText:'המשך',
                confirmButtonColor:"var(--main-background-color)",
                customClass:{
                    popup:'choose-to-edit'
                },
                showLoaderOnConfirm:true,
                didOpen: ()=>{
                    const selectedOption = document.getElementById("mySelect")
                    selectedOption.addEventListener('change',selectBtn)
                },
                willClose:()=>{
                    const selectedOption = document.getElementById("mySelect")
                    selectedOption.removeEventListener('change',selectBtn)
                },
                preConfirm:()=>{
                    const selectedOption = document.getElementById("mySelect").value
                    return {selectedOption}
                }
                 
            }).then(result =>{
                  if(result.isConfirmed){
                      const selectedOption = result.value.selectedOption
                      this.$router.push({name:'editExams',params:{title:selectedOption}})
                  }   
              })

            function selectBtn(event){
                var value = event.target.value
                if(value.trim()){
                    this.isChecked = true
                } 
                    console.log(event.target.value)
            }
        },
            removeExamBtn(){
                console.log(this.examNames)
                var examNames = this.examNames
                this.$swal({
                title:'בחר את הבחינה שברצונך למחוק:',
                html: this.selectHtml,
                confirmButtonText:'המשך',
                customClass:{
                    popup: 'choose-to-remove-swal'
                },
                confirmButtonColor:"var(--main-background-color)",
                    didOpen: ()=>{
                        const selectedOption = document.getElementById("mySelect")
                        selectedOption.addEventListener('change',this.selectBtn)
                     },
                    willClose:()=>{
                        const selectedOption = document.getElementById("mySelect")
                        selectedOption.removeEventListener('change',this.selectBtn)
                    },
                    preConfirm:()=>{
                        const selectedOption = document.getElementById("mySelect").value
                        return {selectedOption}
                    }

                 }).then(result=>{
                    if(result.isConfirmed){
                        this.$swal({
                            title:`האם אתה בטוח שברצונך למחוק את ${name} ?`,
                            confirmButtonText:'כן, מחק',
                            confirmButtonColor:"var(--main-background-color)",
                            icon:'warning',
                            showCancelButton:true,
                            cancelButtonText:"ביטול",
                            showLoaderOnConfirm:true,
                             customClass:{
                                popup: 'delete-swal'
                            },
                        })
                    }
                  })
                  
                  
            },
             selectBtn(event){
                var value = event.target.value
                    if(value.trim()){
                        this.isChecked = true
                    }
                    const namesArray = this.examNames.find((opt)=> opt.Title === value) 
                    console.log(namesArray.subject)
                    var name = namesArray.subject
                    return name
             },

            

             
             //  handleOutsideClick(event){
            //      console.log(event)
            //      console.log(this.$el.contains(event.target))
            //      if(this.fixed && !this.$el.contains(event.target)){
            //          this.cancelDialog()
            //      }
                   
            //  },
             updateDialogVisible(newVal){
                 this.dialogVisible = newVal
                  console.log(this.dialogVisible)
             }
        

    },
    beforeMount(){
        this.examNames = JSON.parse(localStorage.getItem("examsName"))
        console.log(this.examNames)
        this.selectHtml = `
                <select id="mySelect" class="select-exams" >
                    <option value="" disabled selected hidden>בחר מבחן</option>
                        ${this.examNames.map(name => `<option value="${name.Title}" :label="${name.subject}">${name.subject}</option>`).join('')}
                </select>`

    },
    
}
</script>

<style scoped>
.choose-box{
    position: relative;
    right: 50%;
    top: 25%;
    transform: translate(50%,25%);
    height: 520px;
    width:  40%;
    box-shadow: 0 0 7px 0 rgb(0 0 0 / 21%);
    border-radius: 10px;

}
.select-exams{
    position: relative;
    right: 50%;
    top: 20%;
    transform: translate(50%,20%);
}
.next-btn{
    display: flex;
    justify-content: center;
    position: relative;
    top: 70%;
    transform: translateY(70%);
}
.edit-or-upload{
    display: flex;
    position: relative;
    top: 150px;
    justify-content: space-evenly;
 }
.upload, .edit, .remove{
    box-shadow: 0 0 7px 0 rgb(0 0 0 / 21%);
    width: 20%;
    height: 150px;
    background: #fff;
    border: none;
    cursor: pointer;
    border-radius:10px ;
    font-size: 20px;
    font-weight: 700;
}
.custom-swal-popup{
    width: 150px !important;
    height: 300px !important;
}
</style>