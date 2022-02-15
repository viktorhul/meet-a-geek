<template>
  <div class="EventId">
    <h1>Lets Match</h1>
    <h3>Event ID</h3>
    <!-- <input type="text" id="username" name="username" maxlength="10"><br><br> -->
    <input
      @keyup="checkLength"
      v-model="id"
      placeholder="_ _ _ _"
      maxlength="4"
      minlength="4"
    />
    <br /><br />
    <standard_button @click="clickAction" :disable="!validInputData">Login</standard_button>
  </div>
</template>

<script>
import standard_button from "@/components/standard_button";
export default {
  components: {
    standard_button,
  },
  methods: {
    clickAction() {
      //Explain pls
      this.$router.push("/endscreen");
    },
    checkLength() {
      console.log(this.id.length);
      return (this.validInputData = this.id.length > 3);
      // if (this.id.length>2){
      //   this.validInputData="true";
      // }
    },
  },
  data() {
    return { validInputData: false, id: "" };
  },
};
</script>

<style scoped>
input {
  text-align: center;
  width: 4em;
}
</style>
