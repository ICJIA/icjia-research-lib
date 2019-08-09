<template>
  <v-sheet
    :elevation="2"
    :class="view ? 'mb-12' : 'ma-6'"
    :color="external ? 'rgb(255, 252, 245)' : ''"
  >
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  props: {
    view: {
      type: Boolean,
      default: false
    },
    external: {
      type: Boolean,
      default: false
    }
  }
}
</script>
