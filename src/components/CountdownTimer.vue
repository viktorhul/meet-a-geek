<template>
<div>
    <p id="timeleft" v-if="timeleft > 0">{{timeleft}}</p>
    <p style="font-weight:bold;" v-else>Times up</p>
</div>
</template>

<script>


export default{
    data() {
        return {
            timeleft: 10,
            timer: null,

        }
    },
    created(){

        this.timer= setInterval(() =>{
            this.countdown()

        },1000)
    },
     methods:{
         countdown(){
             this.timeleft --;
            if(this.timeleft == 0){
                clearInterval(this.timer);
            }
         }
     } 
}
</script>
