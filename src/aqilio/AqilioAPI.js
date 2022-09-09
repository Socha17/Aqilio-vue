import eventBus from './bus.js';

let AqilioInstances = {};

// on mount

export default () => {
  return {
    instanciateInstance(flowId) {
      if (Object.keys(AqilioInstances).length !== 0) {
        console.error("Aqilio currently only supports one instance of the Aqilio component. Please unmount the component before using another");
        return false;
      }

      AqilioInstances[flowId] = {"flowId" : flowId, "currentStepKey": null, "isCurrentStepLastStep": false, "progress": {}}
      return true;
    },
    removeInstance(flowId) {
      delete AqilioInstances[flowId];
    },
    getInstances() {
      return AqilioInstances;
    },
    nextStep() {
      eventBus.emit('aqilio-next')
    },
    previousStep() {
      eventBus.emit('aqilio-back')
    },
    setProgress(progress, flowId = null) {
      let aqilioInstance = this.getAqilioInstance(flowId)
      return aqilioInstance.progress = progress
    },
    getAqilioInstance(flowId) {
      if (!flowId) {
        return AqilioInstances[Object.keys(AqilioInstances)[0]]
      }

      return AqilioInstances[flowId]
    },
    getProgress(asObject = false, flowId = null) {
      let aqilioInstance = this.getAqilioInstance(flowId)

      if (asObject) {
        return aqilioInstance.progress
      }

      return Object.keys(aqilioInstance.progress).map((key) => [{"key": key, "value": aqilioInstance.progress[key].value}]);
    },
    isCurrentStepLastStep(key, flowId = null) {
      let aqilioInstance = this.getAqilioInstance(flowId)
      return aqilioInstance.isCurrentStepLastStep
    },
    setCurrentStepKey(key, isLastStep, stepOrder, flowId = null) {
      let aqilioInstance = this.getAqilioInstance(flowId)
      aqilioInstance.currentStepKey = key
      aqilioInstance.isCurrentStepLastStep = isLastStep
      aqilioInstance.stepOrder = stepOrder
    },
    setCurrentStepValue(value, metaData, flowId = null) {
      let aqilioInstance = this.getAqilioInstance(flowId)
      aqilioInstance.progress[aqilioInstance.currentStepKey] = {"key": aqilioInstance.currentStepKey, "value": value, "metaData": metaData, "stepOrder": aqilioInstance.stepOrder}
    },

  }
};
