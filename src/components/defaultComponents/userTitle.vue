<template>
  <label for="fname">user title</label>
  <button type="button" @click="goNext">next</button>
  <button type="button" @click="goBack">back</button>
</template>


<script>

export default {
  props: ['aqilio-data'],
  components: {

  },
  methods: {
    goNext() {
        console.log(this.$aqilio.getAqilioInstance());
        this.$aqilio.setCurrentStepValue("title here")
        this.$aqilio.nextStep()
    },
    goBack() {
        console.log('go back');
        this.$aqilio.previousStep()
    }
  }
};
</script>
