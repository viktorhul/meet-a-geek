<template>
  <div>
    <header class="DateHeader">
      Admin Mode | Add Table | Status | Date session | Time Left 10:00
    </header>
    <div class="participantsBox" style="top: 300px">
      <h2>Cheats</h2>
      <button
        @click.prevent="addRemainingParticipants"
        :disabled="cheats.addRemaining"
      >
        Add remaining participants
      </button>
    </div>
    <div class="participantsBox" style="top: 600px">
      <h2>Participants ({{ participants.count }})</h2>
      <UserCard
        :key="p.id"
        v-for="p in participants.list"
        format="small"
        :fullname="p.fullname"
        :picture="p.picture"
        :location="p.location"
      />
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      cheats: {
        addRemaining: false,
      },
      participants: {
        count: 0,
        list: [],
      },
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
          if (data.ok) {
            this.participants.list = data.participants;
            this.participants.count = data.participants.length;
          }
        });
    },
    addRemainingParticipants() {
      fetch("http://localhost:3000/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "addRemaining",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.cheats.addRemaining = true;
          }
        });
    },
  },
};
</script>


<style scoped>
.participantsBox {
  position: absolute;
  width: 350px;
  border: 1px solid #ccc;
  background-color: #eee;
  left: 0;
  text-align: left;
  padding: 10px;
}
</style>