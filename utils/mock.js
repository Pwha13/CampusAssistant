/**
 * Mock数据模块
 * 包含所有模拟数据和模拟网络请求函数
 * 所有接口请求均使用Mock假数据，使用setTimeout模拟网络延迟
 */

// 模拟网络延迟的请求函数
const mockRequest = (data, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, message: 'success', data })
    }, delay)
  })
}

// ============ 用户相关Mock数据 ============
const MOCK_USERS = {
  student: {
    id: 'S2024001',
    name: '张三',
    role: 'student',
    studentId: '2024001001',
    className: '计算机科学2401班',
    college: '计算机学院',
    phone: '138****8888',
    email: 'zhangsan@campus.edu.cn',
    avatar: '/static/images/avatar-default.png',
    dormitory: '学海楼3栋401',
    enrollmentYear: '2024'
  },
  teacher: {
    id: 'T2024001',
    name: '李老师',
    role: 'teacher',
    teacherId: 'T2024001',
    department: '计算机学院',
    phone: '139****9999',
    email: 'lteacher@campus.edu.cn',
    avatar: '/static/images/avatar-default.png'
  }
}

// ============ 校园公告Mock数据 ============
const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: '2024-2025学年秋季学期开学通知',
    content: '各位同学，新学期即将开始，请于9月1日前完成返校报到...',
    category: '教务通知',
    publishTime: '2024-08-25 10:00',
    publisher: '教务处',
    isTop: true,
    viewCount: 1256
  },
  {
    id: 2,
    title: '关于开展校园安全隐患排查的通知',
    content: '为确保校园安全，学校将于本周开展全面安全隐患排查...',
    category: '安全通知',
    publishTime: '2024-08-24 14:30',
    publisher: '保卫处',
    isTop: false,
    viewCount: 832
  },
  {
    id: 3,
    title: '图书馆国庆假期开放时间调整',
    content: '国庆假期期间，图书馆开放时间调整为9:00-17:00...',
    category: '服务通知',
    publishTime: '2024-08-23 09:15',
    publisher: '图书馆',
    isTop: false,
    viewCount: 645
  },
  {
    id: 4,
    title: '2024年大学生创新创业项目申报通知',
    content: '现启动2024年大学生创新创业训练计划项目申报工作...',
    category: '学术活动',
    publishTime: '2024-08-22 16:00',
    publisher: '教务处',
    isTop: false,
    viewCount: 1023
  },
  {
    id: 5,
    title: '校园网维护升级公告',
    content: '为提升网络服务质量，校园网将于8月28日凌晨进行维护升级...',
    category: '服务通知',
    publishTime: '2024-08-21 11:00',
    publisher: '信息中心',
    isTop: false,
    viewCount: 421
  },
  {
    id: 6,
    title: '关于举办秋季校园运动会的通知',
    content: '学校定于10月中旬举办2024年秋季校园运动会，欢迎同学们踊跃报名...',
    category: '校园活动',
    publishTime: '2024-08-20 08:30',
    publisher: '体育部',
    isTop: false,
    viewCount: 789
  }
]

// ============ 课程表Mock数据 ============
const MOCK_SCHEDULE = [
  { id: 1, name: '高等数学', teacher: '王教授', location: '教学楼A-301', startTime: '08:00', endTime: '09:40', day: 1 },
  { id: 2, name: '数据结构', teacher: '李教授', location: '教学楼B-205', startTime: '10:00', endTime: '11:40', day: 1 },
  { id: 3, name: '大学英语', teacher: '张老师', location: '外语楼-102', startTime: '14:00', endTime: '15:40', day: 2 },
  { id: 4, name: '计算机网络', teacher: '刘教授', location: '教学楼C-401', startTime: '08:00', endTime: '09:40', day: 3 },
  { id: 5, name: '操作系统', teacher: '陈教授', location: '教学楼A-201', startTime: '10:00', endTime: '11:40', day: 3 },
  { id: 6, name: '线性代数', teacher: '赵老师', location: '教学楼B-305', startTime: '14:00', endTime: '15:40', day: 4 },
  { id: 7, name: '程序设计实践', teacher: '孙老师', location: '实验楼-302', startTime: '08:00', endTime: '11:40', day: 5 }
]

// ============ 请假记录Mock数据 ============
const MOCK_LEAVE_RECORDS = [
  {
    id: 'L2024001',
    type: '事假',
    startTime: '2024-09-01 08:00',
    endTime: '2024-09-01 17:00',
    reason: '家中有事需要回家处理',
    status: 'approved', // approved / pending / rejected
    applyTime: '2024-08-28 10:30',
    approver: '辅导员王老师',
    remark: '同意，请注意安全'
  },
  {
    id: 'L2024002',
    type: '病假',
    startTime: '2024-09-05 08:00',
    endTime: '2024-09-06 17:00',
    reason: '身体不适，需要就医',
    status: 'pending',
    applyTime: '2024-09-04 20:00',
    approver: '辅导员王老师',
    remark: ''
  },
  {
    id: 'L2024003',
    type: '公假',
    startTime: '2024-09-10 08:00',
    endTime: '2024-09-10 12:00',
    reason: '参加学校组织的志愿者活动',
    status: 'rejected',
    applyTime: '2024-09-08 14:00',
    approver: '辅导员王老师',
    remark: '与课程冲突，请调整时间'
  }
]

