<template>
  <div class="q-pa-md">
      <q-table
        title="טבלת הרשאות למבחנים"
        :rows="rows"
        :columns="columns"
        row-key="name"
       />
             <q-btn color="primary" @click="addRow" label="הוסף משתמש" />
      
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
    name:'permTable',
    data(){
        return{
            columns:[],
            rows:[
                {name:"נעם לביא",userNum:"9053078",exam1:"80",exam2:"fdfdf",exam3:"454",exam4:"dfdf",finalTest:"fdkjkj"},
                {name:"נעם לביא",userNum:"9053078",exam1:"80",exam2:"fdfdf",exam3:"454",exam4:"dfdf",finalTest:"fdkjkj"},
                {name:"נעם לביא",userNum:"9053078",exam1:"80",exam2:"fdfdf",exam3:"454",exam4:"dfdf",finalTest:"fdkjkj"},
                {name:"נעם לביא",userNum:"9053078",exam1:"80",exam2:"fdfdf",exam3:"454",exam4:"dfdf",finalTest:"fdkjkj"},
                {name:"נעם לביא",userNum:"9053078",exam1:"80",exam2:"fdfdf",exam3:"454",exam4:"dfdf",finalTest:"fdkjkj"},
                {name:"נעם לביא",userNum:"9053078",exam1:"80",exam2:"fdfdf",exam3:"454",exam4:"dfdf",finalTest:"fdkjkj"},
                
            ]
        }
    },
    beforeMount(){
        const examNames = JSON.parse(LocalStorage.getItem("examsName"))
        console.log(examNames)
        const columns = [{name:"name", label:"שם", field: "name"},{name:"userNum", label:"מס' אישי", field: "userNum"}]
        
         const updatedNameColumns = examNames.map(obj=>{
             const {Title, subject} = obj
             return { name:Title, label: subject, field:Title  }
         })
            this.columns = columns.concat(updatedNameColumns)
            console.log(this.columns)
            
    }
}
</script>

<style scoped>
.q-pa-md{
    width: 85%;
 }
 
</style>