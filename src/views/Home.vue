<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="https://www.icegif.com/wp-content/uploads/icegif-4790.gif"
    />
    <HelloWorld msg="Meet-a-Geek.com" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
