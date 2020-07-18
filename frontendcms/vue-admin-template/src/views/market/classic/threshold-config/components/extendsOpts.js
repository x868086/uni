import Vue from 'vue';
import Threshold from './threshold.vue';

const extendsOpts = {
  extends: Threshold,
};

const extendsThreshold = Vue.extend(extendsOpts);
export default extendsThreshold;
