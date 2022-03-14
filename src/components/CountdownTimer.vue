<template>
  <div class="timer">
    <div class="counterdowner">
      <p id="timeleft">{{ timeString }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeLeft: Object,
  },
  computed: {
    timeString() {
      const minutes =
        this.timeLeft.minutes < 10
          ? "0" + this.timeLeft.minutes
          : this.timeLeft.minutes;
      const seconds =
        this.timeLeft.seconds < 10
          ? "0" + this.timeLeft.seconds
          : this.timeLeft.seconds;
      return minutes + ":" + seconds;
    },
  },
  data() {
    return {
      timeleft: 10,
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.countdown();
    }, 1000);
  },
  methods: {
    countdown() {
      this.timeleft--;
      if (this.timeleft == 0) {
        clearInterval(this.timer);
      }
    },
  },
};
</script>

<style scoped>
.timer {
  padding: 80px;
}
.counterdowner {
  text-size-adjust: 50px;
}
</style>