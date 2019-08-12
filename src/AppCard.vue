<template>
  <BaseCard ref="card" :external="app.external">
    <v-img :src="app.image" class="hidden-sm-and-down" aspect-ratio="1.66">
      <template v-slot:placeholder>
        <v-row class="fill-height" align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </template>
    </v-img>

    <v-container class="px-6" :class="app.external ? 'pt-1 pb-2' : ''">
      <v-col cols="12">
        <ExternalContribution v-if="app.external" />
      </v-col>

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
    </v-container>

    <v-container class="px-6">
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
    </v-container>

    <v-row justify="end" class="px-3 pb-3">
      <BaseButton :to="preview ? null : `/apps/${app.slug}`" icon="more_horiz">
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
    app() {
      return this.item
    }
  }
}
</script>
