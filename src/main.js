import { createApp } from 'vue'
import App from './App.vue'
import AqilioPlugin from "./AqilioPlugin";
import UserTextInput from "./components/defaultComponents/UserTextInput.vue";

const app = createApp(App);

app.component('UserTextInput', UserTextInput);

app.use(AqilioPlugin)
app.mount('#app');
