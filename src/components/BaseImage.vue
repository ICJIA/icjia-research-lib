<template>
  <v-img
    :src="src"
    :aspect-ratio="horizontal ? undefined : 2"
    :max-width="horizontal ? 200 : undefined"
  >
    <template #placeholder>
      <v-row class="fill-height" align="center" justify="center">
        <v-progress-circular indeterminate />
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    horizontal: Boolean,
    src: String
  }
}
</script>
