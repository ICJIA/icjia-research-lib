<template>
  <v-app>
    <RHBaseToolbar :menu="true">
      <template v-slot:titleExtra>
        <span class="light"> Library Demo</span>
      </template>
      <template v-slot:toolbarItems>
        <v-btn v-for="view in views" :key="view" text>{{ view }}</v-btn>
      </template>

      <template v-slot:toolbarDrawerItems>
        <v-list-item v-for="(view, i) in views" :key="i">
          <v-list-item-title>{{ view }}</v-list-item-title>
        </v-list-item>
      </template>
    </RHBaseToolbar>

    <v-content class="mb-12">
      <v-row class="controller mx-0" justify="center" no-gutters>
        <h3 class="pt-4">Demo Options</h3>

        <v-col cols="12">
          <v-radio-group v-model="contentType" class="justify-center" row>
            <v-radio label="App" value="app"></v-radio>
            <v-radio label="Article" value="article"></v-radio>
            <v-radio label="Dataset" value="dataset"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="9" md="2">
          <v-switch
            v-model="external"
            class="justify-center"
            :label="`External contribution: ${external.toString()}`"
            :disabled="contentType === 'author'"
          ></v-switch>
        </v-col>

        <v-col cols="9" md="2">
          <v-switch
            v-model="preview"
            class="justify-center"
            :label="`Preview mode: ${preview.toString()}`"
            :disabled="contentType === 'author'"
          ></v-switch>
        </v-col>

        <v-col cols="9" md="2">
          <v-switch
            v-model="view"
            class="justify-center"
            :label="`Full view: ${view.toString()}`"
            :disabled="contentType === 'author'"
          ></v-switch>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <template v-if="view">
        <RHArticleView
          v-if="contentType === 'article'"
          :key="`articleView${componentKey}`"
          :item="article"
          :downloader="articlesDownloader"
          :preview="preview"
          @tag-click="onTagClick($event)"
        />

        <v-col v-else class="mx-auto" cols="12" sm="10" md="8" xl="7">
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
        </v-col>
      </template>

      <template v-else>
        <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
          <v-col
            v-if="contentType === 'app'"
            class="mx-auto pa-0"
            cols="12"
            md="6"
            lg="4"
          >
            <RHAppCard
              :key="`appCard${componentKey}`"
              :item="app"
              :preview="preview"
              @tag-click="onTagClick($event)"
            />
          </v-col>

          <v-col v-if="contentType === 'article'" class="mx-auto pa-0">
            <RHArticleCard
              :key="`articleCard${componentKey}`"
              :item="article"
              :preview="preview"
              @tag-click="onTagClick($event)"
            />
          </v-col>

          <v-col
            v-if="contentType === 'dataset'"
            class="mx-auto pa-0"
            cols="12"
            lg="6"
          >
            <RHDatasetCard
              :key="`datasetCard${componentKey}`"
              :item="dataset"
              :preview="preview"
              @tag-click="onTagClick($event)"
            />
          </v-col>
        </v-col>
      </template>
    </v-content>

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
          version: '0.3.1'
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
  font-family: 'Lato', sans-serif;
}

.controller >>> label.v-label.theme--light,
.controller >>> i.v-icon.material-icons.theme--light {
  color: white;
}

.v-input >>> .theme--light.v-messages {
  display: none !important;
}
</style>
