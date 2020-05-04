<template>
  <BaseCard :external="app.external">
    <v-row class="mx-0 px-6 py-4">
      <tag :is="smAndDown ? 'h3' : 'h2'" :class="smAndDown ? 'pb-2' : ''">
        <span class="small" style="color: #666">Apps</span>
        <v-icon>$vuetify.icons.chevronRight</v-icon>
        <template>{{ app.title }}</template>
      </tag>

      <v-spacer></v-spacer>

      <v-row justify="end" no-gutters>
        <BaseButton
          label="Launch"
          :href="app.url"
          icon="$vuetify.icons.play"
          :small="smAndDown"
        >
          <template>{{ 'Launch' }}</template>
        </BaseButton>

        <BaseButton
          v-if="app.src"
          label="Source code"
          :href="app.src"
          icon="$vuetify.icons.codeTags"
          :small="smAndDown"
        >
          <template>{{ 'Code' }}</template>
        </BaseButton>

        <BaseButton
          label="Back"
          :small="smAndDown"
          :to="preview ? '' : '/apps'"
        >
          <template>{{ 'back' }}</template>
        </BaseButton>
      </v-row>
    </v-row>

    <v-divider></v-divider>

    <v-img v-if="smAndDown" :src="app.image" :max-height="200">
      <template #placeholder>
        <v-row class="fill-height" align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </template>
    </v-img>

    <v-row class="mx-0" no-gutters>
      <v-col v-if="!smAndDown" cols="3">
        <v-img :src="app.image" :min-height="200">
          <template #placeholder>
            <v-row class="fill-height" align="center" justify="center">
              <v-progress-circular indeterminate />
            </v-row>
          </template>
        </v-img>
      </v-col>

      <v-col
        class="px-6 pb-6"
        :class="app.external ? 'pt-0' : 'pt-6'"
        :cols="smAndDown ? 12 : 9"
      >
        <MarkerExternal v-if="app.external" />

        <h2 class="pb-4 font-weight-light">About this app</h2>

        <BasePropDisplay name="Updated">
          <template>{{ app.date }}</template>
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
          <span>{{ app.categories }}</span>
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
          <template #title>{{ 'Funding acknowledgment' }}</template>
          <template #text>{{ app.funding }}</template>
        </BaseInfoBlock>

        <BaseInfoBlock v-if="app.citation">
          <template #title>{{ 'Suggested citation' }}</template>
          <template #text>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="app.citation"></span>
          </template>
        </BaseInfoBlock>

        <BaseInfoBlock v-if="hasRelated">
          <template #title>{{ 'Related contents' }}</template>
          <template #text>
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
      </v-col>
    </v-row>
  </BaseCard>
</template>

<script>
import { format } from './utils/itemFormatter'
import BaseButton from './components/BaseButton'
import BaseCard from './components/BaseCard'
import BasePropChip from './components/BasePropChip'
import BasePropDisplay from './components/BasePropDisplay'
import MarkerExternal from './components/MarkerExternal'
import BaseInfoBlock from './components/BaseInfoBlock'

export default {
  components: {
    BaseButton,
    BaseCard,
    BasePropChip,
    BasePropDisplay,
    MarkerExternal,
    BaseInfoBlock
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          articles: null,
          citation: null,
          contributors: null,
          categories: null,
          datasets: null,
          date: null,
          description: null,
          external: null,
          funding: null,
          image: null,
          tags: null,
          title: null,
          url: null
        }
      }
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    app() {
      return format(this.item)
    },
    hasRelated() {
      const { articles, datasets } = this.item
      return (articles && articles.length) || (datasets && datasets.length)
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
