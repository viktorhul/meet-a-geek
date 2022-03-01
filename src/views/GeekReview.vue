<template>
  <div class="background">
  <div class="geekreview" >
    <h1>Geek Review</h1>
    <div>
      <UserCard></UserCard>
    </div>
    <br>
    <h2>Share your information to this geek?</h2>
    <div>
      <standard_button class="buttonStyle">YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Q1: Did the geek have sufficient carisma skill?</h5>
    <div>
      <standard_button>YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Q2: Did the geek have a satisfactory main programing language?</h5>
    <div>
      <standard_button>YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Q3: Did the geek have sufficient knowlege in Emacs shortcuts? </h5>
    <div>
      <standard_button>YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Q4: Did the geek seem to have showered in the last day?</h5>
    <div>
      <standard_button style="">YES </standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <h5>Q5: Did the geek behave, and look, in accordance with his profile?</h5>
    <div>
      <standard_button>YES</standard_button>
      <standard_button>NO</standard_button>
    </div>
    <br>
    <br>
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