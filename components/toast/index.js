/**
 * Toast轻提示组件
 * 支持 success / error / loading 类型
 */
let toastTimer = null

Component({
  properties: {
    visible: { type: Boolean, value: false },
    type: { type: String, value: 'text' }, // text / success / error / loading
    message: { type: String, value: '' },
    duration: { type: Number, value: 1500 },
    position: { type: String, value: 'center' } // center / top / bottom
  },
  observers: {
    'visible': function(val) {
      if (val && this.data.type !== 'loading') {
        clearTimeout(toastTimer)
        toastTimer = setTimeout(() => {
          this.triggerEvent('close')
        }, this.data.duration)
      }
    }
  },
  methods: {
    preventScroll() { /* 阻止滚动 */ }
  },
  detached() { clearTimeout(toastTimer) }
})
