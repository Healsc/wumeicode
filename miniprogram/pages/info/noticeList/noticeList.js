// pages/info/noticeList/noticeList.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        noticeList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
               // console.log(res.result)
                this.setData({
                    noticeList: this.data.noticeList.concat(res.result.data)
                })
                //console.log(res)
            }
        })
    
    },
    goToDetail(e){
        wx.navigateTo({
          url: '/pages/info/noticeDetail/noticeDetail?id='+e.target.dataset.id,
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
            noticeList: []
        })
        this.onLoad();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.getNoticeList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '东农舞美',
            path:  "/pages/info/noticeList/noticeList"
        }
    }
})