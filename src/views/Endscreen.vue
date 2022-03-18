<template>
  <div class="EventOverTitle">
    <h1>Event Over!</h1>
    <h2>Matches:</h2>
    <UserCard
      :key="date.id"
      v-for="date in dates"
      format="small"
      style="width: 90%; margin: auto"
      success="date.success"
      :fullname="date.fullname"
      :picture="date.picture"
      :location="date.location"
      :accepted="date.share"
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
      dates: [],
    };
  },
  created() {
    const userId = this.$route.query.id;
    fetch(`http://localhost:3000/user/${this.$route.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          const setups = data.result.setup.map((s) => s.p2);
          console.log(setups);

          setups.forEach((s) => {
            fetch(`http://localhost:3000/user/${s}`)
              .then((res) => res.json())
              .then((set) => {
                const otherShare =
                  set.result.setup.find((f) => f.p2 == userId).rating == 1;
                const userShare =
                  data.result.setup.find((f) => f.p2 == s).rating == 1;
                const match = otherShare && userShare;

                console.log(`User ${s}: ${otherShare}`);
                console.log(`User ${data.result.id}: ${userShare}`);

                const p = {
                  fullname: set.result.fullname,
                  picture: set.result.picture,
                  location: set.result.location,
                  share: match,
                };
                this.dates.push(p);
              });
          });
        }
        //this.dates = res.users;
      });
  },
};
</script>

<style scoped>
h1 {
  border-bottom: 2px solid #ccc;
}
.EventOverTitle {
  max-width: 500px;
  margin: auto;
  padding-top: 50px;
}
</style>
