<template>

  <aqilio v-if="show" apiKey="b9681193f34a94ddab424faf319b3d49cd6a44504c6a1ff08b465614619d4383" flowId="f18c472b-991c-40e6-b519-ef23356d8f9f" :progress="progress" :customComponents="customComponents" @lastStepComplete="lastStepComplete"></aqilio>
</template>

<script>

import { defineAsyncComponent, shallowRef, markRaw } from 'vue'
import UserTextInput from "./components/defaultComponents/userTextInput.vue";
import Checkbox from "./components/defaultComponents/checkbox.vue";

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      show: true,
      customComponents: [ shallowRef(UserTextInput), shallowRef(Checkbox) ],
      progress: null,
      // progress: {
      //   "first-step": {
      //       "key": "first-step",
      //       "value": "111",
      //       "stepOrder": 1
      //   },
      //   "second-step": {
      //       "key": "second-step",
      //       "value": "title here",
      //       "stepOrder": 2
      //   }
      // },
    }
  },
  mounted() {
  },
  methods: {
    lastStepComplete() {
      console.log("last step emit");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
