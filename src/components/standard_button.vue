<template>
  <button @click.prevent="$emit('click')">
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
}
</style>