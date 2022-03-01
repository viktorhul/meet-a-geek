<template>
  <div class="background">
  <div class="geekreview" >
    <h1>Geek Review</h1>
    <div>
      <UserCard></UserCard>
    </div>
    <br>
    <h2>Meet again? 1</h2>
    <div>
      <standard_button class="buttonStyle">YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Question 1</h5>
    <div>
      <standard_button>YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Question 2</h5>
    <div>
      <standard_button>YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Question 3</h5>
    <div>
      <standard_button>YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Question 4</h5>
    <div>
      <standard_button style="">YES </standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Question 5</h5>
    <div>
      <standard_button @click="onDone">SUBMIT</standard_button>
    </div>
    <br>
  </div>
  </div>
</template>

<script>
import standard_button from "@/components/standard_button";
import UserCard from "@/components/UserCard";
export default {
  name: "GeekReview",
  components: {standard_button,UserCard},
  methods: {
    onDone(){
      //Server push information...
      this.$router.push("/loading");
    },
    changeColorOnClick(){

    }

  }
}
</script>

<style scoped>

button:hover, a:hover {
  color: red;
}
</style>