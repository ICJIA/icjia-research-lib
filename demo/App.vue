<template>
  <v-app>
    <RHBaseToolbar :menu="true">
      <template v-slot:titleExtra>
        <span class="light"> Library Demo</span>
      </template>
      <template v-slot:toolbarItems>
        <v-btn v-for="view in views" :key="view" flat>
          <template>{{ view }}</template>
        </v-btn>
      </template>

      <template v-slot:toolbarDrawerItems>
        <v-list-tile v-for="(view, i) in views" :key="i">
          <v-list-tile-title>{{ view }}</v-list-tile-title>
        </v-list-tile>
      </template>
    </RHBaseToolbar>

    <v-layout justify-center row wrap>
      <v-flex xs9 md3>
        <v-radio-group v-model="contentType" row>
          <v-radio label="App" value="app"></v-radio>
          <v-radio label="Article" value="article"></v-radio>
          <v-radio label="Dataset" value="dataset"></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex xs9 md2>
        <v-switch
          v-model="external"
          :label="`External contribution: ${external.toString()}`"
          :disabled="contentType === 'author'"
        ></v-switch>
      </v-flex>

      <v-flex xs9 md1>
        <v-switch
          v-model="view"
          :label="`Full view: ${view.toString()}`"
          :disabled="contentType === 'author'"
        ></v-switch>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <template v-if="view">
      <v-flex v-if="contentType === 'article'" xs12>
        <RHArticleView
          :item="article"
          :key="`articleView${componentKey}`"
          :downloader="articlesDownloader"
          @tag-click="onTagClick($event)"
        />
      </v-flex>

      <v-container v-else>
        <v-layout justify-center>
          <v-flex xs12 sm10 md8>
            <RHAppView
              v-if="contentType === 'app'"
              :item="app"
              :key="`appView${componentKey}`"
              @tag-click="onTagClick($event)"
            />
            <RHDatasetView
              v-if="contentType === 'dataset'"
              :item="dataset"
              :key="`datasetView${componentKey}`"
              :downloader="datasetsDownloader"
              @tag-click="onTagClick($event)"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </template>

    <v-container v-else>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm10 xl8>
          <v-layout v-if="contentType === 'app'" row wrap justify-center>
            <v-flex xs12 sm6 lg4>
              <RHAppCard
                :item="app"
                :key="`appCard${componentKey}`"
                @tag-click="onTagClick($event)"
              />
            </v-flex>
          </v-layout>

          <RHArticleCard
            v-if="contentType === 'article'"
            :item="article"
            :key="`articleCard${componentKey}`"
            @tag-click="onTagClick($event)"
          />

          <v-layout v-if="contentType === 'dataset'" row wrap justify-center>
            <v-flex xs12 xl6>
              <RHDatasetCard
                :item="dataset"
                :key="`datasetCard${componentKey}`"
                @tag-click="onTagClick($event)"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <RHFooter :agency="footer.agency" :github="footer.github" />
  </v-app>
</template>
<script>
import data from '../src/assets/demo.json'
import { saveAs } from 'file-saver'

export default {
  name: 'App',
  data() {
    return {
      contentType: 'app',
      view: false,
      views: ['foo', 'bar'],
      external: false,
      componentKey: 0,
      data,
      footer: {
        agency: {
          name: 'Illinois Criminal Justice Information Authority',
          url: 'http://www.icjia.state.il.us/'
        },
        github: {
          url: '/',
          version: '0.1.0'
        }
      }
    }
  },
  computed: {
    app() {
      let item = this.data.app
      item.external = this.external
      return item
    },
    article() {
      let item = this.data.article
      item.external = this.external
      return item
    },
    dataset() {
      let item = this.data.dataset
      item.external = this.external
      return item
    }
  },
  mounted() {
    this.$watch(
      'external',
      () => {
        this.rerender()
      },
      { immediate: true }
    )
  },
  methods: {
    rerender() {
      this.componentKey += 1
    },
    onTagClick(x) {
      alert(x)
    },
    articlesDownloader(type) {
      const file = this.article[`${type}file`]
      saveAs(file.url, decodeURI(file.name))
    },
    datasetsDownloader() {
      const file = this.dataset.datafile
      saveAs(file.url, decodeURI(file.name))
    }
  }
}
</script>
