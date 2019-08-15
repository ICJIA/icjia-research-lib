<template>
  <v-sheet :elevation="2" :color="external ? 'rgb(255, 252, 245)' : ''">
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  props: {
    external: {
      type: Boolean,
      default: false
    }
  }
}
</script>
