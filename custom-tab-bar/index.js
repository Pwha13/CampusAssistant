/**
 * 自定义TabBar组件
 * 根据角色（student/teacher）动态渲染不同的Tab项
 */
Component({
  data: {
    visible: true,
    selected: 0,
    // 学生端TabBar配置
    studentList: [
      {
        pagePath: '/pages/student-home/student-home',
        text: '首页',
        iconPath: '/static/images/tab-home.png',
        activeIconPath: '/static/images/tab-home-active.png'
      },
      {
        pagePath: '/pages/announcements/announcements',
        text: '公告',
        iconPath: '/static/images/tab-notice.png',
        activeIconPath: '/static/images/tab-notice-active.png'
      },
      {
        pagePath: '/pages/leave/leave',
        text: '请假',
        iconPath: '/static/images/tab-leave.png',
        activeIconPath: '/static/images/tab-leave-active.png'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        iconPath: '/static/images/tab-profile.png',
        activeIconPath: '/static/images/tab-profile-active.png'
      }
    ],
    // 教师端TabBar配置（预留）
    teacherList: [
      {
        pagePath: '/pages/teacher-home/teacher-home',
        text: '工作台',
        iconPath: '/static/images/tab-home.png',
        activeIconPath: '/static/images/tab-home-active.png'
      },
      {
        pagePath: '/pages/announcements/announcements',
        text: '公告',
        iconPath: '/static/images/tab-notice.png',
        activeIconPath: '/static/images/tab-notice-active.png'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        iconPath: '/static/images/tab-profile.png',
        activeIconPath: '/static/images/tab-profile-active.png'
      }
    ],
    list: []
  },

  lifetimes: {
    attached() {
      this.initTabBar()
    }
  },

  methods: {
    /**
     * 初始化TabBar，根据角色加载对应列表
     */
    initTabBar() {
      const app = getApp()
      const role = app.globalData.role || 'student'
      const list = role === 'teacher' ? this.data.teacherList : this.data.studentList
      this.setData({ list })
    },

    /**
     * 切换Tab
     */
    switchTab(e) {
      const { index, path } = e.currentTarget.dataset
      if (index === this.data.selected) return

      this.setData({ selected: index })
      wx.switchTab({ url: path })
    },

    /**
     * 外部设置当前选中项
     * @param {Number} index - Tab索引
     */
    setSelected(index) {
      this.setData({ selected: index })
    },

    /**
     * 显示/隐藏TabBar
     */
    show() { this.setData({ visible: true }) },
    hide() { this.setData({ visible: false }) }
  }
})
