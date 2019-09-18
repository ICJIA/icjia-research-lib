import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify/lib'
import '../style.css'

import App from './App.vue'
import {
  AppCard as RHAppCard,
  AppView as RHAppView,
  ArticleCard as RHArticleCard,
  ArticleView as RHArticleView,
  BaseToolbar as RHBaseToolbar,
  DatasetCard as RHDatasetCard,
  DatasetView as RHDatasetView,
  Footer as RHFooter
} from '../src'
import icons from '../src/icons.js'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Vuetify)

const router = new Router({
  mode: 'history'
})

const vuetify = new Vuetify({
  theme: { disable: true },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      ...icons
    }
  }
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
