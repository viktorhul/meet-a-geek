<template>
<div>
    <header class="DateHeader" @click="nextDate()">Date: {{DateNr}}</header>
    <h1>MATCH FOUND!</h1>
    <!-- <UserProfileMatch /> -->
    <randomprofile />

    <MoveToTable @TableClicked="startTimer()" v-if="DateRun === false"/>
    <CountdownTimer v-else/>
</div>
</template>

<script>
import MoveToTable from "@/components/MoveToTable.vue";
import CountdownTimer from "@/components/CountdownTimer.vue"
import randomprofile from "@/components/randomprofile.vue"
export default{
    data(){
        return{
            DateNr: 1,     //The index of date
            DateRun: false  //Boolean to start timer
        }
    },
    components:{
        MoveToTable,
        CountdownTimer,
        randomprofile,
    },
    methods:{
  
        
        nextDate(){
            this.DateNr += 1;
            
        },
        startTimer(){
            this.DateRun = !this.DateRun;
            console.log(this.DateRun);
        }
    }
    
}
</script>

<style scoped>

</style>