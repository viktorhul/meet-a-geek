<template>
  <div class="card">
    <br>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <img src="https://placebeard.it/640x360" alt="John" class="avatar2" style="margin: 0 auto" >
      <h3>Contact information:</h3>
      <div align="center">
        <h5 >Name:</h5>
        <h5>Email:</h5>
      </div>
    <br>
    <div>
      <h2>Socials:</h2>
      <div class="links">
        <a href="http://www.facebook.com" class="fa fa-facebook"></a>
        <a href="http://www.linkedin.com" class="fa fa-linkedin" ></a>
        <a href="http://www.twitter.com" class="fa fa-twitter"></a>
      </div>
    </div>
    <br>
  </div>
</template>

<script>

</script>

<style scoped>
.card {
  /* THIS NEED TO CHANGE */
  padding: 5px;
  background-color: #ACB992;
  box-shadow: 10px 10px 5px rgba(0,0,0,0.5);
  max-width: 300px;
  border-radius: 5%;
  margin: auto;
  text-align: center;
}
.avatar2 {

  vertical-align: middle;

  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 7px solid ;
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
  color: #362706;
}

/* Twitter */
.fa-twitter {
  color: #362706;
}
/* Linked in */
.fa-linkedin {
  color: #362706;
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