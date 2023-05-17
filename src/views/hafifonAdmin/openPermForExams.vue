<template>
<div class="main" v-if="isAdmin">
    <div class="permission">
        <div class="permisson-items" v-for="(per,index) in currentPermission" :key="per">
            <span class="permission-title">{{per.Title}}</span>
            <label class="switch" v-if="isload">
                <input type="checkbox" :checked="per.isAllow" @click="openPerm(per,index)" :ref="per+index">
                <span class="slider round"></span>
            </label>     
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
            testNames:[],
            active:[],
            currentPermission:[],
            Id:null,
            isload:false,
            isAdmin:false
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
            const res = await axios.get("https://portal.army.idf/sites/hafifon383/_api/web/roledefinitions/getbyname('קריאה')/id")
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
        this.isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"))
        console.log(this.isAdmin)
        if(!this.isAdmin){
            alert("מצטערים, אך אין לך גישה לעמוד זה...")
            this.$router.go(-1)
        }
        else{
           if(this.$isSharePointUrl){
                await this.getIdOfgroup()
                this.getTargetRoleDefenitionId()
                this.token = await this.getToken()
            }
                this.checkTheCurrentPerm()
                this.isload = true
        }
     },

}
</script>

<style scoped>
.main{
    display: flex;
    position: relative;
    justify-content: center;
    width: 55%;
    height: 600px;
    right: 50%;
    left: 50%;
    transform: translate(50%,18%);
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.212);
    border-radius:20px ;
}
.permission{
    display: flex;
    margin-top: 50px;
    justify-content: space-around;
    width: 75%;
    height: 50%;
    flex-wrap: wrap;

 }
.permisson-items{
    display: flex;
    margin-left: 10%;
    flex-direction: column;
    height: 150px;
}
.permisson-items:last-child{
    margin-left: 0;
}
.permission-title{
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 40px;
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
    background-color: #ccc;
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
    background-color: #2196F3;
}
input:focus + .slider{
    box-shadow: 0 0 1px #2196F3;
}
input:checked + .slider::before{
    -webkit-transform:translateX(26px);
    -ms-transform:translateX(26px);
    transform:translateX(26px);
}
.slider.round{
    border-radius: 34px;
}
.slider.round::before{
    border-radius: 34px;
}

 </style>