/**
 * 校园公告页面
 * 功能：公告列表展示、分类筛选、搜索、下拉刷新、上拉加载、详情查看
 */
const { mockGetAnnouncements } = require('../../utils/mock')

Page({
  data: {
    announcements: [],         // 全部公告
    filteredAnnouncements: [], // 筛选后的公告
    topAnnouncements: [],      // 置顶公告
    categories: ['教务通知', '安全通知', '服务通知', '学术活动', '校园活动'],
    currentCategory: '全部',   // 当前选中分类
    searchKeyword: '',         // 搜索关键词
    page: 1,
    hasMore: true,
    loading: false,
    isRefreshing: false,

    // 公告详情弹窗
    detailVisible: false,
    detailItem: {},

    // Toast
    toastVisible: false,
    toastType: 'text',
    toastMessage: ''
  },

  onLoad() {
    this.loadAnnouncements()
  },

  onShow() {
    // 设置TabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setSelected(1)
    }
  },

  /**
   * 加载公告数据
   * @param {Boolean} isRefresh - 是否为刷新
   */
  async loadAnnouncements(isRefresh = false) {
    if (this.data.loading) return

    this.setData({ loading: true })
    const page = isRefresh ? 1 : this.data.page

    try {
      const res = await mockGetAnnouncements(page, 10)
      if (res.code === 0) {
        const { list, hasMore } = res.data
        // 区分置顶和普通公告
        const topList = list.filter(item => item.isTop)
        const normalList = list.filter(item => !item.isTop)

        this.setData({
          announcements: isRefresh ? list : [...this.data.announcements, ...list],
          topAnnouncements: isRefresh ? topList : [...this.data.topAnnouncements, ...topList.filter(t => !this.data.topAnnouncements.some(old => old.id === t.id))],
          page: page + 1,
          hasMore
        })
        this.filterAnnouncements()
      }
    } catch (err) {
      this.showToast('error', '加载失败')
    } finally {
      this.setData({ loading: false, isRefreshing: false })
    }
  },

  /**
   * 按分类和关键词筛选公告
   */
  filterAnnouncements() {
    const { announcements, currentCategory, searchKeyword } = this.data
    let filtered = announcements.filter(item => !item.isTop)

    // 分类筛选
    if (currentCategory !== '全部') {
      filtered = filtered.filter(item => item.category === currentCategory)
    }

    // 关键词搜索
    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase()
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(kw) ||
        item.content.toLowerCase().includes(kw)
      )
    }

    this.setData({ filteredAnnouncements: filtered })
  },

  /**
   * 分类点击切换
   */
  onCategoryTap(e) {
    const { category } = e.currentTarget.dataset
    this.setData({ currentCategory: category })
    this.filterAnnouncements()
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterAnnouncements()
  },

  onSearch() {
    this.filterAnnouncements()
  },

  onClearSearch() {
    this.setData({ searchKeyword: '' })
    this.filterAnnouncements()
  },

  /**
   * 下拉刷新
   */
  onRefresh() {
    this.setData({ isRefreshing: true, page: 1 })
    this.loadAnnouncements(true)
  },

  /**
   * 上拉加载更多
   */
  onLoadMore() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadAnnouncements()
    }
  },

  /**
   * 点击公告查看详情
   */
  onAnnouncementTap(e) {
    const { item } = e.currentTarget.dataset
    this.setData({ detailVisible: true, detailItem: item })
  },

  onCloseDetail() {
    this.setData({ detailVisible: false })
  },

  showToast(type, message) {
    this.setData({ toastVisible: true, toastType: type, toastMessage: message })
  },

  onToastClose() {
    this.setData({ toastVisible: false })
  }
})
