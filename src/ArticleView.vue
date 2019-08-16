<template>
  <div id="article-view">
    <v-img :height="splashHeight" :src="article.splash">
      <template v-slot:placeholder>
        <v-row class="fill-height" align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </template>
    </v-img>

    <v-row no-gutters>
      <v-col md="4" lg="3" class="hidden-sm-and-down">
        <div class="article-toc" :class="{ 'article-toc-sticky': isTOCSticky }">
          <ArticleTOC
            v-if="headings"
            class="mb-12"
            :headings="headings"
            :activeHeading="activeHeading"
            v-scroll="onScrollTOC"
          />

          <v-btn
            v-if="article.mainfile"
            block
            outlined
            class="article-download"
            @click="downloadHelper('main')"
          >
            <template>{{ article.mainfiletype }}</template>
            <v-icon>mdi-download</v-icon>
          </v-btn>

          <v-btn
            v-if="article.extrafile"
            block
            outlined
            class="article-download"
            @click="downloadHelper('extra')"
          >
            <template>{{ 'appendix' }}</template>
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col class="pt-6 article-content" md="8" lg="9">
        <v-col cols="12" sm="10" lg="9" offset-sm="1" offset-md="0">
          <v-row align="center" justify="space-between" no-gutters>
            <div>
              <span
                v-for="(category, i) in article.categories"
                :key="category"
                class="font-lato uppercase"
              >
                <template v-if="i > 0">{{ ', ' }}</template>
                <template>{{ category }}</template>
              </span>

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

          <ExternalContribution v-if="article.external" />

          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-abstract my-6">{{ article.abstract }}</div>

          <div class="mb-4 uppercase font-oswald">
            <span v-for="(author, i) in article.authors" :key="i">
              <template v-if="i > 0">{{
                article.authors.length > i + 1 ? ', ' : ' and '
              }}</template>
              <a @click="$emit('author-click', $event)">{{ author.title }}</a>
            </span>

            <span v-if="article.date">
              <span class="mx-2">|</span>
              <template>{{ article.date | formatDate }}</template>
            </span>

            <span class="mx-2">|</span>
            <v-icon class="article-print" @click="printArticle">
              mdi-printer
            </v-icon>
          </div>

          <BaseInfoBlock v-if="hasAuthorInfo" :large="true">
            <template v-slot:title>{{
              `About the author${article.authors.length > 1 ? 's' : ''}`
            }}</template>
            <template v-slot:text>
              <p v-for="(author, i) in article.authors" :key="`authorinfo${i}`">
                <template>{{ author.description }}</template>
              </p>
            </template>
          </BaseInfoBlock>

          <v-divider></v-divider>

          <div
            class="article-body"
            v-html="articleBody.main"
            v-scroll="onScroll"
          />

          <div class="my-12">
            <BaseInfoBlock v-if="article.funding" :large="true">
              <template v-slot:title>{{ 'Funding acknowledgment' }}</template>
              <template v-slot:text>{{ article.funding }}</template>
            </BaseInfoBlock>

            <BaseInfoBlock v-if="article.citation" :large="true">
              <template v-slot:title>{{ 'Suggested citation' }}</template>
              <template v-slot:text>
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
              <template v-slot:title>{{ 'Related contents' }}</template>
              <template v-slot:text>
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
              class="article-body"
              v-html="articleBody.footer"
              v-scroll="onScroll"
            />
          </template>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MarkdownItTexmath from 'markdown-it-texmath'
import { createMarkdownUtils, initMarkdownIt } from './utils/markdownIt'
import { initKatex } from './utils/katex'
import { baseFilters } from './mixins/contentMixin'

import ArticleTOC from './components/ArticleTOC'
import BaseButton from './components/BaseButton'
import BaseInfoBlock from './components/BaseInfoBlock'
import BasePropChip from './components/BasePropChip'
import ExternalContribution from './components/ExternalContribution'

export default {
  components: {
    ArticleTOC,
    BaseButton,
    BaseInfoBlock,
    BasePropChip,
    ExternalContribution
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    downloader: Function,
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
      return this.item
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
    await initKatex()
    // eslint-disable-next-line no-undef
    const md = initMarkdownIt().use(MarkdownItTexmath.use(katex))
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

      if (top === 0) {
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
      const content = document.getElementById('article-view').innerHTML
      const styleSelector = 'link[rel="stylesheet"], style'
      const style = [...document.querySelectorAll(styleSelector)]
        .map(el => el.outerHTML)
        .join('')

      this.printWindow({ head: style, body: content })
    },
    printWindow({ head, body }) {
      const win = window.open('', '')
      win.document.write(`<head>${head}</head><body>${body}</body>`)
      win.document.write('<script>window.print(); window.close()<' + '/script>')
      win.document.close()
      win.focus()
    }
  }
}
</script>
