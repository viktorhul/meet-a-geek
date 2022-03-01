<template>
<div>
    <header class="DateHeader" @click="nextDate()">Date: {{DateNr}}</header>
    <h1>MATCH FOUND!</h1>
    <!-- <UserProfileMatch /> -->
 eventidFunc
    <UserCard />
main

    <MoveToTable @TableClicked="startTimer()" v-if="DateRun === false"/>
    <CountdownTimer v-else/>
</div>
</template>

<script>
import MoveToTable from "@/components/MoveToTable.vue";
import CountdownTimer from "@/components/CountdownTimer.vue"
eventidFunc
import UserCard from "@/components/UserCard";
main
export default{
    data(){
        return{
            DateNr: 1,     //The index of date
            DateRun: false  //Boolean to start timer
        }
    },
    components:{
        UserCard,
        MoveToTable,
        CountdownTimer,
main
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