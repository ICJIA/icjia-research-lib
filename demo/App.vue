<template>
  <v-app>
    <RHBaseToolbar>
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

    <v-content>
      <v-row class="controller mx-0" justify="center" no-gutters>
        <h3 class="pt-4">Demo Options</h3>

        <v-col cols="12">
          <v-radio-group
            v-model="contentType"
            class="justify-center"
            label="Content type"
            row
          >
            <v-radio label="App" value="app"></v-radio>
            <v-radio label="Article" value="article"></v-radio>
            <v-radio label="Dataset" value="dataset"></v-radio>
          </v-radio-group>
        </v-col>

        <v-row justify="center" no-gutters>
          <v-checkbox
            v-model="external"
            class="mx-4"
            label="External"
          ></v-checkbox>

          <v-checkbox
            v-show="contentType === 'dataset'"
            v-model="project"
            class="mx-4"
            label="Project"
          ></v-checkbox>

          <v-checkbox
            v-model="preview"
            class="mx-4"
            label="Preview"
          ></v-checkbox>

          <v-switch
            v-model="view"
            class="mx-4"
            :label="`View: ${view ? 'Full' : 'Card'}`"
          ></v-switch>
        </v-row>
      </v-row>

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
      project: false,
      footer: {
        agency: {
          name: 'Illinois Criminal Justice Information Authority',
          url: 'http://www.icjia.state.il.us/'
        },
        github: {
          url: 'https://github.com/icjia/icjia-research-lib',
          version: '0.5.0'
        }
      },
      preview: true,
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
      item.project = this.project
      return item
    }
  },
  mounted() {
    this.$watch('external', () => this.rerender(), { immediate: true })
    this.$watch('project', () => this.rerender(), { immediate: true })
  },
  methods: {
    rerender() {
      this.componentKey += 1
    },
    onTagClick(x) {
      alert(x.target.innerText)
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

.controller >>> .v-label.theme--light,
.controller >>> i.v-icon.material-icons.theme--light {
  color: white;
}

.v-input >>> .theme--light.v-messages {
  display: none !important;
}
</style>
