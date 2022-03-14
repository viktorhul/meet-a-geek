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
    <div v-if="wrongPassword" style="color: red"><p>Invalid ID</p></div>
    <div v-else>
      <p><br /></p>
    </div>
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
    async clickAction() {
      if (await this.checkIfValidId(this.id)) {
        this.$router.push("/Loading");
      }
      this.wrongPassword = true;
      setTimeout(() => {
        this.wrongPassword = false;
        this.id = "";
        true;
      }, 1000);
    },
    checkLength() {
      console.log(this.id.length);
      return (this.validInputData = this.id.length > 3);
    },
    async checkIfValidId(id) {
      const api = await fetch(`http://localhost:3000/auth/event_id/${id}`);
      const r = await api.json();

      return r.access;
      //return id === "LOVE";
    },
  },
  data() {
    return { validInputData: false, wrongPassword: false, id: "" };
  },
};
</script>

<style scoped>
.EventId {
  padding-top: 50px;
}

input {
  text-align: center;
  width: 4em;
}
</style>
