<template>
  <v-card flat class="font-lato my-3" color="rgba(27, 31, 35, 0.05)">
    <v-card-title primary-title class="pb-0 px-5">
      <div class="uppercase bold" :class="large ? '' : 'small'">
        <slot name="title"></slot>
      </div>
    </v-card-title>
    <v-card-text class="px-5 py-3" :class="large ? 'large' : 'small'">
      <slot name="text"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>