// ============ 打卡相关Mock数据 ============
const MOCK_CHECKIN_HISTORY = [
  { id: 1, type: 'morning', time: '2024-09-01 07:15', location: '学生宿舍', status: 'success' },
  { id: 2, type: 'class', time: '2024-09-01 07:55', course: '高等数学', location: '教学楼A-301', status: 'success' },
  { id: 3, type: 'morning', time: '2024-09-02 06:58', location: '学生宿舍', status: 'success' },
  { id: 4, type: 'class', time: '2024-09-02 07:50', course: '数据结构', location: '教学楼B-205', status: 'success' },
  { id: 5, type: 'night', time: '2024-09-01 22:30', location: '学生宿舍', status: 'success' },
  { id: 6, type: 'night', time: '2024-09-02 22:15', location: '学生宿舍', status: 'success' }
]

// ============ Mock API接口 ============

/**
 * 模拟登录请求
 * @param {String} username - 用户名
 * @param {String} password - 密码
 * @returns {Promise} 返回用户信息和角色
 */
const mockLogin = (username, password) => {
  // 简单模拟：admin=老师，其他=学生
  let role = 'student'
  let user = MOCK_USERS.student

  if (username === 'admin') {
    role = 'teacher'
    user = MOCK_USERS.teacher
  }

  // 模拟登录失败
  if (!username || !password) {
    return mockRequest(null, 600).then(() => {
      return { code: -1, message: '用户名或密码不能为空' }
    })
  }

  if (username === 'error') {
    return mockRequest(null, 600).then(() => {
      return { code: -1, message: '用户名或密码错误' }
    })
  }

  return mockRequest({ token: 'mock_token_' + Date.now(), userInfo: { ...user, role } })
}

/**
 * 获取公告列表
 */
const mockGetAnnouncements = (page = 1, pageSize = 10) => {
  const start = (page - 1) * pageSize
  const list = MOCK_ANNOUNCEMENTS.slice(start, start + pageSize)
  return mockRequest({
    list,
    total: MOCK_ANNOUNCEMENTS.length,
    hasMore: start + pageSize < MOCK_ANNOUNCEMENTS.length
  }, 500)
}

/**
 * 获取课程表
 */
const mockGetSchedule = () => {
  return mockRequest(MOCK_SCHEDULE)
}

/**
 * 获取请假记录列表
 */
const mockGetLeaveRecords = (page = 1, pageSize = 10) => {
  const start = (page - 1) * pageSize
  const list = MOCK_LEAVE_RECORDS.slice(start, start + pageSize)
  return mockRequest({
    list,
    total: MOCK_LEAVE_RECORDS.length,
    hasMore: start + pageSize < MOCK_LEAVE_RECORDS.length
  }, 500)
}

/**
 * 提交请假申请
 */
const mockSubmitLeave = (data) => {
  const newRecord = {
    id: 'L' + Date.now(),
    ...data,
    status: 'pending',
    applyTime: new Date().toLocaleString(),
    approver: '辅导员王老师',
    remark: ''
  }
  MOCK_LEAVE_RECORDS.unshift(newRecord)
  return mockRequest({ id: newRecord.id }, 1000)
}

/**
 * 获取打卡记录
 */
const mockGetCheckinHistory = () => {
  return mockRequest(MOCK_CHECKIN_HISTORY)
}

/**
 * 模拟打卡
 * @param {String} type - 打卡类型: morning(查寝), class(上课), night(晚寝)
 */
const mockCheckin = (type) => {
  const now = new Date()
  const timeStr = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0')

  return mockRequest({
    success: true,
    time: timeStr,
    type
  }, 1200)
}

/**
 * 获取个人信息
 */
const mockGetUserInfo = () => {
  const userInfo = wx.getStorageSync('userInfo') || MOCK_USERS.student
  return mockRequest(userInfo)
}

module.exports = {
  mockRequest,
  mockLogin,
  mockGetAnnouncements,
  mockGetSchedule,
  mockGetLeaveRecords,
  mockSubmitLeave,
  mockGetCheckinHistory,
  mockCheckin,
  mockGetUserInfo,
  MOCK_USERS,
  MOCK_ANNOUNCEMENTS,
  MOCK_SCHEDULE,
  MOCK_LEAVE_RECORDS,
  MOCK_CHECKIN_HISTORY
}
