<template functional>
  <h3>
    <router-link :to="props.to">
      <slot></slot>
    </router-link>
  </h3>
</template>

<script>
export default {
  props: {
    to: String
  }
}
</script>
