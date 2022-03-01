<template>
  <div class="card">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="image-cropper">
    <img src="https://placebeard.it/640x360" alt="John" style="width:100%" class="avatar2" >
    </div>
    <h2>Viking Dude</h2>
    <a href="#" class="fa fa-facebook"></a>
    <a href="#" class="fa fa-twitter"></a>
    <a href="#" class="fa fa-instagram"></a>

  </div>
</template>

<script>

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

.fa {
  padding: 20px;
  font-size: 30px;
  width: 30px;
  text-align: center;
  text-decoration: none;
  border-radius: 50%;
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