var allKuaidi = [
  {
    name: '圆通', id: 0, value: 'yuantong',
  },
  {
    name: '申通', id: 1, value: 'shentong'
  },
  {
    name: 'EMS', id: 2, value: 'ems'
  },
  {
    name: '顺丰', id: 3, value: 'shunfeng'
  },
  {
    name: '中通', id: 4, value: 'zhongtong'
  },
  {
    name: '韵达', id: 5, value: 'yunda'
  },
  {
    name: '天天', id: 6, value: 'tiantian'
  },
  {
    name: '汇通', id: 7, value: 'huitongkuaidi'
  },
  {
    name: '全峰', id: 8, value: 'quanfengkuaidi'
  },
  {
    name: '德邦', id: 9, value: 'debangwuliu'
  },
  {
    name: '宅急送', id: 10, value: 'zhaijisong'
  }
];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    kuaidiNameArray: allKuaidi,
    currentKuaidiValue: '',
    currentKuaidiNum: '',
    kaudiDetail: '',
    isQuerying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  inputComplete: function (e) {
    console.log(e)
    this.setData({
      currentKuaidiNum: e.detail.value
    });
  },
  radioChange: function (e) {
    console.log(e);
    this.setData({
      currentKuaidiValue: e.detail.value
    })
    console.log(this.data.currentKuaidiValue)
  },
  startQuery: function (e) {
    this.setData({
      isQuerying: true
    })
    var _this = this;
    var kuaidiValue = this.data.currentKuaidiValue;
    var kuaidiNum = this.data.currentKuaidiNum;
    wx.request({
      url: 'http://www.kuaidi100.com/query?type=' + kuaidiValue + '&postid=' + kuaidiNum,
      success: function (res) {
        console.log(res.data)
        _this.setData({
          kaudiDetail: res.data,
          isQuerying: false
        });
      },
      fail: function (res) {
        console.log(res.data)
        isQuerying: false
      }
    })
  }
})