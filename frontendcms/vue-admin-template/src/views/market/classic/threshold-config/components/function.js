import ExtendsThreshold from './extendsOpts'
class Thresholds {
  constructor() {
    this.domArray = []
    this.domWrap = null
    this.targetDom = null
  }

  createDom() {
    const thresholdInstance = new ExtendsThreshold()

    this.domWrap = document.getElementsByClassName('threshold-config')[0]
    this.targetDom = document.getElementsByClassName('threshold-append')[0]

    thresholdInstance.$on('closeNow', (instance) => {
      const idx = this.domArray.findIndex((e) => {
        return e === instance
      })
      this.domWrap.removeChild(instance.$el)
      this.domArray.splice(idx, 1)
      instance.$destroy()
    })

    const vmDom = thresholdInstance.$mount()
    // vmDom.$el 虚拟dom的挂载点

    this.domWrap.insertBefore(vmDom.$el, this.targetDom)
    this.domArray.push(thresholdInstance)
  }
}

export default Thresholds
