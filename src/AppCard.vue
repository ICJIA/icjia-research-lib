<template>
  <BaseCard ref="card" :external="app.external">
    <v-img :src="app.image" class="hidden-sm-and-down" aspect-ratio="2">
      <template v-slot:placeholder>
        <v-row class="fill-height" align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </template>
    </v-img>

    <div class="px-6" :class="app.external ? 'pt-0' : 'pt-6'">
      <MarkerExternal v-if="app.external" />

      <v-row class="py-0 mx-0">
        <BaseTitleDisplay :to="preview ? '' : `/apps/${app.slug}`">
          <template>{{ app.title }}</template>
        </BaseTitleDisplay>

        <div v-if="app.tags">
          <BasePropChip
            v-for="tag in app.tags"
            :key="tag"
            @chip-click="$emit('tag-click', $event)"
          >
            <template>{{ tag }}</template>
          </BasePropChip>
        </div>
      </v-row>
    </div>

    <div class="pt-4 px-6">
      <BasePropDisplay name="Contributors">
        <template v-if="app.contributors">
          <span v-for="(contributor, i) in app.contributors" :key="i">
            <template v-if="i > 1">{{
              app.contributors.length > i + 1 ? ', ' : ' and '
            }}</template>

            <a
              v-if="contributor.url"
              :href="contributor.url"
              target="_blank"
              rel="noreferrer"
            >
              <template>{{ contributor.title }}</template>
            </a>
            <template v-else>{{ contributor.title }}</template>
          </span>
        </template>

        <template v-else>{{ 'ICJIA R&A staff' }}</template>
      </BasePropDisplay>

      <BasePropDisplay v-if="app.categories" name="Categories">
        <span v-for="(category, i) in app.categories" :key="i">
          <template v-if="i > 0">{{ ', ' }}</template>
          <template>{{ category | capitalize }}</template>
        </span>
      </BasePropDisplay>
    </div>

    <v-row class="ma-0 px-2 pb-2" justify="end">
      <BaseButton
        label="More"
        :to="preview ? null : `/apps/${app.slug}`"
        icon="mdi-dots-horizontal"
      >
        <template>{{ 'more' }}</template>
      </BaseButton>
    </v-row>
  </BaseCard>
</template>

<script>
import { baseFilters } from './mixins/contentMixin'
import BaseButton from './components/BaseButton'
import BaseCard from './components/BaseCard'
import BasePropChip from './components/BasePropChip'
import BasePropDisplay from './components/BasePropDisplay'
import BaseTitleDisplay from './components/BaseTitleDisplay'
import MarkerExternal from './components/MarkerExternal'

export default {
  components: {
    BaseButton,
    BaseCard,
    BasePropChip,
    BasePropDisplay,
    BaseTitleDisplay,
    MarkerExternal
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    app() {
      return this.item
    }
  }
}
</script>
