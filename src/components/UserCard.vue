<template>
  <div class="card">
    <div class="image-cropper">
      <img src="https://placebeard.it/640x360" alt="profile pic" class="avatar" >
    </div>
    <h2>Viking Dude</h2>
    <p class="title">Some cool anekdote or statement</p>
    <h4>Location:</h4>
    <p>Woods of sweden</p>
    <h3>Some other information...</h3>
    <p>Pretends to be a GamerGirls sometimes...</p>
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
  border-radius: 10%;
  margin: auto;
  text-align: center;
}
.avatar {

  vertical-align: middle;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 7px solid lightgray;
}

.title {
  color: grey;
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


</style>