<template>
  <BaseCard :external="dataset.external">
    <div class="px-6" :class="dataset.external ? 'pt-0' : 'pt-6'">
      <MarkerExternal v-if="dataset.external" />

      <v-row class="py-0 mx-0">
        <BaseTitleDisplay :to="preview ? '' : `/datasets/${dataset.slug}`">
          <template>{{ dataset.title }}</template>
        </BaseTitleDisplay>

        <div v-if="dataset.tags">
          <BasePropChip
            v-for="tag in dataset.tags"
            :key="tag"
            @chip-click="$emit('tag-click', $event)"
          >
            <template>{{ tag }}</template>
          </BasePropChip>
        </div>
      </v-row>
    </div>

    <div class="pt-4 px-6">
      <BasePropDisplay name="Updated">
        <template>{{ dataset.date | formatDate }}</template>
      </BasePropDisplay>

      <BasePropDisplay v-if="dataset.sources" name="Sources">
        <span v-for="(source, i) in dataset.sources" :key="i">
          <template v-if="i > 0">{{
            dataset.sources.length > i + 1 ? ', ' : ' and '
          }}</template>

          <a
            v-if="source.url"
            :href="source.url"
            target="_blank"
            rel="noreferrer"
          >
            <template>{{ source.title }}</template>
          </a>

          <template v-else>{{ source.title }}</template>
        </span>
      </BasePropDisplay>

      <BasePropDisplay v-if="dataset.categories" name="Categories">
        <span v-for="(category, i) in dataset.categories" :key="i">
          <template v-if="i > 0">{{ ', ' }}</template>
          <template>{{ category | capitalize }}</template>
        </span>
      </BasePropDisplay>
    </div>

    <v-row class="ma-0 px-2 pb-2" justify="end">
      <BaseButton
        label="More"
        :to="preview ? null : `/datasets/${dataset.slug}`"
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
    dataset() {
      return this.item
    }
  }
}
</script>
