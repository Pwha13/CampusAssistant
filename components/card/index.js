/**
 * 通用卡片组件
 * 支持标题、扩展操作、插槽
 */
Component({
  properties: {
    title: { type: String, value: '' },
    extra: { type: String, value: '' },
    showDot: { type: Boolean, value: false },
    showFooter: { type: Boolean, value: false },
    customClass: { type: String, value: '' }
  },
  methods: {
    onTap() { this.triggerEvent('tap') },
    onExtraTap() { this.triggerEvent('extratap') }
  }
})
