<template>
  <div class="card">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="image-cropper">
    <img src="https://placebeard.it/640x360" alt="John" style="width:100%" class="avatar2" >
    </div>
    <h2>Viking Dude</h2>
    <div class="links">
    <a href="#" class="fa fa-facebook" @click="facebook"></a>
    <a href="#" class="fa fa-linkedin" @click="lin"></a>
    <a href="#" class="fa fa-twitter" @click="twitter"></a>
  </div>
    <br>

  </div>
</template>

<script>
export default {
methods: {
    facebook() {
      //Server push information...
      this.$router.push("/loading");

    },
    instagram() {
      //Server push information...
      this.$router.push("/loading");

    },
    twitter() {
      //Server push information...
      this.$router.push("/loading");

    }
  }
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

/* Style all font awesome icons */
.fa {
  padding: 20px;
  font-size: 30px;
  width: 50px;
  text-align: center;
  text-decoration: none;
}

/* Add a hover effect if you want */
.fa:hover {
  opacity: 0.7;
}

/* Set a specific color for each brand */

/* Facebook */
.fa-facebook {
  background: #3B5998;
  color: white;
}

/* Twitter */
.fa-twitter {
  background: #55ACEE;
  color: white;
}
/* Linked in */
.fa-linkedin {
  background: #007bb5;
  color: white;
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