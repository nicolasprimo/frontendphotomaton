import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import PhotomatonPage from "./components/PhotomatonPage.vue";
import Carousel from "./components/Carousel";
import LoginPage from './components/LoginPage.vue'
const router = new VueRouter({
  routes: [{
      path: "/",
      component: Carousel,
    },
    {
      path: "/photomaton",
      component: PhotomatonPage,
    },
    {
      path: '/login',
      component: LoginPage
    }
  ]
});
// router.beforeEach((to, from, next) => {
//   if (window.localStorage('token') === '') {
//     console.log('hello')
//     next('/login')
//   } else {
//     next()
//   }
// })



export default router;