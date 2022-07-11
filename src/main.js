import { createApp } from 'vue'
import App from './App.vue'
import AqilioPlugin from "./AqilioPlugin";

const app = createApp(App);

app.use(AqilioPlugin)
app.mount('#app');
