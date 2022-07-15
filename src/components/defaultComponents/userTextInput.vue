<template>
  <label for="fname">user text input</label>
  <input v-model="text" type="text" id="fname" name="fname"><br><br>
  <button type="button" @click="goNext">next</button>
  <button type="button" @click="goBack">back</button>
</template>


<script>

export default {
  name: 'userTextInput',
  props: ['aqilioData'],
  components: {

  },
  data() {
    return {
      text: '',
    }
  },
  mounted() {
    if (this.aqilioData) {
      this.text = this.aqilioData.value
    }
  },
  methods: {
    goNext() {
        this.$aqilio.setCurrentStepValue(this.text)
        this.$aqilio.nextStep()
    },
    goBack() {
        this.$aqilio.previousStep()
    }
  }
};
</script>
