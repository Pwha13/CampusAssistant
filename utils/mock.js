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
    name: '陈老师',
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

<<<<<<< Updated upstream
=======
// ============ 教师端Mock数据 ============

/** 教师首页统计数据 */
const MOCK_TEACHER_STATS = {
  totalStudents: 128,        // 管理学生总数
  todayCheckin: 115,         // 今日已打卡
  pendingLeaves: 5,          // 待审批请假
  myAnnouncements: 12        // 我发布的公告
}

/** 教师今日课程 */
const MOCK_TEACHER_SCHEDULE = [
  { id: 1, name: '高等数学', className: '计算机科学2401班', location: '教学楼A-301', startTime: '08:00', endTime: '09:40', studentCount: 45 },
  { id: 2, name: '数据结构', className: '计算机科学2402班', location: '教学楼B-205', startTime: '10:00', endTime: '11:40', studentCount: 42 },
  { id: 3, name: '计算机网络', className: '软件工程2401班', location: '教学楼C-401', startTime: '14:00', endTime: '15:40', studentCount: 41 }
]

/** 考勤记录Mock数据 */
const MOCK_ATTENDANCE_RECORDS = [
  { id: 'A2024001', studentName: '张三', studentId: '2024001001', className: '计算机科学2401班', course: '高等数学', date: '2024-09-10', status: 'normal', checkTime: '07:55', location: '教学楼A-301' },
  { id: 'A2024002', studentName: '李四', studentId: '2024001002', className: '计算机科学2401班', course: '高等数学', date: '2024-09-10', status: 'late', checkTime: '08:15', location: '教学楼A-301' },
  { id: 'A2024003', studentName: '王五', studentId: '2024001003', className: '计算机科学2401班', course: '高等数学', date: '2024-09-10', status: 'absent', checkTime: '', location: '' },
  { id: 'A2024004', studentName: '赵六', studentId: '2024001004', className: '计算机科学2401班', course: '高等数学', date: '2024-09-10', status: 'leave', checkTime: '', location: '' },
  { id: 'A2024005', studentName: '钱七', studentId: '2024001005', className: '计算机科学2402班', course: '数据结构', date: '2024-09-10', status: 'normal', checkTime: '07:58', location: '教学楼B-205' },
  { id: 'A2024006', studentName: '孙八', studentId: '2024001006', className: '计算机科学2402班', course: '数据结构', date: '2024-09-10', status: 'late', checkTime: '10:12', location: '教学楼B-205' },
  { id: 'A2024007', studentName: '周九', studentId: '2024001007', className: '软件工程2401班', course: '计算机网络', date: '2024-09-10', status: 'normal', checkTime: '07:50', location: '教学楼C-401' },
  { id: 'A2024008', studentName: '吴十', studentId: '2024001008', className: '软件工程2401班', course: '计算机网络', date: '2024-09-10', status: 'absent', checkTime: '', location: '' }
]

/** 考勤异常申诉Mock数据 */
const MOCK_APPEAL_RECORDS = [
  { id: 'AP2024001', studentName: '李四', studentId: '2024001002', className: '计算机科学2401班', course: '高等数学', date: '2024-09-10', originalStatus: 'late', appealReason: '早上身体不适就医，已提供医院证明', appealTime: '2024-09-10 10:30', status: 'pending' },
  { id: 'AP2024002', studentName: '孙八', studentId: '2024001006', className: '计算机科学2402班', course: '数据结构', date: '2024-09-10', originalStatus: 'late', appealReason: '交通堵塞导致迟到', appealTime: '2024-09-10 11:00', status: 'pending' }
]

/** 教师端请假审批Mock数据（包含学生信息） */
const MOCK_TEACHER_LEAVE_RECORDS = [
  {
    id: 'L2024001',
    studentName: '张三',
    studentId: '2024001001',
    className: '计算机科学2401班',
    type: '事假',
    startTime: '2024-09-11 08:00',
    endTime: '2024-09-11 17:00',
    reason: '家中有事需要回家处理',
    status: 'pending',
    applyTime: '2024-09-10 10:30',
    approver: '陈老师',
    remark: ''
  },
  {
    id: 'L2024002',
    studentName: '李四',
    studentId: '2024001002',
    className: '计算机科学2401班',
    type: '病假',
    startTime: '2024-09-12 08:00',
    endTime: '2024-09-13 17:00',
    reason: '身体不适，需要就医休养',
    status: 'pending',
    applyTime: '2024-09-11 20:00',
    approver: '陈老师',
    remark: ''
  },
  {
    id: 'L2024003',
    studentName: '王五',
    studentId: '2024001003',
    className: '计算机科学2401班',
    type: '公假',
    startTime: '2024-09-10 08:00',
    endTime: '2024-09-10 12:00',
    reason: '参加学校组织的志愿者活动',
    status: 'approved',
    applyTime: '2024-09-09 14:00',
    approver: '陈老师',
    remark: '同意，请注意安全'
  },
  {
    id: 'L2024004',
    studentName: '赵六',
    studentId: '2024001004',
    className: '计算机科学2401班',
    type: '事假',
    startTime: '2024-09-08 14:00',
    endTime: '2024-09-08 17:00',
    reason: '回家取重要物品',
    status: 'rejected',
    applyTime: '2024-09-07 22:00',
    approver: '陈老师',
    remark: '理由不充分，请重新提交'
  },
  {
    id: 'L2024005',
    studentName: '钱七',
    studentId: '2024001005',
    className: '计算机科学2402班',
    type: '病假',
    startTime: '2024-09-14 08:00',
    endTime: '2024-09-14 17:00',
    reason: '感冒发烧需要休息',
    status: 'pending',
    applyTime: '2024-09-13 21:00',
    approver: '陈老师',
    remark: ''
  }
]

