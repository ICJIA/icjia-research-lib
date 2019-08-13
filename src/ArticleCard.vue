<template>
  <BaseCard ref="card" :external="article.external">
    <v-row class="mx-0">
      <v-img
        :src="article.thumbnail"
        class="hidden-sm-and-down"
        max-width="200"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height" align="center" justify="center">
            <v-progress-circular indeterminate />
          </v-row>
        </template>
      </v-img>

      <v-col class="mx-0 pa-0" align-self="end">
        <v-container class="px-6" :class="article.external ? 'pt-1 pb-2' : ''">
          <v-col cols="12">
            <ExternalContribution v-if="article.external" />
          </v-col>

          <v-row class="mx-0">
            <BaseTitleDisplay :to="preview ? '' : `/articles/${article.slug}`">
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
          </v-row>
        </v-container>

        <v-container class="px-6">
          <BasePropDisplay v-if="article.date" name="Updated">
            <template>{{ article.date | formatDate }}</template>
          </BasePropDisplay>

          <BasePropDisplay v-if="article.authors" name="Authors">
            <span v-for="(author, i) in article.authors" :key="author.title">
              <template v-if="i > 0">{{
                article.authors.length > i + 1 ? ', ' : ' and '
              }}</template>
              <a @click="$emit('author-click', $event)">{{ author.title }}</a>
            </span>
          </BasePropDisplay>

          <BasePropDisplay v-if="article.categories" name="Categories">
            <span v-for="(category, i) in article.categories" :key="category">
              <template v-if="i > 0">{{ ', ' }}</template>
              <template>{{ category | capitalize }}</template>
            </span>
          </BasePropDisplay>
        </v-container>

        <v-row class="mx-0 px-3 py-3" justify="end">
          <v-btn
            v-if="article.abstract"
            text
            @click="showAbstract = !showAbstract"
          >
            <template>{{ 'abstract' }}</template>
            <v-icon>{{ abstractIcon }}</v-icon>
          </v-btn>

          <BaseButton
            :to="preview ? null : `/articles/${article.slug}`"
            icon="mdi-dots-horizontal"
          >
            <template>{{ 'more' }}</template>
          </BaseButton>
        </v-row>

        <v-slide-y-transition>
          <v-card-text v-if="showAbstract">{{ article.abstract }}</v-card-text>
        </v-slide-y-transition>
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
    onTagClick: Function,
    preview: {
      type: Boolean,
      default: false
    }
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
      return this.showAbstract ? 'mdi-chevron-down' : 'mdi-chevron-up'
    },
    cardHeight() {
      console.log(this.$refs)
      return this.$refs.card.$el.clientHeight
    }
  }
}
</script>

<style scoped>
.article-body {
  width: 100px;
}
</style>
