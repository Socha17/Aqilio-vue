import AqilioComponent from "./components/Aqilio.vue";
import AqilioAPI from "./aqilio/AqilioAPI.js";
import AqilioVueComponentsPlugin from 'aqilio-vue-components'
import 'aqilio-vue-components/styles.css'

export default {
 install: (app) => {
  app.component("aqilio", AqilioComponent);
  app.use(AqilioVueComponentsPlugin);

  let instance = AqilioAPI();
  app.config.globalProperties.$aqilio = instance;
  app.provide('$aqilio', instance)
 }
};

export { AqilioComponent };
