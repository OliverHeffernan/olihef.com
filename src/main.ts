import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const devicons = document.createElement('link');
devicons.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
devicons.rel = 'stylesheet';
document.head.appendChild(devicons);

const app = createApp(App)

app.use(router)

app.mount('#app')
