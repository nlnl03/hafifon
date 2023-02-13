import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify.js'
console.log(vuetify)

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
