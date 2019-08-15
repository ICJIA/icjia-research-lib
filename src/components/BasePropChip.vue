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
