<template>
  <!-- eslint-disable vue/no-v-html -->
  <div id="article-view">
    <v-img :height="splashHeight" :src="article.splash">
      <template #placeholder>
        <v-row class="fill-height" align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </template>
    </v-img>

    <v-row no-gutters>
      <v-col md="4" lg="3" class="hidden-sm-and-down">
        <div class="article-toc" :class="{ 'article-toc-sticky': isTOCSticky }">
          <ArticleTOC
            v-if="headings && headings.length"
            v-scroll="onScrollTOC"
            class="mb-12"
            :headings="headings"
            :active-heading="activeHeading"
          />

          <v-btn
            v-if="article.mainfile"
            block
            outlined
            class="article-download"
            @click="downloadHelper('main')"
          >
            <template>{{ article.mainfiletype }}</template>
            <v-icon>$vuetify.icons.download</v-icon>
          </v-btn>

          <v-btn
            v-if="article.extrafile"
            block
            outlined
            class="article-download"
            @click="downloadHelper('extra')"
          >
            <template>{{ 'appendix' }}</template>
            <v-icon>$vuetify.icons.download</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col id="article-content" class="pt-6 article-content" md="8" lg="9">
        <v-col cols="12" sm="10" lg="9" offset-sm="1" offset-md="0">
          <v-row align="center" justify="space-between" no-gutters>
            <div>
              <span class="font-lato text-uppercase">{{
                article.categories
              }}</span>

              <template v-if="article.tags">
                <span class="mx-2">|</span>

                <BasePropChip
                  v-for="tag of article.tags"
                  :key="tag"
                  @chip-click="$emit('tag-click', $event)"
                >
                  <template>{{ tag }}</template>
                </BasePropChip>
              </template>
            </div>

            <BaseButton label="Back" :to="preview ? '' : '/articles'">
              <template>{{ 'back' }}</template>
            </BaseButton>
          </v-row>

          <MarkerExternal v-if="article.external" />

          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-abstract my-6">{{ article.abstract }}</div>

          <div class="mb-4 text-uppercase font-oswald">
            <span v-for="(author, i) in article.authors" :key="i">
              <template v-if="i > 0">{{
                article.authors.length > i + 1 ? ', ' : ' and '
              }}</template>
              <a @click="$emit('author-click', $event)">{{ author.title }}</a>
            </span>

            <span v-if="article.date">
              <span class="mx-2">|</span>
              <template>{{ article.date }}</template>
            </span>

            <span class="mx-2">|</span>
            <v-icon
              class="article-print"
              aria-label="Print"
              @click="printArticle"
            >
              <template>{{ '$vuetify.icons.printer' }}</template>
            </v-icon>
          </div>

          <v-divider></v-divider>

          <div
            v-scroll="onScroll"
            class="article-body"
            v-html="articleBody.main"
          />

          <div class="my-12">
            <BaseInfoBlock v-if="hasAuthorInfo" :large="true">
              <template #title>{{
                `About the author${article.authors.length > 1 ? 's' : ''}`
              }}</template>
              <template #text>
                <p
                  v-for="(author, i) in article.authors"
                  :key="`authorinfo${i}`"
                >
                  <template>{{ author.description }}</template>
                </p>
              </template>
            </BaseInfoBlock>

            <BaseInfoBlock v-if="article.funding" :large="true">
              <template #title>{{ 'Funding acknowledgment' }}</template>
              <template #text>{{ article.funding }}</template>
            </BaseInfoBlock>

            <BaseInfoBlock v-if="article.citation" :large="true">
              <template #title>{{ 'Suggested citation' }}</template>
              <template #text>
                <span v-html="article.citation"></span>
                <a
                  v-if="article.doi"
                  :href="article.doi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <template>{{ ` ${article.doi}` }}</template>
                </a>
              </template>
            </BaseInfoBlock>

            <BaseInfoBlock v-if="hasRelated" :large="true">
              <template #title>{{ 'Related contents' }}</template>
              <template #text>
                <ul>
                  <li v-for="(app, i) in article.apps" :key="`app${i}`">
                    <router-link :to="preview ? '' : `/apps/${app.slug}`">
                      <template>{{ `[APP] ${app.title}` }}</template>
                    </router-link>
                  </li>
                  <li
                    v-for="(dataset, i) in article.datasets"
                    :key="`dataset${i}`"
                  >
                    <router-link
                      :to="preview ? '' : `/datasets/${dataset.slug}`"
                    >
                      <template>{{ `[DATASET] ${dataset.title}` }}</template>
                    </router-link>
                  </li>
                </ul>
              </template>
            </BaseInfoBlock>
          </div>

          <template v-if="articleBody.footer">
            <v-divider></v-divider>

            <div
              v-scroll="onScroll"
              class="article-body"
              v-html="articleBody.footer"
            />
          </template>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { format } from './utils/itemFormatter'
