import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
