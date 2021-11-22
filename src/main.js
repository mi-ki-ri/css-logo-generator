import Vue from 'vue'
import App from './App.vue'
import VueHead from 'vue-head'
import VueHtml2Canvas from 'vue-html2canvas';


Vue.config.productionTip = false
Vue.use(VueHtml2Canvas);
Vue.use(VueHead)

new Vue({
  render: h => h(App),
}).$mount('#app')
