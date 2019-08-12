<template>
  <BaseCard :view="true" :external="app.external">
    <v-row class="mx-0 pa-6">
      <h2>
        <span class="small pl-2" style="color: #666">Apps</span>
        <v-icon>chevron_right</v-icon>
        <template>{{ app.title }}</template>
      </h2>

      <v-spacer />

      <BaseButton :href="app.url" icon="play_arrow">Launch</BaseButton>

      <BaseButton v-if="app.src" :href="app.src" icon="code">
        <template>{{ 'Source code' }}</template>
      </BaseButton>

      <BaseButton :to="preview ? '' : '/apps'">back</BaseButton>
    </v-row>

    <v-divider />

    <v-row class="mx-0">
      <v-col cols="3">
        <v-img :src="app.image">
          <template v-slot:placeholder>
            <v-row class="fill-height" align="center" justify="center">
              <v-progress-circular indeterminate />
            </v-row>
          </template>
        </v-img>
      </v-col>

      <v-col cols="9">
        <v-container class="px-6" :class="app.external ? 'pt-1' : ''">
          <ExternalContribution v-if="app.external" />

          <h2 class="pb-4 light">About this app</h2>
          <BasePropDisplay name="Updated">
            <template>{{ app.date | formatDate }}</template>
          </BasePropDisplay>

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

          <BasePropDisplay v-if="app.tags" name="Tags">
            <BasePropChip
              v-for="tag in app.tags"
              :key="tag"
              @chip-click="$emit('tag-click', $event)"
            >
              <template>{{ tag }}</template>
            </BasePropChip>
          </BasePropDisplay>

          <BasePropDisplay name="Description">
            <template>{{ app.description }}</template>
          </BasePropDisplay>

          <BaseInfoBlock v-if="app.funding">
            <template v-slot:title>{{ 'Funding acknowledgment' }}</template>
            <template v-slot:text>{{ app.funding }}</template>
          </BaseInfoBlock>

          <BaseInfoBlock v-if="app.citation">
            <template v-slot:title>{{ 'Suggested citation' }}</template>
            <template v-slot:text>
              <span v-html="app.citation"></span>
            </template>
          </BaseInfoBlock>

          <BaseInfoBlock v-if="hasRelated">
            <template v-slot:title>{{ 'Related contents' }}</template>
            <template v-slot:text>
              <ul class="font-lato">
                <li v-for="(article, i) in app.articles" :key="`article${i}`">
                  <router-link :to="preview ? '' : `/articles/${article.slug}`">
                    <template>{{ `[ARTICLE] ${article.title}` }}</template>
                  </router-link>
                </li>
                <li v-for="(dataset, i) in app.datasets" :key="`dataset${i}`">
                  <router-link :to="preview ? '' : `/datasets/${dataset.slug}`">
                    <template>{{ `[DATASET] ${dataset.title}` }}</template>
                  </router-link>
                </li>
              </ul>
            </template>
          </BaseInfoBlock>
        </v-container>
      </v-col>
    </v-row>
  </BaseCard>
</template>

<script>
import { baseFilters } from './mixins/contentMixin'
import BaseButton from './components/BaseButton'
import BaseCard from './components/BaseCard'
import BasePropChip from './components/BasePropChip'
import BasePropDisplay from './components/BasePropDisplay'
import ExternalContribution from './components/ExternalContribution'
import BaseInfoBlock from './components/BaseInfoBlock'

export default {
  components: {
    BaseButton,
    BaseCard,
    BasePropChip,
    BasePropDisplay,
    ExternalContribution,
    BaseInfoBlock
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
    },
    hasRelated() {
      const { articles, datasets } = this.item
      return (articles && articles.length) || (datasets && datasets.length)
    }
  }
}
</script>
