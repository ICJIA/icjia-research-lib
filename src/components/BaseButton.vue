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
    label: String,
    href: String,
    icon: String,
    small: Boolean,
    to: String
  }
}
</script>
