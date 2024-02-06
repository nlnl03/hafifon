<template>
  <div class="title">המבחן הוגש בהצלחה</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.title{
    position: absolute;
    font-size: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    top:40%;
    right: 50%;
    transform: translateX(50%);
 }
.title::after{
    content: '✔';
    margin-right: 30px;
    color: green;
    font-size: 60px;
}
</style>