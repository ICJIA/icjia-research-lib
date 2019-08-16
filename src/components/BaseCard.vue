<template>
  <v-sheet :elevation="2" :color="color">
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  props: {
    external: {
      type: Boolean,
      default: false
    },
    project: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color() {
      if (this.external) return 'rgb(255, 250, 245)'
      else if (this.project) return `rgb(255, 253, 247)`
      else return ''
    }
  }
}
</script>
