<template>
   <h1>תרגולים</h1>
   <div class="text-under-line"></div>
   <div class="container-cards">
    <div class="flex-cards">
      <div class="items" v-for="practice in practices" :key="practice">
        <router-link class="router-text" :to="{name:'title', params:{practices:JSON.stringify(practice),title:practice.routerTitle}}">
          <img class="image-of-items" :src="require(`@/assets/${practice.image}`)">
            <h4 class="text">
                {{practice.subject}}
            </h4>
        </router-link>
      </div>
    </div>
  </div>
   
</template>

<script>
import Practice from './Practice.vue'
import axios from 'axios'
export default {
  name:"PracticeInfo",
  components:{
    Practice
  },
  data(){
    return{
      practices:[],
      
     }
  },
  async beforeMount(){
    const res = await axios.get('http://localhost:3000/practice')
    this.practices = res.data.value
    console.log(this.practices)
   }
}
</script>

<style scoped>
h1{
    font-size: 60px;
    text-align: center;
    color: var(--main-background-color);
    position: relative;
    margin-bottom: 50px;
    top: 30px;
}
.text-under-line{
    position: relative;
    top: -5px;
    width: 130px;
    height: 2px;
    background-color: var(--main-background-color);
    margin: 0 auto;

}
.container-cards{
    margin-top: 100px;
    width: 1300px;
    margin-left: auto;
    margin-right: auto;
}
.flex-cards{
    position: relative;
    flex-wrap: wrap;
    right:140px;
    display: flex;
    justify-content: flex-start;

}
.items{
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    vertical-align: middle;
    position: relative;
    height: 380px;
    width: 290px;
    margin-left: 4vw;
     margin-bottom: 7vh;
    border: none;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
    border-radius: 10px;
    transition: all .2s ease-in-out;
}
.items:hover{
  transform:translateY(-5%);
  box-shadow: 0px 15px 30px 0px rgba(0,0,0,.2);

}
/* .items:nth-child(5n-4){
  margin-right: 0;
 } */
 h4{
   font-size: 25px;
   padding: 10px;
   position: relative;
    color: black;
  text-align: center;

 }
 .router-text{
   text-decoration: none;
   height: 100%;
   width: 100%;
 }
 .image-of-items{
  width: 100%;
  height: 70%;
   }
</style>