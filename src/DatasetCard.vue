<template>
  <BaseCard :external="dataset.external">
    <v-container class="px-6" :class="dataset.external ? 'pt-1 pb-2' : ''">
      <v-col cols="12">
        <ExternalContribution v-if="dataset.external" />
      </v-col>

      <v-container class="row py-0">
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
      </v-container>
    </v-container>

    <v-container class="px-6">
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
    </v-container>

    <v-row class="px-3 pb-3 mx-0" justify="end">
      <BaseButton
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
import ExternalContribution from './components/ExternalContribution'

export default {
  components: {
    BaseButton,
    BaseCard,
    BasePropChip,
    BasePropDisplay,
    BaseTitleDisplay,
    ExternalContribution
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
