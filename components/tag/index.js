/**
 * 标签组件
 * 支持多种类型和尺寸
 */
Component({
  properties: {
    text: { type: String, value: '' },
    type: { type: String, value: 'default' }, // default/primary/success/warning/danger/info
    size: { type: String, value: 'medium' }   // small/medium/large
  },
  methods: {
    onTap() { this.triggerEvent('tap') }
  }
})
