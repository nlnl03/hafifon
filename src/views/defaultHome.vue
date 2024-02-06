<template>
  <div class="gray-line">
    <img src="../assets/383.png" alt="" />

  </div>

  <div class="background-img">
    <div class="text">ברוכים הבאים לאתר חפיפה</div> 
    <div class="flex">
      <div class="btns">
        <button class="btn1" >אגם</button> 
        <button class="btn2">הפתק</button> 
        <button class="btn3"  >ת. מטכל</button>
        <button @click="btnClick" class="btn4">שוב</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      btnClick(){
        this.$router.push({name: "HomePage"})
      }
    }
  };
</script>

<style scoped>
  img {
    width: 150px;
    height: 200px;
    margin-top: 40px;
  }
  .image {
    text-align: center;
   }
  body {
    overflow: hidden;
  }

  .background-img {
    background-image: url("../assets/homePageBackground.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: calc(100vh - 180px);
  }
  .gray-line{
    background: linear-gradient(to top,rgba(128, 128, 128, 0.244), #dddddd) ;
    /* background-color: rgba(128, 128, 128, 0.244); */
    box-shadow: 0 4px 8px rgba(0,0,0,0.5);
    width: 100%;
    height: 180px;
    margin-top: 0;
    text-align: center;
 
  }
  .flex{
    width: 100%;
    justify-content: center;

  }
  .btns{
    margin-top: 200px;

  }
  button{
    width: 190px;
    height: 110px;
    margin: 0 25px;
    border: none;
    border-radius: 15px;
    font-size: 25px;
    cursor: pointer;
    color: white;
  }

  .text{
    width: 100%;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    position: relative;
    top: 110px;
  }

  .btn1{background-color: rgba(213, 213, 30, 0.822);}
  .btn1:hover{
    background-color: rgba(213, 213, 30, 0.545);
  }

  .btn2{background-color:rgba(79, 182, 79, 0.887)}
  .btn2:hover{
    background-color:rgba(89, 191, 89, 0.862)
  }

  .btn3{background-color:rgba(231, 77, 77, 0.979)}
  .btn3:hover{
    background-color:rgba(220, 104, 104, 0.902)
  }

  .btn4{background-color:var(--main-background-color)}
  .btn4:hover{
    background-color:#62bdbfd2
  }
</style>
