<template>
<div class="navbar">
    <router-link :to="{ name: 'HomePage'}" style="color: black" >
        <h1 class="home-title">חפיפה</h1>
    </router-link> 

    <ul class="navbar-headers-list" >
        <li class="headers" >
            <div class="headers-hover" >
                     <router-link :to="{path: 'User'} ">האיזור האישי</router-link>
              </div>
        </li>
        <li class="headers" >
            <div class="headers-hover" >
                     <router-link :to="{path: 'FinalExam'}">המבחן הסופי</router-link>
              </div>
        </li>
        <li class="headers" >
            <div class="headers-hover" >
                     <router-link :to="{path: 'HafifaBook'}">חוברת חפיפה</router-link>
              </div>
        </li>


        <li class="headers"  @mouseleave="isOpen=false">
            <div class="headers-hover">
                <li class="exams-btn" @mouseover="isOpen = true" >
                    <router-link :to="{path: 'Exams'}">בחנים</router-link>
                </li>
                <div v-if="isOpen" class="drop-down">
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
                 {name:"תרגול", path:'/Practice' }
             ],
             isOpen: false
        }
    }
}
</script>

<style scoped>
.navbar{
    display: flex;
    flex-direction: row-reverse;
    height: 80px;
    background-color: rgb(244,244,244);
}
.home-title{
    margin-right: 90px;   
}
/* .drop-down{
    position: absolute;
    
} */
.dropdown-items{
    padding: 0;
     display: flex;
     flex-direction: column;
     align-items: center;
     background-color: rgb(105, 100, 100);
     position: absolute;
     top: calc(100% + 15px);
     left: 70%;
     width: 120px;
     border-radius:  2px 2px 16px 16px;
       
}
a{
    display: flex;
    height: 80px;
    align-items: center;
    text-decoration: none;
    color: black;
    padding: 0 30px;
    
}
a.router-link-exact-active{
    text-decoration: none;
    height: 80px;
    color: green;
    padding: 0 30px;
}
 a[class="exams"]{
    color: #fff;
    text-align: center;
    
    }
   a[class="exams"]:hover{
    background-color: rgb(226, 226, 226);
      
   }
.navbar-headers-list{
    list-style-type:none;
    display: flex;
    position: relative;
    right: 50%;
    align-items: center;
    flex-shrink: 0;
}
 
/* .headers-hover:hover{
    background-color: rgb(229,227,227);
} */
.headers{
     font-size: 20px;
 }
@media (max-width: 1280px){
    .navbar-headers-list{
        right: 30%;
    }
      .headers{
        font-size: 17px;
    }
    
     
}
@media (max-width: 1024px) {
    .navbar-headers-list{
        right: 13%;
    }
}
</style>
