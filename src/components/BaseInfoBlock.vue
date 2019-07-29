<template>
  <div class="info-block" :class="large ? '' : 'small'">
    <div class="info-block-title">
      <slot name="title"></slot>
    </div>

    <slot name="text"></slot>
  </div>
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
