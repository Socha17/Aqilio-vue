import AqilioComponent from "./components/Aqilio.vue";
import AqilioAPI from "./aqilio/AqilioAPI.js";

export default {
 install: (app) => {
  app.component("aqilio", AqilioComponent);

  let instance = AqilioAPI();
  app.config.globalProperties.$aqilio = instance;
  app.provide('$aqilio', instance)
 }
};

export { AqilioComponent };
