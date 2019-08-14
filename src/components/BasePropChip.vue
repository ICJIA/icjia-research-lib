<template>
  <v-btn
    class="chip"
    small
    depressed
    rounded
    @click="$emit('chip-click', $event)"
  >
    <slot></slot>
  </v-btn>
</template>

<style scoped>
.chip {
  background-color: #e0e0e0 !important;
  margin-left: 4px;
  min-width: 0;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
</style>
