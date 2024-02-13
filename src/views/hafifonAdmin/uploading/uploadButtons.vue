<template>
  <div class="flex-buttons">
    <div class="files-upload" v-for="upload in uploadingSub" :key="upload">
      <button class="open-modal" @click="opendialog">{{ upload.label }}</button>
    </div>
  </div>

  <q-dialog v-model="dialogVisible" class="custom-dialog" persistent  >
    <q-card style="width: 550px; height:400px" >
      <q-card-section class="close-modal" >
        <q-icon @click="colseDialog" style="cursor:pointer"  name="fad fa-times-circle" size="30px"  /> 
      </q-card-section>
       
      <q-card-section>
        <uploadForm />
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script>
  import uploadForm from "@/components/uploadForm.vue";
  import {useRouter} from 'vue-router'
  import { createApp } from "vue";
  export default {
    components: {
      uploadForm
    },
    data() {
      return {
        uploadingSub: [
          {
            label: "העלאת מצגות",
            title: "filesUpload"
          },
          {
            label: "העלאת תרגולים",
            title: "pracUpload"
          },
          {
            label: "העלאת בחנים ומבחנים",
            title: "examsUpload"
          }
        ],
        vm: null,
        dialogVisible:false
      };
    },

    beforeMount() {
      // const app = createApp(uploadForm);
      // this.vm = app.mount(document.createElement("div"));
    },

    methods: {
      openModel(title) {
        this.$router.push({path:'/admin/uploadButtons', query: {title}})
         
        this.$swal({
          html: vm.$el,
          
        })
      },
          opendialog(){
          this.dialogVisible = true
          console.log(this.dialogVisible)
        },
        colseDialog(){
          this.dialogVisible = false
        }
    },
    
  };
</script>

<style scoped>
  .flex-buttons {
    display: flex;
    justify-content: center;
    margin-top: 200px;
  }
  .files-upload,
  .prac-upload,
  .exams-upload {
    margin: 0 10px;
    background: rgb(173, 173, 173);
    width: 165px;
    height: 90px;
    border-radius: 15px;
    padding: 0.8em;
  }
  button[class="open-modal"] {
    background: rgb(173, 173, 173);
    cursor: pointer;
    color: black;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    border: none;
  }

  .custom-dialog{
    width: 400px;
  }
   .close-modal{
    display: flex;
    justify-content: flex-end;
   }
 </style>
