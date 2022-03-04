<template>
<div class = "timer">
    <div class = "counterdowner">
    <p id="timeleft" v-if="timeleft > 0">{{timeleft}}</p>
    
    
    
    </div>
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

<style scoped>
.timer{
    padding: 80px;
}
.counterdowner{
    text-size-adjust: 50px;
}
</style>