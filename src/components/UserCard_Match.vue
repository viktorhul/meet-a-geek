<template>
  <div class="card">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <img src="https://placebeard.it/640x360" alt="John" style="width:100%" class="avatar2" >
      <h2>Contact information:</h2>
      <div align="left">
        <h5 >Name: Viking Dude</h5>
        <h5>Email: Viking.Dude@solaris.com</h5>
        <h5>Phone: 112</h5>
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
  background-color: #ACB992;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  border-radius: 10%;
  margin: auto;
  text-align: center;
}
.avatar2 {

  vertical-align: middle;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 7px solid lightgray;
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