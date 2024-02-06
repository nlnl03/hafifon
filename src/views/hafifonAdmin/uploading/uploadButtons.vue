<template>
  <div class="flex-buttons">
    <div class="files-upload" v-for="upload in uploadingSub" :key="upload">
      <router-link :to="{name:'uploadForm', params:{title:upload.title}}">{{upload.label}}</router-link>

    </div>
    <!-- <div class="prac-upload">
      <router-link to=""></router-link>

    </div>
    <div class="exams-upload">
      <router-link to=""></router-link>

    </div> -->
  </div>
</template>

<script>
  export default {
    data(){
      return{
        uploadingSub:[
          {
            label:"העלאת מצגות",
            title:"filesUpload"
          },
          {
            label:"העלאת תרגולים",
            title:"pracUpload"
          },
          {
            label:"העלאת בחנים ומבחנים",
            title:"examsUpload"
          }
        ]
      }
    }
  };
</script>

<style scoped>
  .flex-buttons{
    display: flex;
    justify-content: center;
    margin-top: 200px;
  }
  .files-upload, .prac-upload, .exams-upload{
    margin: 0 10px;
    background: rgb(173, 173, 173);
    width: 165px;
    height: 90px;
    border-radius: 15px;
    padding: 0.8em;
   }
  a{
    text-decoration: none;
    color: black;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;

   }
</style>
