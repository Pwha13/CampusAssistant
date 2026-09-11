/**
 * 工具函数模块
 */

/**
 * 格式化日期时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

/**
 * 格式化日期（不含时分秒）
 */
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${[year, month, day].map(formatNumber).join('-')}`
}

/**
 * 数字补零
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 获取星期几
 */
const getWeekDay = (day) => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return days[day] || ''
}

/**
 * 获取当前是星期几（1-7，周一到周日）
 */
const getCurrentDayOfWeek = () => {
  const today = new Date().getDay()
  return today === 0 ? 7 : today
}

module.exports = {
  formatTime,
  formatDate,
  formatNumber,
  getWeekDay,
  getCurrentDayOfWeek
}
