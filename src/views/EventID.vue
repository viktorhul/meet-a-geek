<template>
  <div class="EventId">
    <h1>Lets Match</h1>
    <h3>Event ID</h3>
    <!-- <input type="text" id="username" name="username" maxlength="10"><br><br> -->
    <input v-model="id" placeholder="_ _ _ _" maxlength="4" minlength="4" />
    <br /><br />
    <standard_button @click="clickAction">Login</standard_button>
  </div>
</template>

<script>
import standard_button from "@/components/standard_button";
export default {
  components:{
    standard_button
  },
  methods: {
    clickAction() {
      //Explain pls
      this.$router.push('/endscreen');
    },
  },
};
</script>

<style scoped>
input {
  text-align: center;
  width: 4em;
}
</style>
