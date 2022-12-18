<template>
   <div class="main-nav">
       <div class="main-cover"></div>
            <router-link :to="{ name: 'HomePage'}" class="home-title" >
                חפיפה
            </router-link>  
            <router-link :to="{ name: 'User'}"  class="user-title" >
                לאיזור אישי
            </router-link>
             
        <div class="menu">
            <div class="nav-bar">
                     <ul>
                        <!-- <li>
                            <div>
                                <router-link :to="{path: 'Statistics'} ">סטטיסטיקה ונתונים</router-link>
                            </div>
                        </li> -->

                        <li >
                            <div>
                                <router-link :to="{path: 'FinalExam'}">המבחן הסופי</router-link>
                            </div>
                        </li>

                        <li>
                            <div>
                                <router-link :to="{path: 'HafifaBook'}">חוברת חפיפה</router-link>
                            </div>
                        </li>

                        <li @mouseleave="isOpen=false" >
                            <div @mouseover="isOpen = true" >
                                <span >בחנים</span>
                                    <div v-if="isOpen" class="drop-down-menu">
                                        <ul class="drop-down-items">
                                            <router-link  :to="{path: 'test1'}" class="exams">בוחן 1</router-link>
                                            <router-link  :to="{path: 'test2'}" class="exams">בוחן 2</router-link>
                                            <router-link  :to="{path: 'test3'}" class="exams">בוחן 3</router-link>
                                            <router-link  :to="{path: 'test4'}" class="exams">בוחן 4</router-link>
                                        </ul>
                                    </div>
                            </div>
                        </li>

                        <li>
                            <div >
                                <router-link :to="{path: 'Practice'}">תרגול</router-link>
                            </div>
                        </li>
                    </ul>
              </div>
        </div>
    </div>

 
</template>

<script>
export default {
    name: 'MainNavbar',
    data(){
        return{
             headers:[
                 {name:"האיזור האישי", path:'/User' },
                 {name:"המבחן הסופי", path:'/FinalExam' },
                 {name:"חוברת חפיפה", path:'/HafifaBook' },
                 {name:"בחנים", path:'/Exams' },
                 {name:"תרגול", path:'/Practice'}
             ],
             isOpen: false
        }
    }
}
</script>

<style scoped>

.main-nav{
    height: 300px;
    width: 100%;
    background-color: var(--main-background-color);
    direction: rtl;
 }
.main-cover{
    width: 100%;
    height: 125px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
}
.menu{
    width: 60%;
    height: 125px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
 
}
.nav-bar{ 
     width: 600px;
     height: 100%;
 }
ul {
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
.exams{
    display: flex;
    align-items: center;
    width: 75%;
    justify-content: center;
    color: gray;
    padding: 25px 0;
    font-size: 20px;
    border-bottom: 1px solid #dddbdb ;
    }
 .exams:last-child{
     border-bottom: none;
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
    box-shadow: 1px 3px 5px 3px rgba(0, 0, 0, 0.2);
    height: 260px;
    z-index: 1;
    top: 60px;
    left: -50%;
    width: 100px;
    transform-origin: top center;
  }
 .drop-down-items{
    flex-direction: column;
    background-color:aliceblue;
    border-radius: 5px 5px 15px 15px;    
 }

/* @keyframes slideDown{
    0%{
        opacity: 0;
     }
    100%{
        opacity: 1;
     }    
} */


</style>
