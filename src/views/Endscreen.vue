<template>
  <div class="EventOverTitle">
    <h1>Event Over!</h1>
    <h2>Matches:</h2>
    <UserCard
      :key="date.id"
      v-for="date in dates"
      format="small"
      style="width: 100%"
      success="date.success"
      :fullname="date.fullname"
    />
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
      dates: [
        { id: 0, fullname: "Bigboy Bengtsson", success: true },
        { id: 1, fullname: "Jonas Björk", success: false },
        { id: 2, fullname: "Janneman", success: true },
      ],
    };
  },
  created() {
    fetch(`http://localhost:3000/user/${this.$route.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log(data.result.setup);
        }
        //this.dates = res.users;
      });
  },
};
</script>

<style scoped>
.EventOverTitle {
  width: 500px;
  margin: auto;
  padding-top: 50px;
}
</style>
