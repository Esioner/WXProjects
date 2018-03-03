// pages/selectedjoke/selectedjoke.js
var appKey = '4ffe80c442d3db92a7d3bac7756d9fc1';
var newestJokeUrl = 'http://v.juhe.cn/joke/content/text.php?page=&pagesize=&key=' + appKey;
var newestPicUrl = '';
var allJokeData = [];
var picData = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTabIsJoke: true,
    currentTabIsPic: false,
    currentTab: 0,
    jokeData: allJokeData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJokeData(newestJokeUrl);
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
   *获取数据
   */
  getJokeData: function (address) {
    var _this = this;
    wx.request({
      url: address,
      success: function (res) {
        console.log(res)
        allJokeData = allJokeData.concat(res.data.result.data);
        _this.setData({
          jokeData: allJokeData
        })
        console.log(allJokeData)
        console.log(_this.data.jokeData)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 选择最新笑话
   */
  selectJokeTab: function () {
    this.setData({
      currentTabIsJoke: true,
      currentTabIsPic: false,
      currentTab:0
    })
  },
  /**
 * 选择最新趣图
 */
  selectPicTab: function () {
    this.setData({
      currentTabIsJoke: false,
      currentTabIsPic: true,
      currentTab: 1
    })
  },
  /**
   * 滑动swiper
   */
  swipeChange: function (e) {
    console.log(e)
    let currentTab = e.detail.current;
    console.log(currentTab)
    if (currentTab == 0) {
      this.selectJokeTab();
    } else if (currentTab == 1) {
      this.selectPicTab();
    }
  }
})