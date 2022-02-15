<template>
<div>
    <header class="DateHeader"> Date 1</header>
    <h1>MATCH FOUND!</h1>
    <UserProfileMatch />
    <MoveToTable />
</div>
</template>

<script>
import UserProfileMatch from "@/components/UserProfileMatch.vue";
import MoveToTable from "@/components/MoveToTable.vue";
export default{
    components:{
        UserProfileMatch,
        MoveToTable,
    }
    
}
</script>

<style scoped>
.DateHeader{
    
}
</style>