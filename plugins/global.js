import Vue from 'vue'
import { moduleId } from 'utils/config'
import { mixin } from 'utils/constant'

Vue.prototype.moduleId = moduleId

window.layoutMixin = mixin