/** 教师发布的公告Mock数据 */
const MOCK_TEACHER_ANNOUNCEMENTS = [
  {
    id: 101,
    title: '高等数学期中考试安排通知',
    content: '各位同学，高等数学期中考试定于10月15日进行，请大家提前做好复习准备...',
    category: '考试通知',
    publishTime: '2024-09-10 10:00',
    publisher: '陈老师',
    isTop: true,
    viewCount: 89,
    status: 'published'
  },
  {
    id: 102,
    title: '关于调整课程作业提交方式的通知',
    content: '为方便大家提交作业，即日起课程作业统一通过学习通平台提交...',
    category: '课程通知',
    publishTime: '2024-09-08 14:30',
    publisher: '陈老师',
    isTop: false,
    viewCount: 156,
    status: 'published'
  },
  {
    id: 103,
    title: '数据结构实验课分组名单',
    content: '请同学们查看附件中的实验课分组名单，按照分组进行实验...',
    category: '课程通知',
    publishTime: '2024-09-05 09:15',
    publisher: '陈老师',
    isTop: false,
    viewCount: 78,
    status: 'published'
  },
  {
    id: 104,
    title: '国庆假期课程调整通知',
    content: '国庆假期期间课程暂停，10月8日恢复正常上课，请同学们注意...',
    category: '教务通知',
    publishTime: '2024-09-03 16:00',
    publisher: '陈老师',
    isTop: false,
    viewCount: 234,
    status: 'published'
  }
]

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
// ============ 教师端Mock API接口 ============

/**
 * 获取教师首页统计数据
 * @returns {Promise} 返回教师端统计信息
 */
const mockGetTeacherStats = () => {
  return mockRequest(MOCK_TEACHER_STATS, 600)
}

/**
 * 获取教师今日课程
 * @returns {Promise} 返回今日课程列表
 */
const mockGetTeacherSchedule = () => {
  return mockRequest(MOCK_TEACHER_SCHEDULE, 600)
}

/**
 * 获取考勤记录列表（支持筛选和分页）
 * @param {Object} params - 查询参数
 * @param {String} params.className - 班级筛选
 * @param {String} params.course - 课程筛选
 * @param {String} params.status - 状态筛选: normal/late/absent/leave
 * @param {String} params.keyword - 搜索关键词（学生姓名/学号）
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @returns {Promise} 返回考勤记录列表
 */
const mockGetAttendanceRecords = (params = {}) => {
  const { className, course, status, keyword, page = 1, pageSize = 10 } = params
  let filtered = [...MOCK_ATTENDANCE_RECORDS]

  // 班级筛选
  if (className) {
    filtered = filtered.filter(item => item.className === className)
  }

  // 课程筛选
  if (course) {
    filtered = filtered.filter(item => item.course === course)
  }

  // 状态筛选
  if (status) {
    filtered = filtered.filter(item => item.status === status)
  }

  // 关键词搜索
  if (keyword) {
    const kw = keyword.toLowerCase()
    filtered = filtered.filter(item =>
      item.studentName.toLowerCase().includes(kw) ||
      item.studentId.toLowerCase().includes(kw)
    )
  }

  const start = (page - 1) * pageSize
  const list = filtered.slice(start, start + pageSize)

  return mockRequest({
    list,
    total: filtered.length,
    hasMore: start + pageSize < filtered.length
  }, 500)
}

/**
 * 获取考勤异常申诉列表
 * @param {String} status - 状态筛选: pending/approved/rejected
 * @returns {Promise} 返回申诉记录列表
 */
const mockGetAppealRecords = (status) => {
  let filtered = [...MOCK_APPEAL_RECORDS]
  if (status) {
    filtered = filtered.filter(item => item.status === status)
  }
  return mockRequest(filtered, 500)
}

/**
 * 处理考勤异常申诉
 * @param {String} appealId - 申诉ID
 * @param {String} action - 操作: approve/reject
 * @param {String} remark - 备注
 * @returns {Promise} 返回操作结果
 */
const mockHandleAppeal = (appealId, action, remark) => {
  const appeal = MOCK_APPEAL_RECORDS.find(item => item.id === appealId)
  if (appeal) {
    appeal.status = action === 'approve' ? 'approved' : 'rejected'
    appeal.remark = remark
  }
  return mockRequest({ success: true }, 800)
}

