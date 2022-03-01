<template>
  <div class="EventId">
    <h1>Lets Match</h1>
    <h3>Event ID</h3>
    <input
      id="inputthing"
      @keyup="checkLength"
      v-model="id"
      placeholder="_ _ _ _"
      maxlength="4"
      minlength="4"
    />
    <div v-if="wrongPassword" style="color: red;"><p>Invalid ID</p></div>
    <div v-else><p><br></p></div>
    <standard_button @click="clickAction" :disable="!validInputData"
      >Login</standard_button
    >
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
      if (this.checkIfValidId(this.id)) {
        this.$router.push("/Loading");
      }
this.wrongPassword = true;
      setTimeout(() => {
        this.wrongPassword= false; this.id = "";true
      }, 1000);
      console.log("TITTA HIT");
      //this.wrongPassword = false;
      // this.id=""
    },
    checkLength() {
      console.log(this.id.length);
      return (this.validInputData = this.id.length > 3);
    },
    checkIfValidId(id) {
      return id === "LOVE";
    },
  },
  data() {
    return { validInputData: false, wrongPassword: false, id: "" };
  },
};
</script>

<style scoped>
input {
  text-align: center;
  width: 4em;
}
</style>
