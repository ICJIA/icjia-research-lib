<template>
  <BaseCard :external="external" :project="project">
    <BaseImage v-if="image && !horizontal" :src="image" :horizontal="false" />

    <v-row class="mx-0" no-gutters>
      <BaseImage v-if="image && horizontal" :src="image" :horizontal="true" />

      <v-col class="mx-0 pa-0">
        <div class="px-6" :class="external || project ? 'pt-0' : 'pt-6'">
          <MarkerExternal v-if="external" />
          <MarkerProject v-else-if="project" />

          <v-row class="pb-2" no-gutters>
            <slot name="title"></slot>
          </v-row>

          <slot name="props"></slot>
        </div>

        <v-row class="px-2 pb-2" no-gutters justify="end">
          <slot name="buttons"></slot>
        </v-row>

        <slot name="extra"></slot>
      </v-col>
    </v-row>
  </BaseCard>
</template>

<script>
import BaseCard from './BaseCard'
import BaseImage from './BaseImage'
import MarkerExternal from './MarkerExternal'
import MarkerProject from './MarkerProject'

export default {
  components: {
    BaseCard,
    BaseImage,
    MarkerExternal,
    MarkerProject
  },
  props: {
    external: Boolean,
    horizontal: {
      type: Boolean,
      default: true
    },
    image: String,
    preview: Boolean,
    project: Boolean
  }
}
</script>
