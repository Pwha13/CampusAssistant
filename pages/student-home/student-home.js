/**
 * 学生端首页
 * 核心功能：
 *   1. 查寝打卡（模拟定位 → 模拟人脸核验 → 完成打卡）
 *   2. 上课打卡（模拟人脸核验 → 完成打卡）
 *   3. 晚寝打卡
 *   4. 展示今日课程和最近打卡记录
 *
 * 打卡交互流程：
 *   点击打卡 → 弹出模拟定位弹窗 → 确认位置 → 弹出模拟人脸弹窗 → 模拟扫描 → 打卡成功
 */
const { mockGetSchedule, mockCheckinHistory, mockCheckin } = require('../../utils/mock')
const { getCurrentDayOfWeek } = require('../../utils/util')

Page({
  data: {
    userInfo: {},              // 用户信息
    morningChecked: false,     // 查寝是否已打卡
    classChecked: false,       // 上课是否已打卡
    nightChecked: false,       // 晚寝是否已打卡
    todayCourses: [],          // 今日课程列表
    recentRecords: [],         // 最近打卡记录

    // 模拟定位弹窗相关
    locationPopupVisible: false,
    currentLocation: '学生宿舍区（学海楼3栋）',
    checkinRequirement: '宿舍楼200米范围内',
    locationMatch: true,
    pendingCheckinType: '',    // 待打卡类型

    // 模拟人脸核验弹窗相关
    facePopupVisible: false,
    faceStep: 0,               // 0=准备 1=扫描中 2=成功

    // Toast相关
    toastVisible: false,
    toastType: 'text',
    toastMessage: ''
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    // 每次显示页面时更新TabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setSelected(0)
    }
    this.loadTodayCourses()
    this.loadRecentRecords()
    this.resetCheckinStatus()
  },

  onPullDownRefresh() {
    this.loadTodayCourses()
    this.loadRecentRecords()
    setTimeout(() => {
      wx.stopPullDownRefresh()
      this.showToast('success', '刷新成功')
    }, 800)
  },

  /**
   * 加载用户信息
   */
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({ userInfo })
  },

  /**
   * 加载今日课程
   * 根据今天是星期几筛选课程
   */
  async loadTodayCourses() {
    const res = await mockGetSchedule()
    if (res.code === 0) {
      const currentDay = getCurrentDayOfWeek()
      const todayCourses = res.data.filter(c => c.day === currentDay)
      this.setData({ todayCourses })
    }
  },

  /**
   * 加载最近打卡记录（取最近5条）
   */
  async loadRecentRecords() {
    const res = await mockCheckinHistory()
    if (res.code === 0) {
      this.setData({ recentRecords: res.data.slice(0, 5) })
    }
  },

  /**
   * 重置打卡状态（模拟：每天首次进入时重置）
   */
  resetCheckinStatus() {
    const today = new Date().toDateString()
    const lastDate = wx.getStorageSync('checkinDate')
    if (lastDate !== today) {
      this.setData({
        morningChecked: false,
        classChecked: false,
        nightChecked: false
      })
      wx.setStorageSync('checkinDate', today)
    } else {
      // 恢复今日打卡状态
      this.setData({
        morningChecked: wx.getStorageSync('morningChecked') || false,
        classChecked: wx.getStorageSync('classChecked') || false,
        nightChecked: wx.getStorageSync('nightChecked') || false
      })
    }
  },

  /**
   * 【打卡交互入口】
   * 根据打卡类型决定弹出哪些模拟弹窗
   * @param {String} type - morning(查寝) / class(上课) / night(晚寝)
   */
  onCheckin(e) {
    const { type } = e.currentTarget.dataset

    // 检查是否已打卡
    if (this.data[type + 'Checked']) {
      this.showToast('text', '今日已完成该打卡')
      return
    }

    this.setData({ pendingCheckinType: type })

    // 【打卡模拟逻辑】查寝和晚寝需要先模拟定位，上课打卡直接人脸核验
    if (type === 'morning' || type === 'night') {
      // 第一步：弹出模拟定位弹窗
      this.setData({
        locationPopupVisible: true,
        currentLocation: type === 'morning' ? '学生宿舍区（学海楼3栋）' : '学生宿舍区（学海楼3栋）',
        locationMatch: true // 模拟定位总是匹配
      })
    } else if (type === 'class') {
      // 上课打卡：直接弹出模拟人脸核验
      this.openFacePopup()
    }
  },

  /**
   * 模拟定位 - 确认位置
   */
  onLocationConfirm() {
    this.setData({ locationPopupVisible: false })

    if (this.data.locationMatch) {
      // 位置匹配，进入人脸核验
      this.openFacePopup()
    } else {
      this.showToast('error', '不在打卡范围内')
    }
  },

  /**
   * 模拟定位 - 取消
   */
  onLocationCancel() {
    this.setData({ locationPopupVisible: false, pendingCheckinType: '' })
  },

  /**
   * 打开模拟人脸核验弹窗
   */
  openFacePopup() {
    this.setData({
      facePopupVisible: true,
      faceStep: 0
    })
  },

  /**
   * 开始模拟人脸扫描
   * 模拟过程：0→1(扫描中2秒)→2(成功1秒)→完成打卡
   */
  onStartFaceScan() {
    this.setData({ faceStep: 1 })

    // 模拟扫描过程2秒
    setTimeout(() => {
      this.setData({ faceStep: 2 })

      // 扫描成功后1秒完成打卡
      setTimeout(() => {
        this.completeCheckin()
      }, 1000)
    }, 2000)
  },

  /**
   * 人脸核验 - 取消
   */
  onFaceCancel() {
    this.setData({
      facePopupVisible: false,
      faceStep: 0,
      pendingCheckinType: ''
    })
  },

  /**
   * 【完成打卡】
   * 调用Mock接口，更新打卡状态，存储记录
   */
  async completeCheckin() {
    const { pendingCheckinType } = this.data
    const typeMap = { morning: '查寝', class: '上课', night: '晚寝' }

    this.setData({ facePopupVisible: false, faceStep: 0 })

    try {
      const res = await mockCheckin(pendingCheckinType)
      if (res.code === 0) {
        // 更新打卡状态
        const statusKey = pendingCheckinType + 'Checked'
        this.setData({ [statusKey]: true })

        // 持久化打卡状态
        wx.setStorageSync(statusKey, true)
        wx.setStorageSync('checkinDate', new Date().toDateString())

        this.showToast('success', typeMap[pendingCheckinType] + '打卡成功！')
        // 刷新打卡记录
        this.loadRecentRecords()
      }
    } catch (err) {
      this.showToast('error', '打卡失败，请重试')
    }

    this.setData({ pendingCheckinType: '' })
  },

  /**
   * 跳转到公告页
   */
  goAnnouncements() {
    wx.switchTab({ url: '/pages/announcements/announcements' })
  },

  /**
   * 跳转到个人信息页
   */
  goProfile() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },

  /**
   * 跳转到打卡历史
   */
  goCheckinHistory() {
    // 预留：后续可做打卡历史页面
    wx.showToast({ title: '打卡历史功能开发中', icon: 'none' })
  },

  /**
   * 显示Toast
   */
  showToast(type, message) {
    this.setData({ toastVisible: true, toastType: type, toastMessage: message })
  },

  onToastClose() {
    this.setData({ toastVisible: false })
  }
})