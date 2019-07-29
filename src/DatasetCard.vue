<template>
  <BaseCard :external="dataset.external">
    <v-card-title primary-title :class="dataset.external ? 'pt-1 pb-2' : ''">
      <v-flex xs12>
        <ExternalContribution v-if="dataset.external" />
      </v-flex>

      <v-layout row wrap>
        <BaseTitleDisplay :to="dataset.slug | path('datasets')">
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
      </v-layout>
    </v-card-title>

    <v-divider />

    <v-container class="py-2">
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

    <v-container class="pa-0 text-xs-right">
      <BaseButton :to="dataset.slug | path('datasets')" icon="more_horiz">
        <template>{{ 'more' }}</template>
      </BaseButton>
    </v-container>
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
    item: Object
  },
  computed: {
    dataset() {
      return this.item
    }
  }
}
</script>
