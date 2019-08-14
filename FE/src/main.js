import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueSession from 'vue-session'
import * as firebase from "firebase/app";
import "firebase/auth";

import FBconfig from '../firebase.config'

Vue.prototype.$http = Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(VueSession)

var firebaseConfig = {
  apiKey: FBconfig.firebaseConfig().apiKey,
  authDomain: FBconfig.firebaseConfig().authDomain,
  databaseURL: FBconfig.firebaseConfig().databaseURL,
  projectId: FBconfig.firebaseConfig().projectId,
  storageBucket: FBconfig.firebaseConfig().storageBucket,
  messagingSenderId: FBconfig.firebaseConfig().messagingSenderId,
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

