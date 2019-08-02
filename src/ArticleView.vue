<template>
  <div class="mb-5">
    <v-img :height="splashHeight" :src="article.splash"></v-img>

    <v-layout row wrap>
      <v-flex md4 lg3 class="hidden-sm-and-down">
        <div class="article-toc" :class="{ 'article-toc-sticky': isTOCSticky }">
          <ArticleTOC
            v-if="headings"
            :headings="headings"
            :activeHeading="activeHeading"
            v-scroll="onScrollTOC"
          />

          <v-divider v-if="article.mainfile" class="my-3"></v-divider>

          <v-btn
            v-if="article.mainfile"
            block
            outline
            class="article-download"
            @click="downloadHelper('main')"
          >
            <template>{{ article.mainfiletype }}</template>
            <v-icon>get_app</v-icon>
          </v-btn>

          <v-btn
            v-if="article.extrafile"
            block
            outline
            class="article-download"
            @click="downloadHelper('extra')"
          >
            <template>{{ 'appendix' }}</template>
            <v-icon>get_app</v-icon>
          </v-btn>
        </div>
      </v-flex>

      <v-flex md8 lg9>
        <v-layout jrow id="article-view">
          <v-flex xs12 sm10 lg9 offset-sm1 offset-md0 pt-4>
            <v-layout align-center justify-space-between row>
              <div class="greycolor font-lato uppercase">
                <span
                  v-for="(category, i) in article.categories"
                  :key="category"
                  class="uppercase"
                >
                  <template v-if="i > 0">{{ ', ' }}</template>
                  <template>{{ category }}</template>
                </span>

                <template>{{ '&nbsp;&nbsp;|&nbsp;&nbsp;' }}</template>

                <template v-if="article.tags">
                  <BasePropChip
                    v-for="tag of article.tags"
                    :key="tag"
                    @chip-click="$emit('tag-click', $event)"
                  >
                    <template>{{ tag }}</template>
                  </BasePropChip>
                </template>
              </div>

              <BaseButton :to="preview ? '' : '/articles'">back</BaseButton>
            </v-layout>

            <ExternalContribution v-if="article.external" />

            <h1 class="article-title">{{ article.title }}</h1>

            <div class="article-abstract greycolor font-lato my-3">
              <template>{{ article.abstract }}</template>
            </div>

            <div class="mb-3">
              <span
                v-for="(author, i) in article.authors"
                :key="i"
                class="uppercase font-oswald"
              >
                <template v-if="i > 0">{{
                  article.authors.length > i + 1 ? ', ' : ' and '
                }}</template>

                <template v-if="author.slug">
                  <router-link :to="preview ? '' : `/authors/${author.slug}`">
                    <template>{{ author.title }}</template>
                  </router-link>
                </template>
                <template v-else>{{ author.title }}</template>
              </span>

              <template>{{ '&nbsp;&nbsp;|&nbsp;&nbsp;' }}</template>

              <span v-if="article.date" class="uppercase font-oswald">
                <template>{{ article.date | formatDate }}</template>
              </span>

              <template>{{ '&nbsp;&nbsp;|&nbsp;&nbsp;' }}</template>

              <v-icon id="article-print" @click="printArticle">fa-print</v-icon>
            </div>

            <template v-if="hasRelated">
              <v-divider></v-divider>

              <v-container>
                <h2 class="mb-3 light">Related</h2>

                <ul class="font-lato">
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
              </v-container>
            </template>

            <v-divider />

            <div
              class="article-body"
              v-html="articleBody.main"
              v-scroll="onScroll"
            />

            <div class="my-5">
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
            </div>

            <template v-if="articleBody.footer">
              <v-divider></v-divider>

              <div
                class="article-body"
                v-html="articleBody.footer"
                v-scroll="onScroll"
              />
            </template>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
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
      splashHeight: 500,
      viewTitleHeight: 60 + 80
    }
  },
  computed: {
    article() {
      return this.item
    },
    hasRelated() {
      const { apps, datasets } = this.item
      return (apps && apps.length) || (datasets && datasets.length)
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
    headings() {
      const { markdown } = this.item
      const { parseHeadings } = this.markdownUtils
      return markdown && parseHeadings ? parseHeadings(markdown) : null
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

<style scoped>
#article-print:hover {
  color: #1976d2;
}
.article-abstract {
  font-weight: 300;
  font-size: 20px;
}
.article-body >>> h1,
.article-body >>> h2,
.article-body >>> h3,
.article-body >>> h4,
.article-body >>> h5 {
  font-family: 'Oswald', sans-serif;
  line-height: 1.3;
}
.article-body >>> h1,
.article-body >>> h2,
.article-body >>> h3 {
  margin-top: 22px;
  margin-bottom: 11px;
  font-weight: 500;
}
.article-body >>> h4,
.article-body >>> h5,
.article-body >>> h6 {
  text-transform: uppercase;
  color: black;
  letter-spacing: 0.04em;
  font-weight: 700;
  margin-bottom: 11px;
  margin-top: 11px;
}
.article-body >>> h1 {
  font-size: 48px;
  font-weight: 700;
}
.article-body >>> h2 {
  font-size: 34px;
}
.article-body >>> h3 {
  font-size: 24px;
}
.article-body >>> h4 {
  font-size: 17px;
}
.article-body >>> h5 {
  font-size: 14px;
}
.article-body >>> h6 {
  font-family: 'Lato';
  font-size: 13px;
}
.article-body >>> p,
.article-body >>> ul,
.article-body >>> ol {
  font-size: 20px;
  margin-bottom: 11px;
}
.article-body >>> ul,
.article-body >>> ol {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
/* .article-body >>> p {
  text-indent: 1.5em;
} */
.article-body >>> hr {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
  height: 0;
  margin: 15px 0;
  overflow: hidden;
}
.article-body >>> blockquote {
  border-left: 0.25em solid #dfe2e5;
  font-family: 'Lato', sans-serif;
  color: #6a737d;
  padding: 0 1em;
  margin: 2em 0;
}
.article-body >>> blockquote p,
.article-body >>> blockquote ol,
.article-body >>> blockquote ul {
  font-size: 18px;
  text-indent: 0;
}
.article-body >>> blockquote > :first-child {
  margin-top: 0;
}
.article-body >>> blockquote > :last-child {
  margin-bottom: 0;
}
.article-body >>> table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-left: auto;
  margin-right: auto;
}
.article-body >>> table th {
  font-weight: 600;
}
.article-body >>> table td,
.article-body >>> table th {
  border: 1px solid grey;
  padding: 6px 13px;
}
.article-body >>> table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}
.article-body >>> table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
.article-body >>> .article-figure {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 24px 12px;
}
.article-body >>> .article-figure img {
  max-width: 100%;
  height: auto;
}
.article-body >>> .article-figure p,
.article-body >>> .article-table p {
  font-size: 16px;
  text-indent: 0;
}
.article-body >>> .article-table {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 24px 12px;
}
.article-body >>> .footnotes {
  margin-top: 30px;
  margin-bottom: 30px;
}
.article-body >>> .footnotes p {
  font-size: 16px;
  text-indent: 0;
}
.article-body >>> .katex {
  font-size: 20px !important;
}
.article-download {
  font-size: 0.8em;
  border-color: rgba(0, 0, 0, 0.12);
}
.article-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
}
.article-toc {
  padding-top: 90px !important;
  padding-left: 45px !important;
  width: 275px;
}
.article-toc-sticky {
  position: fixed;
  top: 0;
  left: 0;
}

@media screen and (max-width: 600px) {
  #article-view {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
