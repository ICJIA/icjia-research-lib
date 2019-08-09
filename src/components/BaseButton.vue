<template>
  <v-btn text exact :to="to" :href="href" :target="href ? '_blank' : ''">
    <slot></slot>
    <v-icon v-if="icon">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    href: String,
    icon: String,
    to: String
  }
}
</script>
