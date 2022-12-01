<template>
<div class="navbar">
    <router-link :to="{ name: 'HomePage'}" style="color: black" >
        <h1 class="home-title">חפיפה</h1>
    </router-link> 

    <ul class="navbar-headers" >
        <li class="headers" v-for="header in headers" :key="header">
            <div class="headers-hover" >
                <div>
                    <router-link :to= header.path> {{header.name}}</router-link>
                </div>
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
                 {name:"חוברת חפיפה", path:'/dfdfd' },
                 {name:"בחנים", path:'/Exams' },
                 {name:"תרגול", path:'/Practice' }
             ]
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
    box-shadow: 5px 10px 15px #888888;
}
.home-title{
    margin-right: 90px;
    cursor: pointer;
    width: 43vw;
    text-align: right;
}
a{
    text-decoration: none;
    color: black;
    padding: 0 50px;
    
}
a.router-link-exact-active{
    text-decoration: none;
    color: green;
    padding: 0 50px;
}
.navbar-headers{
    list-style-type:none;
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
.headers-hover{
   display: flex;
   align-items: center;
   height: 80px;    
}
.headers-hover:hover{
    background-color: rgb(229,227,227);
}
.headers{
    display: flex;
    font-size: 20px;
    text-align: center;
}
@media (max-width: 1280px){
      .headers{
        font-size: 17px;
    }
    .home-title{
        width: 38vw;
        margin-right: 70px;
    }
    a{
        padding: 0 30px;
    }
    a.router-link-exact-active{
        padding: 0 30px;
    }
}
@media (max-width: 1024px) {
    .headers{
        font-size: 17px;
    }
    .home-title{
        width: 25vw;
        margin-right: 70px;
    }
}
</style>
