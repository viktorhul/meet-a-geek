<template>
<div class="geekreview">
  <h1>Geek Review</h1>
  <div>
   <randomprofile></randomprofile>
  </div>
  <br>
    <h2>Meet again? 1</h2>
    <div>
      <standard_button></standard_button>
      <standard_button></standard_button>
    </div>
    <br>
    <h5>Question 1</h5>
    <div>
      <standard_button></standard_button>
    </div>
    <br>
    <h5>Question 2</h5>
    <div>
      <standard_button></standard_button>
    </div>
    <br>
    <h5>Question 3</h5>
    <div>
      <standard_button></standard_button>
    </div>
    <br>
    <h5>Question 4</h5>
    <div>
      <standard_button></standard_button>
    </div>
    <br>
    <h5>Question 5</h5>
    <div>
      <standard_button></standard_button>
    </div>
    <br>
  </div>

</template>

<script>
import standard_button from "@/components/standard_button";
import randomprofile from "@/components/randomprofile";
export default {
  name: "GeekReview",
  components: {standard_button,randomprofile}
}
</script>

<style scoped>

</style>