<template>
  <div class="EventId">
    <h1>Lets Match</h1>
    <h3>Event ID</h3>
     <!-- <input type="text" id="username" name="username" maxlength="10"><br><br> -->
    <input v-model="id" placeholder="_ _ _ _" maxlength="4" minlength="4"/>
    <br /><br />
    <button @click="goToNext()" disabled=true>OK</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToNext() {
      //Explain pls
      this.$router.push('/about');
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
