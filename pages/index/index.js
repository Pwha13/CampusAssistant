/**
 * 重定向页面 - 旧入口兼容
 * 根据登录状态和角色跳转到对应首页
 */
Page({
  onLoad() {
    const token = wx.getStorageSync('token')
    const role = wx.getStorageSync('role')

    if (!token) {
      // 未登录 → 跳转登录页
      wx.reLaunch({ url: '/pages/login/login' })
    } else if (role === 'teacher') {
      // 教师角色 → 教师首页（预留）
      wx.reLaunch({ url: '/pages/student-home/student-home' })
    } else {
      // 学生角色 → 学生首页
      wx.reLaunch({ url: '/pages/student-home/student-home' })
    }
  }
})
