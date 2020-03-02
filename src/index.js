// THIS FILE IS AUTOMATICALLY GENERATED IN:
//
//   build-utils/update-file-index.js
//
// YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY

import AlertCOVID from './AlertCOVID.vue'
import AppCard from './AppCard.vue'
import AppView from './AppView.vue'
import ArticleCard from './ArticleCard.vue'
import ArticleView from './ArticleView.vue'
import BaseToolbar from './BaseToolbar.vue'
import DatasetCard from './DatasetCard.vue'
import DatasetView from './DatasetView.vue'
import Footer from './Footer.vue'

// Export components individually
export { AlertCOVID, AppCard, AppView, ArticleCard, ArticleView, BaseToolbar, DatasetCard, DatasetView, Footer }

// What should happen if the user installs the library as a plugin
function install(Vue) {
  Vue.component('AlertCOVID', AlertCOVID)
  Vue.component('AppCard', AppCard)
  Vue.component('AppView', AppView)
  Vue.component('ArticleCard', ArticleCard)
  Vue.component('ArticleView', ArticleView)
  Vue.component('BaseToolbar', BaseToolbar)
  Vue.component('DatasetCard', DatasetCard)
  Vue.component('DatasetView', DatasetView)
  Vue.component('Footer', Footer)
}

// Export the library as a plugin
export default { install: install }
