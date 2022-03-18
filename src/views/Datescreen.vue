<template>
  <div>

    <header class="DateHeader" @click="nextDate()">
      Date: {{ user.session.current }} of {{ user.session.max }}
    </header>
    <div v-if="!partnerFound">Waiting for host...</div>

    <div v-else>
      <h1>MATCH FOUND!</h1>
      <!-- <UserProfileMatch /> -->
      <UserCard
        :picture="user.partner.picture"
        :fullname="user.partner.fullname"
        :location="user.partner.location"
      />

      <MoveToTable :tableNumber="user.table" v-if="!user.session.active" />
      <CountdownTimer :timeLeft="user.time" v-else />
    </div>
  </div>
</template>

<script>
import MoveToTable from "@/components/MoveToTable.vue";
import CountdownTimer from "@/components/CountdownTimer.vue";
import UserCard from "@/components/UserCard";
export default {
  created() {
    setInterval(() => {
      this.watchUser();
    }, 100);
  },
  data() {
    return {
      partnerFound: false,
      timer: {
        active: false,
      },
      user: {
        id: 0,
        username: "",
        fullname: "",
        gender: "",
        picture: "",
        location: "",
        table: 0,
        session: {
          participantCount: 0,
          active: false,
          completed: false,
          current: 1,
          max: 1,
        },
        partner: {
          picture: "",
          fullname: "",
          location: "",
        },
        time: {
          minutes: 0,
          seconds: 0,
        },
      },
    };
  },
  components: {
    UserCard,
    MoveToTable,
    CountdownTimer,
  },
  methods: {
    watchUser() {
      fetch(`http://localhost:3000/user/${this.$route.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.ok) this.$router.push("/");
          this.user = data.result;
          this.partnerFound = data.result.partner.fullname != "";

          if (this.user.session.completed && !this.user.ready) {
            this.$router.push(`/geekreview?id=${this.$route.query.id}`);
          }
        });
    },
  },
};
</script>

<style scoped>
</style>