<template>
  <BaseCard :external="dataset.external">
    <v-card-title primary-title>
      <h2>
        <span class="small pl-2" style="color: #666">Datasets</span>
        <v-icon>chevron_right</v-icon>
        <template>{{ dataset.title }}</template>
      </h2>

      <v-spacer />

      <div class="text-xs-center">
        <v-dialog persistent v-model="dialog" width="500">
          <v-btn slot="activator" class="mr-0" flat>
            <template>{{ 'Download' }}</template>
            <v-icon>file_download</v-icon>
          </v-btn>

          <v-card>
            <v-card-title class="grey lighten-2">
              <h3>Did you read the metadata?</h3>
            </v-card-title>

            <v-card-text>{{ msgDialog }} </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="mr-0" @click="downloadHelper">
                <template>{{ 'Yes, download' }}</template>
              </v-btn>

              <v-btn flat class="mr-0" @click="dialog = false">Back</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <BaseButton to="/datasets">back</BaseButton>
    </v-card-title>

    <v-divider />

    <v-container :class="dataset.external ? 'pt-1' : ''">
      <ExternalContribution v-if="dataset.external" />

      <h2 class="mb-3 light">About this dataset</h2>
      <v-layout row wrap>
        <v-flex sm12 md6 lg4>
          <BasePropDisplay name="Updated">
            <template>{{ dataset.date | formatDate }}</template>
          </BasePropDisplay>

          <BasePropDisplay name="Sources">
            <span v-for="(source, i) in dataset.sources" :key="i">
              <template v-if="i > 0">{{
                dataset.sources.length > i + 1 ? ', ' : ' and '
              }}</template>

              <a
                v-if="source.url"
                :href="source.url"
                target="_blank"
                rel="noreferrer"
              >
                {{ source.title }}
              </a>
              <template v-else>{{ source.title }}</template>
            </span>
          </BasePropDisplay>

          <BasePropDisplay v-if="dataset.categories" name="Categories">
            <span v-for="(category, i) in dataset.categories" :key="i">
              <template v-if="i > 0">{{ ', ' }}</template>
              <template>{{ category | capitalize }}</template>
            </span>
          </BasePropDisplay>

          <BasePropDisplay v-if="dataset.tags" name="Tags">
            <BasePropChip
              v-for="tag in dataset.tags"
              :key="tag"
              @chip-click="$emit('tag-click', $event)"
            >
              <template>{{ tag }}</template>
            </BasePropChip>
          </BasePropDisplay>

          <BasePropDisplay v-if="dataset.timeperiod" name="Time period">
            <template>{{ dataset.timeperiod | formatTimeperiod }}</template>
          </BasePropDisplay>
        </v-flex>

        <v-flex sm12 md6 lg8>
          <BasePropDisplay v-if="dataset.unit" name="Unit of analysis">
            <template>{{ dataset.unit | capitalize }}</template>
          </BasePropDisplay>

          <BasePropDisplay v-if="dataset.description" name="Description">
            <template>{{ dataset.description }}</template>
          </BasePropDisplay>

          <BasePropDisplay v-if="dataset.notes" name="Notes">
            <ul>
              <li v-for="note in dataset.notes" :key="note">{{ note }}</li>
            </ul>
          </BasePropDisplay>
        </v-flex>

        <v-flex x12>
          <BaseInfoBlock v-if="dataset.funding">
            <template v-slot:title>{{ 'Funding acknowledgment' }}</template>
            <template v-slot:text>{{ dataset.funding }}</template>
          </BaseInfoBlock>

          <BaseInfoBlock v-if="dataset.citation">
            <template v-slot:title>{{ 'Suggested citation' }}</template>
            <template v-slot:text>
              <span v-html="dataset.citation"></span>
            </template>
          </BaseInfoBlock>
        </v-flex>
      </v-layout>
    </v-container>

    <template v-if="dataset.variables">
      <v-divider></v-divider>

      <v-container class="hidden-sm-and-down">
        <h2 class="mb-3 light">Variables</h2>
        <div ref="variables" class="variables-table font-lato small pb-2"></div>
      </v-container>
    </template>

    <template v-if="hasRelated">
      <v-divider></v-divider>

      <v-container>
        <h2 class="mb-3 light">Related</h2>

        <ul class="font-lato small">
          <li v-for="(app, i) in dataset.apps" :key="`app${i}`">
            <router-link :to="app.slug | path('apps')">
              <template>{{ `[APP] ${app.title}` }}</template>
            </router-link>
          </li>
          <li v-for="(article, i) in dataset.articles" :key="`article${i}`">
            <router-link :to="article.slug | path('articles')">
              <template>{{ `[ARTICLE] ${article.title}` }}</template>
            </router-link>
          </li>
        </ul>
      </v-container>
    </template>
  </BaseCard>
</template>

<script>
import { allContentMixin, datasetMixin } from './mixins/contentMixin'
import BaseButton from './components/BaseButton'
import BaseCard from './components/BaseCard'
import BaseInfoBlock from './components/BaseInfoBlock'
import BasePropChip from './components/BasePropChip'
import BasePropDisplay from './components/BasePropDisplay'
import ExternalContribution from './components/ExternalContribution'

export default {
  mixins: [allContentMixin, datasetMixin],
  components: {
    BaseButton,
    BaseCard,
    BaseInfoBlock,
    BasePropChip,
    BasePropDisplay,
    ExternalContribution
  },
  props: {
    item: Object,
    downloader: Function
  },
  data() {
    return {
      dialog: false,
      msgDialog:
        'It is important for you to know the context of the dataset you are about to download. Make sure you have read and understand the metatdata shown in this page before using the dataset.'
    }
  },
  computed: {
    dataset() {
      return this.item
    },
    hasRelated() {
      const item = this.item
      return (
        (item.apps && item.apps.length) ||
        (item.articles && item.articles.length)
      )
    }
  },
  mounted() {
    const item = this.item
    if (item.variables)
      this.$refs.variables.innerHTML = this.array2table(item.variables)
  },
  methods: {
    array2table(array) {
      let cols = ['name', 'type', 'definition', 'values']
      let header = ''
      let body = ''

      cols.forEach(col => {
        header += '<th>' + col[0].toUpperCase() + col.slice(1) + '</th>'
      })

      array.forEach(row => {
        body += '<tr>'

        cols.forEach(col => {
          let value = row[col] ? row[col] : ''
          body += '<td>' + value + '</td>'
        })

        body += '</tr>'
      })

      return (
        '<table><thead><tr>' +
        header +
        '</tr></thead><tbody>' +
        body +
        '</tbody></table>'
      )
    },
    async downloadHelper() {
      await this.downloader()
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.variables-table {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.variables-table >>> table {
  border-collapse: collapse;
  border-spacing: 0;
}

.variables-table >>> table th {
  font-weight: 600;
}

.variables-table >>> table td,
.variables-table >>> table th {
  border: 1px solid grey;
  padding: 6px 13px;
}

.variables-table >>> table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.variables-table >>> table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
</style>
