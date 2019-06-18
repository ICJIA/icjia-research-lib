<template>
  <div class="mb-5">
    <v-img :height="splashHeight" :src="article.splash"></v-img>

    <v-layout row wrap>
      <v-flex md2 class="hidden-sm-and-down">
        <div
          :class="{
            'sidebar-sticky': isTOCSticky,
            'sidebar-md-only': isMedium,
            'sidebar-lg-and-up': !isMedium
          }"
        >
          <ArticleTOC
            v-if="headings"
            :headings="headings"
            :activeHeading="activeHeading"
            v-scroll="onScrollTOC"
          />

          <v-divider
            v-if="article.reportpdf || article.slidespdf"
            class="my-3"
          ></v-divider>

          <v-btn
            v-if="article.reportpdf"
            block
            outline
            class="small"
            @click="downloadHelper('report')"
          >
            <template>{{ 'Get PDF' }}</template>
            <v-icon>get_app</v-icon>
          </v-btn>

          <v-btn
            v-if="article.slidespdf"
            block
            outline
            class="small"
            @click="downloadHelper('slides')"
          >
            <template>{{ 'Get slides' }}</template>
            <v-icon>get_app</v-icon>
          </v-btn>
        </div>
      </v-flex>

      <v-flex md10>
        <v-layout justify-center row id="article-view">
          <v-flex xs12 sm10 pt-4>
            <v-layout align-center justify-space-between row>
              <div class="greycolor font-lato uppercase">
                <span v-for="type in article.type" :key="type">{{ type }}</span>

                <template>{{ '&nbsp;&nbsp;|&nbsp;&nbsp;' }}</template>

                <span
                  v-for="(category, i) in article.categories"
                  :key="category"
                  class="uppercase"
                >
                  <template v-if="i > 0">{{ ', ' }}</template>
                  <template>{{ category }}</template>
                </span>

                <template>{{ '&nbsp;&nbsp;' }}</template>

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

              <BaseButton to="/articles">back</BaseButton>
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

                <router-link :to="author.slug | path('authors')">
                  <template>{{ author.title }}</template>
                </router-link>
              </span>

              <template>{{ '&nbsp;&nbsp;|&nbsp;&nbsp;' }}</template>

              <span v-if="article.date" class="uppercase font-oswald">
                <template>{{ article.date | formatDate }}</template>
              </span>

              <template>{{ '&nbsp;&nbsp;|&nbsp;&nbsp;' }}</template>

              <v-icon id="print-button" @click="printArticle">fa-print</v-icon>
            </div>

            <template v-if="hasRelated">
              <v-divider></v-divider>

              <v-container>
                <h2 class="mb-3 light">Related</h2>

                <ul class="font-lato">
                  <li v-for="(app, i) in article.apps" :key="`app${i}`">
                    <router-link :to="app.slug | path('apps')">
                      <template>{{ `[APP] ${app.title}` }}</template>
                    </router-link>
                  </li>
                  <li
                    v-for="(dataset, i) in article.datasets"
                    :key="`dataset${i}`"
                  >
                    <router-link :to="dataset.slug | path('datasets')">
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
                    <template>{{ ' ' + article.doi }}</template>
                  </a>
                </template>
              </BaseInfoBlock>
            </div>

            <v-divider></v-divider>

            <div
              class="article-body"
              v-html="articleBody.footer"
              v-scroll="onScroll"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { allContentMixin } from './mixins/contentMixin'
import ArticleTOC from './components/ArticleTOC'
import BaseButton from './components/BaseButton'
import BaseInfoBlock from './components/BaseInfoBlock'
import BasePropChip from './components/BasePropChip'
import ExternalContribution from './components/ExternalContribution'

const mdOpts = {
  html: true,
  linkify: true,
  typographer: true
}

const mdAnchorOpts = {
  level: 2,
  slugify: s =>
    String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
}

const md = require('markdown-it')(mdOpts)
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-anchor'), mdAnchorOpts)

export default {
  mixins: [allContentMixin],
  components: {
    ArticleTOC,
    BaseButton,
    BaseInfoBlock,
    BasePropChip,
    ExternalContribution
  },
  props: {
    item: Object,
    downloader: Function
  },
  data() {
    return {
      activeHeading: 'introduction',
      baseUrl: 'localhost:8080/',
      isTOCSticky: false,
      splashHeight: 500,
      viewTitleHeight: 60 + 80
    }
  },
  computed: {
    article() {
      return this.item
    },
    hasRelated() {
      const item = this.item
      return (
        (item.apps && item.apps.length) ||
        (item.datasets && item.datasets.length)
      )
    },
    isMedium() {
      return this.$vuetify.breakpoint.name === 'md'
    },
    articleBody() {
      const item = this.item
      if (item.markdown) {
        let markdown = item.markdown
        if (item.images) {
          item.images.forEach(image => {
            markdown += `\n\n[${image.title}]: ${image.src}`
          })
        }
        const spliter = '<hr class="footnotes-sep">'
        const body = md.render(markdown).split(spliter)
        return {
          main: body[0],
          footer: body[1]
        }
      } else return ''
    },
    headings() {
      const item = this.item
      if (item.markdown) {
        const markdown = md.render(item.markdown)
        const doc = new DOMParser().parseFromString(markdown, 'text/html')
        return doc.querySelectorAll('h2')
      } else {
        return null
      }
    }
  },
  methods: {
    async downloadHelper(type) {
      await this.downloader(this.item._id, type)
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
      const win = window.open('', '')
      const html = document.getElementById('article-view').innerHTML
      let style = ''

      document
        .querySelectorAll('link[rel="stylesheet"], style')
        .forEach(node => {
          style += node.outerHTML
        })

      win.document.write(
        `<!DOCTYPE html><html><head>${style}</head><body>${html}</body></html>`
      )
      win.document.close()
      win.focus()
      win.print()
      win.close()
    }
  }
}
</script>

<style scoped>
a {
  white-space: normal;
}

.article-type {
  color: grey;
}

.article-img {
  width: 100%;
}

.article-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
}

.article-abstract {
  font-weight: 300;
  font-size: 20px;
}

/* headers */
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

/* footnotes */
.article-body >>> .footnotes {
  margin-top: 30px;
  margin-bottom: 30px;
}

.article-body >>> .footnotes p {
  font-size: 16px;
  text-indent: 0;
}

/* figure and table */
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

/* blockquote */
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

/* others */
#print-button:hover {
  color: #1976d2;
}

.sidebar-md-only {
  padding-top: 90px !important;
  padding-left: 45px !important;
  max-width: 150px;
}

.sidebar-lg-and-up {
  padding-top: 90px !important;
  padding-left: 90px !important;
  max-width: 300px;
}

.sidebar-sticky {
  position: fixed;
  top: 0;
  left: 0;
}

.v-btn.v-btn--outline {
  border-color: rgba(0, 0, 0, 0.12);
}

@media screen and (max-width: 600px) {
  #article-view {
    padding-left: 32px;
  }
}
</style>
