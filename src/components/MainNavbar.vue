<template>
   <div class="main-nav">
       <div class="main-cover"></div>
           <div class="menu">
               <router-link :to="{ name: 'HomePage'}" class="home-title" >
                    חפיפה
               </router-link> 
               <router-link :to="{ name: 'User'}"  class="user-title" >
                   לאיזור אישי
               </router-link> 

            <div class="nav-bar">
                     <ul>
                        <li>
                            <div>
                                <router-link :to="{path: 'Statistics'} ">סטטיסטיקה ונתונים</router-link>
                            </div>
                        </li>

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
                                <span class="exams-header-nav" >בחנים</span>
                                    <div v-if="isOpen" class="dropdown-menu">
                                        <ul class="dropdown-items">
                                            <router-link class="exams" :to="{path: 'test1'}">מבחן 1</router-link>
                                            <router-link class="exams" :to="{path: 'test2'}">מבחן 2</router-link>
                                            <router-link class="exams" :to="{path: 'test3'}">מבחן 3</router-link>
                                        </ul>
                                    </div>
                            </div>
                        </li>

                        <li class="headers" >
                            <div class="headers-hover" >
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
    width: 80%;
    height: 125px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

}
.nav-bar{
     width: 750px;
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
.home-title{
    font-weight: bold;
    position: absolute;
    font-size: 35px;
    top: 35px;
    height: 60px;
    right: 0;
}
 
.user-title{
    width: 110px;
    height: 40px;
    display: flex;
    line-height: 38px;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 43px;
    text-decoration: none;
    font-size: 22px;
    padding: 2px 0;
    color: gray;
    border-radius: 25px;
    border: none;
    font-weight: bold;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    -webkit-appearance: none;
}
  

















/* .main-navbar{
    display: flex;
    flex-direction: row-reverse;
    height: 200px;
    background-color: var(--main-color);
     justify-content: center;
 } */
/* .home-title{
      margin-right: 90px;
      position: absolute;
      top: 6%;
       left: 88%;
     font-size: 35px;
} */
.dropdown-menu{
    position: absolute;
    z-index: 1;
    left: 68%;
    width: 18%;
    transform-origin: top center;
    animation: slideDown 300ms ease-in-out forwards;
 }
/* @keyframes slideDown{
    0%{
        opacity: 0;
     }
    100%{
        opacity: 1;
     }    
} */

.dropdown-items{
     padding: 0;
     display: flex;
     flex-direction: column;
     align-items: center;
     background-color: rgba(38, 124, 110, 0.856);
     border-radius: 3px 3px 15px 15px;      
}
 
/* a{
    display: flex;
    height: 80px;
    align-items: center;
    text-decoration: none;
    color: black;
    padding: 0 30px;
} */

 

 /* a[class="exams"]{
    color: #fff;
} */

/* .exams-header-nav{
    display: flex;
    height: 80px;
    align-items: center;
    text-decoration: none;
    color: black;
    padding: 0 30px;
    cursor: pointer;
   } */
 

/* .navbar-headers-list{
    list-style-type:none;
    display: flex;
    position: relative;
     flex-shrink: 0;
     align-items: center;
 } */
 
/* .headers{
     font-size: 20px;
 } */
 
/* @media (max-width: 1024px) {
     
} */
</style>
