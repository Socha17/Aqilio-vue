<template>

  <aqilio v-if="show" apiKey="e995be1d52330dc9f93cef4ecf58793a0548817c57d07ad4c9aa62cf9bc94a44" flowId="84b09634-b209-4572-93d0-46d91c9ca8f3" :progress="progress" :customComponents="customComponents" @lastStepComplete="lastStepComplete"></aqilio>
</template>

<script>

import { shallowRef } from 'vue'
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
