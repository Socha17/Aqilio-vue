<template>

  <aqilio v-if="show" APIKey="3c036372d9858eb144f12edcfce72d8762311c9c881b0e2c04097479c4959ca0" flowId="b25a21b7f4757261b1" :progress="progress"></aqilio>
  <!-- <Aqilio APIKey="123" flowId="4567" textInputComponent="defaultComponents/userTextInput"/> -->
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      show: true,
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
