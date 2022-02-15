<template>
  <button @click.prevent="$emit('click')" :disabled="disable">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
    background: {
      type: String,
    },
    disable: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
button {
  /* background-color: blue; */
}
</style>
