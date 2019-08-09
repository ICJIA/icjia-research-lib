<template>
  <BaseCard :view="true" :external="dataset.external">
    <v-row class="mx-0 pa-6">
      <h2>
        <span class="small pl-2" style="color: #666">Datasets</span>
        <v-icon>chevron_right</v-icon>
        <template>{{ dataset.title }}</template>
      </h2>

      <v-spacer></v-spacer>

      <div class="text-center">
        <v-dialog persistent v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="mr-0" text>
              <template>{{ 'Download' }}</template>
              <v-icon>file_download</v-icon>
            </v-btn>
          </template>

          <v-sheet class="font-lato">
            <v-container pa-6>
              <h3 class="pb-6">Did you read the metadata?</h3>
              <template>{{ msgDialog }}</template>
            </v-container>

            <v-row class="mx-0 px-3 pb-3" justify="end">
              <v-btn text class="mr-0" @click="downloadHelper">
                <template>{{ 'Yes, download' }}</template>
              </v-btn>

              <v-btn text class="mr-0" @click="dialog = false">Back</v-btn>
            </v-row>
          </v-sheet>
        </v-dialog>
      </div>

      <BaseButton :to="preview ? '' : '/datasets'">back</BaseButton>
    </v-row>

    <v-divider />

    <v-container class="pa-6" :class="dataset.external ? 'pt-1' : ''">
      <ExternalContribution v-if="dataset.external" />

      <h2 class="mb-4 light">About this dataset</h2>

      <v-row class="mx-0">
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
      </v-row>

      <div v-if="dataset.variables" class="hidden-sm-and-down py-6">
        <h2 class="mb-4 light">Variables</h2>
        <div ref="variables" class="variables-table font-lato small"></div>
      </div>

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

      <BaseInfoBlock v-if="hasRelated">
        <template v-slot:title>{{ 'Related contents' }}</template>
        <template v-slot:text>
          <ul class="font-lato">
            <li v-for="(app, i) in dataset.apps" :key="`app${i}`">
              <router-link :to="preview ? '' : `/apps/${app.slug}`">
                <template>{{ `[APP] ${app.title}` }}</template>
              </router-link>
            </li>
            <li v-for="(article, i) in dataset.articles" :key="`article${i}`">
              <router-link :to="preview ? '' : `/articles/${article.slug}`">
                <template>{{ `[ARTICLE] ${article.title}` }}</template>
              </router-link>
            </li>
          </ul>
        </template>
      </BaseInfoBlock>
    </v-container>
  </BaseCard>
</template>

<script>
import { baseFilters } from './mixins/contentMixin'
import BaseButton from './components/BaseButton'
import BaseCard from './components/BaseCard'
import BaseInfoBlock from './components/BaseInfoBlock'
import BasePropChip from './components/BasePropChip'
import BasePropDisplay from './components/BasePropDisplay'
import ExternalContribution from './components/ExternalContribution'

const arr2table = ({ arr, cols = ['name', 'type', 'definition', 'values'] }) =>
  `<table>${getThead({ cols })}${getTbody({ cols, rows: arr })}</table>`

const getRow = (row, cols) =>
  `<tr>${cols.map(col => `<td>${row[col] ? row[col] : ''}</td>`).join('')}</tr>`

const getTbody = ({ rows, cols }) =>
  `<tbody>${rows.map(row => getRow(row, cols)).join('')}</tbody>`

const getThead = ({ cols }) =>
  `<thead><tr>${cols
    .map(col => `<th>${col[0].toUpperCase()}${col.slice(1)}</th>`)
    .join('')}</tr></tbody>`

export default {
  components: {
    BaseButton,
    BaseCard,
    BaseInfoBlock,
    BasePropChip,
    BasePropDisplay,
    ExternalContribution
  },
  filters: {
    formatTimeperiod({ yearmin, yearmax, yeartype }) {
      return `${yearmin}-${yearmax} (${yeartype})`
    }
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
      const { apps, articles } = this.item
      return (apps && apps.length) || (articles && articles.length)
    }
  },
  mounted() {
    const { variables } = this.item
    if (variables)
      this.$refs.variables.innerHTML = arr2table({ arr: variables })
  },
  methods: {
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
