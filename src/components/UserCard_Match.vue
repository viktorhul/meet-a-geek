<template>
  <div class="card">
    <div class="image-cropper">
    <img src="https://placebeard.it/640x360" alt="John" style="width:100%" class="avatar2" >
    </div>
    <h2>Viking Dude</h2>

  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  border-radius: 5%;
  margin: auto;
  text-align: center;
}

.title {
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}

.avatar2 {
  padding-top: 3px;
  size: auto;
  border-radius: 5%;
  border: 2px;
}


</style>