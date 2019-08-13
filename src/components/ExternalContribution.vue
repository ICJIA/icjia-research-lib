<template>
  <BasePropDisplay>
    <v-icon small class="external">mdi-heart</v-icon>
    <span class="external">This is an external contribution</span>
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
