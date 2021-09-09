import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store/store';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

Vue.http.options.root =
  'https://vuejs-stock-trader-e55a2-default-rtdb.firebaseio.com/';

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
