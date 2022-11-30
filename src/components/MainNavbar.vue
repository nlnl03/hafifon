<template>
<div class="navbar">
     <h1 class="home-title">חפיפה</h1>
    <ul class="navbar-headers" v-for="header in headers" :key="header">
        <li>
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
                 {name:"תרגול", path:'/Practice' },
                 {name:"בחנים", path:'/Exams' },
                 {name:"המבחן הסופי", path:'/FinalExam' },
                 {name:"האיזור האישי", path:'/User' }
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
    width: 55vw;
    text-align: right;
}
a{
    text-decoration: none;
    color: black;
    padding: 0 35px;
    
}
a.router-link-exact-active{
    text-decoration: none;
    color: green;
    padding: 0 35px;
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

@media (max-width: 1024px) {
    .header{
        font-size: 18px;
    }
    .home-title{
        width: 34vw;
        margin-right: 70px;
    }
}
</style>