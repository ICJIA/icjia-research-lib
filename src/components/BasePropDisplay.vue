<template functional>
  <div class="font-lato" :class="props.dense ? 'dense' : ''">
    <span v-if="props.name" class="small font-weight-bold pr-2">{{
      props.name
    }}</span>
    <template v-if="props.name == 'Tags'">
      <slot></slot>
    </template>
    <span v-else class="small"><slot></slot></span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dense {
  line-height: 1.2;
}
</style>
