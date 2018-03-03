// pages/zhihunews/zhihunews.js
/**
 * 拼接 latest 表示获取最新列表
 * 拼接具体 id 表示获取具体新闻详情
 */
var baseUrl = 'https://news-at.zhihu.com/api/4/news/';
/**
 * 拼接日期获取具体某天的信息
 * 例如：查询11月18日的消息，拼接的数字应为 20131119
 * 如果 before 后的数字小于 20130520 只会接受到空消息
 */
var beforeUrl = 'https://news-at.zhihu.com/api/4/news/before/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNews: [],
    newsList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLatestNews();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getLatestNews: function () {
    var _this = this;
    wx.request({
      url: baseUrl + 'latest',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          topNews: res.data.top_stories,
          newsList: res.data.stories
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 列表和轮播图点击新闻点击事件
   */
  chooseNews: function (e) {
    console.log(e)
    var newsId = e.currentTarget.id;
    console.log(newsId)
    wx.navigateTo({
      url: '../newsdetail/newsdetail?newsId=' + newsId,
    })
  }
})