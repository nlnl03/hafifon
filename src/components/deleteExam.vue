<template>
    <button class="remove-btn" @click="deleteExamBtn" > <q-icon name="fas fa-trash-alt" size="26px"/> </button>

</template>

<script>
import axios from 'axios'
export default {
    name:'deleteExam',
    props:{
        examName: String
    },
    data(){
        return{
            token:''
        }
    },
    methods:{
        async getToken(){
            return axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo").then((res=> res.data.FormDigestValue))
        },

        async deleteReq(){
            this.token = await this.getToken()
            try{
                console.log(this.examName)
                const res = await axios.post(this.$sharePointUrl+ `getByTitle('${this.examName}')`,{
                    methods:"DELETE",
                    headers:{
                        "Accept":"application/json;odata=verbose",
                        "IF-MATCH": "*",
                        "X-RequestDigest": this.token,
                         "X-HTTP-method": "DELETE",
                    }
               
                 })
                    if(res.status === 204){
                        console.log("נמחק בהצלחה")
                        this.$router.push({name: 'examDeletedMessage'})
                        this.$swal({
                            title: "המבחן נמחק בהצלחה...",
                            icon:"success"
                        })
                    }
                    else{
                        console.error("failed", res.statusText)
                        this.$swal({
                            title: "קרתה שגיאה במחיקת המבחן",
                            icon:"error"
                        })

                     }
            }

            catch(error){
                console.error("An error occurred", error)
                    this.$swal({
                       title: "קרתה שגיאה במחיקת המבחן",
                       icon:"error"
                    })

             }
            
        },

        deleteExamBtn(){
            this.$swal({
                title:"האם את/ה בטוח שברצונך למחוק מבחן זה ?",
                text:"שימ/י לב כי לא תוכל/י לחזור בך...",
                icon:'warning',
                showCancelButton:true,
                confirmButtonColor:"var(--main-background-color)",
                confirmButtonText:'כן, מחק פריט',
                cancelButtonText:"ביטול",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return new Promise((resolve) => {
                        setTimeout(()=> {
                            resolve(true)
                        }, 1500)
                    })
                }
            }).then(res => {
                if(res.isConfirmed){
                    this.deleteReq()
                }
            })
        }
    }
}
</script>

<style scoped>

</style>