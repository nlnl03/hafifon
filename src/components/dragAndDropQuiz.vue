<template>
  <div class="drag-drop-box">
      <div class="options">
          <label class="option-items" v-for="(option,index) in Object.keys(question.dragOptions)" :key="index" :value="index+1" draggable="true">
              <input type="radio" >
                {{option}}
          </label>
      </div>
  </div>
</template>

<script>
export default {
    name:'dragAndDrop',
    props:{
        question:Array
    },
    data(){
        return{
            question:this.question
        }
    },
    methods:{
        dragStart(event,option){
            
        }
    },
    async beforeMount(){

    }
}
</script>

<style scoped>

.drag-drop-box{
    display: flex;
    justify-content: center;
    margin-top: 15px;
    /* border: 2px solid #ddd;
    padding: 20px;
    border-radius: 10px;
    background: #f9f9f9;
    position: relative;
    width: 40%;
    height: 500px;
    right: 50%;
    top: 20%;
    transform: translate(50%,20%);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); */
}
.options{
    display: flex;
    flex-direction: column;

}
.option-items{
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    cursor:move;
}
input{
    appearance: none;
}
</style>