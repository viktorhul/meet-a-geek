<template>
  <div>
    <h2>MOVE TO</h2>
    <div class="tableContainer">
      <h3 @click="$emit('TableClicked')">TABLE {{ tableNumber }}</h3>
    </div>
    <br /><br />
    <h4>WAITING FOR HOST</h4>
  </div>
</template>

<script>
export default {
  props: {
    tableNumber: Number,
  },
};
</script>


<style scoped>
.tableContainer {
  margin: auto;
  padding: 10px;
  border-style: solid;
  width: 150px;
  position: relative;
}
.h3 {
  size: 80%;
}
</style>