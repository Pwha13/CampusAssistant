/**
 * 校园助手小程序 - 全局入口文件
 * 核心逻辑：
 *   1. 启动时检查登录状态，未登录跳转登录页
 *   2. 通过 globalData 存储全局状态（token、userInfo、role）
 *   3. 根据角色标识 student/teacher 动态渲染不同页面
 */
App({
  onLaunch() {
    // 检查本地存储的登录状态
    const token = wx.getStorageSync('token')
    const userInfo = wx.getStorageSync('userInfo')
    const role = wx.getStorageSync('role')

    if (token && userInfo) {
      // 已登录：恢复全局状态
      this.globalData.token = token
      this.globalData.userInfo = userInfo
      this.globalData.role = role || 'student'
    } else {
      // 未登录：延迟跳转到登录页（等待页面栈加载完成）
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/login/login' })
      }, 100)
    }
  },

  /**
   * 全局数据
   * token: 登录令牌
   * userInfo: 用户信息对象
   * role: 角色标识 'student' | 'teacher'
   */
  globalData: {
    token: '',
    userInfo: null,
    role: ''
  }
})
