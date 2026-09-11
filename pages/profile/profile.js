/**
 * 个人信息页面
 * 功能：展示用户信息、编辑资料、修改密码、退出登录
 */
const { mockGetUserInfo } = require('../../utils/mock')

Page({
  data: {
    userInfo: {},

    // 编辑资料弹窗
    editVisible: false,
    editForm: { name: '', phone: '', email: '' },

    // 修改密码弹窗
    passwordVisible: false,
    passwordForm: { oldPassword: '', newPassword: '', confirmPassword: '' },

    saving: false,

    // Toast
    toastVisible: false,
    toastType: 'text',
    toastMessage: ''
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setSelected(3)
    }
  },

  /**
   * 加载用户信息
   */
  async loadUserInfo() {
    const res = await mockGetUserInfo()
    if (res.code === 0) {
      this.setData({ userInfo: res.data })
    }
  },

  /**
   * 模拟选择头像
   */
  onChooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({ 'userInfo.avatar': tempFilePath })
        // 更新缓存
        const userInfo = wx.getStorageSync('userInfo') || {}
        userInfo.avatar = tempFilePath
        wx.setStorageSync('userInfo', userInfo)
        this.showToast('success', '头像已更新')
      }
    })
  },

  /**
   * 打开编辑资料弹窗
   */
  onEditProfile() {
    const { userInfo } = this.data
    this.setData({
      editVisible: true,
      editForm: {
        name: userInfo.name || '',
        phone: userInfo.phone ? userInfo.phone.replace(/\*/g, '') : '',
        email: userInfo.email || ''
      }
    })
  },

  onCloseEdit() {
    this.setData({ editVisible: false })
  },

  onEditInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ [`editForm.${field}`]: e.detail.value })
  },

  /**
   * 保存编辑资料
   */
  onSaveProfile() {
    const { editForm } = this.data
    if (!editForm.name.trim()) {
      this.showToast('error', '姓名不能为空')
      return
    }
    if (editForm.phone && !/^1\d{10}$/.test(editForm.phone)) {
      this.showToast('error', '手机号格式不正确')
      return
    }

    this.setData({ saving: true })

    // 模拟保存
    setTimeout(() => {
      const userInfo = { ...this.data.userInfo, ...editForm }
      // 手机号脱敏显示
      if (editForm.phone) {
        userInfo.phone = editForm.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
      this.setData({ userInfo, editVisible: false, saving: false })
      wx.setStorageSync('userInfo', userInfo)
      this.showToast('success', '资料已更新')
    }, 800)
  },

  /**
   * 打开修改密码弹窗
   */
  onChangePassword() {
    this.setData({
      passwordVisible: true,
      passwordForm: { oldPassword: '', newPassword: '', confirmPassword: '' }
    })
  },

  onClosePassword() {
    this.setData({ passwordVisible: false })
  },

  onPasswordInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ [`passwordForm.${field}`]: e.detail.value })
  },

  /**
   * 保存修改密码
   */
  onSavePassword() {
    const { passwordForm } = this.data

    if (!passwordForm.oldPassword) {
      this.showToast('error', '请输入原密码')
      return
    }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      this.showToast('error', '新密码至少6位')
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      this.showToast('error', '两次密码不一致')
      return
    }

    this.setData({ saving: true })

    setTimeout(() => {
      this.setData({ passwordVisible: false, saving: false })
      this.showToast('success', '密码修改成功')
    }, 800)
  },

  /**
   * 打卡记录
   */
  onCheckinHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  /**
   * 关于校园助手
   */
  onAbout() {
    wx.showModal({
      title: '关于校园助手',
      content: '校园助手 v1.0.0\n一站式校园生活服务平台\n\n功能包括：打卡、请假、公告等',
      showCancel: false
    })
  },

  /**
   * 退出登录
   * 清除本地存储和全局状态，跳转到登录页
   */
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除存储
          wx.clearStorageSync()
          // 清除全局状态
          const app = getApp()
          app.globalData.token = ''
          app.globalData.userInfo = null
          app.globalData.role = ''
          // 跳转到登录页
          wx.reLaunch({ url: '/pages/login/login' })
        }
      }
    })
  },

  showToast(type, message) {
    this.setData({ toastVisible: true, toastType: type, toastMessage: message })
  },

  onToastClose() {
    this.setData({ toastVisible: false })
  }
})
