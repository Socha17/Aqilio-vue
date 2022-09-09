<template>
  <div v-if="currentFlowStep">
    <component v-bind:is="currentFlowStep.component" :aqilioData="aqilioPropsData"></component>
  </div>
</template>


<script>
import axios from 'axios';
import eventBus from '../aqilio/bus.js'

export default {
  props: {
    apiKey: {
      type: String,
      required: true
    },
    flowId: {
      type: String,
      required: true
    },
    progress: {
      type: Object,
      required: false
    },
    customComponents: {
      type: Array,
      required: false
    },
  },
  components: {  },
  data() {
    return {
      connection: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'https://aqilio.com/api',
      flow: null,
      flowState: null,
      currentFlowStep: null,
      aqilioPropsData: null,
    }
  },
  mounted() {
    if (this.$aqilio.instanciateInstance(this.flowId)) {
      if (this.progress) {
        this.$aqilio.setProgress(this.progress)
      }
      this.getAqilioFlow()
      eventBus.on('aqilio-next', this.nextStep)
      eventBus.on('aqilio-back', this.previousStep)
    }
  },
  beforeUnmount() {
    this.$aqilio.removeInstance(this.flowId)

  },
  methods: {
    nextStep() {
      this.getNextFlowStep()
    },
    previousStep() {
      this.getPreviousFlowStep()
    },
    getComponentToRender(componentName) {
      if (componentName) {
        let foundCustomComponent = this.customComponents.find(customComponent => {
          if (!customComponent._value.name) {
              console.warn(`Aqilio [warn]: one of the customComponents don't have a name value. Make sure to assign your components a name value like this: "name: 'componentNameHere'" https://vuejs.org/api/options-misc.html#name`);
          }

          if (customComponent._value.name === componentName) {
            return customComponent
          }
        });

        if (!foundCustomComponent) {
          console.warn(`Aqilio [warn]: component not found in customComponents props. Trying to render ${componentName} from globally registered components`);
        }

        return foundCustomComponent ? foundCustomComponent : componentName
      }
    },
    setCurrentFlowStep(res) {
      this.currentFlowStep = {
        component: this.getComponentToRender(res.data.step.component_path),
        stepKey: res.data.step.step_key,
        extraProps: res.data.step.extra_props,
      }
      this.$aqilio.setCurrentStepKey(this.currentFlowStep.stepKey, res.data.isLastStep, res.data.step.order)
      // if theres progress set that, if not set default aqilioPropsData
      let aqilioPropsData = this.$aqilio.getProgress(true)[this.currentFlowStep.stepKey] ? this.$aqilio.getProgress(true)[this.currentFlowStep.stepKey] : {'key': this.currentFlowStep.stepKey, 'value': null}
      aqilioPropsData.additionalProps = JSON.parse(res.data.step.extra_props)
      this.aqilioPropsData = aqilioPropsData
    },
    getPreviousFlowStep() {
      axios.post(`${this.connection}/getPreviousFlowStep`, {
        apiKey: this.apiKey,
        flowId: this.flowId,
        instance: this.$aqilio.getAqilioInstance(),
      })
      .then((res) => {
        this.setCurrentFlowStep(res)
      })
    },
    getNextFlowStep() {
      axios.post(`${this.connection}/getNextFlowStep`, {
        apiKey: this.apiKey,
        flowId: this.flowId,
        instance: this.$aqilio.getAqilioInstance(),
      })
      .then((res) => {
        this.setCurrentFlowStep(res)
      })
    },
    getAqilioFlow() {
      axios.post(`${this.connection}/getAqilioFlow`, {
        apiKey: this.apiKey,
        flowId: this.flowId,
        progress: this.$aqilio.getProgress(true),
      })
      .then((res) => {
        this.setCurrentFlowStep(res)
      })

    },
  }
};
</script>

<style>
.nice-handsome-button {
  display: inline-block;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #ffffff;
  font-weight: 500;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  user-select: none;
  cursor: pointer;
}

/* --> COLORS <-- */

.nice-handsome-button--blue {
  background-color: #0194ef;
}

.nice-handsome-button--green {
  background-color: #1bb934;
}

.nice-handsome-button--red {
  background-color: #e1112c;
}

/* --> SIZES <-- */

.nice-handsome-button--small {
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 12px;
}

.nice-handsome-button--default {
  padding: 12px 14px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 16px;
}

.nice-handsome-button--large {
  padding: 16px 18px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 20px;
}

/* --> BOOLEANS <-- */

.nice-handsome-button--rounded {
  border-radius: 60px;
}
</style>
