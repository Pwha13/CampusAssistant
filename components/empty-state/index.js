/**
 * 空状态组件
 * 用于列表为空时的提示展示
 */
Component({
  properties: {
    text: { type: String, value: '暂无数据' },
    icon: { type: String, value: '' },
    actionText: { type: String, value: '' }
  },
  methods: {
    onAction() { this.triggerEvent('action') }
  }
})
