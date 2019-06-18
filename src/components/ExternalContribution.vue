<template>
  <BasePropDisplay>
    <div class="external">
      <v-icon class="external">favorite</v-icon>
      <span>This is an external contribution</span>
    </div>
  </BasePropDisplay>
</template>

<script>
import BasePropDisplay from './BasePropDisplay'

export default {
  components: {
    BasePropDisplay
  }
}
</script>

<style>
.external {
  color: orangered !important;
}
</style>
