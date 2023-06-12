<template>
  <div v-if="!isLoad">00:00:00</div>
  <div v-if="isLoad">{{fullTimer}}</div>
</template>

<script>
export default {
    name:'timer',
    props:{
        totalTime:{
            type:Number,
            required:true
        } 
    },
    data(){
        return{
            timer:null,
            hours:0,
            minutes:0,
            seconds:0,
            timeRemaining:this.totalTime,
            fullTimer:null,
            isLoad:false
        }
    },

    mounted(){
        this.startTimer()    
    },
    methods:{
        startTimer(){
            this.timer = setInterval(()=>{
                this.updateTimer();
            },1000)
        },
        updateTimer(){
            // console.log(this.timeRemaining)
            if(this.timeRemaining > 0){
                this.hours = Math.floor(this.timeRemaining / 3600)
                 var x = this.timeRemaining % 3600
                this.minutes = Math.floor(x / 60)
                this.seconds = Math.floor(x % 60)
                const formattedHours = this.addZeroBefore(this.hours)
                const formattedMinutes = this.addZeroBefore(this.minutes)
                const formattedSeconds = this.addZeroBefore(this.seconds)
                this.fullTimer = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
                this.isLoad = true
                this.timeRemaining--
             }
            else{
                clearInterval(this.timer)
                this.timerEnded()
            }
        },
        timerEnded(){
            console.log("time is end")
        },
        addZeroBefore(value){
            return value < 10 ?`0${value}` : value
        }
    },
    beforeDestroy(){
        clearInterval(this.timer)
    }
}
    
</script>

<style scoped>
</style>