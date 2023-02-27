<template>
   <div class="main-nav">
             <router-link :to="{ name: 'HomePage'}" class="home-title" >
                חפיפה
            </router-link>  
            <router-link :to="{ name: 'User'}"  class="user-title" >
                לאיזור אישי
            </router-link>
             
        <div class="menu">
            <div class="nav-bar">
                <ul>
                   <li >
                      <div>
                            <router-link :to="{name: 'exams',params:{Title:'finalTest'}}">המבחן הסופי</router-link>
                      </div>
                   </li>

                   <li>
                      <div>
                            <router-link :to="{name: 'HafifaBook'}">חוברת חפיפה</router-link>
                      </div>
                   </li>
                    
                    <li class="exams-drop-down" @mouseover="isOpen = true" @mouseleave="isOpen = false" >
                          <span >בחנים</span>
                             <ul class="drop-down-menu" v-if="isOpen">
                                <li v-for="name in examsName" :key="name" class="drop-down-list">
                                    <router-link class="drop-down-items" :to="{name:'exams',params:{Title:name.Title}}" >{{name.subject}}</router-link>
                                </li>
                             </ul>
                      </li>

                     <li>
                        <div>
                            <router-link :to="{name: 'PracticesList'}">תרגולים</router-link>
                        </div>
                     </li>
                </ul>
            </div>
        </div>
    </div>

 
</template>

<script>
import axios from 'axios'
export default {
    name: 'MainNavbar',
    data(){
        return{
            isOpen: false,
            examsName:[],
            url: process.env.NODE_ENV =='development'? `http://localhost:3000/testsNames/`:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('testsNames')/Items",

        }
    },
    methods:{
        async getNameOfExams(){
            const res = await axios.get(this.url)
            this.examsName = res.data.value
            console.log(this.examsName)
        }
    },
    async beforeMount(){
       if(this.url=='development')
        {
            await this.getNameOfExams()
        }
        else{
            const res= await axios.get(this.url)
            this.examsName = res.data.value
            // console.log(this.examsName)
        }
    }
}
</script>

<style scoped>

.main-nav{
    height: 125px;
    width: 100%;
    background-color: var(--main-background-color);
    direction: rtl;
 }
/* .main-cover{
    width: 100%;
    height: 125px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
} */
.menu{
    width: 60%;
    height: 125px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
 
}
.exams-drop-down{
    height: 52%;
}
.nav-bar{ 
     width: 600px;
     height: 100%;
 }
 ul{
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    font-size: 22px;
    color: #ffffff;
 }
li{
    position: relative;
    height: 50%;
    display: flex;
    align-items: center;
}

a{
    color: white;
    cursor: pointer;
    text-decoration: none;
    height: 125px;
}
  
.home-title{
    font-weight: bold;
    position: absolute;
    font-size: 35px;
    top: 35px;
    height: 60px;
    right: 100px;
 }
 
.user-title{
    width: 110px;
    height: 40px;
    display: flex;
    line-height: 38px;
    justify-content: center;
    position: absolute;
    left:var(--user-link-pos);
    top: 40px;
    text-decoration: none;
    font-size: 20px;
    padding: 0.2em 1em;
    color: gray;
    border-radius: 25px;
    border: none;
    font-weight: bold;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
 }
  
 .drop-down-menu{
    position: absolute;
    display: flex;
    z-index: 1000;
    top: 65px;
    height: 270px;
    width: 120px;
    left: -37px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    flex-direction: column;
    background-color:rgb(255, 255, 255);
    border-radius: 5px;  
    animation: growOut 280ms ease-in-out forwards;
    transform-origin: top center;
        /* transform: translateX(29%); */
  }

 .drop-down-items{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
    /* padding: 25px 0; */
    font-size: 20px;
  }
  .drop-down-list{
    border-bottom: 1px solid #f3f3f3;
    width: 100%;
  }
    .drop-down-list:last-child{
        border-bottom: none;
    }
  .drop-down-list:hover{
    border-radius: 5px;  
    background-color: #f3f3f3;
  }

@keyframes growOut{
    0%{
        transform: scale(0);
     }
     80%{
        transform: scale(1.1);
     }
    100%{
        transform: scale(1);
     }    
}


</style>
