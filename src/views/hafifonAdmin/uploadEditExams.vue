<template>
 <div class="choose-box" >
     <div class="edit-or-upload"  >
         <button class="upload">העלת מבחן חדש</button>
         <button class="edit" @click="triggerEdit">עריכת מבחן קיים</button>
     </div>     
    
     <div class="next-btn" v-if="selectOpened">
         <button  @click="nextBtn" :disabled="!isChecked">המשך</button>
     </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            examNames:[],
            selectedOption:'',
            isChecked:false,
            selectOpened:false,
            showUploadBtn:true,
            showEditBtn:true
            
        }
    },
    methods:{
         
        triggerEdit(){
            const selectHtml = `
                <select id="mySelect" class="select-exams" >
                    <option value="" disabled selected hidden>בחר מבחן</option>
                        ${this.examNames.map(name => `<option value="${name.Title}">${name.subject}</option>`).join('')}
                </select>`
                                                            
             console.log(selectHtml)

            this.$swal({
                title:'בחר את הבחינה שברצונך לערוך:',
                html: selectHtml,
                confirmButtonText:'המשך' ,
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
        }
    },
    beforeMount(){
        this.examNames = JSON.parse(localStorage.getItem("examsName"))
        console.log(this.examNames)

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
.upload, .edit{
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