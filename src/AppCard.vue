<template>
  <BaseCard :external="app.external">
    <v-img :src="app.image" class="hidden-sm-and-down" aspect-ratio="1.66">
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center>
          <v-progress-circular indeterminate />
        </v-layout>
      </template>
    </v-img>

    <v-card-title primary-title :class="app.external ? 'pt-1 pb-2' : ''">
      <v-flex xs12>
        <ExternalContribution v-if="app.external" />
      </v-flex>

      <v-layout row wrap>
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
      </v-layout>
    </v-card-title>

    <v-divider class="hidden-md-and-up pb-2"></v-divider>

    <v-container py-0 px-3>
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

    <v-card-actions>
      <v-spacer></v-spacer>

      <BaseButton :to="preview ? null : `/apps/${app.slug}`" icon="more_horiz">
        <template>{{ 'more' }}</template>
      </BaseButton>
    </v-card-actions>
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
