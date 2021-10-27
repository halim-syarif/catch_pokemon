import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import infiniteScroll from 'vue-infinite-scroll'
import loading from 'vuejs-loading-screen'
import toasted from 'vue-toasted'

Vue.config.productionTip = false
Vue.use(infiniteScroll)
Vue.use(toasted)
Vue.use(loading, {
  bg: 'rgba(151, 151, 151, 0.70)',
  icon: 'refresh',
  size: 2,
  slot: `
    <div class="px-5 py-3 bg-gray-800 rounded">
      <h3 class="text-3xl text-white"><i class="fas fa-spinner fa-spin"></i>   I Will Catch U...</h3>
    </div>
  `
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
