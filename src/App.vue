<template>
  <div id="app">
    <div class="devBox">
      <h2>Bigboy Links</h2>
      <ul>
        <li><router-link to="/">Login</router-link></li>
        <li><router-link to="/eventid">EventID</router-link></li>
        <li><router-link to="/endscreen">Endscreen</router-link></li>
        <li><router-link to="/Datescreen">Datescreen</router-link></li>
        <li><router-link to="/Admin">Admin</router-link></li>
        <li><router-link to=""></router-link></li>
        <li><router-link to=""></router-link></li>
        <li><router-link to="geekreview">geekreview</router-link></li>


      </ul>
    </div>
    <router-view />
  </div>
</template>

<style>
.devBox {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  background-color: #eee;
  top: 0;
  left: 0;
  text-align: left;
  padding: 10px;
}

.devBox h2 {
  font-size: 12pt;
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 500px;
  margin: 50px auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
