<template>
 <div class="choose-box" >
     <div class="edit-or-upload">
         <button class="edit" @click="triggerEdit">עריכת בוחן קיים</button>
         <button class="upload" @click="fixed = true">העלת בוחן חדש</button>
         <button class="remove" @click="removeExamBtn">מחיקת בחנים</button>
         <q-input v-model="text" label="שם הבוחן" ref="nameInput"/>
     </div>     
     <div class="q-pa-md q-gutter-sm" >
        <q-dialog v-model="fixed" >
            <q-card style="min-width:45vw; border-radius:10px" >
                <q-card-section>
                    <div class="text-h5" style="display:flex; justify-content:center; font-weight:700">
                        מלא/י את הפרטים הבאים:
                    </div>
                </q-card-section>
                <q-separator />

                 <q-card-section style="max-height:50vh; display:flex; flex-wrap:wrap; flex-direction:column; align-items:center" class="scroll" >
                     <p v-for="n in 7" :key="n">
                          <q-input v-model="text" label="שם הבוחן" ref="nameInput" style="width:150px" />
                     </p>
                </q-card-section>
                <q-separator />

                <q-card-actions>
                    <q-btn flat label="ביטול" color="primary" v-close-popup />
                    <q-btn flat label="המשך" color="primary" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>
    </div>

     <div class="next-btn" v-if="selectOpened">
         <button  @click="nextBtn" :disabled="!isChecked">המשך</button>
     </div>
     
  </div>
</template>

<script>
import axios from 'axios'
import {QInput} from 'quasar'
export default {
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
            fixed:false
        }
    },
    methods:{
         
        triggerEdit(){                               
             console.log(this.selectHtml)

            this.$swal({
                title:'בחר את הבחינה שברצונך לערוך:',
                html: this.selectHtml,
                confirmButtonText:'המשך',
                confirmButtonColor:"var(--main-background-color)",
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

            async addNewExamBtn(){
              
             },

             async createNewExamList(nameInputed){
                 const siteUrl = this.$sharePointUrl;
                 const listData = {
                     '__metadata':{'type': 'SP.List'},
                     'Title': nameInputed,
                 }
                 try{
                    const res = await axios.post(siteUrl, listData, {
                        headers:{
                            'Accept':'application.json;odata=verbose',
                            'Content-Type':'application.json;odata=verbose'
                        }
                    })
                 }
                 catch{
                     console.error(error)
                 }
                 
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

    }
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
/* .edit{

} */
 </style>