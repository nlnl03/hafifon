<template>
<div class="container">
   <div class="title"><h1>ברוכים הבאים לאתר חפיפה</h1></div>
   <div class="name"><h2>שלום {{userName}}</h2></div>
      <div class="btns">
         <router-link to="">המשך תרגול</router-link>
         <router-link to="">למבחן הסופי</router-link>
      </div>
</div>
   
</template>

<script>
import axios from 'axios'
 export default {
   name:'HomePage',
     data(){
      return{
         currentUserData:[],
         Id:null,
         token:'',
         sharePointUrl:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('students')/items",
         currentUser:"https://portal.army.idf/sites/gdud0383/Team/_api/web/currentUser",
         userName:'',
       }
     },
     methods:{
     async getCurrentUser(){
        const res = await axios.get(this.currentUser)
          this.currentUserData = res.data;
          this.Id=this.currentUserData.Id
          const Title = this.currentUserData.Title.split('/')
          this.userName = Title[Title.length-1]
          localStorage.setItem("userName",this.userName)
          localStorage.setItem("userId",this.Id)
          console.log(this.userName)
          console.log(this.currentUserData)
       },
       async getToken(){
          const res = await axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
          this.token = res.data.FormDigestValue
          console.log(this.token)
       },
      async checkIfUser(){
        console.log(this.Id)
        const res = await axios.get(this.sharePointUrl+`?$filter=num eq '${this.Id}'`)
        const resData = res.data.value
        console.log(resData)
        await this.getToken()
         if(resData.length==0){
          try{
          const results = await axios.post(this.sharePointUrl,{
                Title:this.userName,
                num:this.Id,
                exam1:null,
                exam2:null,
                exam3:null,
                exam4:null,
                finalTest:null,
              },
              {
                headers:{
                'X-RequestDigest':this.token,
                }
              })
          }
          catch(error){
          console.log(error.message)
        }
      }
    }
  },
   

  async beforeMount(){
       await this.getCurrentUser()
       await this.checkIfUser()
    }
}
</script>

<style scoped>
.container{
   text-align: center;
 }
.btns{
   display: flex;
   flex-direction: row;
   width: 50px;
   height: 50px;
   /* background-color: blue; */
}
</style>