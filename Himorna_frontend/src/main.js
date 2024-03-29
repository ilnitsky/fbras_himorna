import Vue from 'vue'
import VTooltip from 'v-tooltip'
import App from './App.vue'
import router from './router'
import store from './store/index.ts'
// import Vuelidate from 'vuelidate'


Vue.config.productionTip = false
Vue.use(VTooltip)


new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