/**
 * 获取教师端请假审批列表（支持筛选和分页）
 * @param {Object} params - 查询参数
 * @param {String} params.status - 状态筛选: pending/approved/rejected
 * @param {String} params.className - 班级筛选
 * @param {String} params.keyword - 搜索关键词（学生姓名/学号）
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @returns {Promise} 返回请假记录列表
 */
const mockGetTeacherLeaveRecords = (params = {}) => {
  const { status, className, keyword, page = 1, pageSize = 10 } = params
  let filtered = [...MOCK_TEACHER_LEAVE_RECORDS]

  // 状态筛选
  if (status) {
    filtered = filtered.filter(item => item.status === status)
  }

  // 班级筛选
  if (className) {
    filtered = filtered.filter(item => item.className === className)
  }

  // 关键词搜索
  if (keyword) {
    const kw = keyword.toLowerCase()
    filtered = filtered.filter(item =>
      item.studentName.toLowerCase().includes(kw) ||
      item.studentId.toLowerCase().includes(kw)
    )
  }

  const start = (page - 1) * pageSize
  const list = filtered.slice(start, start + pageSize)

  return mockRequest({
    list,
    total: filtered.length,
    hasMore: start + pageSize < filtered.length
  }, 500)
}

/**
 * 审批请假申请
 * @param {String} leaveId - 请假记录ID
 * @param {String} action - 操作: approve/reject
 * @param {String} remark - 审批备注
 * @returns {Promise} 返回操作结果
 */
const mockApproveLeave = (leaveId, action, remark) => {
  const record = MOCK_TEACHER_LEAVE_RECORDS.find(item => item.id === leaveId)
  if (record) {
    record.status = action === 'approve' ? 'approved' : 'rejected'
    record.remark = remark
  }
  return mockRequest({ success: true }, 800)
}

/**
 * 获取教师发布的公告列表（支持筛选和分页）
 * @param {Object} params - 查询参数
 * @param {String} params.status - 状态筛选: published/draft
 * @param {String} params.keyword - 搜索关键词
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @returns {Promise} 返回公告列表
 */
const mockGetTeacherAnnouncements = (params = {}) => {
  const { status, keyword, page = 1, pageSize = 10 } = params
  let filtered = [...MOCK_TEACHER_ANNOUNCEMENTS]

  // 状态筛选
  if (status) {
    filtered = filtered.filter(item => item.status === status)
  }

  // 关键词搜索
  if (keyword) {
    const kw = keyword.toLowerCase()
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(kw)
    )
  }

  const start = (page - 1) * pageSize
  const list = filtered.slice(start, start + pageSize)

  return mockRequest({
    list,
    total: filtered.length,
    hasMore: start + pageSize < filtered.length
  }, 500)
}

/**
 * 发布/编辑公告
 * @param {Object} data - 公告数据
 * @param {String} data.title - 标题
 * @param {String} data.content - 内容
 * @param {String} data.category - 分类
 * @param {Boolean} data.isTop - 是否置顶
 * @returns {Promise} 返回操作结果
 */
const mockPublishAnnouncement = (data) => {
  const newAnnouncement = {
    id: Date.now(),
    ...data,
    publishTime: new Date().toLocaleString(),
    publisher: '陈老师',
    viewCount: 0,
    status: 'published'
  }
  MOCK_TEACHER_ANNOUNCEMENTS.unshift(newAnnouncement)
  return mockRequest({ id: newAnnouncement.id }, 1000)
}

/**
 * 删除公告
 * @param {Number} announcementId - 公告ID
 * @returns {Promise} 返回操作结果
 */
const mockDeleteAnnouncement = (announcementId) => {
  const index = MOCK_TEACHER_ANNOUNCEMENTS.findIndex(item => item.id === announcementId)
  if (index > -1) {
    MOCK_TEACHER_ANNOUNCEMENTS.splice(index, 1)
  }
  return mockRequest({ success: true }, 600)
}

/**
 * 获取公告阅读统计
 * @param {Number} announcementId - 公告ID
 * @returns {Promise} 返回阅读统计数据
 */
const mockGetAnnouncementStats = (announcementId) => {
  const announcement = MOCK_TEACHER_ANNOUNCEMENTS.find(item => item.id === announcementId)
  if (announcement) {
    return mockRequest({
      viewCount: announcement.viewCount,
      totalStudents: 128,
      readRate: Math.round(announcement.viewCount / 128 * 100)
    }, 500)
  }
  return mockRequest({ viewCount: 0, totalStudents: 128, readRate: 0 }, 500)
}

/**
 * 获取教师个人信息
 * @returns {Promise} 返回教师个人信息
 */
const mockGetTeacherInfo = () => {
  const userInfo = wx.getStorageSync('userInfo') || MOCK_USERS.teacher
  return mockRequest(userInfo)
}

/**
 * 更新教师个人信息
 * @param {Object} data - 要更新的字段
 * @returns {Promise} 返回操作结果
 */
const mockUpdateTeacherInfo = (data) => {
  const userInfo = wx.getStorageSync('userInfo') || MOCK_USERS.teacher
  Object.assign(userInfo, data)
  wx.setStorageSync('userInfo', userInfo)
  return mockRequest({ success: true }, 800)
}

>>>>>>> Stashed changes
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
