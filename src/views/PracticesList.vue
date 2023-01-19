<template>
   <h1>תרגולים</h1>
   <div class="text-under-line"></div>
   <div class="container-cards">
    <div class="flex-cards">
      <div class="items" v-for="practice in practices" :key="practice">
        <router-link class="router-text" :to="{name:'beforeEnterQuiz', params:{practices:JSON.stringify(practice),title:practice.Title}}">
          <img class="image-of-items" :src="require(`@/assets/${practice.Img}`)">
          <div class="inner-flex">
            <h4 class="text">
                {{practice.Subject}}
            </h4>
            <span class="num-of-que">מספר שאלות: {{practice.numOfQue}}</span>
            </div>
        </router-link>
      </div>
    </div>
  </div>
   
</template>

<script>
import beforeEnterQuiz from './beforeEnterQuiz.vue'
import axios from 'axios'
export default {
  name:"PracticesList",
  components:{
    beforeEnterQuiz
  },
  data(){
    return{
      practices:[],
      url: process.env.NODE_ENV =='development'? 'http://localhost:3000/practice':"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('tirgulim')/Items",
     }
  },
  async beforeMount(){
    const res = await axios.get(this.url)
    this.practices = res.data.value
    console.log(this.practices)
    
    }
}
</script>

<style scoped>
.inner-flex{
  display:flex;
  height: 40%;
  flex-direction:column;
  justify-content: space-between; 
  align-items: center;
}
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
    width: 1180px;
    margin-left: auto;
    margin-right: auto;
 }
.flex-cards{
    position: relative;
    flex-wrap: wrap;
    right:80px;
    display: flex;
    justify-content: flex-start;
    width: 95%;

}
.items{
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    vertical-align: middle;
    position: relative;
    height: 390px;
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
 h4{
   font-size: 25px;
   padding: 10px;
   position: relative;
    color: black;
  text-align: center;
 }
 .num-of-que{
    font-size:22px;
    margin-bottom: 30px;
    display: inline-block;
    color:#666;
 }
 .router-text{
   text-decoration: none;
   height: 100%;
   width: 100%;
 }
 .image-of-items{
  width: 100%;
  height: 60%;
   }
</style>