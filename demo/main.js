import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify/lib'
import '../src/style.css'

import App from './App.vue'
import RHAppCard from '../src/AppCard.vue'
import RHAppView from '../src/AppView.vue'
import RHArticleCard from '../src/ArticleCard.vue'
import RHArticleView from '../src/ArticleView.vue'
import RHBaseToolbar from '../src/BaseToolbar.vue'
import RHDatasetCard from '../src/DatasetCard.vue'
import RHDatasetView from '../src/DatasetView.vue'
import RHFooter from '../src/Footer.vue'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Vuetify)

const router = new Router({
  mode: 'history'
})

const vuetify = new Vuetify({
  theme: { disable: true }
})

const Components = {
  RHAppCard,
  RHAppView,
  RHArticleCard,
  RHArticleView,
  RHBaseToolbar,
  RHDatasetCard,
  RHDatasetView,
  RHFooter
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount(`#app`)
