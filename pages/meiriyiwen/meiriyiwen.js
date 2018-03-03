// pages/everydayonearticle/everydayonearticle.js
/**
 * 字体大小数组
 */
var textSizes = [
  {
    value: {
      titleSize: '20pt',
      authorSize: '14pt',
      articleSize: '13pt'
    }, checked: false, keywords: '小', id: 0
  },
  {
    value: {
      titleSize: '25pt',
      authorSize: '18pt',
      articleSize: '16pt'
    }, checked: true, keywords: '普通', id: 1
  },
  {
    value: {
      titleSize: '30pt',
      authorSize: '24pt',
      articleSize: '20pt'
    }, checked: false, keywords: '大', id: 2
  }
]
/**
 * 背景颜色数组
 */
var backgroundColors = [
  { key: 0, value: '#F7F7F7', checked: true },
  { key: 1, value: '#D6EED3', checked: false },
  { key: 2, value: '#DDC69E', checked: false },
  { key: 3, value: '#FBE2E2', checked: false }
]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '',
    article_title: '',
    article_author: '',
    article_content: '',
    digest: '',
    wc: '',
    articleDate: {
      preDate: '',
      currentDate: '',
      nextDate: ''
    },
    formatDate: {
      preDate: '',
      currentDate: '',
      nextDate: ''
    },
    preDateLoading: false,
    currDateLoading: false,
    nextDateLoading: false,

    toastHidden: true,
    showModalStatus: false,
    textSizeArray: textSizes,
    selectBackground: '',
    selectTextSize: '',
    colorArrays: backgroundColors
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
    this.setData({
      currentDate: currentDate
    });
    // console.log(currentDate);
    return currentDate;
  },
  /**
   * 格式化日期显示
   * 2018-01-02
   */
  formatDate: function (date) {
    //20180208
    var newDate = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
    return newDate;
  },
  /**
   * 通过网络请求获取资源
   */
  getArticle: function (date) {
    var _this = this;
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/day?dev=1&date=' + date,
      success: function (res) {
        var article = res.data.data
        console.log(article)
        var content = (article.content).replace(/<p>/g, '    ').replace(/<\/p>/g, '\n');
        var prevDate = article.date.prev;
        var currDate = article.date.curr;
        var nextDate = article.date.next;
        _this.setData({
          article_title: article.title,
          article_author: article.author,
          article_content: content,
          digest: article.digest,
          wc: article.wc,
          articleDate: {
            preDate: prevDate,
            currentDate: currDate,
            nextDate: nextDate
          },
          preDateLoading: false,
          nextDateLoading: false,
        });
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
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentDate = this.getCurrentDate();
    this.getArticle(currentDate);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(wx.getStorageSync('SETTING_BACKGROUND'))
    // console.log(parseInt(wx.getStorageSync('SETTING_TEXTSIZE')))
    // this.setData({
    //   selectBackground: wx.getStorageSync('SETTING_BACKGROUND') != NaN ?
    //     backgroundColors[parseInt(wx.getStorageSync('SETTING_BACKGROUND'))].value : backgroundColors[0].value,
    //   selectTextSize: wx.getStorageSync('SETTING_TEXTSIZE') != NaN ? textSizes[parseInt(wx.getStorageSync('SETTING_TEXTSIZE'))].value : textSizes[0].value
    // })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  /**
   * 获取前一天的文章
   */
  getPreArticle: function () {
    this.setData({
      preDateLoading: true,
    });
    var date = this.data.articleDate.preDate;
    console.log(date);
    this.getArticle(date);
  },
  /**
   * 获取第二天的文章
   */
  getNextArticle: function () {
    this.setData({
      nextDateLoading: true,
    });
    var date = this.data.articleDate.nextDate;
    console.log(date);
    if (date <= this.data.currentDate) {
      this.getArticle(date);
    } else {
      this.setData({
        toastHidden: false, //吐司  
        toastText: '已是最新的文章',//吐司文本 
        nextDateLoading: false,
      })
    }
  },
  /**
   * 吐司状态改变
   */
  onToastChanged: function () {
    this.setData({ toastHidden: !this.data.toastHidden });
  },
  openSetting: function (event) {
    this.setData({
      showModalStatus: true
    })
  },
  mainPageTap: function (event) {
    if (this.data.showModalStatus) {
      this.setData({
        showModalStatus: !this.data.showModalStatus
      })
    }
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /**
   * 改变字体大小
   */
  setTextSize: function (e) {
    console.log('radio发生change事件，携带value值为：', e.currentTarget.id)
    var settingSize = textSizes[e.currentTarget.id].value
    console.log(settingSize)
    this.setData({
      selectTextSize: settingSize
    })
    textSizes.forEach(function (i, index) {
      console.log(i)
      console.log(index)
      if (index == parseInt(e.currentTarget.id)) {
        i.checked = true
      } else {
        i.checked = false
      }
    })
    this.setData({
      textSizeArray: textSizes,
    })
    /**
     * 将设置保存到本地
     */
    // wx.setStorageSync({
    //   key: 'SETTING_TEXTSIZE',
    //   data: parseInt(e.currentTarget.id),
    // })
  },
  /**
  * 改变背景颜色
  */
  setBackground: function (e) {
    console.log(e)
    this.setData({
      selectBackground: backgroundColors[parseInt(e.currentTarget.id)].value
    })
    backgroundColors.forEach(function (i, index) {
      console.log(i)
      console.log(index)
      if (index == parseInt(e.currentTarget.id)) {
        i.checked = true
      } else {
        i.checked = false
      }
    })
    this.setData({
      colorArrays: backgroundColors
    })
    /**
     * 将设置保存到本地
     */
    // wx.setStorageSync({
    //   key: 'SETTING_BACKGROUND',
    //   data: parseInt(e.currentTarget.id),
    // })
  },
  randomReading: function (e) {
    var _this = this;
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/random?dev=1',
      success: function (res) {
        var article = res.data.data
        console.log(article)
        var content = (article.content).replace(/<p>/g, '    ').replace(/<\/p>/g, '\n');
        var prevDate = article.date.prev;
        var currDate = article.date.curr;
        var nextDate = article.date.next;
        _this.setData({
          article_title: article.title,
          article_author: article.author,
          article_content: content,
          digest: article.digest,
          wc: article.wc,
          articleDate: {
            preDate: prevDate,
            currentDate: currDate,
            nextDate: nextDate
          },
          preDateLoading: false,
          nextDateLoading: false,
        });
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
      fail: function (res) {
        console.log(res)
      }
    })
  }
})