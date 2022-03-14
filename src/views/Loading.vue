<template>
  <div class="box">
    <div>
      <h1>Waiting for geeks...</h1>
      <progress
        :value="participants.complete"
        :max="participants.max"
      ></progress>
      <p>{{ participants.complete }} / {{ participants.max }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigated: false,
      participants: {
        max: 20,
        complete: 1,
      },
      loadingTimer: null,
    };
  },
  created() {
    this.loadingTimer = setInterval(() => {
      this.watchUsers();
    }, 100);
  },
  methods: {
    watchUsers() {
      fetch(`http://localhost:3000/user/${this.$route.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            const res = data.result;
            this.participants.complete = res.session.participantCount;

            if (this.participants.complete == 20 && !this.navigated) {
              this.navigated = true;
              this.$router.push(`/datescreen?id=${this.$route.query.id}`);
            }
          } else {
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style scoped>
.box {
  padding-top: 50px;
}

progress {
  transition-duration: 0.2s;
}

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