<template>
  <div>
    <header class="DateHeader">
      Admin Mode | Add Table | Status | Date session | Time Left 10:00
    </header>
    <div class="participantsBox">
      <h2>Participants</h2>
      <ul>
        <li :key="p.id" v-for="p in participants">{{ p.fullname }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participants: [],
    };
  },
  created() {
    const checkTimer = setInterval(() => {
      this.checkUsers();
    }, 1000);
    checkTimer;
  },
  methods: {
    checkUsers() {
      fetch("http://localhost:3000/participants")
        .then((res) => res.json())
        .then((data) => {
          if (data["ok"]) {
            this.participants = data.participants;
          }
        });
    },
  },
};
</script>


<style scoped>
.participantsBox {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  background-color: #eee;
  top: 40%;
  left: 0;
  text-align: left;
  padding: 10px;
}
</style>