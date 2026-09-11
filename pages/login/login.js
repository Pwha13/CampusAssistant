/**
 * 登录页面
 * 核心功能：表单校验、角色切换、模拟登录
 * 逻辑说明：
 *   1. 支持 student / teacher 两种角色登录
 *   2. 输入 "admin" 为教师角色，其他为学生角色
 *   3. 登录成功后将角色标识和用户信息写入 storage 和 globalData
 *   4. 根据角色跳转到不同的首页
 */
const { mockLogin } = require('../../utils/mock')

Page({
  data: {
    role: 'student',          // 当前选择的角色
    username: '',              // 用户名（学号/工号）
    password: '',              // 密码
    showPassword: false,       // 是否明文显示密码
    usernameFocused: false,    // 用户名输入框是否聚焦
    passwordFocused: false,    // 密码输入框是否聚焦
    usernameError: '',         // 用户名校验错误信息
    passwordError: '',         // 密码校验错误信息
    isLoading: false,          // 登录按钮loading状态
    // Toast相关
    toastVisible: false,
    toastType: 'text',
    toastMessage: ''
  },

  /**
   * 切换角色（学生/教师）
   */
  switchRole(e) {
    const { role } = e.currentTarget.dataset
    this.setData({
      role,
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    })
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value, usernameError: '' })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value, passwordError: '' })
  },

  onUsernameFocus() { this.setData({ usernameFocused: true }) },
  onUsernameBlur() { this.setData({ usernameFocused: false }) },
  onPasswordFocus() { this.setData({ passwordFocused: true }) },
  onPasswordBlur() { this.setData({ passwordFocused: false }) },

  /**
   * 切换密码可见/隐藏
   */
  togglePassword() {
    this.setData({ showPassword: !this.data.showPassword })
  },

  /**
   * 表单校验
   * @returns {Boolean} 是否通过校验
   */
  validateForm() {
    const { username, password, role } = this.data
    let isValid = true

    // 校验用户名
    if (!username.trim()) {
      this.setData({ usernameError: role === 'student' ? '请输入学号' : '请输入工号' })
      isValid = false
    } else if (username.trim().length < 3) {
      this.setData({ usernameError: '账号长度不能少于3位' })
      isValid = false
    }

    // 校验密码
    if (!password) {
      this.setData({ passwordError: '请输入密码' })
      isValid = false
    } else if (password.length < 2) {
      this.setData({ passwordError: '密码长度不能少于2位' })
      isValid = false
    }

    return isValid
  },

  /**
   * 点击登录按钮
   * 核心流程：表单校验 → Mock请求 → 存储用户信息 → 角色判断跳转
   */
  async onLogin() {
    // 防止重复提交
    if (this.data.isLoading) return

    // 表单校验
    if (!this.validateForm()) return

    this.setData({ isLoading: true })

    try {
      const { username, password } = this.data
      const res = await mockLogin(username.trim(), password)

      if (res.code === 0) {
        // 登录成功：存储token和用户信息
        const { token, userInfo } = res.data
        wx.setStorageSync('token', token)
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('role', userInfo.role)

        // 更新全局状态
        const app = getApp()
        app.globalData.token = token
        app.globalData.userInfo = userInfo
        app.globalData.role = userInfo.role

        // Toast提示
        this.showToast('success', '登录成功')

        // 延迟跳转到对应首页
        setTimeout(() => {
          if (userInfo.role === 'teacher') {
            // 教师端跳转（后续实现）
            wx.switchTab({ url: '/pages/index/index' })
          } else {
            // 【角色判断】学生端跳转到学生首页
            wx.switchTab({ url: '/pages/student-home/student-home' })
          }
        }, 800)
      } else {
        // 登录失败
        this.showToast('error', res.message || '登录失败')
      }
    } catch (err) {
      this.showToast('error', '网络异常，请稍后重试')
    } finally {
      this.setData({ isLoading: false })
    }
  },

  /**
   * 显示Toast提示
   */
  showToast(type, message) {
    this.setData({
      toastVisible: true,
      toastType: type,
      toastMessage: message
    })
  },

  /**
   * Toast关闭回调
   */
  onToastClose() {
    this.setData({ toastVisible: false })
  }
})
