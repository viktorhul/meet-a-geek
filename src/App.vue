<template>
  <div id="app">
    <div id="viewport">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      devOn: false,
    };
  },
};
</script>


<style>
.dev {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.devButton {
  display: block;
}

.devBox {
  min-height: 200px;
  border: 1px solid #ccc;
  background-color: #eee;
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

/* STYLE SHEET  */
/* #362706 */
/* #464E2E */
/* #ACB992 */
/* #ACB992 */
/* #E9E5D6  light */
html,
body {
  margin: 0;
  background-color: #e9e5d6;
}

#app {
  background-color: #e9e5d6;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2,
h3,
h4,
h5,
p {
  color: #362706;
}

#viewport {
  margin: 0 auto;
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

/* STYLE SHEET  */
/* #362706      Darkest */
/* #464E2E */
/* #ACB992 */
/* #E9E5D6  light */
</style>
