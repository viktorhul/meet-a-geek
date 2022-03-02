<template>
  <div class="card card-big" v-if="format == 'big'">
    <br />
    <div class="image-cropper">
      <img :src="picture" alt="profile pic" class="avatar avatar-big" />
    </div>
    <h2>{{ fullname }}</h2>
    <p class="title">{{ statement }}</p>
    <h4>Location:</h4>
    <p>{{ location }}</p>
    <h3>{{ other }}</h3>
    <p>{{ secret }}</p>
  </div>

  <div v-else-if="format == 'small'" class="card card-small">
    <div class="profileContainer">
      <img :src="picture" class="avatar avatar-small" />
    </div>
    <div class="textbox">
      <h3>{{ fullname }}</h3>
      <p>{{ location }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    picture: {
      type: String,
      default: "https://placebeard.it/640x360",
    },
    fullname: {
      type: String,
      default: "Viking Dude",
    },
    statement: {
      type: String,
      default: "Some cool anekdote or statement",
    },
    location: {
      type: String,
      default: "Woods of sweden",
    },
    other: {
      type: String,
      default: "Some other information...",
    },
    secret: {
      type: String,
      default: "Pretends to be a GamerGirls sometimes...",
    },
    format: {
      type: String,
      default: "big",
    },
  },
};
</script>

<style scoped>
.card {
  /* THIS NEED TO CHANGE */
  background-color: #acb992;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
}

.card-big {
  border-radius: 10%;
  margin: auto;
  text-align: center;
}

.card-small {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
}

.card-small .textbox {
  text-align: left;
  height: 100%;
  margin-left: 10px;
}

.textbox h3 {
  margin: 0;
  font-size: 16pt;
  font-weight: bold;
}

.textbox p {
  margin: 0;
}

.profileContainer {
  height: 100%;
  align-content: center;
}

.avatar {
  vertical-align: middle;
  border-radius: 50%;
}

.avatar-big {
  width: 150px;
  height: 150px;
  border: 7px solid lightgray;
}

.avatar-small {
  width: 50px;
  height: 50px;
  border: 2px solid lightgray;
}

.title {
  /* color: grey; */
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

button:hover,
a:hover {
  opacity: 0.7;
}
</style>