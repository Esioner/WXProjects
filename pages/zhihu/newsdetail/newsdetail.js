// pages/zhihu/newsdetail/newsdetail.js

/**
 * 拼接 latest 表示获取最新列表
 * 拼接具体 id 表示获取具体新闻详情
 */
var baseUrl = 'https://news-at.zhihu.com/api/4/news/';
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: '',
    newsData: '',
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsId = options.newsId;
    console.log(newsId)
    this.getNews(newsId);
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
  /**
   * 获取新闻详情
   */
  getNews: function (newsId) {
    var _this = this;
    var newsUrl = baseUrl + newsId;
    wx.request({
      url: newsUrl,
      success: function (res) {
        console.log(res.data)
        /**
         * WxParse.wxParse(bindName , type, data, target,imagePadding)
         * 1.bindName绑定的数据名(必填)
         * 2.type可以为html或者md(必填)
         * 3.data为传入的具体数据(必填)
         * 4.target为Page对象,一般为this(必填)
         * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
         */
        WxParse.wxParse('news', 'html', res.data.body, _this, 0)
        _this.setData({
          newsData: res.data.body,
          url: res.data.share_url
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})