// pages/baominginfo/baominginfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        naxinInfo: {},
        openid: '',
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
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //this.getOpenid();
        const db = wx.cloud.database({
           // env: 'wumei-2070bb'
        })
        db.collection('wumeiInfo').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                this.setData({
                    naxinInfo: res.data[0]
                })
            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '请刷新',
                })
            } 
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