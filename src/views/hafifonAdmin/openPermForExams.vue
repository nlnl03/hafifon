<template>
<div class="main">
    <div class="title">פתיחת הרשאות</div>
    
    <div class="permission">
        <div class="permisson-items" v-for="(per,index) in currentPermission" :key="per">
            <div class="permission-flex">
                <span class="permission-title">{{per.Title}}:</span>
                <label class="switch" v-if="isload">
                    <input type="checkbox" :checked="per.isAllow" @click="openPerm(per,index)" :ref="per+index">
                    <span class="slider round"></span>
                </label> 
            </div>    
        </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'   
export default {
    data(){
        return{
            urlForId:"https://portal.army.idf/sites/hafifon383/_api/web/sitegroups/getbyname('מבקרי חפיפון')/id",
            groupId:null,
            targetRoleDefId:null,
            token:null,
            currentPermission:[],
            Id:null,
            isload:false
        }
    },
    methods:{
         
         async getToken(){
          return axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo").then((res=> res.data.FormDigestValue))
      },
        async getIdOfgroup(){
            const res = await axios.get(this.urlForId)
            this.groupId = res.data.value
            console.log(this.groupId)
         },
        async getTargetRoleDefenitionId(){
            const res = await axios.get("https://portal.army.idf/sites/hafifon383/_api/web/roledefinitions/getbyname('שליטה מלאה')/id")
            this.targetRoleDefId = res.data.value
            console.log(this.targetRoleDefId)
              
        },
        async setNewPermForGroup(per){
             return axios.post(this.$sharePointUrl+`getByTitle('${per.type}')/roleassignments/addroleassignment(principalid='${this.groupId}' ,roledefid='${this.targetRoleDefId}')`,{
             
             },

             {
                 headers:{
                        'X-RequestDigest':this.token,
                    }
             })
                 
          },

          async openPerm(per,index){
              var isAllowCondition = null
               var val = this.$refs[per+index]
               await this.getPermListId(per)

              if(val.checked){
                    isAllowCondition = true
                     this.setNewPermForGroup(per)
                    this.updatePerm(isAllowCondition)
              }
              
              else{
                  isAllowCondition = false
                  this.updatePerm(isAllowCondition)
                  this.deletePer(per)
              }
                console.log(val)
                console.log(isAllowCondition)
           },
          async checkTheCurrentPerm(){
              var res = null
              if(this.$isSharePointUrl){
                   res = await axios.get(this.$sharePointUrl+"getByTitle('isPermissionActive')/items")
              }
              else{
                   res = await axios.get(this.$sharePointUrl+"isPermissionActive")
              }
                this.currentPermission = res.data.value
                 
          },
        async updatePerm(isAllowCondition){
              const res = await axios.post(this.$sharePointUrl+`getByTitle('isPermissionActive')/Items('${this.Id}')`,{
            '__metadata':{'type':'SP.Data.IsPermissionActiveListItem'},
               isAllow:isAllowCondition
        },
        {
            headers:{
                'X-HTTP-Method':"MERGE",
                'IF-MATCH':"*",
                'X-RequestDigest':this.token,
                'Accept':"application/json;odata=verbose",
                'Content-Type':"application/json;odata=verbose"
            }
        })
    },

          async deletePer(per){
              const res = await axios.post(this.$sharePointUrl+`getByTitle('${per.type}')/roleassignments/getbyprincipalid('${this.groupId}')`,{
            '__metadata':{'type':'SP.Data.IsPermissionActiveListItem'},
            },
            {
                headers:{
                    'X-HTTP-Method':"DELETE",
                    'IF-MATCH':"*",
                    'X-RequestDigest':this.token,
                    'Accept':"application/json;odata=verbose",
                    'Content-Type':"application/json;odata=verbose"
                }
            })
        },

          async getPermListId(per){
              const res = await axios.get(this.$sharePointUrl+`getByTitle('isPermissionActive')/items?$filter=type eq '${per.type}'`)
              this.Id = res.data.value[0].ID
              console.log(this.Id)
          }

    },
    
    async beforeMount(){
        if(this.$isSharePointUrl){
            await this.getIdOfgroup()
            this.getTargetRoleDefenitionId()
            this.token = await this.getToken()
        }
            this.checkTheCurrentPerm()
            this.isload = true
    }
      

}
</script>

<style scoped>
.main{
    display: flex;
    position: relative;
    justify-content: center;
    width: var(--permission-box-width);
    height: 700px;
    right: 50%;
    left: 50%;
    transform: translate(50%,8%);
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.212);
    border-radius:20px ;
}
.title{
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    top: 55px;
    position: absolute;
    width: 100%;
}
.permission{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 200px;
    max-height: 480px;
    overflow-y: auto;
    width: 60%;
    flex-wrap: wrap; 

 }
.permisson-items{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cccccc9c;
    margin-bottom: 35px;
    margin-right: 40px;
    border-radius: 20px;
    height: 90px;
}
.permission-flex{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70%;
    width: 80%;

}

.permisson-items:last-child{
    margin-left: 0;
}
.permission-title{
    margin-left: 10px;
    font-size: 25px;
    font-weight: 700;
    color: #575658;
 }
.toggle{
    background-color: #fff;
    border: none;
}
.switch{
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}
.switch input{
    appearance: none;
}
.slider{
    position: absolute;
    cursor: pointer;
    top: 3px;
    left:0;
    right:0;
    bottom: 0;
    background-color: #6d6c71;
    -webkit-transition: .4s;
    transition: .4s;
}
.slider::before{
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left:4px;
    top: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}
input:checked + .slider{
    background-color: var(--main-background-color);
}
input:focus + .slider{
    box-shadow: 0 0 1px var(--main-background-color);
}
input:checked + .slider::before{
    /* -webkit-transform:translateX(26px);
    -ms-transform:translateX(26px);
    transform:translateX(26px); */
    right: 7%;
}
.slider.round{
    border-radius: 34px;
}
.slider.round::before{
    border-radius: 34px;
}

 </style>