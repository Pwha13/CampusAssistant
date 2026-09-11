/**
 * 通用弹窗组件
 * 支持居中/底部弹出，确认/取消按钮
 */
Component({
  options: { multipleSlots: true },
  properties: {
    visible: { type: Boolean, value: false },
    title: { type: String, value: '' },
    position: { type: String, value: 'center' }, // center / bottom
    showClose: { type: Boolean, value: false },
    showFooter: { type: Boolean, value: false },
    showCancel: { type: Boolean, value: true },
    confirmText: { type: String, value: '确定' },
    cancelText: { type: String, value: '取消' }
  },
  methods: {
    onMaskTap() { this.triggerEvent('close') },
    onClose() { this.triggerEvent('close') },
    onCancel() { this.triggerEvent('cancel') },
    onConfirm() { this.triggerEvent('confirm') },
    preventBubble() { /* 阻止冒泡 */ },
    preventScroll() { /* 阻止背景滚动 */ }
  }
})
