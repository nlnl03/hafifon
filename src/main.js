import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
 import VueSweetalert2 from 'vue-sweetalert2';
 import 'sweetalert2/dist/sweetalert2.min.css'
 const app = createApp(App)
 
 app.config.globalProperties.$sharePointUrl = process.env.NODE_ENV =='production'? "https://portal.army.idf/sites/hafifon383/_api/web/Lists/" : "http://localhost:3000/" 
 app.config.globalProperties.$isSharePointUrl = process.env.NODE_ENV =='production'


 app.use(router)
app.use(VueSweetalert2)
app.mount('#app')

  