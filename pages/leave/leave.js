/**
 * 请假管理页面
 * 功能：
 *   1. 请假记录列表（支持按状态筛选）
 *   2. 新建请假申请（带表单校验）
 *   3. 请假详情查看
 *   4. 统计数据展示
 *   5. 下拉刷新
 */
const { mockGetLeaveRecords, mockSubmitLeave } = require('../../utils/mock')

Page({
  data: {
    records: [],               // 全部请假记录
    filteredRecords: [],       // 筛选后的记录
    currentStatus: 'all',      // 当前筛选状态
    page: 1,
    loading: false,
    isRefreshing: false,

    // 统计数据
    total: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,

    // 新建请假表单
    formVisible: false,
    submitting: false,
    leaveTypes: ['事假', '病假', '公假', '婚假', '其他'],
    formData: {
      leaveType: '',
      startTime: '',
      endTime: '',
      reason: '',
      attachment: ''
    },
    errors: {},

    // 详情弹窗
    detailVisible: false,
    detailItem: {},

    // Toast
    toastVisible: false,
    toastType: 'text',
    toastMessage: ''
  },

  onLoad() {
    this.loadRecords()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setSelected(2)
    }
  },

  /**
   * 加载请假记录
   */
  async loadRecords() {
    this.setData({ loading: true })
    try {
      const res = await mockGetLeaveRecords()
      if (res.code === 0) {
        const { list } = res.data
        // 【统计计算】根据状态分类计数
        const total = list.length
        const pendingCount = list.filter(r => r.status === 'pending').length
        const approvedCount = list.filter(r => r.status === 'approved').length
        const rejectedCount = list.filter(r => r.status === 'rejected').length

        this.setData({
          records: list,
          total,
          pendingCount,
          approvedCount,
          rejectedCount
        })
        this.filterRecords()
      }
    } catch (err) {
      this.showToast('error', '加载失败')
    } finally {
      this.setData({ loading: false, isRefreshing: false })
    }
  },

  /**
   * 按状态筛选记录
   */
  filterRecords() {
    const { records, currentStatus } = this.data
    let filtered = records
    if (currentStatus !== 'all') {
      filtered = records.filter(r => r.status === currentStatus)
    }
    this.setData({ filteredRecords: filtered })
  },

  /**
   * 切换状态筛选
   */
  onStatusTap(e) {
    const { status } = e.currentTarget.dataset
    this.setData({ currentStatus: status })
    this.filterRecords()
  },

  /**
   * 下拉刷新
   */
  onRefresh() {
    this.setData({ isRefreshing: true })
    this.loadRecords()
  },

  /**
   * 点击请假记录查看详情
   */
  onLeaveTap(e) {
    const { item } = e.currentTarget.dataset
    this.setData({ detailVisible: true, detailItem: item })
  },

  onCloseDetail() {
    this.setData({ detailVisible: false })
  },

  /**
   * 打开新建请假弹窗
   */
  onAddLeave() {
    this.setData({
      formVisible: true,
      formData: { leaveType: '', startTime: '', endTime: '', reason: '', attachment: '' },
      errors: {}
    })
  },

  onCloseForm() {
    this.setData({ formVisible: false })
  },

  /**
   * 选择请假类型
   */
  onSelectType(e) {
    const { type } = e.currentTarget.dataset
    this.setData({
      'formData.leaveType': type,
      'errors.leaveType': ''
    })
  },

  /**
   * 选择开始时间
   */
  onStartTimeChange(e) {
    this.setData({
      'formData.startTime': e.detail.value,
      'errors.startTime': ''
    })
  },

  /**
   * 选择结束时间
   */
  onEndTimeChange(e) {
    this.setData({
      'formData.endTime': e.detail.value,
      'errors.endTime': ''
    })
  },

  /**
   * 输入请假原因
   */
  onReasonInput(e) {
    this.setData({
      'formData.reason': e.detail.value,
      'errors.reason': ''
    })
  },

  /**
   * 模拟上传附件
   */
  onUploadAttachment() {
    // 模拟文件选择
    this.setData({ 'formData.attachment': '病历证明.pdf' })
    this.showToast('success', '附件已添加')
  },

  /**
   * 移除附件
   */
  onRemoveAttachment() {
    this.setData({ 'formData.attachment': '' })
  },

  /**
   * 【表单校验】
   * 校验请假类型、时间、原因等必填字段
   * @returns {Boolean} 是否通过校验
   */
  validateForm() {
    const { formData } = this.data
    const errors = {}
    let isValid = true

    // 校验请假类型
    if (!formData.leaveType) {
      errors.leaveType = '请选择请假类型'
      isValid = false
    }

    // 校验开始时间
    if (!formData.startTime) {
      errors.startTime = '请选择开始时间'
      isValid = false
    }

    // 校验结束时间
    if (!formData.endTime) {
      errors.endTime = '请选择结束时间'
      isValid = false
    }

    // 校验时间先后顺序
    if (formData.startTime && formData.endTime && formData.startTime > formData.endTime) {
      errors.endTime = '结束时间不能早于开始时间'
      isValid = false
    }

    // 校验请假原因
    if (!formData.reason.trim()) {
      errors.reason = '请填写请假原因'
      isValid = false
    } else if (formData.reason.trim().length < 10) {
      errors.reason = '请假原因至少需要10个字'
      isValid = false
    }

    this.setData({ errors })
    return isValid
  },

  /**
   * 提交请假申请
   */
  async onSubmitLeave() {
    if (this.data.submitting) return
    if (!this.validateForm()) return

    this.setData({ submitting: true })

    try {
      const { formData } = this.data
      const res = await mockSubmitLeave({
        type: formData.leaveType,
        startTime: formData.startTime + ' 08:00',
        endTime: formData.endTime + ' 17:00',
        reason: formData.reason
      })

      if (res.code === 0) {
        this.setData({ formVisible: false })
        this.showToast('success', '请假申请已提交')
        // 刷新列表
        setTimeout(() => this.loadRecords(), 500)
      } else {
        this.showToast('error', '提交失败，请重试')
      }
    } catch (err) {
      this.showToast('error', '网络异常')
    } finally {
      this.setData({ submitting: false })
    }
  },

  showToast(type, message) {
    this.setData({ toastVisible: true, toastType: type, toastMessage: message })
  },

  onToastClose() {
    this.setData({ toastVisible: false })
  }
})
