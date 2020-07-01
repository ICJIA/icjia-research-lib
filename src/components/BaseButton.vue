<template>
  <v-btn
    text
    exact
    :aria-label="label"
    :small="small"
    :to="to"
    :href="href"
    :target="href ? '_blank' : ''"
  >
    <slot></slot>
    <v-icon v-if="icon">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: null
    }
  }
}
</script>
