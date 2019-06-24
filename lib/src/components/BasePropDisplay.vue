<template functional>
  <div class="py-1 font-lato small">
    <span v-if="props.name" class="bold pr-2">{{ props.name }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
