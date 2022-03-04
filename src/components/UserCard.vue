<template>
  <div
    class="card card-big"
    :class="{ 'card-active': active }"
    v-if="format == 'big'"
  >
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

  <div
    v-else-if="format == 'small'"
    class="card card-small"
    :class="{ hoverable: hoverable, 'card-active': active }"
    :draggable="draggable"
  >
    <div class="profileContainer">
      <img :src="picture" class="avatar avatar-small" />
    </div>
    <div class="textbox">
      <h3>{{ fullname }}</h3>
      <p>{{ location }}</p>
    </div>
  </div>

  <div
    v-else-if="format == 'placeholder'"
    class="card card-inactive card-small"
  >
    <div class="profileContainer">
      <div class="avatar avatar-small avatar-placeholder"></div>
    </div>
    <div class="textbox" style="line-height: 250%">
      <i style="color: #aaa">Empty seat</i>
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
    hoverable: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.card-active {
  /* THIS NEED TO CHANGE */
  background-color: #acb992;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.card-inactive {
  display: flex;
  flex-direction: row;
  background-color: #ddd;
  user-select: none;
}

.card {
  width: 250px;
  padding: 10px;
}

.card + .card {
  margin-top: 10px;
}

.card-big {
  border-radius: 10px;
  box-shadow: 10px 10px 5px rgba(0,0,0,0.5);

  margin: auto;
  text-align: center;
}

.card-big h3 {
  font-size: 16pt;
}

.card-small {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  height: 60px;
}

.hoverable {
  user-select: none;
  transition-duration: 0.3s;
}

.hoverable:hover {
  cursor: pointer;
  border: 1px solid #a8b397;
  background-color: #ccd8b7;
  transition-duration: 0.2s;
}

.card-small h3,
.card-small p {
  font-size: 10pt;
}

.textbox {
  text-align: left;
  height: 100%;
  margin-left: 10px;
}

.textbox h3 {
  margin: 0;
  font-weight: bold;
}

.textbox p {
  margin: 0;
  text-overflow: ellipsis;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
}

.profileContainer {
  height: 100%;
  align-content: center;
}

.avatar {
  display: block;
  margin: auto;
  border-radius: 50%;
}

.avatar-placeholder {
  background-color: lightgray;
}

.avatar-big {
  width: 150px;
  height: 150px;
  border: 7px solid lightgray;
}

.avatar-small {
  width: 35px;
  height: 35px;
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