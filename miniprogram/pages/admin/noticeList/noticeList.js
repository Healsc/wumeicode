// pages/admin/noticeList/noticeList.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noticeList:[],
        noticeCount:0,
        content:""
    },
 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.stopPullDownRefresh()
        this.getNoticeList();
    },
    getNoticeList() {
        wx.showLoading({
          title: '加载中',
        })
        wx.cloud.callFunction({
            name: "getNoticeList",
            data:{
                skip:this.data.noticeList.length
            },
            success: res => {
                wx.hideLoading({
                  complete: (res) => {},
                })
                this.setData({
                    noticeList: this.data.noticeList.concat(res.result.data)
                })
                //console.log(res)
            }
        })
    
    },
    getNoticeCount() {
        db.collection('notice').count().then(res => {
            this.setData({
                noticeCount: res.total
            })
        })

    },
    goToDetail(e){
        //console.log(e.target.dataset.id)
        wx.navigateTo({
          url: '/pages/admin/noticeDetail/noticeDetail?id='+e.target.dataset.id,
        })
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
        let that = this;
        that.setData({
            noticeList: [],
            noticeCount: 0
        })
        this.onLoad();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.noticeCount != this.data.noticeList.length) {
            this.getNoticeList();
        } else {
            wx.showToast({
                title: '没有更多了',
                icon: "fail",
                duration: 1500
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})