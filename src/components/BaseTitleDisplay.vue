<template functional>
  <h3 class="pr-2" style="padding-top: .15em;">
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
