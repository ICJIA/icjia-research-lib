<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <h2>
        <span class="small pl-2" style="color: #666">Authors</span>
        <v-icon>chevron_right</v-icon>
        <template>{{ author.title }}</template>
      </h2>
    </v-card-title>

    <v-divider />

    <v-container>
      <div class="mb-3">
        <h2 class="mb-3 light">About this author</h2>
        <p v-if="author.description">{{ author.description }}</p>
        <p v-else class="italic">(No description.)</p>
      </div>

      <template v-if="author.articles.length > 0">
        <v-divider></v-divider>

        <div class="my-3">
          <h2 class="mb-3 light">Articles by this author</h2>
          <v-flex v-for="article in articles" :key="article.id" class="mb-3">
            <ArticleCard :item="article" />
          </v-flex>
        </div>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import ArticleCard from './ArticleCard'

const getSortedArticleIds = ({ articles }) => articles.sort()

export default {
  components: {
    ArticleCard
  },
  props: {
    item: Object,
    getArticleInfo: Function
  },
  data() {
    return {
      articles: [],
      articleIds: []
    }
  },
  computed: {
    author() {
      return this.item
    }
  },
  async mounted() {
    this.articleIds = getSortedArticleIds(this.item)
    this.articles = await this.getArticles()
  },
  async beforeUpdate() {
    const newArticleIds = getSortedArticleIds(this.item)
    if (this.articleIds !== newArticleIds) {
      this.articleIds = newArticleIds
      this.articles = await this.getArticles()
    }
  },
  methods: {
    async getArticles() {
      return await Promise.all(
        this.articleIds.map(async el => await this.getArticleInfo(el._id))
      )
    }
  }
}
</script>
