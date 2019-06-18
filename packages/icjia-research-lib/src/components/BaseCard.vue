<template>
  <v-card
    :class="view ? 'mb-5' : 'ma-3'"
    :color="external ? 'rgb(255, 252, 245)' : ''"
  >
    <slot></slot>
  </v-card>
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
