<template>
  <div v-if="waitingForCompletion">
    <h1>Waiting for geeks...</h1>
    <progress :value="parts.complete" :max="parts.max"></progress>
    <p>{{ parts.complete }} / {{ parts.max }}</p>
  </div>
  <div v-else>
    <h1>All geeks are ready!</h1>
    <p>Waiting for host to start the session...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      waitingForCompletion: true,
      parts: {
        max: 20,
        complete: 1,
      },
      loadingTimer: null,
    };
  },
  created() {
    this.loadingTimer = setInterval(() => {
      this.watchUsers();
      if (this.parts.complete == this.parts.max) {
        clearInterval(this.loadingTimer);
        this.waitingForCompletion = false;
      }
    }, 100);
  },
  methods: {
    watchUsers() {
      fetch("http://localhost:3000/participants?count")
        .then((res) => res.json())
        .then((data) => {
          this.parts.complete = data.count;
        });
    },
  },
};
</script>

<style scoped>
.loader {
  width: 100%;
  background-color: lightgrey;
}

.loadingBar {
  height: auto;
  position: absolute;
  width: 100px;
  background: green;
}
</style>