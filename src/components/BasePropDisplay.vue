<template functional>
  <div class="py-1 font-lato">
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
    }
  }
}
</script>
