<template>
  <div class="font-lato">
    <v-icon class="marker-project" size="16">{{ mdiPollBox }}</v-icon>
    <span class="small marker-project">This is a project-specific dataset</span>
  </div>
</template>

<script>
import { mdiPollBox } from '@mdi/js'

export default {
  data() {
    return {
      mdiPollBox
    }
  }
}
</script>
