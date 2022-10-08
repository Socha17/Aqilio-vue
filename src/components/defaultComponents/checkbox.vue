<template>
  <label for="checkbox">default</label>
  <input type="checkbox" id="checkbox" name="checkbox"><br><br>
  <button type="button" @click="goNext">next</button>
  <button type="button" @click="goBack">back</button>
</template>


<script>

export default {
  name: 'checkbox',
  props: ['aqilioData'],
  components: {

  },
  methods: {
    goNext() {
        console.log(this.$aqilio.getAqilioInstance());
        this.$aqilio.setCurrentStepValue("checkbox value")
        this.$aqilio.nextStep()
    },
    goBack() {
        console.log('go back');
        this.$aqilio.previousStep()
    }
  }
};
</script>
