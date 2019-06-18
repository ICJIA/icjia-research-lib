<template>
  <BaseCard :external="article.external">
    <v-layout row>
      <v-img
        class="hidden-sm-and-down"
        :src="article.thumbnail"
        lazy-src="https://via.placeholder.com/1/DDDDDD"
        max-width="300px"
      >
        <v-layout
          slot="placeholder"
          fill-height
          align-center
          justify-center
          ma-0
        >
          <v-progress-circular indeterminate color="grey lighten-3" />
        </v-layout>
      </v-img>
      <v-layout column justify-space-between class="article-body">
        <div>
          <v-card-title :class="article.external ? 'pt-1 pb-2' : ''">
            <v-flex xs12>
              <ExternalContribution v-if="article.external" />
            </v-flex>

            <v-layout row wrap>
              <BaseTitleDisplay :to="article.slug | path('articles')">
                <template>{{ article.title }}</template>
              </BaseTitleDisplay>

              <div v-if="article.tags">
                <BasePropChip
                  v-for="tag of article.tags"
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
            <BasePropDisplay v-if="article.date" name="Updated">
              <template>{{ article.date | formatDate }}</template>
            </BasePropDisplay>

            <BasePropDisplay v-if="article.authors" name="Authors">
              <span v-for="(author, i) in article.authors" :key="author.title">
                <template v-if="i > 0">{{
                  article.authors.length > i + 1 ? ', ' : ' and '
                }}</template>

                <router-link :to="author.slug | path('authors')">
                  <template>{{ author.title }}</template>
                </router-link>
              </span>
            </BasePropDisplay>

            <BasePropDisplay v-if="article.categories" name="Categories">
              <span v-for="(category, i) in article.categories" :key="category">
                <template v-if="i > 0">{{ ', ' }}</template>
                <template>{{ category | capitalize }}</template>
              </span>
            </BasePropDisplay>

            <BasePropDisplay v-if="article.type" name="Type">
              <span v-for="(type, i) in article.type" :key="type">
                <template v-if="i > 0">{{ ', ' }}</template>
                <template>{{ type | capitalize }}</template>
              </span>
            </BasePropDisplay>
          </v-container>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="article.abstract"
            @click="showAbstract = !showAbstract"
            flat
          >
            <template>{{ 'abstract' }}</template>
            <v-icon>{{ abstractIcon }}</v-icon>
          </v-btn>

          <BaseButton :to="article.slug | path('articles')" icon="more_horiz">
            <template>{{ 'more' }}</template>
          </BaseButton>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-if="showAbstract">{{ article.abstract }}</v-card-text>
        </v-slide-y-transition>
      </v-layout>
    </v-layout>
  </BaseCard>
</template>

<script>
import { allContentMixin } from './mixins/contentMixin'
import BaseButton from './components/BaseButton'
import BaseCard from './components/BaseCard'
import BasePropChip from './components/BasePropChip'
import BasePropDisplay from './components/BasePropDisplay'
import BaseTitleDisplay from './components/BaseTitleDisplay'
import ExternalContribution from './components/ExternalContribution'

export default {
  mixins: [allContentMixin],
  components: {
    BaseButton,
    BaseCard,
    BasePropChip,
    BasePropDisplay,
    BaseTitleDisplay,
    ExternalContribution
  },
  props: {
    item: Object,
    onTagClick: Function
  },
  data() {
    return {
      showAbstract: false
    }
  },
  computed: {
    article() {
      return this.item
    },
    abstractIcon() {
      return this.showAbstract ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
    }
  }
}
</script>

<style scoped>
.article-body {
  width: 100px;
}
</style>
