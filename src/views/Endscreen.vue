<template>
  <div class="EventOverTitle">
    <h1>Event Over!</h1>
    <h2>Matches:</h2>
    <UserCard />
    <br>
    <UserCard />
    <br>
    <UserCard />
    <br>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";

export default{
    components:{
        UserCard,
    }
    
}
</script>
