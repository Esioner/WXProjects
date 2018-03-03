// pages/meiriyiju/meiriyiju.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    requestData: '',
    currentDate: '',
    currentSelectedDate: '',
    toastHidden: true,
    toastText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentDate = this.getCurrentDate();
    var currentFormateDate = this.formatDate(currentDate);
    console.log(currentDate)
    this.setData({
      currentDate: currentFormateDate,
      currentSelectedDate: currentFormateDate,
    });
    console.log(currentDate);
    console.log(currentFormateDate);
    console.log(this.data.currentSelectedDate)
    console.log(this.data.currentDate);
    this.getData(currentDate);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('contentSpeaker')
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

  getData: function (date, type) {
    var _this = this;
    wx.request({
      url: 'http://open.iciba.com/dsapi/?date=' + date + '&type=' + type,
      success: function (res) {
        console.log(res)
        res.data.translation = res.data.translation.replace("词霸小编：", "")
        _this.setData({
          requestData: res.data,
          currentSelectedDate: res.data.dateline,
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    //页面加载完成后滑动到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  getPreDate: function () {
    this.getData(this.data.currentSelectedDate, 'last');
  },
  getNextDate: function () {
    console.log(this.data.currentSelectedDate)
    console.log(this.data.currentDate);
    if (this.data.currentSelectedDate == this.data.currentDate) {
      this.setData({
        toastHidden: false, //吐司  
        toastText: '已是最新的',//吐司文本
      })
    } else {
      this.getData(this.data.currentSelectedDate, 'next');
    }
  },
  speakContent: function (e) {
    this.audioCtx.play()
  },
  audioError: function (e) {
    console.log(e)
  },
  audioPlay: function (e) {
    console.log(e)
  },
  audioEnded: function (e) {
    console.log(e)
  },

  /**
     * 獲取當前日期
     * 格式：20180129
     */
  getCurrentDate: function () {
    var date = new Date();
    var year = date.getFullYear() + "";
    var month = date.getMonth();
    if (month < 10) {
      month = "0" + (month + 1);
    } else {
      month = month + 1;
    }
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    } else {
      day = day + "";
    }
    var currentDate = parseInt(year + month + day);
    console.log(currentDate);
    return currentDate;
  },
  /**
   * 格式化日期显示
   * 2018-01-02
   */
  formatDate: function (date) {
    //20180208
    date = date + "";
    var newDate = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
    return newDate;
  },
  /**
   * 吐司状态改变
   */
  onToastChanged: function () {
    this.setData({ toastHidden: !this.data.toastHidden });
  },
})