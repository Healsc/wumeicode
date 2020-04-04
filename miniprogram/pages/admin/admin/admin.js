// pages/admin/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    isSuperAdmin: false
  },
  goNoticeList() {
    wx.navigateTo({
      url: '/pages/admin/noticeList/noticeList',
    })
  },
  goAddNotice() {
    wx.navigateTo({
      url: '/pages/admin/addNotice/addNotice',
    })
  },
  goDepartment() {
    wx.navigateTo({
      url: '/pages/admin/departmentList/departmentList',
    })
  },
  goApplyInfo() {
    wx.navigateTo({
      url: '/pages/admin/applyInfo/applyInfo',
    })
  },
  goWumeiInfo() {
    wx.navigateTo({
      url: '/pages/admin/wumeiInfo/wumeiInfo',
    })
  },
  goHomeSwiper() {
    wx.navigateTo({
      url: '/pages/admin/homeSwiper/homeSwiper',
    })
  },
  goIsWM() {
    wx.navigateTo({
      url: '/pages/admin/isWMNumber/isWMNumber',
    })
  },
  getOpenid() {

    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
        // console.log(this.data.openid)
      }
    })
  },
  getAdminInfo() {
    const db = wx.cloud.database();
    db.collection('wumeiInfo').where({
      _openid: this.data.openid // 填入当前用户 openid
    }).get({
      success: (res) => {
        // console.log(res.data)
        this.setData({
          isSuperAdmin: res.data[0]._isSuperAdmin
        })
      },
      fail: (res) => {

      }
    })
  },
  goAdmin() {
    wx.navigateTo({
      url: '/pages/admin/adminNumber/adminNumber',
    })
  },
  goDahuoList() {
    wx.navigateTo({
      url: '/pages/admin/dahuoList/dahuoList',
    })
  },
  addDahuo() {
    wx.navigateTo({
      url: '/pages/admin/addDahuo/addDahuo',
    })
  },
  goJuchang(){
    wx.navigateTo({
      url: '/pages/admin/juchang/juchang',
    })
  },
  goAddJuchang(){
    wx.navigateTo({
      url: '/pages/admin/addJuchang/addJuchang',
    })
  },
  goYinyueting(){
    wx.navigateTo({
      url: '/pages/admin/huodongshi/huodongshi',
    })
  },
  addHuodongshi(){
    wx.navigateTo({
      url: '/pages/admin/addHuodongshi/addHuodongshi',
    })
  },
  goZhiban(){
    wx.navigateTo({
      url: '/pages/admin/zhibanList/zhibanList',
    })
  },
  addZhiban(){
    wx.navigateTo({
      url: '/pages/admin/addZhiban/addZhiban',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();
    this.getAdminInfo();
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

  }
})