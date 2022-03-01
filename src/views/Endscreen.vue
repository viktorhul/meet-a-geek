<template>
  <div class="EventOverTitle">
    <h1>Event Over!</h1>
    <h2>Matches:</h2>
    <UserCard_Match />
    <br>
    <UserCard_Match />
    <br>
    <UserCard_Match />
    <br>
  </div>
</template>

<script>
import UserCard_Match from "@/components/UserCard_Match.vue";

export default{
    components:{
        UserCard_Match,
    }
    
}
</script>
