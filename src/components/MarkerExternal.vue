<template>
  <div class="font-lato">
    <v-icon class="marker-external" size="16">{{ mdiCharity }}</v-icon>
    <span class="small marker-external">This is an external contribution</span>
  </div>
</template>

<script>
import { mdiCharity } from '@mdi/js'

export default {
  data() {
    return {
      mdiCharity
    }
  }
}
</script>
