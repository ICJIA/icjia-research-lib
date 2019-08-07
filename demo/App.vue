<template>
  <v-app>
    <RHBaseToolbar :menu="true">
      <template v-slot:titleExtra>
        <span class="light"> Library Demo</span>
      </template>
      <template v-slot:toolbarItems>
        <v-btn v-for="view in views" :key="view" flat>{{ view }}</v-btn>
      </template>

      <template v-slot:toolbarDrawerItems>
        <v-list-tile v-for="(view, i) in views" :key="i">
          <v-list-tile-title>{{ view }}</v-list-tile-title>
        </v-list-tile>
      </template>
    </RHBaseToolbar>

    <v-layout justify-center row wrap class="controller">
      <h3 class="pt-3">Demo Options</h3>

      <v-flex xs12>
        <v-radio-group v-model="contentType" row class="justify-center">
          <v-radio label="App" value="app"></v-radio>
          <v-radio label="Article" value="article"></v-radio>
          <v-radio label="Dataset" value="dataset"></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex xs9 md2>
        <v-switch
          v-model="external"
          class="justify-center"
          :label="`External contribution: ${external.toString()}`"
          :disabled="contentType === 'author'"
        ></v-switch>
      </v-flex>

      <v-flex xs9 md2>
        <v-switch
          v-model="preview"
          class="justify-center"
          :label="`Preview mode: ${preview.toString()}`"
          :disabled="contentType === 'author'"
        ></v-switch>
      </v-flex>

      <v-flex xs9 md2>
        <v-switch
          v-model="view"
          class="justify-center"
          :label="`Full view: ${view.toString()}`"
          :disabled="contentType === 'author'"
        ></v-switch>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <template v-if="view">
      <v-flex v-if="contentType === 'article'" xs12>
        <RHArticleView
          :key="`articleView${componentKey}`"
          :item="article"
          :downloader="articlesDownloader"
          :preview="preview"
          @tag-click="onTagClick($event)"
        />
      </v-flex>

      <v-container v-else>
        <v-layout justify-center>
          <v-flex xs12 sm10 md8>
            <RHAppView
              v-if="contentType === 'app'"
              :key="`appView${componentKey}`"
              :item="app"
              :preview="preview"
              @tag-click="onTagClick($event)"
            />
            <RHDatasetView
              v-if="contentType === 'dataset'"
              :key="`datasetView${componentKey}`"
              :item="dataset"
              :preview="preview"
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
            <v-flex xs12 md6 lg4>
              <RHAppCard
                :key="`appCard${componentKey}`"
                :item="app"
                :preview="preview"
                @tag-click="onTagClick($event)"
              />
            </v-flex>
          </v-layout>

          <RHArticleCard
            v-if="contentType === 'article'"
            :key="`articleCard${componentKey}`"
            :item="article"
            :preview="preview"
            @tag-click="onTagClick($event)"
          />

          <v-layout v-if="contentType === 'dataset'" row wrap justify-center>
            <v-flex xs12 xl6>
              <RHDatasetCard
                :key="`datasetCard${componentKey}`"
                :item="dataset"
                :preview="preview"
                @tag-click="onTagClick($event)"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="mb-5"></div>

    <RHFooter :agency="footer.agency" :github="footer.github" />
  </v-app>
</template>
<script>
import data from './demo.json'
import { saveAs } from 'file-saver'

export default {
  name: 'App',
  data() {
    return {
      componentKey: 0,
      contentType: 'app',
      data,
      external: false,
      footer: {
        agency: {
          name: 'Illinois Criminal Justice Information Authority',
          url: 'http://www.icjia.state.il.us/'
        },
        github: {
          url: 'https://github.com/icjia/icjia-research-lib',
          version: '0.1.2'
        }
      },
      preview: false,
      view: false,
      views: ['foo', 'bar']
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

<style scoped>
.controller {
  background-color: #466c8c;
  color: white !important;
}

.controller >>> label.v-label.theme--light,
.controller >>> i.v-icon.material-icons.theme--light {
  color: white;
}

.v-input >>> .theme--light.v-messages {
  display: none !important;
}
</style>
