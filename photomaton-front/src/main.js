import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PhotomatonPage from "./components/PhotomatonPage.vue";
const router = new VueRouter({
  routes: [{
    path: "/photomaton",
    component: PhotomatonPage
  }]
});

new Vue({
  render: h => h(App),
}).$mount('#app')