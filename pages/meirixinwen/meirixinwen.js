// pages/meirixinwen/meirixinwen.js
var categoryArrays = [
  {
    id: 0,
    name: '热点',
    value: 'news_hot'
  },
  {
    id: 1,
    name: '社会',
    value: 'news_society'
  },
  {
    id: 2,
    name: '娱乐',
    value: 'news_entertainment'
  },
  {
    id: 3,
    name: '科技',
    value: 'news_tech'
  },
  {
    id: 4,
    name: '汽车',
    value: 'news_car'
  },
  {
    id: 5,
    name: '体育',
    value: 'news_sport'
  },
  {
    id: 6,
    name: '财经',
    value: 'news_finance'
  },
  {
    id: 7,
    name: '军事',
    value: 'news_military'
  },
  {
    id: 8,
    name: '国际',
    value: 'news_world'
  },
  {
    id: 9,
    name: '图片',
    value: '组图'
  },
  {
    id: 10,
    name: '视频',
    value: 'video'
  },
  {
    id: 11,
    name: '段子	',
    value: 'essay_joke'
  },
  {
    id: 12,
    name: '趣图',
    value: 'image_funny'
  },
  {
    id: 13,
    name: '问答	',
    value: 'question_and_answer'
  },
];
var hotNews = [];
var societyNews = [];
var entertainmentNews = [];
var techNews = [];
var carNews = [];
var sportNews = [];
var financeNews = [];
var militaryNews = [];
var worldNews = [];
var pictureNews = [];
var videoNews = [];
var jokeNews = [];
var funnyImgNews = [];
var askAnswerNews = [];


var iid = '';
var deviceId = '';
var openuuid = '';
var lastGetTime = '';
var currentGetTime = '';

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categorys: categoryArrays,
    currentTab: 0,
    newsType: 0,
    currentShowingDatas: [],//當前頁面顯示的新聞
    newsData: '',
    winHeight: "",//窗口高度
    scrollLeft: 0, //tab标题的滚动条位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc)
        _this.setData({
          winHeight: calc
        });
      }
    });
    //生成iid 10位
    iid = this.getNum(10);
    // 生成deviceID 11 位
    deviceId = this.getNum(11);
    // 生成 openuuid
    openuuid = this.getNum(15);
    // console.log(iid);
    // console.log(deviceId);
    // console.log(openuuid);
    this.getData('news_hot');
  },
  /**
   * 生成随机数
   */
  getNum: function (count) {
    var randomNum = '';
    for (let i = 0; i < count; i++) {
      randomNum += Math.floor(Math.random() * 10)
    }
    return randomNum;
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
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4 && this.data.currentTab < 9) {
      this.setData({
        scrollLeft: 300
      })
    } else if (this.data.currentTab > 8) {
      this.setData({
        scrollLeft: 600
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 选择tab
   */
  chooseTab: function (e) {
    console.log(e)
    var currentType = e.currentTarget.id
    this.setData({
      currentTab: currentType,
    })
  },
  getNewsData: function () {
    var _this = this;
  },
  getData: function (categoryType) {
    var _this = this;
    var baseUrl = 'http://is.snssdk.com/api/news/feed/v51/?';
    var parameters = 'category=' + categoryType + '&refer=1&count=20&min_behot_time=' + lastGetTime + '&last_refresh_sub_entrance_interval=' + currentGetTime + '&loc_mode=&loc_time=' + currentGetTime + '&latitude=&longitude=&city=&tt_from=pull&lac=&cid=&cp=&iid=' + iid + '&device_id=' + deviceId + '&ac=wifi&channel=&aid=&app_name=&version_code=&version_name=&device_platform=&ab_version=&ab_client=&ab_group=&ab_feature=&abflag=3&ssmix=a&device_type=&device_brand=&language=zh&os_api=&os_version=&openudid=' + openuuid + '&manifest_version_code=&resolution=&dpi=&update_version_code=&_rticket=';
    var url = baseUrl + parameters;
    wx.request({
      url: url,
      success: function (res) {
        var datas = res.data.data;
        console.log(datas)
        var newData = '';
        var newDataArrays = [];
        for (let i = 0; i < datas.length; i++) {
          newData = JSON.parse(datas[i].content);
          console.log(newData)
          newDataArrays.push(newData);
        }
        switch (categoryType) {
          case 'news_hot':
            hotNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: hotNews
            })
            break
          case 'news_society':
            societyNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: societyNews
            })
            break
          case 'news_entertainment':
            entertainmentNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: entertainmentNews
            })
            break
          case 'news_tech':
            techNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: techNews
            })
            break
          case 'news_car':
            carNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: carNews
            })
            break
          case 'news_sport':
            sportNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: sportNews
            })
            break
          case 'news_finance':
            financeNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: financeNews
            })
            break
          case 'news_military':
            militaryNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: militaryNews
            })
            break
          case 'news_world':
            worldNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: worldNews
            })
            break
          case '组图':
            pictureNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: pictureNews
            })
            break
          case 'video':
            videoNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: videoNews
            })
            break
          case 'essay_joke':
            jokeNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: jokeNews
            })
            break
          case 'image_funny':
            funnyImgNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: funnyImgNews
            })
            break
          case 'question_and_answer':
            askAnswerNews.push(newDataArrays)
            _this.setData({
              currentShowingDatas: askAnswerNews
            })
            break
        }
      },
      fail: function (res) {
        console.log(res.data)
      }
    })
  }

})