<template>
  <div class="q-pa-md q-gutter-sm" >
      {{internalDialogVisible}}
        <q-dialog v-model="internalDialogVisible" @clickaway="closeDialog">
            <q-card style="min-width:45vw; border-radius:10px" >
                <q-card-section>
                    <div class="text-h5" style="display:flex; justify-content:center; font-weight:700">
                        מלא/י את הפרטים הבאים:
                    </div>
                </q-card-section>
                <q-separator />

                 <q-card-section style="max-height:50vh; display:flex; flex-wrap:wrap; flex-direction:column; align-items:center" class="scroll" >
                     <p v-for="n in inputLabels" :key="n">
                          <q-input v-model="inputData[Object.keys(n)]" :label="Object.keys(n)" ref="nameInput" style="width:150px" input-class="rtl-input" dir="rtl" />
                     </p>
                </q-card-section>
                <q-separator />

                <q-card-actions>
                    <q-btn flat label="ביטול" @click="closeDialog" color="primary" v-close-popup />
                    <q-btn flat label="המשך" color="primary" v-close-popup @click="addNewExamBtn"/>
                </q-card-actions>

            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        dialogVisible:Boolean
    },
    name:"addExam",
    data(){
        return{ 
            inputLabels:[{"הכנס/י שאלה":""},{"שם פרק":""},{"שם הבוחן":""}],
            internalDialogVisible:false,
            inputData:[],
            token:''
         }
    },
    
    methods:{
        getToken(){
           return axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo").then((res=>res.data.FormDigestValue))
       },
          closeDialog(){
             this.internalDialogVisible = false
             console.log(this.internalDialogVisible)
             this.$emit('update:dialogVisible',false)
          },

          async createNewExamList(){
              console.log(this.inputData["שם הבוחן"])
              this.token = await this.getToken()
                 const siteUrl = this.$sharePointUrl;
                 const listData = {
                     '__metadata':{'type': 'SP.List'},
                     'Title': this.inputData["שם הבוחן"],
                     'BaseTemplate': 100
                 }
                 try{
                    const res = await axios.post(siteUrl, listData, {
                        headers:{
                            'Accept':'application/json;odata=verbose',
                            'Content-Type':'application/json;odata=verbose',
                            'X-RequestDigest':this.token,
                        }
                    })
                        if(!(res.status>=200 && res.status<300)){
                            throw new Error('נכשל בהעלאת מידע')
                        }
                 }
                 catch(error){
                     throw new Error('קרתה שגיאה בשליחת המידע')
                 }
                 
             },

            async addNewExamBtn(){
                console.log(this.inputData)
                console.log(this.inputData["שם הבוחן"])
                 try{
                    await this.createNewExamList()
                    this.$swal({
                        title:'נוסף בהצלחה',
                        icon:'success',
                        showConfirmButton:false,
                         
                    }) 
                 }
                 catch(error){
                     this.$swal({
                        title:'שגיאה',
                        icon:'error',
                        showConfirmButton:false,
                         
                    }) 
                 }
                   
             },
     },
    watch:{
        dialogVisible(newVal){
            this.internalDialogVisible = newVal
        }
    },
    
 }
</script>

<style scoped>

</style>