import { createMarkdownUtils, initMarkdownIt } from './utils/markdownIt'
import { initTexmath } from './utils/texmath'

import ArticleTOC from './components/ArticleTOC'
import BaseButton from './components/BaseButton'
import BaseInfoBlock from './components/BaseInfoBlock'
import BasePropChip from './components/BasePropChip'
import MarkerExternal from './components/MarkerExternal'

export default {
  components: {
    ArticleTOC,
    BaseButton,
    BaseInfoBlock,
    BasePropChip,
    MarkerExternal
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          abstract: null,
          apps: null,
          authors: null,
          categories: null,
          citation: null,
          datasets: null,
          date: null,
          doi: null,
          external: null,
          extrafile: null,
          funding: null,
          images: null,
          mainfile: null,
          mainfiletype: null,
          markdown: null,
          splash: null,
          tags: null,
          title: null
        }
      }
    },
    downloader: {
      type: Function,
      default() {}
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeHeading: 'introduction',
      baseUrl: 'localhost:8080/',
      isTOCSticky: false,
      markdownUtils: {},
      viewTitleHeight: 60 + 80
    }
  },
  computed: {
    article() {
      return format(this.item)
    },
    articleBody() {
      const { markdown, images } = this.item
      const { renderMarkdown, addImages } = this.markdownUtils
      const body =
        markdown && renderMarkdown && addImages
          ? renderMarkdown(images ? addImages(images, markdown) : markdown)
          : ''
      const [main, footer] = body.split('<hr class="footnotes-sep">')
      return { main, footer }
    },
    hasAuthorInfo() {
      const { authors } = this.item
      return authors.filter(el => el.description).length > 0
    },
    hasRelated() {
      const { apps, datasets } = this.item
      return (apps && apps.length) || (datasets && datasets.length)
    },
    headings() {
      const { markdown } = this.item
      const { parseHeadings } = this.markdownUtils
      return markdown && parseHeadings ? parseHeadings(markdown) : null
    },
    splashHeight() {
      const { xs, sm } = this.$vuetify.breakpoint

      if (xs) return 240
      else if (sm) return 360
      else return 480
    }
  },
  async created() {
    await initTexmath()
    // eslint-disable-next-line no-undef
    const md = initMarkdownIt().use(texmath.use(katex))
    this.markdownUtils = createMarkdownUtils(md)
  },
  methods: {
    async downloadHelper(type) {
      await this.downloader(type)
    },
    onScroll(e) {
      if (typeof window === 'undefined') return

      const top = window.pageYOffset || e.target.scrollTop || 0
      const headings = this.headings

      if (headings.length && top === 0) {
        this.activeHeading = headings[0].id
      } else if (headings) {
        headings.forEach(heading => {
          let elHeading = this.$el.querySelector(`#${heading.id}`)
          let rect = elHeading.getBoundingClientRect()
          if (rect.top < 91 && this.activeHeading !== heading.id) {
            this.activeHeading = heading.id
          }
        })
      }
    },
    onScrollTOC(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      const threshold = this.splashHeight + this.viewTitleHeight

      this.isTOCSticky = top > threshold
    },
    printArticle() {
      const fonts =
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Gentium+Book+Basic&amp;display=swap">' +
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400&display=swap">' +
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald&display=swap">'
      const nodes = document.querySelectorAll('link[rel="stylesheet"], style')
      const style = Array.from(nodes)
        .map(el => el.outerHTML)
        .join('')
      const content = document.getElementById('article-content').innerHTML

      this.printWindow({ head: fonts + style, body: content })
    },
    printWindow({ head, body }) {
      const win = window.open('', '')
      const toWrite =
        `<head>${head}</head>` +
        `<body><div id="app" class="v-application"><div id="article-view">${body}</div></div></body>` +
        `<script>window.print(); window.close()<` +
        `/script>`
      win.document.write(toWrite)
      win.document.close()
      win.focus()
    }
  }
}
</script>
